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
import { useHistory } from "react-router-dom";

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
import { UsersList } from "api/usersAPI";

const UpdateModal = ({
  id,
  password,
  is_superuser,
  username,
  first_name,
  last_name,
  email,
  is_staff,
  municipality,
  barangay,
  position,
  contact_number,
  image,
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const history = useHistory();

  const usersList = UsersList();
  const usernames = usersList.map((list) => {
    return list.username;
  });
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

  const profilePic = image === null ? false : image;

  const handleSubmit = async (event) => {
    let imageSubmit =
      event.target.image.files[0] === undefined
        ? ""
        : event.target.image.files[0];
    // console.log("update image: ", imageSubmit);

    event.preventDefault();
    if (event.target.current_password.value !== password) {
      alert("Wrong current password.");
      return;
    }

    if (username !== event.target.username.value) {
      if (
        usernames
          .map((username) => username.toLowerCase())
          .includes(event.target.username.value.toLowerCase())
      ) {
        alert("Username already exists");
        return;
      }
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
        history.push("/admin/lgu-settings");
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
                  <FormLabel>First Name</FormLabel>
                  <Input
                    required
                    type="text"
                    id="first_name-field"
                    name="first_name"
                    defaultValue={first_name}
                    ref={initialRef}
                    placeholder="First Name"
                  />
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    required
                    type="text"
                    id="last_name-field"
                    name="last_name"
                    defaultValue={last_name}
                    ref={initialRef}
                    placeholder="Last Name"
                  />

                  <FormLabel>Municipality</FormLabel>
                  <Select
                    required
                    id="municipality-field"
                    name="municipality"
                    defaultValue={municipality}
                    placeholder="-- Select municipality --">
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
                    {barangayEntries.map((barangay, index) => (
                      <option key={index} value={barangay.name}>
                        {barangay.name}
                      </option>
                    ))}
                  </Select>
                  <FormLabel>Position</FormLabel>
                  <Select
                    required
                    id="position-field"
                    name="position"
                    defaultValue={position}
                    placeholder="-- Select option --">
                    <option value="Administrator">Administrator</option>
                    <option value="Personnel">Personnel</option>
                  </Select>

                  <FormLabel>Contact Number</FormLabel>
                  <Input
                    required
                    type="text"
                    id="contact_number-field"
                    name="contact_number"
                    defaultValue={contact_number}
                    ref={initialRef}
                    placeholder="Contact Number"
                  />
                </Flex>
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
                  <FormLabel>Email</FormLabel>
                  <Input
                    required
                    type="email"
                    id="email-field"
                    name="email"
                    defaultValue={email}
                    ref={initialRef}
                    placeholder="Email"
                  />
                  <FormLabel>{`${
                    profilePic ? "Change" : "Upload"
                  } Image`}</FormLabel>
                  <Input
                    type="file"
                    id="image-field"
                    name="image"
                    ref={initialRef}
                    // display={"none"}
                    style={{
                      color: "rgba(0, 0, 0, 0)",
                    }}
                    placeholder="Email"
                  />
                  {/* <FormHelperText>Select an image to upload.</FormHelperText> */}

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
