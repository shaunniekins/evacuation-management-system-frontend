import React from "react";
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
import { BarangayUpdate } from "api/barangayAPI";
// import { getMunicipalityList } from "api/getListAPI";
import { MunicipalityList } from "api/municipalityAPI";

import { useHistory } from "react-router-dom";

const UpdateModal = ({
  id,
  name,
  municipality,
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await BarangayUpdate(
        id,
        event.target.name.value,
        event.target.municipality.value
      ); // call the API function
      onClose();
      history.push("/admin/municipality-information");
    } catch (error) {
      alert("Failed");
    }
  };
  const municipalityEntries = MunicipalityList();

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
          <ModalHeader>Update Barangay</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Barangay</FormLabel>

              <Input
                required
                type="text"
                id="name-field"
                name="name"
                defaultValue={name}
                ref={initialRef}
                placeholder="Barangay"
              />
              <FormLabel>Municipality</FormLabel>
              <Select
                required
                id="municipality-field"
                name="municipality"
                defaultValue={municipality}
                placeholder="-- Select municipality --">
                {municipalityEntries
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((municipality, index) => (
                    <option key={index} value={municipality.name}>
                      {municipality.name}
                    </option>
                  ))}
              </Select>
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
