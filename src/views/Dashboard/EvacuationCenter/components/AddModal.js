import React, { useState, useEffect } from "react";
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
import { EvacuationCenterAdd } from "api/evacuationCenterAPI";
import { MunicipalityList } from "api/municipalityAPI";
import { BarangayList } from "api/barangayAPI";
import { useHistory } from "react-router-dom";

const AddModal = ({ isOpen, onClose, initialRef, finalRef }) => {
  const history = useHistory();

  const [formData, setFormData] = useState({});
  const barangayEntries = BarangayList();
  const municipalityEntries = MunicipalityList();
  const [filteredBarangayEntries, setFilteredBarangayEntries] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await EvacuationCenterAdd(
        event.target.name.value,
        event.target.municipality.value,
        event.target.barangay.value,
        event.target.capacity.value
      ); // call the API function
      setFormData({});
      onClose();
      history.push("/admin/barangay-information");
    } catch (error) {
      alert("Failed");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "municipality") {
      // Filter barangay entries based on the selected municipality
      const filteredBarangays = barangayEntries.filter(
        (barangay) => barangay.municipality === value
      );
      setFilteredBarangayEntries(filteredBarangays);
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
          <ModalHeader>Add New Evacuation Center</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Evacuation Center</FormLabel>
              <Input
                required
                type="text"
                id="name-field"
                name="name"
                ref={initialRef}
                placeholder="Evacuation Center"
                value={formData.name || ""}
                onChange={handleChange}
              />
              <FormLabel>Municipality</FormLabel>
              <Select
                required
                id="municipality-field"
                name="municipality"
                placeholder="-- Select municipality --"
                value={formData.municipality || ""}
                onChange={handleChange}>
                {municipalityEntries
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((municipality, index) => (
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
                placeholder="-- Select barangay --"
                value={formData.barangay || ""}
                onChange={handleChange}>
                {filteredBarangayEntries
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((barangay, index) => (
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
                ref={initialRef}
                placeholder="Total Capacity"
                value={formData.capacity || ""}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorscheme="blue" mr={3} type="submit">
              Add
            </Button>
            <Button
              onClick={() => {
                setFormData({});
                onClose();
              }}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;
