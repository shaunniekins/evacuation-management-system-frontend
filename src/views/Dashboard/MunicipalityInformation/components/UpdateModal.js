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
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { MunicipalityUpdate } from "api/municipalityAPI";
import { useHistory } from "react-router-dom";

const UpdateModal = ({
  id,
  name,
  province,
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await MunicipalityUpdate(
        id,
        event.target.name.value,
        event.target.province.value
      ); // call the API function
      onClose();
      history.push("/admin/calamity");
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
          <ModalHeader>Update Municipality</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Municipality</FormLabel>

              <Input
                required
                type="text"
                id="name-field"
                name="name"
                defaultValue={name}
                ref={initialRef}
                placeholder="Municipality"
              />
              <FormLabel>Province</FormLabel>
              <Input
                required
                type="text"
                id="province-field"
                name="province"
                defaultValue={province}
                ref={initialRef}
                placeholder="Province"
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
