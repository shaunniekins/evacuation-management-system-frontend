import React, { useContext, useState } from "react";
// Chakra imports
import {
  Box,
  Container,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, Icon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { loginUser } from "context/AuthContext";
import { UsersList } from "api/usersAPI";
import AuthContext from "context/AuthContext";

// import AuthContext from "context/AuthContext";

function SignIn() {
  // Chakra color mode
  const titleColor = useColorModeValue("blue.300", "blue.200");
  const textColor = useColorModeValue("gray.400", "white");
  const iconTeal = useColorModeValue("blue.300", "blue.300");
  // const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  const { colorMode } = useColorMode();

  const { loginUser } = useContext(AuthContext);
  const { setUserImage } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const entries = UsersList();
  const handleSubmit = (event) => {
    event.preventDefault();
    entries.map((row) => {
      loginUser(
        formData,
        row.password,
        row.username,
        row.first_name,
        row.last_name,
        row.email,
        row.municipality,
        row.barangay,
        row.position,
        row.contact_number,
        row.image
      );
    });
  };

  return (
    <Flex
      bg={colorMode === "dark" ? "#1A202C" : "gray.100"}
      align="center"
      justify="center"
      h="100vh">
      <Container
        as="b"
        bg={colorMode === "dark" ? "gray.700" : "white"}
        rounded="xl"
        boxShadow="2xl"
        justify={"center"}
        mx="auto">
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}>
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            mb={"20px"}
            mt={"20px"}
            p="25px">
            <Heading
              textAlign={"center"}
              color={titleColor}
              fontSize="25px"
              mb="10px">
              Evacuation Management System
            </Heading>
            <Text
              textAlign={"center"}
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="12px">
              Enter your email and password to sign in
            </Text>
            <form onSubmit={handleSubmit}>
              {/* <form> */}
              <FormControl>
                <Input
                  required
                  type="text"
                  id="username-field"
                  name="username"
                  borderRadius="15px"
                  mb="10px"
                  fontSize="sm"
                  placeholder="Username"
                  size="lg"
                  onChange={handleInputChange}
                />
                <InputGroup size="lg">
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
                    size="lg"
                  />
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    id="password-field"
                    name="password"
                    borderRadius="15px"
                    mb="10px"
                    fontSize="sm"
                    placeholder="Password"
                    size="lg"
                    onChange={handleInputChange}
                  />
                </InputGroup>

                <FormControl display="flex" alignItems="center"></FormControl>
                <Button
                  fontSize="15px"
                  type="submit"
                  bg="blue.300"
                  w="100%"
                  h="45"
                  color="white"
                  mt="20px"
                  _hover={{
                    bg: "blue.200",
                  }}
                  _active={{
                    bg: "blue.400",
                  }}>
                  SIGN IN
                </Button>
              </FormControl>
            </form>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}

export default SignIn;
