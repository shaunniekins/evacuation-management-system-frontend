// Chakra imports
import {
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
import DistributeBarangayRow from "./DistributeBarangayRow";
// import { StockinList } from "api/stockinAPI";
import { RepackedList } from "api/repackedAPI";
import { ItemList } from "api/itemAPI";
import { InventoryList } from "api/inventoryAPI";
import { BarangayInventoryList } from "api/inventoryPerBarangayAPI";
import { DistributeBarangayInventoryList } from "api/distributeBarangayAPI";
import { BarangayInventoryUpdate } from "api/inventoryPerBarangayAPI";
import { DistributeBarangayInventoryDelete } from "api/distributeBarangayAPI";
import { InventoryUpdate } from "api/inventoryAPI";
import { BarangayList } from "api/barangayAPI";

const View = () => {
  const iconTeal = useColorModeValue("blue.300", "blue.300");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  // console.log("stockin: ", StockinList());
  const [query, setQuery] = useState("");

  // const entries = StockinList();

  // const entries = BarangayInventoryList().filter(
  //   (entry) =>
  //     entry.item.toLowerCase().includes(query.toLowerCase()) ||
  //     // entry.barangay.toLowerCase().includes(query.toLowerCase())
  //     entry.unit.toLowerCase().includes(query.toLowerCase())
  // );

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let data = await DistributeBarangayInventoryList();

      const filteredEntries = data.filter(
        (entry) =>
          (entry.item &&
            entry.item
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase())) ||
          (entry.unit &&
            entry.unit.toString().toLowerCase().includes(query.toLowerCase()))
      );
      setEntries(filteredEntries);
    };

    fetchItems();
  }, [query]);

  // const addEntries = ItemList();
  // const [addEntries, setAddEntries] = useState([]);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     let data = await ItemList();
  //     setAddEntries(data);
  //   };

  //   fetchItems();
  // }, []);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await ItemList();
      setItems(fetchedItems);
    };

    fetchItems();
  }, []);

  const [barangayList, setBarangayList] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      let data = await BarangayList();
      setBarangayList(data);
    };

    fetchItems();
  }, []);

  const inventoryEntries = InventoryList();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const columns = ["ITEM", "QUANTITY", "BARANGAY", "DATE RECEIVED", "ACTION"];

  const [barangayInventoryList, setBarangayInventoryList] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let data = await BarangayInventoryList();
      setBarangayInventoryList(data);
    };

    fetchItems();
  }, []);

  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let data = await InventoryList();
      setInventoryList(data);
    };

    fetchItems();
  }, []);

  const handleDelete = async (id, item, qty, barangay, unit) => {
    const itemIDValueSubmit = parseInt(item);
    const preQty = qty;

    try {
      await Promise.all(
        inventoryList.map(async (entry) => {
          if (parseInt(entry.item) === parseInt(item)) {
            // console.log("entry.id", entry.id);
            let computedQty = parseFloat(entry.qty) + parseFloat(preQty);

            await InventoryUpdate(
              parseInt(entry.id),
              itemIDValueSubmit,
              computedQty
            );
          }
        })
      );
    } catch (error) {
      alert("Failed");
      console.log("error", error);
    }

    try {
      barangayInventoryList.forEach((entry) => {
        let computedQty = entry.qty - preQty;

        if (entry.item === item) {
          BarangayInventoryUpdate(entry.id, item, unit, computedQty, barangay);
        }
      });
    } catch (error) {
      alert("Failed");
    }

    try {
      await DistributeBarangayInventoryDelete(id);
      setEntries((prevEntries) => prevEntries.filter((item) => item.id !== id));
    } catch (error) {
      alert("Failed");
    }
  };

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
              Barangay Distribution
            </Text>
            <Button
              bg={bgButton}
              color="white"
              fontSize="xs"
              variant="no-hover"
              onClick={onOpen}>
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
              <TableContainer maxH="50vh" overflowY="auto">
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
                    {entries.reverse().map((row, index) => {
                      return (
                        <Tr key={index}>
                          <Td style={{ textAlign: "center" }}>
                            {items.find((item) => item.id === row.item)?.name ||
                              row.item}
                          </Td>
                          <Td style={{ textAlign: "center" }}>{row.qty}</Td>
                          <Td style={{ textAlign: "center" }}>
                            {barangayList.find(
                              (barangay) => barangay.id === row.barangay
                            )?.name || row.barangay}
                          </Td>
                          <Td style={{ textAlign: "center" }}>{row.date}</Td>
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
                              onClick={() => {
                                if (window.confirm("Are you sure?")) {
                                  handleDelete(
                                    row.id,
                                    row.item,
                                    row.qty,
                                    row.barangay,
                                    row.unit
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
                                {/* <Text fontSize="sm" fontWeight="semibold">
                                    DELETE
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

              {/* {entries.map((row, index) => {
                // console.log(row.unit);
                return (
                  <DistributeBarangayRow
                    key={index}
                    // entries={entries}
                    id={row.id}
                    item={row.item}
                    unit={row.unit}
                    qty={row.qty}
                    barangay={row.barangay}
                    date={row.date}

                    // givenBy={row.givenBy}
                    // donor={row.donor}
                    // dateReceived={row.dateReceived}
                    // itemID={row.item}
                    // unit={row.unit}
                  />
                );
              })} */}
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      {/* {addEntries.map((row, index) => ( */}
      <AddModal
        {...{
          entries,
          setEntries,
          isOpen,
          onClose,
          initialRef,
          finalRef,
        }}
      />
    </>
  );
};

export default View;
