import React, { useState } from "react";
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
import { cashDonationUpdate } from "api/cashDonationAPI";

import { useHistory } from "react-router-dom";

const UpdateModal = ({
  id,
  controlNumber,
  givenBy,
  donor,
  amount,
  modeOfTransfer,
  date,
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await cashDonationUpdate(
        id,
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
          <ModalHeader>Update Cssh Donation Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Control Number</FormLabel>
              <Input
                required
                type="text"
                id="controlNumber-field"
                name="controlNumber"
                defaultValue={controlNumber}
                ref={initialRef}
                placeholder="Control Number"
              />
              <FormLabel>From</FormLabel>
              <Select
                required
                id="givenBy-field"
                name="givenBy"
                defaultValue={givenBy}
                ref={initialRef}
                placeholder="--Select option--">
                <option value="Government">Government</option>
                <option value="Private">Private</option>
              </Select>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                id="donor-field"
                name="donor"
                defaultValue={donor}
                ref={initialRef}
                placeholder="Name (Optional)"
              />
              <FormLabel>Amount</FormLabel>
              <Input
                required
                type="number"
                id="amount-field"
                name="amount"
                defaultValue={amount}
                ref={initialRef}
                placeholder="Amount"
              />
              <FormLabel>Mode of Transfer</FormLabel>
              <Select
                required
                id="modeOfTransfer-field"
                name="modeOfTransfer"
                defaultValue={modeOfTransfer}
                ref={initialRef}
                placeholder="--Select option--">
                <option value="Bank">Bank</option>
                <option value="Money Transfer">Money Transfer</option>
                <option value="GCash">GCash</option>
                <option value="Maya">Maya</option>
                <option value="Other e-wallet">Other e-wallet</option>
              </Select>
              <FormLabel>Date received</FormLabel>
              <Input
                required
                type="date"
                id="date-field"
                name="date"
                defaultValue={date}
                ref={initialRef}
                placeholder="Date Received"
              />
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
