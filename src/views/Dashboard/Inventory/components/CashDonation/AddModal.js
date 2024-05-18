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
import { cashDonationAdd } from "api/cashDonationAPI";

import { useHistory } from "react-router-dom";

const AddModal = ({ isOpen, onClose, initialRef, finalRef }) => {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await cashDonationAdd(
        event.target.controlNumber.value,
        event.target.givenBy.value,
        event.target.donor.value,
        event.target.amount.value,
        event.target.modeOfTransfer.value,
        event.target.date.value
      ); // call the API function
      onClose();
      history.push("/admin/dashboard");
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
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Stock In</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Control Number</FormLabel>
              <Input
                required
                type="text"
                id="controlNumber-field"
                name="controlNumber"
                ref={initialRef}
                placeholder="Control Number"
              />
              <FormLabel>From</FormLabel>
              <Select
                required
                id="givenBy-field"
                name="givenBy"
                placeholder="--Select option--">
                <option value="Government">Government</option>
                <option value="Private">Private</option>
              </Select>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                id="donor-field"
                name="donor"
                ref={initialRef}
                placeholder="Name (Optional)"
              />
              <FormLabel>Amount</FormLabel>
              <Input
                required
                type="number"
                id="amount-field"
                name="amount"
                ref={initialRef}
                placeholder="Amount"
              />
              <FormLabel>Mode of Transfer</FormLabel>
              <Select
                required
                id="modeOfTransfer-field"
                name="modeOfTransfer"
                placeholder="--Select option--">
                <option value="Bank Transfer">Bank</option>
                <option value="Money Transfer">Money Transfer</option>
                <option value="GCash">GCash</option>
                <option value="Maya">Maya</option>
              </Select>
              <FormLabel>Date Received</FormLabel>
              <Input
                required
                type="date"
                id="date-field"
                name="date"
                defaultValue={formattedDate}
                ref={initialRef}
                placeholder="Date Received"
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
