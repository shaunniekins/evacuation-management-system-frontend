// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Spacer,
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
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import { useDisclosure } from "@chakra-ui/react";
import AddModal from "./AddModal";
// import StockinRow from "./StockinRow-archived";
import { StockinList } from "api/stockinAPI";
import { ItemList } from "api/itemAPI";
import UpdateModal from "./UpdateModal";
import { InventoryList } from "api/inventoryAPI";
import { StockinDelete } from "api/stockinAPI";
import { InventoryUpdate } from "api/inventoryAPI";

const View = () => {
  const iconTeal = useColorModeValue("blue.300", "blue.300");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  // console.log("stockin: ", StockinList());
  const [query, setQuery] = useState("");

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let data = await StockinList();

      const filteredEntries = data.filter(
        (entry) =>
          entry.givenBy.toLowerCase().includes(query.toLowerCase()) ||
          entry.item.toLowerCase().includes(query.toLowerCase())
      );
      setEntries(filteredEntries);
      // console.log("filteredEntries", filteredEntries);
    };

    fetchItems();
  }, [query]);

  const [addEntries, setAddEntries] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let data = await ItemList();
      setAddEntries(data);
    };

    fetchItems();
  }, []);

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

  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    onOpenUpdateModal();
  };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let data = await InventoryList();
      setInventoryList(data);
      // console.log("data", data);
    };

    fetchItems();
  }, []);

  const handleDelete = async (id, itemID, qty) => {
    // const itemIDValueSubmit = itemID;
    const preQty = qty;

    try {
      for (const entry of inventoryList) {
        // console.log("entry.id", entry.item);
        // console.log("itemID", itemID);

        if (parseInt(entry.item) === parseInt(itemID)) {
          let computedQty = parseFloat(entry.qty) - parseFloat(preQty);
          await InventoryUpdate(entry.id, itemID, computedQty);
        }
      }

      await StockinDelete(id);
      setEntries(entries.filter((item) => item.id !== id));
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await ItemList();
      setItems(fetchedItems);
    };

    fetchItems();
  }, []);

  const columns = [
    "ITEM",
    "from Organization",
    "DATE RECEIVED",
    "EXPIRATION DATE",
    "UNIT",
    "QUANTITY",
    "ACTION",
  ];

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
              Stock-In
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
              {/* <Box p="0px" my="5px" borderRadius="12px"> */}
              <Flex direction="column" w="100%">
                <TableContainer
                  maxH="50vh"
                  overflowY="auto"
                  overflowX="auto"
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
                      {columns.map((column) => (
                        <Th
                          key={column}
                          style={{
                            maxWidth: "100px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}>
                          <Text>{column}</Text>
                        </Th>
                      ))}
                    </Thead>
                    <Tbody>
                      {entries.map((row, index) => {
                        return (
                          <Tr key={index}>
                            <Td style={{ textAlign: "center" }}>
                              {items.find((item) => item.id === row.item)
                                ?.name || row.item}
                            </Td>
                            <Td style={{ textAlign: "center" }}>
                              {row.givenBy}
                              <span> {row.donor && `- ${row.donor}`}</span>
                            </Td>
                            <Td style={{ textAlign: "center" }}>
                              {row.dateReceived}
                            </Td>
                            <Td style={{ textAlign: "center" }}>
                              {row.expir_date}
                            </Td>
                            <Td style={{ textAlign: "center" }}>{row.unit}</Td>
                            <Td style={{ textAlign: "center" }}>{row.qty}</Td>
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
                                    handleDelete(row.id, row.item, row.qty);
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
                                  {/* <Text fontSize="sm" fontWeight="semibold">
                                      DELETE
                                    </Text> */}
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
                                <Flex
                                  color={textColor}
                                  cursor="pointer"
                                  p="12px">
                                  <Icon as={FaPencilAlt} me="4px" />
                                  {/* <Text fontSize="sm" fontWeight="semibold">
                                      EDIT
                                    </Text> */}
                                </Flex>
                              </Button>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
              {/* </Box> */}
              {/* {entries.reverse().map((row, index) => {
                // console.log(row.unit);
                return (
                  <StockinRow
                    entries={entries}
                    setEntries={setEntries}
                    key={index}
                    // addEntries={addEntries}
                    id={row.id}
                    givenBy={row.givenBy}
                    donor={row.donor}
                    dateReceived={row.dateReceived}
                    itemID={row.item}
                    unit={row.unit}
                    qty={row.qty}
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
          inventoryList,
          setInventoryList,
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
          inventoryList,
          setInventoryList,
          addEntries,
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
