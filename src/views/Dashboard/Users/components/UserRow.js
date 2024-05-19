import {
  Avatar,
  Box,
  Button,
  Icon,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { UserDelete } from "api/usersAPI";

import { useDisclosure } from "@chakra-ui/react";
import UpdateModal from "./UpdateModal";
import { ProfileIcon } from "components/Icons/Icons";

import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../../urlConfig";

function EvacuationRow(props) {
  const {
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
  } = props;

  const history = useHistory();

  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const iconBoxInside = useColorModeValue("white", "white");

  const [isError, setIsError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  let userImage =
  image === undefined || image === null
    ? false
    : `${BASE_URL}/api${image}`;


  return (
    <>
      <Box p="24px" bg={bgColor} my="15px" borderRadius="12px">
        <Flex justify="space-between" w="100%">
          <Flex direction="column" justify={"center"} maxWidth="70%">
            {userImage && !isError ? (
              <Avatar
                w="55px"
                h="55px"
                me="0px"
                borderRadius={"50%"}
                // px={2}
                mx={2}
                name={userImage}
                src={userImage}
                onError={() => setIsError(true)}
              />
            ) : (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                w="55px"
                h="55px"
                px={2}
                mx={2}
                borderRadius={"50%"}
                bg={"blue.300"}>
                <ProfileIcon color={iconBoxInside} w="40px" h="40px" me="0px" />
              </Box>
            )}
            <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
              {`${first_name} ${last_name}`}
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Username:{" "}
              <Text as="span" color="gray.500">
                {username}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Email:{" "}
              <Text as="span" color="gray.500">
                {email}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Municipality:{" "}
              <Text as="span" color="gray.500">
                {municipality}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Barangay:{" "}
              <Text as="span" color="gray.500">
                {barangay}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Position:{" "}
              <Text as="span" color="gray.500">
                {position}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Contact Number:{" "}
              <Text as="span" color="gray.500">
                {contact_number}
              </Text>
            </Text>
          </Flex>
          <Flex
            direction={{ sm: "column", md: "row" }}
            align="flex-start"
            p={{ md: "24px" }}>
            <Button
              p="0px"
              bg="transparent"
              mb={{ sm: "10px", md: "0px" }}
              me={{ md: "12px" }}
              onClick={async () => {
                await UserDelete(id);
                history.push("/admin/lgu-settings");
              }}>
              <Flex color="red.500" cursor="pointer" align="center" p="12px">
                <Icon as={FaTrashAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold">
                  DELETE
                </Text>
              </Flex>
            </Button>
            <Button p="0px" bg="transparent">
              <Flex color={textColor} cursor="pointer" align="center" p="12px">
                <Icon as={FaPencilAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold" onClick={onOpen}>
                  EDIT
                </Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Box>

      <UpdateModal
        {...{
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
        }}
      />
    </>
  );
}

export default EvacuationRow;
