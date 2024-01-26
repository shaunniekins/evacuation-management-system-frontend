import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { RepackedAdd } from "api/repackedAPI";
import { InventoryList, InventoryAdd, InventoryUpdate } from "api/inventoryAPI";
import { ItemList } from "api/itemAPI";
import { BarangayList } from "api/barangayAPI";
import { DistributeBarangayInventoryAdd } from "api/distributeBarangayAPI";
import {
  BarangayInventoryAdd,
  BarangayInventoryList,
} from "api/inventoryPerBarangayAPI";
import { BarangayInventoryUpdate } from "api/inventoryPerBarangayAPI";

import { useHistory } from "react-router-dom";

const AddModal = ({
  // inventoryEntries,
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const textColor = useColorModeValue("gray.700", "white");

  const itemEntry = ItemList();
  const inventoryList = InventoryList();
  const barangayEntry = BarangayList();
  const barangayInventoryList = BarangayInventoryList();

  const [unitValue, setUnitValue] = useState("");

  const history = useHistory();

  const entry1 = ItemList();

  const idConvertName = (itemID, itemUnit, itemQty) => {
    const selectedItem = entry1.find((item) => item.id === itemID);
    if (selectedItem) {
      return `- ${selectedItem.name}: ${itemUnit}${itemQty}`;
    } else {
      return "";
    }
  };

  const idConvertNameOption = (itemID) => {
    const selectedItem = entry1.find((item) => item.id === itemID);
    if (selectedItem) {
      return `${selectedItem.name}`;
    } else {
      return "";
    }
  };

  const [inputs, setInputs] = useState([{ id: 1, item: "", qty: "" }]);

  const itemsItem = inputs.map((input) => parseInt(input.item));

  const unitsValues = entry1
    .filter((entry) => itemsItem.includes(entry.id))
    .sort((a, b) => itemsItem.indexOf(a.id) - itemsItem.indexOf(b.id))
    .map((entry) => entry.unit);

  const handleAddInput = () => {
    const newInputs = [...inputs, { id: inputs.length + 1, item: "", qty: "" }];
    setInputs(newInputs);
  };

  const handleRemoveInput = (id) => {
    const filteredInputs = inputs.filter((input) => input.id !== id);
    setInputs(filteredInputs);
  };

  const handleInputChange = (event, id) => {
    const { name, value } = event.target;
    const newInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, [name]: value };
      }
      return input;
    });
    setInputs(newInputs);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updateAPI = async (item, unit, qty, barangay, date) => {
      try {
        const result = await DistributeBarangayInventoryAdd(
          item,
          unit,
          qty,
          barangay,
          date
        );

        let itemExists = false;

        barangayInventoryList.forEach((entry) => {
          if (entry.item === item) {
            itemExists = true;
            const newQty = parseFloat(entry.qty) + parseFloat(qty);

            BarangayInventoryUpdate(
              entry.id,
              item,
              unit,
              newQty,
              barangay
            ).catch((error) => {
              alert(`Failed to update inventory item ${item}`);
            });
          }
        });

        if (!itemExists) {
          BarangayInventoryAdd(item, unit, qty, barangay).catch((error) => {
            alert(`Failed to add inventory item ${item}`);
          });
        }

        return result;
      } catch (error) {
        alert(`Failed to distribute item ${item}`);
      }
    };

    try {
      let allValuesValid = true;

      for (let i = 0; i < inputs.length; i++) {
        const item = parseInt(inputs[i].item);
        const unit = unitsValues[i];
        const qty = parseFloat(inputs[i].qty);

        const selectedItem = inventoryList.find(
          (invItem) => invItem.item === item
        );

        if (!selectedItem || parseFloat(selectedItem.qty) < qty) {
          const matchingItemEntry = itemEntry.find(
            (entry) => parseInt(entry.id) === parseInt(item)
          );
          alert(
            `The input value of ${qty} ${unit} of ${
              matchingItemEntry ? matchingItemEntry.name : ""
            } exceeds the available inventory.`
          );
          allValuesValid = false;
          break;
        }
      }

      if (allValuesValid) {
        const barangay = event.target.barangay.value;
        const date = event.target.date.value;

        const results = [];

        for (let i = 0; i < inputs.length; i++) {
          const item = parseInt(inputs[i].item);
          const unit = unitsValues[i];
          const qty = parseInt(inputs[i].qty);

          const result = await updateAPI(item, unit, qty, barangay, date);
          results.push(result);
        }

        if (results.length !== inputs.length) {
          console.log("Some items failed to distribute");
        }

        const namesString = inputs.map((input) => input.item).join(", ");
        const qtyString = inputs.map((input) => input.qty).join(", ");
        const unitsString = unitsValues.join(", ");

        const itemsArr = namesString.split(",");
        const qtyArr = qtyString.split(",");

        const inventoryUpdateResults = [];

        for (let i = 0; i < itemsArr.length; i++) {
          const item = parseInt(itemsArr[i].trim());
          const matchingInventoryItem = inventoryList.find(
            (inventoryItem) => inventoryItem.item === item
          );

          if (matchingInventoryItem) {
            const id = matchingInventoryItem.id;
            const qtyEach = qtyArr[i].trim();
            const qty =
              parseFloat(matchingInventoryItem.qty) - parseFloat(qtyEach);

            const resultInventory = await InventoryUpdate(id, item, qty);
            inventoryUpdateResults.push(resultInventory);
          }
        }

        onClose();
        history.push("/admin/dashboard");
      }
    } catch (error) {
      alert(`Failed: ${error}`);
    }
  };

  const [date, setDate] = useState(new Date());
  const formattedDate = date.toISOString().slice(0, 10);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Distribute (Barangay)</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Card border="1px" borderColor="gray.200" mb="1rem">
              <CardHeader>
                <Flex justify="center" align="center" w="100%">
                  <Text fontSize="md" color={textColor} fontWeight="bold">
                    Available Items in the Inventory
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, auto)",
                    columnGap: "2rem",
                    columnWidth: "50%",
                  }}>
                  {inventoryList
                    ? inventoryList
                        .filter((item) => parseFloat(item.qty) !== 0)
                        .map((item) => (
                          <Text key={item.id}>
                            {idConvertName(item.item, item.qty, item.unit)}
                          </Text>
                        ))
                    : ""}
                </Box>
              </CardBody>
            </Card>

            <FormControl>
              <FormLabel>Barangay</FormLabel>
              <Select
                required
                id="barangay-field"
                name="barangay"
                placeholder="-- Select barangay --">
                {barangayEntry.map((entry) => (
                  <option key={entry.id} value={entry.id} data-id={entry.id}>
                    {entry.name}
                  </option>
                ))}
              </Select>
              <FormLabel>Date</FormLabel>
              <Input
                required
                type="date"
                id="date-field"
                name="date"
                defaultValue={formattedDate}
                ref={initialRef}
                placeholder="Date"
              />

              {inputs.map((input) => (
                <div key={input.id}>
                  <FormLabel htmlFor={`item-field-${input.id}`}>Item</FormLabel>
                  <Flex justify={"space-between"} gap={2}>
                    <Select
                      required
                      id={`item-field-${input.id}`}
                      name="item"
                      ref={initialRef}
                      placeholder="--Select option--"
                      onChange={(event) => handleInputChange(event, input.id)}
                      value={input.item}>
                      {inventoryList
                        ? inventoryList
                            .filter((item) => parseFloat(item.qty) !== 0)
                            .map((item) => (
                              <option
                                key={item.id}
                                value={item.item}
                                data-id={item.id}>
                                {idConvertNameOption(item.item)}
                              </option>
                            ))
                        : ""}
                    </Select>
                    <Input
                      required
                      type="number"
                      id={`qty-field-${input.id}`}
                      name="qty"
                      ref={initialRef}
                      placeholder="qty"
                      onChange={(event) => handleInputChange(event, input.id)}
                      value={input.qty}
                      w={"20%"}
                    />
                    {inputs.length > 1 && (
                      <Button
                        color={"red"}
                        onClick={() => handleRemoveInput(input.id)}>
                        ✖
                      </Button>
                    )}
                  </Flex>
                </div>
              ))}
              <Flex
                mt={"1rem"}
                direction={"row"}
                align={"flex-end"}
                justify={"flex-end"}>
                <Button color={"green.500"} onClick={handleAddInput}>
                  ✚ Add Item
                </Button>
              </Flex>
              {/* </Flex> */}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorscheme="blue" mr={3} type="submit">
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;
