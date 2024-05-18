import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  InputGroup,
  InputRightElement,
  FormHelperText,
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

import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { UserAdd } from "api/usersAPI";
import { MunicipalityList } from "api/municipalityAPI";
import { BarangayList } from "api/barangayAPI";
import { UsersList } from "api/usersAPI";

import { useHistory } from "react-router-dom";

const AddModal = ({ isOpen, onClose, initialRef, finalRef }) => {
  const id = null;

  const [formData, setFormData] = useState({});
  const barangayEntries = BarangayList();
  const municipalityEntries = MunicipalityList();
  const [filteredBarangayEntries, setFilteredBarangayEntries] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const usersList = UsersList();
  const usernames = usersList.map((list) => {
    return list.username;
  });

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Image Add: ", event.target.image.files[0]);

    if (event.target.password.value !== event.target.confirm_password.value) {
      // Display an error message
      alert("Password and confirm password do not match");
      return;
    }

    if (
      usernames
        .map((username) => username.toLowerCase())
        .includes(event.target.username.value.toLowerCase())
    ) {
      alert("Username already exists");
      return;
    }

    let imageSubmit =
      event.target.image.files[0] === undefined
        ? ""
        : event.target.image.files[0];
    // console.log("Image Add Submit: ", imageSubmit);

    try {
      const result = await UserAdd(
        id,
        event.target.password.value,
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
      setFormData({});
      onClose();
      history.push("/admin/lgu-settings");
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
      <ModalContent maxW={{ base: "auto" }} w="auto">
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add New User</ModalHeader>
          <ModalCloseButton />
          <Box overflowY="auto" maxHeight="70vh">
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
                      ref={initialRef}
                      placeholder="First Name"
                      value={formData.first_name || ""}
                      onChange={handleChange}
                    />
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      required
                      type="text"
                      id="last_name-field"
                      name="last_name"
                      ref={initialRef}
                      placeholder="Last Name"
                      value={formData.last_name || ""}
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

                    <FormLabel>Position</FormLabel>
                    <Select
                      required
                      id="position-field"
                      name="position"
                      placeholder="--Select option--"
                      value={formData.position || ""}
                      onChange={handleChange}>
                      <option value="Administrator">Administrator</option>
                      <option value="Personnel">Personnel</option>
                    </Select>
                    <FormLabel>Contact Number</FormLabel>
                    <Input
                      required
                      type="text"
                      id="contact_number-field"
                      name="contact_number"
                      ref={initialRef}
                      placeholder="Contact Number"
                      value={formData.contact_number || ""}
                      onChange={handleChange}
                    />
                  </Flex>
                  <Flex direction={"column"} flex={1}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      required
                      type="text"
                      id="username-field"
                      name="username"
                      ref={initialRef}
                      placeholder="Username"
                      value={formData.username || ""}
                      onChange={handleChange}
                    />
                    <FormLabel>Email</FormLabel>
                    <Input
                      required
                      type="email"
                      id="email-field"
                      name="email"
                      ref={initialRef}
                      placeholder="Email"
                      value={formData.email || ""}
                      onChange={handleChange}
                    />
                    <FormLabel>Upload Image</FormLabel>
                    <Input
                      type="file"
                      id="image-field"
                      name="image"
                      ref={initialRef}
                      value={formData.image || ""}
                      onChange={handleChange}
                    />
                    {/* <FormHelperText>Select an image to upload.</FormHelperText> */}
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                      <InputRightElement
                        children={
                          showPassword ? (
                            <ViewOffIcon
                              onClick={() => setShowPassword(false)}
                              cursor="pointer"
                              color="gray.400"
                            />
                          ) : (
                            <ViewIcon
                              onClick={() => setShowPassword(true)}
                              cursor="pointer"
                              color="gray.400"
                            />
                          )
                        }
                        size="md"
                      />
                      <Input
                        required
                        type={showPassword ? "text" : "password"}
                        id="password-field"
                        name="password"
                        ref={initialRef}
                        placeholder="Password"
                        value={formData.password || ""}
                        onChange={handleChange}
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
                        value={formData.confirm_password || ""}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Flex>
                </Flex>
              </FormControl>
            </ModalBody>
          </Box>

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
