import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
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
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { StockinUpdate } from "api/stockinAPI";
import { ItemList } from "api/itemAPI";
import { InventoryList, InventoryUpdate } from "api/inventoryAPI";

import { useHistory } from "react-router-dom";

const UpdateModal = ({
  addEntries,
  id,
  givenBy,
  donor,
  dateReceived,
 
  itemID,
   expir_date,
  // unit,
  qty,
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const inventoryList = InventoryList();

  // console.log("AddEntries: ", addEntries);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const givenBy = event.target.givenBy.value;
    const donor = event.target.donor.value;
    const dateReceived = event.target.dateReceived.value;
   
    const itemIDValueSubmit = itemIDValue; // assume this function retrieves the item ID
          const expir_date = event.target.expir_date.value;
    const preQty = qty;
    const newQty = event.target.qty.value;
   

    try {
      const result = await StockinUpdate(
        id,
        givenBy,
        donor,
        dateReceived,
        expir_date,
        // event.target.item.value,
        itemIDValueSubmit,
        // event.target.unit.value,
        newQty
      ); // call the API function
    } catch (error) {
      alert("Failed");
    }

    try {
      if (inventoryList) {
        inventoryList.map(async (entry) => {
          // if (entry.item === parseInt(itemIDValueSubmit)) {
          let computedQty =
            parseFloat(entry.qty) - parseFloat(preQty) + parseFloat(newQty);
          const resultInventory = await InventoryUpdate(
            entry.id,
            itemIDValueSubmit,
            computedQty
          );
          // }
        });
      }

      onClose();
      history.push("/admin/dashboard");
    } catch (error) {
      alert("Failed");
    }
  };
  const [itemName, setItemName] = useState("");
  const [itemUnit, setItemUnit] = useState("");
  const [unitValue, setUnitValue] = useState("itemUnit");

  const entry1 = ItemList();

  const selectedItem = entry1.find((item) => item.id === itemID);

  useEffect(() => {
    if (selectedItem) {
      setItemName(selectedItem.name);
      setUnitValue(selectedItem.unit);
    } else {
      setItemName("");
      setUnitValue("");
    }
  }, [selectedItem]);
  const [itemIDValue, setItemIDValue] = useState(itemID);

  React.useEffect(() => {
    // document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Find the entry with a matching name
    const matchingEntry = addEntries.find(
      (entry) => entry.name === selectedValue
    );

    if (matchingEntry) {
      // Set the unit value to the matching entry's unit
      setUnitValue(matchingEntry.unit);
    } else {
      // If no matching entry is found, reset the unit value
      setUnitValue("");
    }

    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedID = selectedOption.getAttribute("data-id");
    setItemIDValue(selectedID);
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
          <ModalHeader>Update Stock-in Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={7}>
            <FormControl>
              <FormLabel>From</FormLabel>
              <Flex justify={"space-between"} gap={2}>
                <Select
                  required
                  id="givenBy-field"
                  name="givenBy"
                  defaultValue={givenBy}
                  ref={initialRef}
                  w={"40%"}
                  placeholder="-- Select --">
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                </Select>
                {/* <FormLabel>Name</FormLabel> */}
                <Input
                  type="text"
                  id="donor-field"
                  name="donor"
                  defaultValue={donor}
                  ref={initialRef}
                  placeholder="Name (Optional)"
                  w={"60%"}
                />
              </Flex>

              <FormLabel>Date received</FormLabel>
              <Input
                required
                type="date"
                id="dateReceived-field"
                name="dateReceived"
                defaultValue={dateReceived}
                ref={initialRef}
                placeholder="Date Received"
              />
               <FormLabel>Expiration Date</FormLabel>
              <Input
                required
                type="date"
                id="expir_date-field"
                name="expir_date"
                defaultValue={expir_date}
                ref={initialRef}
                placeholder="Expiration Date"
              />
              <FormLabel>Item</FormLabel>
              <Flex justify={"space-between"} gap={2}>
                <Select
                  required
                  id="item-field"
                  name="item"
                  defaultValue={itemName}
                  placeholder="--Select option--"
                  onChange={handleSelectChange}>
                  {addEntries
                    ? addEntries.map((entry) => (
                        <option
                          key={entry.id}
                          value={entry.name}
                          data-id={entry.id}>
                          {entry.name}
                        </option>
                      ))
                    : ""}
                </Select>
                <Input
                  required
                  type="text"
                  id="qty-field"
                  name="qty"
                  defaultValue={qty}
                  ref={initialRef}
                  placeholder="Quantity"
                  w={"30%"}
                />
                <Input
                  required
                  disabled
                  type="text"
                  id="unit-field"
                  name="unit"
                  // defaultValue={unitValue}
                  ref={initialRef}
                  placeholder="Unit"
                  w={"20%"}
                  value={unitValue}
                />
              </Flex>
              {/* <Input
                required
                type="text"
                id="item-field"
                name="item"
                defaultValue={item}
                ref={initialRef}
                placeholder="Item"
              /> */}
              {/* <FormLabel>Unit</FormLabel>
              <Input
                required
                type="text"
                id="unit-field"
                name="unit"
                defaultValue={unit}
                ref={initialRef}
                placeholder="Unit"
              /> */}
              {/* <FormLabel>Quantity</FormLabel> */}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorscheme="blue" mr={3} type="submit">
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModal;
