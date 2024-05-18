import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Radio,
  RadioGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, Icon } from "@chakra-ui/icons";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { evacueeUpdate } from "api/evacueeAPI";
import { useHistory } from "react-router-dom";

const UpdateModal = ({ isOpen, onClose, initialRef, finalRef, ...data }) => {
  const {
    id,
    last_name,
    first_name,
    middle_name,
    municipality,
    barangay,
    contact_num,
    gender,
    birthday,
    civil_status,
    occupation,
    resident_status,
    is_pwd,
    is_ip,
    is_head,
    household_num,
    street_add,
    length_of_year,
    is_senior
  } = data;

  const history = useHistory();

  const [age, setAge] = useState("");
  
  const [length_of_year_count, setLofY] = useState("");

  useEffect(() => {
    if (birthday) {
      setAge(calculateAge(birthday));
    }
  }, [birthday]);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthdateObj = new Date(birthdate);
    let age = today.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = today.getMonth() - birthdateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdateObj.getDate())
    ) {
      age--;
    }
    return age;
  };




  useEffect(() => {
    if (length_of_year) {
      setAge(calculatelengthofyear(length_of_year));
    }
  }, [length_of_year]);

  const calculatelengthofyear = (LentghOfYear) => {
      const today = new Date();
    const birthdateObj = new Date(LentghOfYear);
    let length_of_year_count = today.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = today.getMonth() - birthdateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdateObj.getDate())
    ) {
      length_of_year_count--;
    }
    return length_of_year_count;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await evacueeUpdate(
        id,
        event.target.last_name.value,
        event.target.first_name.value,
        event.target.middle_name.value,
        event.target.municipality.value,
        event.target.barangay.value,
        event.target.contact_num.value,
        event.target.gender.value,
        event.target.birthday.value,
        event.target.civil_status.value,
        event.target.occupation.value,
        event.target.resident_status.value,
        event.target.is_pwd.value,
        event.target.is_ip.value,
        event.target.is_head.value,
        event.target.household_num.value,
        event.target.street_add.value,
        event.target.length_of_year.value,
        event.target.is_senior.value
            
 
      ); // call the API function
      onClose();
      history.push("/admin/resident-information");
    } catch (error) {
      alert("Failed");
      resident - information;
    }
  };
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  const handleBirthdayChange = (event) => {
    setAge(calculateAge(event.target.value));
  };
 const handleLofYChange = (event) => {
    setLofY(calculatelengthofyear(event.target.value));
  };
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
      size="3xl">
      <ModalOverlay />
      <ModalContent maxW={{ base: "auto" }} w="auto">
        <form onSubmit={handleSubmit}>
          <ModalHeader>Update Calamity</ModalHeader>
          <ModalCloseButton />
          <Box overflowY="auto" maxHeight="70vh">
            <ModalBody pb={7}>
              <FormControl>
                <Flex
                  direction={{ base: "column", lg: "row" }}
                  gap={10}
                  justify={"center"}>
                  <Flex direction={"column"}>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      required
                      type="text"
                      name="last_name"
                      defaultValue={last_name}
                      ref={initialRef}
                      placeholder="Last name"
                    />
                    <FormLabel>First name</FormLabel>
                    <Input
                      required
                      type="text"
                      name="first_name"
                      defaultValue={first_name}
                      ref={initialRef}
                      placeholder="First name"
                    />
                    <FormLabel>Middle name</FormLabel>
                    <Input
                      type="text"
                      name="middle_name"
                      defaultValue={middle_name}
                      ref={initialRef}
                      placeholder="Middle name"
                    />
                    <FormLabel>Birthday</FormLabel>
                    <Flex justify={"space-between"} gap={2}>
                      <Input
                        required
                        type="date"
                        name="birthday"
                        defaultValue={birthday}
                        ref={initialRef}
                        placeholder="Birthday"
                        onChange={handleBirthdayChange}
                      />
                      <Input
                        required
                        disabled
                        type="text"
                        id="age-field"
                        name="age"
                        placeholder="Age"
                        w={"20%"}
                        textAlign={"center"}
                        value={age}
                      />
                    </Flex>
                    <FormLabel>Municipality</FormLabel>
                    <Input
                      required
                      type="text"
                      name="municipality"
                      defaultValue={municipality}
                      ref={initialRef}
                      placeholder="Municipality"
                    />
                    <FormLabel>Barangay</FormLabel>
                    <Input
                      required
                      type="text"
                      name="barangay"
                      defaultValue={barangay}
                      ref={initialRef}
                      placeholder="Barangay"
                    />

                    <FormLabel>Length Of Year</FormLabel>
                    <Flex justify={"space-between"} gap={2}>
                      <Input
                        required
                        type="date"
                        name="length_of_year"
                        defaultValue={length_of_year}
                        ref={initialRef}
                        placeholder="Length of Year"
                        onChange={handleLofYChange}
                      />
                      <Input
                        required
                        disabled
                        type="text"
                        id="length_of_year_count-field"
                        name="length_of_year_count"
                        placeholder="No."
                        w={"20%"}
                        textAlign={"center"}
                        value={length_of_year_count}
                      />
                    </Flex>
                  </Flex>
                  
                  <Flex direction={"column"}>
                    {/* </Stack>
                    <Stack spacing={4} direction="row"> */}
                    <FormLabel>Contact Number</FormLabel>
                    <Input
                      required
                      type="text"
                      name="contact_num"
                      defaultValue={contact_num}
                      ref={initialRef}
                      placeholder="Contact Number"
                    />
                    <FormLabel>Gender</FormLabel>
                    <Input
                      required
                      type="text"
                      name="gender"
                      defaultValue={gender}
                      ref={initialRef}
                      placeholder="Gender"
                    />
                    {/* </Stack>
                    <Stack spacing={4} direction="row"> */}
                    <FormLabel>Civil Status</FormLabel>
                    <Input
                      required
                      type="text"
                      name="civil_status"
                      defaultValue={civil_status}
                      ref={initialRef}
                      placeholder="Civil Status"
                    />
                    <FormLabel>Occupation</FormLabel>
                    <Input
                      required
                      type="text"
                      name="occupation"
                      defaultValue={occupation}
                      ref={initialRef}
                      placeholder="Occupation"
                    />
                    {/* </Stack>
                    <Stack spacing={4} direction="row"> */}
                    <FormLabel>Resident Status</FormLabel>
                    <Input
                      required
                      type="text"
                      name="resident_status"
                      defaultValue={resident_status}
                      ref={initialRef}
                      placeholder="Resident Status"
                    />
                    <FormLabel>Household Number</FormLabel>
                    <Input
                      required
                      type="text"
                      name="household_num"
                      defaultValue={household_num}
                      ref={initialRef}
                      placeholder="Household Number"
                    />
                    <FormLabel>Street</FormLabel>
                    <Input
                      required
                      type="text"
                      name="street_add"
                      defaultValue={street_add}
                      ref={initialRef}
                      placeholder="Street"
                    />
                    {/* </Stack>
                  </Stack> */}
                  </Flex>
                  <Flex direction={"column"}>
                    {/* <Stack spacing={4} direction="row"> */}
                    <FormLabel>PWD</FormLabel>
                    <RadioGroup
                      required
                      name="is_pwd"
                      defaultValue={is_pwd}
                      value={is_pwd}>
                      <Stack spacing={4} direction="row">
                        <Radio value="PWD">Yes</Radio>
                        <Radio value="NOT PWD">No</Radio>
                      </Stack>
                    </RadioGroup>
                    <FormLabel>Indigenous Person</FormLabel>
                    <RadioGroup
                      required
                      name="is_ip"
                      defaultValue={is_ip}
                      value={is_ip}>
                      <Stack spacing={4} direction="row">
                        <Radio value="IP">Yes</Radio>
                        <Radio value="NOT IP">No</Radio>
                      </Stack>
                    </RadioGroup>
                    <FormLabel>Head of the Family</FormLabel>
                    <RadioGroup
                      required
                      name="is_head"
                      defaultValue={is_head}
                      value={is_head}>
                      <Stack spacing={4} direction="row">
                        <Radio value="HEAD">Yes</Radio>
                        <Radio value="MEMBER">No</Radio>
                      </Stack>
                    </RadioGroup>
                    <FormLabel>Senior Citizens</FormLabel>
                    <RadioGroup
                      required
                      name="is_senior"
                      defaultValue={is_senior}
                      value={is_senior}>
                      <Stack spacing={4} direction="row">
                        <Radio value="SENIOR">Yes</Radio>
                        <Radio value="NOT SENIOR">No</Radio>
                      </Stack>
                    </RadioGroup>
                  </Flex>
                </Flex>
                {/* </Stack> */}
              </FormControl>
            </ModalBody>
          </Box>

          <ModalFooter>
            <Button
              bg={bgButton}
              color="white"
              fontSize="xs"
              variant="no-hover"
              mr={3}
              type="submit">
              Update
            </Button>
            <Button
              bg={bgButton}
              color="white"
              fontSize="xs"
              variant="no-hover"
              onClick={() => {
                onClose();
                setAge(calculateAge(birthday));
                setLofY(calculatelengthofyear(length_of_year));
              }}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModal;
