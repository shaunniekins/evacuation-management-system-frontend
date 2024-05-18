import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Button,
  Flex,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, Icon } from "@chakra-ui/icons";

import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { UserUpdate } from "api/usersAPI";
import { getBarangayList, getMunicipalityList } from "api/getListAPI";
import { MunicipalityList } from "api/municipalityAPI";
import { BarangayList } from "api/barangayAPI";

const UpdateModal = ({}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.current_password.value !== password) {
      alert("Wrong current password.");
      return;
    }

    if (
      event.target.new_password.value !== event.target.confirm_password.value
    ) {
      // Display an error message
      alert("New password and confirm new password do not match");
      return;
    } else {
      try {
        // console.log("update image: ", event.target.image.files[0]);

        const result = await UserUpdate(
          id,
          event.target.new_password.value,
          true,
          event.target.username.value,
          event.target.first_name.value,
          event.target.last_name.value,
          event.target.email.value,
          false,
          event.target.municipality.value,
          event.target.barangay.value,
          event.target.position.value,
          event.target.contact_number.value,
          imageSubmit
        ); // call the API function
        onClose();
      } catch (error) {
        alert("Failed");
      }
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
      <ModalContent maxW={{ base: "auto" }} w="auto">
        <form onSubmit={handleSubmit}>
          <ModalHeader>Update User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Flex
                direction={{ base: "column", lg: "row" }}
                gap={10}
                justify={"space-between"}>
                <Flex direction={"column"} flex={1}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    required
                    type="text"
                    id="username-field"
                    name="username"
                    defaultValue={username}
                    ref={initialRef}
                    placeholder="Username"
                  />
                  <FormLabel>Current Password</FormLabel>
                  <InputGroup size="md">
                    <InputRightElement
                      children={
                        showCurrentPassword ? (
                          <ViewOffIcon
                            onClick={() => setShowCurrentPassword(false)}
                            cursor="pointer"
                            color="gray.400"
                          />
                        ) : (
                          <ViewIcon
                            onClick={() => setShowCurrentPassword(true)}
                            cursor="pointer"
                            color="gray.400"
                          />
                        )
                      }
                      size="md"
                    />
                    <Input
                      required
                      type={showCurrentPassword ? "text" : "password"}
                      id="current-password-field"
                      name="current_password"
                      ref={initialRef}
                      placeholder="Current Password"
                    />
                  </InputGroup>
                  <FormLabel>New Password</FormLabel>
                  <InputGroup size="md">
                    <InputRightElement
                      children={
                        showNewPassword ? (
                          <ViewOffIcon
                            onClick={() => setShowNewPassword(false)}
                            cursor="pointer"
                            color="gray.400"
                          />
                        ) : (
                          <ViewIcon
                            onClick={() => setShowNewPassword(true)}
                            cursor="pointer"
                            color="gray.400"
                          />
                        )
                      }
                      size="md"
                    />
                    <Input
                      required
                      type={showNewPassword ? "text" : "password"}
                      id="new-password-field"
                      name="new_password"
                      ref={initialRef}
                      placeholder="New Password"
                    />
                  </InputGroup>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup size="md">
                    <InputRightElement
                      children={
                        showConfirmPassword ? (
                          <ViewOffIcon
                            onClick={() => setShowConfirmPassword(false)}
                            cursor="pointer"
                            color="gray.400"
                          />
                        ) : (
                          <ViewIcon
                            onClick={() => setShowConfirmPassword(true)}
                            cursor="pointer"
                            color="gray.400"
                          />
                        )
                      }
                      size="md"
                    />
                    <Input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password-field"
                      name="confirm_password"
                      ref={initialRef}
                      placeholder="Confirm Password"
                    />
                  </InputGroup>
                </Flex>
              </Flex>
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
