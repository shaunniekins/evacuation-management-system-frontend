import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Button,
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
import { ItemAdd } from "api/itemAPI";

import { useHistory } from "react-router-dom";
import { ItemList } from "api/itemAPI";

const AddModal = ({
  entries,
  setEntries,
  isOpen: isOpenAddModal,
  onClose: onCloseAddModal,
  initialRef,
  finalRef,
}) => {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await ItemAdd(
        event.target.name.value,
        event.target.unit.value
      );

      const updatedItems = await ItemList();
      setEntries(updatedItems);
      onCloseAddModal();
    } catch (error) {
      alert("Failed");
    }
  };

  const [date, setDate] = useState(new Date());
  const formattedDate = date.toISOString().slice(0, 10);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpenAddModal}
      onClose={onCloseAddModal}
      closeOnOverlayClick={false}
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                id="name-field"
                name="name"
                ref={initialRef}
                placeholder="Name"
              />
              <FormLabel>Unit</FormLabel>
              <Input
                required
                type="text"
                id="unit-field"
                name="unit"
                ref={initialRef}
                placeholder="Unit (eg. kg, pcs, galloon)"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorscheme="blue" mr={3} type="submit">
              Add
            </Button>
            <Button onClick={onCloseAddModal}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;
