// Chakra imports
import {
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import { useDisclosure } from "@chakra-ui/react";
import AddModal from "./AddModal";
// import ItemRow from "./ItemRow";
import { ItemList } from "api/itemAPI";
import UpdateModal from "./UpdateModal";
import { ItemDelete } from "api/itemAPI";

const View = () => {
  const iconTeal = useColorModeValue("blue.300", "blue.300");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const [query, setQuery] = useState("");

  const [entries, setEntries] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    onOpenUpdateModal();
  };

  useEffect(() => {
    const fetchItems = async () => {
      let data = await ItemList();

      const filteredEntries = data.filter(
        (entry) =>
          entry.name.toLowerCase().includes(query.toLowerCase()) ||
          entry.unit.toLowerCase().includes(query.toLowerCase())
      );
      setEntries(filteredEntries);
      // console.log("filteredEntries: ", filteredEntries);
    };

    fetchItems();
  }, [query]);

  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdateModal,
    onOpen: onOpenUpdateModal,
    onClose: onCloseUpdateModal,
  } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Card p="16px" align={"start"}>
        <CardHeader>
          <Flex
            justify="space-between"
            align="center"
            minHeight="60px"
            w="100%">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Items
            </Text>
            <Button
              bg={bgButton}
              color="white"
              fontSize="xs"
              variant="no-hover"
              onClick={onOpenAddModal}>
              ADD NEW
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex direction={"column"} width={"100%"}>
            <Flex
              direction={{ sm: "column", md: "row" }}
              align="center"
              w="100%"
              justify="center"
              py="1rem">
              <Flex
                px="1rem"
                py="0.75rem"
                bg="transparent"
                borderRadius="15px"
                w="100%"
                border="1px solid"
                borderColor={borderColor}
                align="center">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: "md",
                    fontWeight: "semibold",
                    color: "gray.400",
                    background: "transparent",
                  }}
                />
                <Spacer />
                <Button
                  p="0px"
                  bg="transparent"
                  w="16px"
                  h="16px"
                  variant="no-hover">
                  <Icon as={FaPencilAlt} />
                </Button>
              </Flex>
            </Flex>
            <Flex direction="column" w="100%">
              <TableContainer
                maxH="50vh"
                overflowY="auto"
                align={"center"}
                rounded="15px"
                border={"1px solid"}
                borderColor={borderColor}>
                <Table
                  color={textColor}
                  variant="striped"
                  colorScheme="blue"
                  border="1">
                  <Thead>
                    <Th
                      style={{
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}>
                      <Text>ITEM</Text>
                    </Th>
                    <Th
                      style={{
                        maxWidth: "50px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}>
                      <Text>UNIT</Text>
                    </Th>
                    <Th
                      style={{
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}>
                      <Text align={"center"}>ACTION</Text>
                    </Th>
                  </Thead>
                  <Tbody>
                    {entries.map((row, index) => {
                      return (
                        <Tr key={index}>
                          <Td style={{ textAlign: "center" }}>{row.name}</Td>
                          <Td style={{ textAlign: "center", maxWidth: "50px" }}>
                            {row.unit}
                          </Td>
                          <Td
                            alignItems={"center"}
                            style={{
                              maxWidth: "10px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              textAlign: "center",
                            }}>
                            <Button
                              p="0px"
                              bg="transparent"
                              mb={{ sm: "10px", md: "0px" }}
                              me={{ md: "12px" }}
                              onClick={async () => {
                                if (window.confirm("Are you sure?")) {
                                  await ItemDelete(row.id);
                                  setEntries((prevEntries) =>
                                    prevEntries.filter(
                                      (item) => item.id !== row.id
                                    )
                                  );
                                }
                              }}
                              style={{
                                maxWidth: "100px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}>
                              <Flex color="red.500" cursor="pointer" p="12px">
                                <Icon as={FaTrashAlt} me="4px" />
                                <Text fontSize="sm" fontWeight="semibold">
                                  DELETE
                                </Text>
                              </Flex>
                            </Button>

                            <Button
                              p="0px"
                              bg="transparent"
                              style={{
                                maxWidth: "100px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              onClick={() => handleEditClick(row)}>
                              <Flex color={textColor} cursor="pointer" p="12px">
                                <Icon as={FaPencilAlt} me="4px" />
                                <Text fontSize="sm" fontWeight="semibold">
                                  EDIT
                                </Text>
                              </Flex>
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>

              {/* {entries.map((row, index) => {
                return (
                  <ItemRow
                    entries={entries}
                    setEntries={setEntries}
                    key={index}
                    id={row.id}
                    name={row.name}
                    unit={row.unit}
                  />
                );
              })} */}
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      <AddModal
        {...{
          entries,
          setEntries,
          isOpen: isOpenAddModal,
          onClose: onCloseAddModal,
          initialRef,
          finalRef,
        }}
      />

      <UpdateModal
        {...{
          entries,
          setEntries,
          isOpen: isOpenUpdateModal,
          onClose: onCloseUpdateModal,
          initialRef,
          finalRef,
          selectedRow,
        }}
      />
    </>
  );
};

export default View;
