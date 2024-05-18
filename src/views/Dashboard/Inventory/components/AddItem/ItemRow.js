import {
  Box,
  Button,
  Icon,
  Flex,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
  Thead,
  Progress,
  Spacer,
  TableCaption,
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
    const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const nameColor = useColorModeValue("gray.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
    const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const history = useHistory();
  return (
    <>
      <Box px="24px" bg={bgColor} my="5px" borderRadius="12px">
      <TableContainer maxH="50vh" overflowY="auto">
          <Table color={textColor} variant="striped" colorScheme="blue">
      <Tbody>
        <Tr>
          <Td style={{ width: '30%' }}>
            <Text color={textColor} cursor="pointer" p="12px">
              {name}
            </Text>
          </Td>
          <Td style={{ width: '30%' }}>
            <Text color={textColor} cursor="pointer" p="12px">
              {unit}
            </Text>
                  </Td>
          <Td style={{ width: '40%' }}>
            <Button
              p="0px"
              bg="transparent"
              onClick={async () => {
                await ItemDelete(id);
                history.push("/admin/dashboard");
              }}>
              <Flex color="red.500" cursor="pointer" p="12px">
                <Icon as={FaTrashAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold">
                  DELETE
                </Text>
              </Flex>
            </Button>
            <Button p="0px" bg="transparent">
              <Flex color={textColor} cursor="pointer" p="12px">
                <Icon as={FaPencilAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold" onClick={onOpen}>
                  EDIT
                </Text>
              </Flex>
            </Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  </TableContainer>
</Box>
      <UpdateModal
        {...{
          id,name,unit,isOpen,onClose,initialRef,finalRef,
        }}
      />
    </>
  ); 
}

export default ItemRow;
