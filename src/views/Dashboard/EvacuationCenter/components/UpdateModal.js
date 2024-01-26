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
import { EvacuationCenterUpdate } from "api/evacuationCenterAPI";
import { MunicipalityList } from "api/municipalityAPI";
import { BarangayList } from "api/barangayAPI";
import { useHistory } from "react-router-dom";

const UpdateModal = ({
  id,
  name,
  municipality,
  barangay,
  capacity,
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const history = useHistory();

  const barangayEntries = BarangayList();
  const municipalityEntries = MunicipalityList();
  const [barangays, setBarangays] = useState([{ name: barangay }]);

  const handleMunicipalityChange = (event) => {
    const selectedMunicipality = event.target.value;
    const filteredBarangays = barangayEntries.filter(
      (barangay) => barangay.municipality === selectedMunicipality
    );
    setBarangays(filteredBarangays);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await EvacuationCenterUpdate(
        id,
        event.target.name.value,
        event.target.municipality.value,
        event.target.barangay.value,
        event.target.capacity.value
      ); // call the API function
      onClose();
      history.push("/admin/barangay-information");
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
          <ModalHeader>Update Evacuation Center</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Evacuation Center</FormLabel>

              <Input
                required
                type="text"
                id="name-field"
                name="name"
                defaultValue={name}
                ref={initialRef}
                placeholder="Evacuation Center"
              />
              <FormLabel>Municipality</FormLabel>
              <Select
                required
                id="municipality-field"
                name="municipality"
                defaultValue={municipality}
                placeholder="-- Select municipality --"
                onChange={handleMunicipalityChange}>
                {municipalityEntries.map((municipality, index) => (
                  <option key={index} value={municipality.name}>
                    {municipality.name}
                  </option>
                ))}
              </Select>
              <FormLabel>Barangay</FormLabel>
              <Select
                required
                id="barangay-field"
                name="barangay"
                defaultValue={barangay}
                placeholder="-- Select barangay --">
                {barangays.map((barangay, index) => (
                  <option key={index} value={barangay.name}>
                    {barangay.name}
                  </option>
                ))}
              </Select>
              <FormLabel>Total Capacity</FormLabel>
              <Input
                required
                type="number"
                id="capacity-field"
                name="capacity"
                defaultValue={capacity}
                ref={initialRef}
                placeholder="Total Capacity"
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
