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
import {
  BarangayInventoryList,
  BarangayInventoryAdd,
  BarangayInventoryUpdate,
} from "api/inventoryPerBarangayAPI";
import { ItemList } from "api/itemAPI";
import { BarangayList } from "api/barangayAPI";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

import { useHistory } from "react-router-dom";

const AddModal = ({
  // inventoryEntries,
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const history = useHistory();

  const textColor = useColorModeValue("gray.700", "white");

  let { userBarangay } = useContext(AuthContext);
  // console.log("userBarangay: ", userBarangay);

  const inventoryList = InventoryList();
  const barangayInventoryList = BarangayInventoryList();
  const barangayList = BarangayList();

  const [unitValue, setUnitValue] = useState("");

  const entry1 = ItemList();

  let barangayID = null;
  for (const barangay of barangayList) {
    if (barangay.name === userBarangay) {
      barangayID = barangay.id;
      break;
    }
  }

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

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const namesString = inputs.map((input) => input.item).join(", ");
  //   const qtyString = inputs.map((input) => input.qty).join(", ");
  //   const unitsString = unitsValues.join(", ");

  //   const items = namesString;
  //   const units = unitsString;
  //   const qty = qtyString;
  //   const instance = parseInt(event.target.deliverables.value);
  //   const reason = event.target.reason.value;

  //   try {
  //     const result = await RepackedAdd(
  //       items,
  //       units,
  //       qty,
  //       instance,
  //       reason,
  //       userBarangay
  //     );
  //   } catch (error) {
  //     alert("Failed");
  //   }

  //   const itemsArr = namesString.split(","); // convert to array
  //   const unitsArr = units.split(",");
  //   const qtyArr = qtyString.split(","); // convert to array

  //   try {
  //     for (let i = 0; i < itemsArr.length; i++) {
  //       const item = parseInt(itemsArr[i].trim());

  //       const matchingBarangayName = barangayList.find(
  //         (barangayItem) => barangayItem.name === userBarangay
  //       );

  //       const matchingInventoryItem = barangayInventoryList.find(
  //         (inventoryItem) => inventoryItem.item === item
  //       );

  //       const id = matchingInventoryItem ? matchingInventoryItem.id : undefined;
  //       const qtyEach = qtyArr[i].trim();
  //       const qty = matchingInventoryItem
  //         ? parseFloat(matchingInventoryItem.qty) -
  //           parseFloat(qtyEach) * instance
  //         : -parseFloat(qtyEach);
  //       const unit = unitsArr[i].trim();
  //       const barangay = matchingBarangayName ? matchingBarangayName.id : "";

  //       let itemExists = matchingInventoryItem !== undefined;

  //       if (itemExists) {
  //         await BarangayInventoryUpdate(id, item, unit, qty, barangay);
  //       } else {
  //         await BarangayInventoryAdd(item, unit, qtyEach, barangay);
  //       }
  //     }
  //     onClose();
  //     history.push("/admin/dashboard");
  //   } catch (error) {
  //     alert("Failed");
  //   }
  // };
const handleSubmit = async (event) => {
  event.preventDefault();
  const namesString = inputs.map((input) => input.item).join(", ");
  const qtyString = inputs.map((input) => input.qty).join(", ");
  const unitsString = unitsValues.join(", ");

  const items = namesString;
  const units = unitsString;
  const qty = qtyString;
  const instance = parseInt(event.target.deliverables.value);
  const reason = event.target.reason.value;

  const itemsArr = namesString.split(","); // convert to array
  const unitsArr = units.split(",");
  const qtyArr = qtyString.split(","); // convert to array

  let hasExceededInventory = false; // Flag to track if any item exceeds the inventory

  try {
    for (let i = 0; i < itemsArr.length; i++) {
      const item = parseInt(itemsArr[i].trim());
      const qtyEach = qtyArr[i].trim();
      const unit = unitsArr[i].trim();

      const matchingBarangayName = barangayList.find(
        (barangayItem) => barangayItem.name === userBarangay
      );

      const matchingInventoryItem = barangayInventoryList.find(
        (inventoryItem) => inventoryItem.item === item
      );

      const id = matchingInventoryItem ? matchingInventoryItem.id : undefined;
      const qtyToUpdate = matchingInventoryItem
        ? parseFloat(matchingInventoryItem.qty) - parseFloat(qtyEach) * instance
        : -parseFloat(qtyEach);
      const barangay = matchingBarangayName ? matchingBarangayName.id : "";

      let itemExists = matchingInventoryItem !== undefined;

      if (itemExists) {
        const updatedQty = parseFloat(matchingInventoryItem.qty) - parseFloat(qtyEach) * instance;
        if (updatedQty < 0) {
          const itemEntry = entry1.find((entry) => entry.id === item);
          alert(
            `The input value of ${qtyEach} ${unit} of ${
              itemEntry ? itemEntry.name : ""
            } exceeds the available inventory.`
          );
          hasExceededInventory = true;
          break; // Exit the loop if any item exceeds the inventory
        }
      }

      if (!hasExceededInventory) {
        if (itemExists) {
          await BarangayInventoryUpdate(id, item, unit, qtyToUpdate, barangay);
        } else {
          const updatedQty = parseFloat(qtyEach) * instance;
          await BarangayInventoryAdd(item, unit, updatedQty, barangay);
        }
      }
    }

    if (!hasExceededInventory) {
      try {
        const result = await RepackedAdd(
          items,
          units,
          qty,
          instance,
          reason,
          userBarangay
        );
        onClose();
        history.push("/admin/dashboard");
      } catch (error) {
        // Revert the quantity of items that were updated
        for (let i = 0; i < itemsArr.length; i++) {
          const item = parseInt(itemsArr[i].trim());
          const qtyEach = qtyArr[i].trim();
          const unit = unitsArr[i].trim();

          const matchingBarangayName = barangayList.find(
            (barangayItem) => barangayItem.name === userBarangay
          );

          const matchingInventoryItem = barangayInventoryList.find(
            (inventoryItem) => inventoryItem.item === item
          );

          const id = matchingInventoryItem ? matchingInventoryItem.id : undefined;
          const qtyToUpdate = matchingInventoryItem
            ? parseFloat(matchingInventoryItem.qty) + parseFloat(qtyEach) * instance
            : parseFloat(qtyEach);
          const barangay = matchingBarangayName ? matchingBarangayName.id : "";

          let itemExists = matchingInventoryItem !== undefined;

          if (itemExists) {
            await BarangayInventoryUpdate(id, item, unit, qtyToUpdate, barangay);
          }
        }

        alert("Failed");
      }
    }
  } catch (error) {
    alert("Failed");
  }
};

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
          <ModalHeader>Repacked (Stock-Out)</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Card border="1px" borderColor="gray.200" mb="1rem">
              <CardHeader>
                <Flex justify="center" align="center" w="100%">
                  <Text fontSize="md" color={textColor} fontWeight="bold">
                    Available Items in {userBarangay} Inventory
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
                  {barangayInventoryList
                    ? barangayInventoryList
                        .filter((item) => parseFloat(item.qty) !== 0)
                        .filter((item) => barangayID === item.barangay)

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
              <FormLabel>Reason</FormLabel>
              <Input
                required
                type="text"
                id="reason-field"
                name="reason"
                ref={initialRef}
                placeholder="Reason"
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
                      {barangayInventoryList
                        ? barangayInventoryList
                            .filter((item) => parseFloat(item.qty) !== 0)
                            .filter((item) => barangayID === item.barangay)
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
              <FormLabel>Deliverables to create</FormLabel>
              <Input
                required
                type="number"
                id="deliverables-field"
                name="deliverables"
                defaultValue={1}
                ref={initialRef}
                placeholder="Number of Deliverables"
              />
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
