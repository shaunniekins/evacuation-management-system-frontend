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
import { ItemDelete } from "api/itemAPI";
import { useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import UpdateModal from "./UpdateModal";

function ItemRow(props) {
  const { id, name, unit } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const history = useHistory();

  return (
    <>
      <Box pl="24px" bg={bgColor} my="10px" borderRadius="12px">
        <Flex justify="space-between" w="100%">
          <Flex direction="column" justify={"center"} maxWidth="70%">
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Name:{" "}
              <Text as="span" color="gray.500">
                {name}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Unit:{" "}
              <Text as="span" color="gray.500">
                {unit}
              </Text>
            </Text>
          </Flex>
          <Flex
            direction={{ sm: "column", md: "row" }}
            align="center"
            p={{ md: "24px" }}>
            <Button
              p="0px"
              bg="transparent"
              mb={{ sm: "10px", md: "0px" }}
              me={{ md: "12px" }}
              onClick={async () => {
                await ItemDelete(id);
                history.push("/admin/dashboard");
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
          unit,
          isOpen,
          onClose,
          initialRef,
          finalRef,
        }}
      />
    </>
  );
}

export default ItemRow;
