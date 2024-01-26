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
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { CalamityAdd } from "api/calamityAPI";

import { useHistory } from "react-router-dom";

const AddModal = ({ isOpen, onClose, initialRef, finalRef }) => {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await CalamityAdd(
        event.target.name.value,
        event.target.date.value
      ); // call the API function
      onClose();
      history.push("/admin/inventory");
    } catch (error) {
      alert("Failed");
    }
  };

  const [date, setDate] = useState(new Date());

  // Format date as "yyyy-mm-dd"
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
          <ModalHeader>Add New Calamity</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Calamity name</FormLabel>
              <Input
                required
                type="text"
                id="name-field"
                name="name"
                ref={initialRef}
                placeholder="Calamity name"
              />
              <FormLabel>Calamity date</FormLabel>
              <Input
                required
                type="date"
                id="date-field"
                name="date"
                defaultValue={formattedDate}
                ref={initialRef}
                placeholder="Calamity date"
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
