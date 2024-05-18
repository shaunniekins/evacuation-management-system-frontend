// Chakra imports
import React from "react";
import { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Button,
  Input,
  Select,
  Radio,
  Text,
  RadioGroup,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import { evacueeAdd } from "api/evacueeAPI";
import { MunicipalityList } from "api/municipalityAPI";
import { BarangayList } from "api/barangayAPI";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

function View() {
  const [formData, setFormData] = useState({});
  const [isPwd, setIsPwd] = useState("");
  const [isIp, setIsIp] = useState("");
  const [isHead, setIsHead] = useState("");
  const [age, setAge] = useState("");
  const [is_senior, setSenior] = useState("");
  const [length_of_year_count, setLofY] = useState("");

  const iconTeal = useColorModeValue("blue.300", "blue.300");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  let {
    userExist,
    userUserName,
    userName,
    userEmail,
    userMunicipality,
    userBarangay,
    userPosition,
    userContactNum,
    userImage,
  } = useContext(AuthContext);

  const currentBarangay = !userExist ? userMunicipality : "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await evacueeAdd(
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
      alert("Added Successfully");

      setFormData({});
      setAge("");
      setIsPwd("");
      setLofY("");
      setIsIp(""); // Reset the default value of is_ip radio group to null
      setIsHead("");
      setSenior("");
       // Reset the default value of is_head radio group to null
    } catch (error) {
      alert("Failed");
    }
  };

  const handleBirthdayChange = (event) => {
    const birthdate = new Date(event.target.value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    setAge(age);
    handleChange(event); // Call handleChange to update formData state as well
  };

    const handlelengthofyearChange = (event) => {
   const lofy = new Date(event.target.value);
    const today = new Date();
    const length_of_year_count = today.getFullYear() - lofy.getFullYear();
    setLofY(length_of_year_count);
    handleChange(event); // Call handleChange to update formData state as well
  };

  const barangayEntries = BarangayList();
  const municipalityEntries = MunicipalityList();
  const [filteredBarangayEntries, setFilteredBarangayEntries] = useState([]);

  // console.log("Barangays: ", barangayEntries);

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

  const handleClear = (event) => {
    setFormData({});
    setAge("");

    setIsPwd("");
    setIsIp("");
    setIsHead("");
    setSenior("");
    setLofY("");
  };

  return (
    <>
      <Card p="16px" mt="24px">
        {" "}
        <CardHeader>
          <Flex minHeight="60px" w="100%">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Resident Information
            </Text>
          </Flex>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Flex
              direction={{ base: "column", lg: "row" }}
              gap={10}
              justify={"space-between"}>
              <Flex direction={"column"} w={"100%"}>
                <FormLabel>Last name</FormLabel>
                <Input
                  required
                  id="last_name-field"
                  name="last_name"
                  placeholder="Last name"
                  value={formData.last_name || ""}
                  onChange={handleChange}
                />
                <FormLabel>First name</FormLabel>
                <Input
                  required
                  id="first_name-field"
                  name="first_name"
                  placeholder="First name"
                  value={formData.first_name || ""}
                  onChange={handleChange}
                />

                <FormLabel>Middle name</FormLabel>
                <Input
                  id="middle_name-field"
                  name="middle_name"
                  placeholder="Middle name"
                  value={formData.middle_name || ""}
                  onChange={handleChange}
                />

                <FormLabel>Birthday</FormLabel>
                <Flex justify={"space-between"} gap={2}>
                  <Input
                    required
                    type="date"
                    id="birthday-field"
                    name="birthday"
                    placeholder="Birthday"
                    value={formData.birthday || ""}
                    onChange={(event) => {
                      handleChange(event);
                      handleBirthdayChange(event);
                    }}
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
                {/* <FormLabel>Age: {age}</FormLabel> */}

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
                      // <option key={index} value={municipality.id}>
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
                      // <option key={index} value={barangay.id}>
                      <option key={index} value={barangay.name}>
                        {barangay.name}
                      </option>
                    ))}
                </Select>

                 <FormLabel>Residency</FormLabel>
                <Flex justify={"space-between"} gap={2}>
                  <Input
                    required
                    type="date"
                    id="length_of_year-field"
                    name="length_of_year"
                    placeholder="Residency"
                    value={formData.length_of_year || ""}
                    onChange={(event) => {
                      handleChange(event);
                      handlelengthofyearChange(event);
                    }}
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
              <Flex direction={"column"} w={"100%"}>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  required
                  id="contact_num-field"
                  name="contact_num"
                  placeholder="Contact Number"
                  value={formData.contact_num || ""}
                  onChange={handleChange}
                />
                <FormLabel>Gender</FormLabel>
                <Select
                  required
                  id="gender-field"
                  name="gender"
                  placeholder="-- Select gender --"
                  value={formData.gender || ""}
                  onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </Select>
                <Text></Text>

                <FormLabel>Civil Status</FormLabel>
                <Select
                  required
                  id="civil_status-field"
                  name="civil_status"
                  placeholder="-- Select status --"
                  value={formData.civil_status || ""}
                  onChange={handleChange}>
                  <option value="Never Married">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                  <option value="Divorced/Annulled">Divorced/Annulled</option>
                </Select>
                <FormLabel>Occupation</FormLabel>
                <Input
                  required
                  id="occupation-field"
                  name="occupation"
                  placeholder="Occupation"
                  value={formData.occupation || ""}
                  onChange={handleChange}
                />
                <FormLabel>Resident Status</FormLabel>
                <Select
                  required
                  id="resident_status-field"
                  name="resident_status"
                  placeholder="-- Select status --"
                  value={formData.resident_status || ""}
                  onChange={handleChange}>
                  <option value="permanent">Permanent</option>
                  <option value="present">Present</option>
                </Select>
                <FormLabel>Household Number</FormLabel>
                <Input
                  
                  type="text"
                  id="household_num-field"
                  name="household_num"
                  placeholder="Household Number (e.g. 12-34-567-89012)"
                  value={formData.household_num || ""}
                  onChange={(e) => {
                    const input = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                    const matches = input.match(
                      /^(\d{0,2})(\d{0,2})(\d{0,3})(\d{0,5})$/
                    ); // Match numbers to each group
                    if (matches) {
                      const formatted = `${matches[1] ? matches[1] + "-" : ""}${
                        matches[2] ? matches[2] + "-" : ""
                      }${matches[3] ? matches[3] + "-" : ""}${matches[4]}`; // Add dashes
                      setFormData((prev) => ({
                        ...prev,
                        household_num: formatted,
                      }));
                      const cursorPosition = e.target.selectionStart; // Get cursor position
                      if (
                        e.target.value[cursorPosition - 1] === "-" &&
                        e.target.value[cursorPosition - 2] === "-"
                      ) {
                        // Check if cursor is between dashes
                        e.target.selectionStart = cursorPosition - 1; // Move cursor to previous group
                        e.target.selectionEnd = cursorPosition - 1;
                      }
                    }
                  }}
                />
                 <FormLabel>Street</FormLabel>
                <Input
                  required
                  id="street_add-field"
                  name="street_add"
                  placeholder="eg. P-5 Barangay Cliss , Bunawan"
                  value={formData.street_add || ""}
                  onChange={handleChange}
                />
              </Flex>
              
              <Flex direction={"column"}>
                <Flex
                  direction={"column"}
                  gap={"14rem"}
                  align={{ base: "flex-start", lg: "center" }}
                  justify={"center"}>
                  <Flex direction={"column"}>
                    <FormLabel>PWD</FormLabel>
                    <RadioGroup
                      required
                      id="is_pwd-field"
                      name="is_pwd"
                      defaultValue={isPwd}
                      value={isPwd}
                      onChange={(value) => setIsPwd(value)}>
                      <Stack spacing={4} direction="row">
                        <Radio value="PWD">Yes</Radio>
                        <Radio value="NOT PWD">No</Radio>
                      </Stack>
                    </RadioGroup>
                    <FormLabel>Indigenous Person</FormLabel>
                    <RadioGroup
                      required
                      id="is_ip-field"
                      name="is_ip"
                      defaultValue={isIp}
                      value={isIp}
                      onChange={(value) => setIsIp(value)}>
                      <Stack spacing={4} direction="row">
                        <Radio value="IP">Yes</Radio>
                        <Radio value="NOT IP">No</Radio>
                      </Stack>
                    </RadioGroup>
                    <FormLabel>Head of the Family</FormLabel>
                    <RadioGroup
                      required
                      id="is_head-field"
                      name="is_head"
                      defaultValue={isHead}
                      value={isHead}
                      onChange={(value) => setIsHead(value)}>
                      <Stack spacing={4} direction="row">
                        <Radio value="HEAD">Yes</Radio>
                        <Radio value="MEMBER">No</Radio>
                      </Stack>
                    </RadioGroup>
                   < FormLabel>Senior</FormLabel>
                    <RadioGroup
                      required
                      id="is_senior-field"
                      name="is_senior"
                      defaultValue={is_senior}
                      value={is_senior}
                      onChange={(value) => setSenior(value)}>
                      <Stack spacing={4} direction="row">
                        <Radio value="SENIOR">Yes</Radio>
                        <Radio value="NOT SENIOR">No</Radio>
                      </Stack>
                    </RadioGroup>
                  </Flex>

                  <Flex gap={5}>
                    <Button
                      bg={bgButton}
                      w={"5rem"}
                      color="white"
                      fontSize="xs"
                      variant="no-hover"
                      type="submit">
                      Add
                    </Button>
                    <Button
                      bg={bgButton}
                      type="reset"
                      w={"5rem"}
                      color="white"
                      fontSize="xs"
                      variant="no-hover"
                      onClick={handleClear}>
                      Clear
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              
            </Flex>
          </FormControl>
        </form>
      </Card>
    </>
  );
}

export default View;
