import {
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
import { EvacuationCenterDelete } from "api/evacuationCenterAPI";
import { useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

// import UpdateModal from "views/Dashboard/TypeOfCalamity/components/UpdateModal";
import UpdateModal from "./UpdateModal";

function EvacuationRow(props) {
  const { id, name, municipality, barangay, capacity } = props;
  const history = useHistory();

  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Box p="24px" bg={bgColor} my="15px" borderRadius="12px">
        <Flex justify="space-between" w="100%">
          <Flex direction="column" justify={"center"} maxWidth="70%">
            <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
              {name}
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
              Total Capacity:{" "}
              <Text as="span" color="gray.500">
                {capacity}
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
                await EvacuationCenterDelete(id);
                history.push("/admin/barangay-information");
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
          name,
          municipality,
          barangay,
          capacity,
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
