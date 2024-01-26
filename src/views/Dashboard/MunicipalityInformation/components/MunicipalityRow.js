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
import { useDisclosure } from "@chakra-ui/react";
import UpdateModal from "./UpdateModal";
import { MunicipalityDelete } from "api/municipalityAPI";

import { useHistory } from "react-router-dom";

function MunicipalityRow(props) {
  const { id, name, province } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Box pl="24px" bg={bgColor} my="15px" borderRadius="12px">
        <Flex justify="space-between" w="100%">
          <Flex direction="column" justify={"center"} maxWidth="70%">
            <Text color={nameColor} fontSize="md" fontWeight="bold" mb="5px">
              {name}
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              <Text as="span" color="gray.400">
                {province}
              </Text>
            </Text>
          </Flex>
          <Flex
            direction={{ sm: "column", md: "row" }}
            align="flex-start"
            p={{ md: "18px" }}>
            <Button
              p="0px"
              bg="transparent"
              mb={{ sm: "10px", md: "0px" }}
              me={{ md: "12px" }}
              onClick={async () => {
                await MunicipalityDelete(id);
                history.push("/admin/calamity");
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
          province,
          isOpen,
          onClose,
          initialRef,
          finalRef,
        }}
      />
    </>
  );
}

export default MunicipalityRow;
