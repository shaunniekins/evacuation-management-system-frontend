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
import { StockinList } from "api/stockinAPI";

const UpdateModal = ({
  entries,
  setEntries,
  inventoryList,
  setInventoryList,
  addEntries,
  isOpen: isOpenUpdateModal,
  onClose: onCloseUpdateModal,
  initialRef,
  finalRef,
  selectedRow,
}) => {
  const { id, givenBy, donor, dateReceived, item, expir_date, qty } =
    selectedRow || {};

  let itemID = item;
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const givenBy = event.target.givenBy.value;
    const donor = event.target.donor.value;
    const dateReceived = event.target.dateReceived.value;
    const itemIDValueSubmit = itemIDValue;
    const expir_date = event.target.expir_date.value;
    const preQty = parseFloat(parseFloat(qty).toFixed(1));
    const newQty = parseFloat(parseFloat(event.target.qty.value).toFixed(1));

    try {
      await StockinUpdate(
        id,
        givenBy,
        donor,
        dateReceived,
        expir_date,
        itemIDValueSubmit,
        newQty
      );
    } catch (error) {
      alert("Failed");
      console.log("error", error);
    }

    try {
      if (inventoryList) {
        inventoryList.map(async (entry) => {
          if (entry.item === parseInt(itemIDValueSubmit)) {
            let computedQty = entry.qty - preQty + newQty;
            await InventoryUpdate(entry.id, itemIDValueSubmit, computedQty);
          }
        });
      }

      const updatedItems = await StockinList();
      setEntries(updatedItems);

      onCloseUpdateModal();
    } catch (error) {
      alert("Failed");
      console.log("error", error);
    }
  };
  const [itemName, setItemName] = useState("");
  const [unitValue, setUnitValue] = useState("itemUnit");

  // const entry1 = ItemList();
  const [entry1, setEntry1] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let data = await ItemList();
      setEntry1(data);
    };

    fetchItems();
  }, []);

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

  useEffect(() => {
    setItemIDValue(itemID);
  }, [itemID]);

  useEffect(() => {
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
    const selectedID = parseInt(selectedOption.getAttribute("data-id"));
    // console.log("selectedID: ", selectedID);
    setItemIDValue(selectedID);
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpenUpdateModal}
      onClose={onCloseUpdateModal}
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
            <Button onClick={onCloseUpdateModal}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModal;
