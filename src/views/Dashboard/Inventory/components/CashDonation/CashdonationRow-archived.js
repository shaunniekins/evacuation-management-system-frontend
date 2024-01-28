import {
  Box,
  Button,
  Icon,
  Flex,
  Text,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Thead,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { cashDonationDelete } from "api/cashDonationAPI";
import { useDisclosure } from "@chakra-ui/react";

import UpdateModal from "./UpdateModal";

import { useHistory } from "react-router-dom";

function CashdonationRow(props) {
  const {
    entries,
    setEntries,
    id,
    controlNumber,
    givenBy,
    donor,
    amount,
    modeOfTransfer,
    date,
  } = props;

  const history = useHistory();

  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      {/* <Box p="24px" bg={bgColor} my="15px" borderRadius="12px">
        <Flex justify="space-between" w="100%">
          <Flex direction="column" justify={"center"} maxWidth="70%">
            <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
              {modeOfTransfer}
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Given by:{" "}
              <Text as="span" color="gray.500">
                {givenBy}
              </Text>
            </Text>
            {donor ? (
              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Name:{" "}
                <Text as="span" color="gray.500">
                  {donor}
                </Text>
              </Text>
            ) : (
              <p></p>
            )}

            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Date Received:{" "}
              <Text as="span" color="gray.500">
                {date}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Amount:{" "}
              <Text as="span" color="gray.500">
                Php {parseFloat(amount).toFixed(2)}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Mode of Transfer:{" "}
              <Text as="span" color="gray.500">
                {modeOfTransfer}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Control Number:{" "}
              <Text as="span" color="gray.500">
                {controlNumber}
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
                await cashDonationDelete(id);
                setEntries(entries.filter((item) => item.id !== id));
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
      </Box> */}

      <Box p="0px" bg={bgColor} my="5px" borderRadius="12px">
        <Flex direction="column" justify={"center"} maxWidth="100%">
          <TableContainer maxH="50vh" overflowY="auto">
            <Table
              color={textColor}
              variant="striped"
              colorScheme="blue"
              border="1">
              <Tbody>
                <Tr>
                  <Td
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    <Text color={textColor} cursor="pointer" p="12px">
                      {givenBy}
                    </Text>
                  </Td>

                  <Td
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    <Text color={textColor} cursor="pointer" p="12px">
                      {donor}
                    </Text>
                  </Td>

                  <Td
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    <Text color={textColor} cursor="pointer" p="12px">
                      {date}
                    </Text>
                  </Td>
                  <Td
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    <Text color={textColor} cursor="pointer" p="12px">
                      {modeOfTransfer}
                    </Text>
                  </Td>
                  <Td
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    <Text color={textColor} cursor="pointer" p="12px">
                      {controlNumber}
                    </Text>
                  </Td>
                  <Td
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    <Button
                      p="0px"
                      bg="transparent"
                      mb={{ sm: "10px", md: "0px" }}
                      me={{ md: "12px" }}
                      onClick={() => handleDelete(id, itemID)}
                      style={{
                        maxWidth: "90px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      <Flex
                        color="red.500"
                        cursor="pointer"
                        align="center"
                        p="12px">
                        <Icon as={FaTrashAlt} me="4px" />
                        <Text fontSize="sm" fontWeight="semibold">
                          DELETE
                        </Text>
                      </Flex>
                    </Button>
                  </Td>
                  <Td
                    style={{
                      maxWidth: "90px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    <Button
                      p="0px"
                      bg="transparent"
                      style={{
                        maxWidth: "90px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      <Flex color={textColor} cursor="pointer" p="12px">
                        <Icon as={FaPencilAlt} me="4px" />
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          onClick={onOpen}>
                          EDIT
                        </Text>
                      </Flex>
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>

      <UpdateModal
        {...{
          entries,
          setEntries,
          id,
          controlNumber,
          givenBy,
          donor,
          amount,
          modeOfTransfer,
          date,
          isOpen,
          onClose,
          initialRef,
          finalRef,
        }}
      />
    </>
  );
}

export default CashdonationRow;
