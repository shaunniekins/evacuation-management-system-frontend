// Chakra imports
import {
  Button,
  Flex,
  Icon,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
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
// import RepackedRow from "./RepackedRow";
// import { StockinList } from "api/stockinAPI";
import { RepackedList } from "api/repackedAPI";
import { ItemList } from "api/itemAPI";
import { InventoryList } from "api/inventoryAPI";

import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { RepackedDelete } from "api/repackedAPI";
import { BarangayInventoryUpdate } from "api/inventoryPerBarangayAPI";
import { BarangayList } from "api/barangayAPI";
import { BarangayInventoryList } from "api/inventoryPerBarangayAPI";

const View = () => {
  let { userBarangay } = useContext(AuthContext);

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

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let data = await RepackedList();

      const filteredEntries = data.filter(
        (entry) =>
          entry.barangay === userBarangay &&
          (entry.items.toLowerCase().includes(query.toLowerCase()) ||
            entry.reason.toLowerCase().includes(query.toLowerCase()))
      );

      setEntries(filteredEntries);
    };

    fetchItems();
  }, [userBarangay, query]);

  // const addEntries = ItemList();
  // const inventoryEntries = InventoryList();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  let countItem = 1;

  const columns = [
    // "Repacked #",
    "ITEMS",
    "DELIVERABLES",
    "REASON",
    "ACTION",
  ];

  const [entry1, setEntry1] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let data = await ItemList();
      setEntry1(data);
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

  const [barangayInventoryList, setBarangayInventoryList] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      let data = await BarangayInventoryList();
      setBarangayInventoryList(data);
    };

    fetchItems();
  }, []);

  const handleDelete = async (
    items,
    qty,
    units,
    barangay,
    instance,
    row,
    id
  ) => {
    const itemsArr = items.split(","); // convert to array
    const qtyArr = qty.split(","); // convert to array
    const unitsArr = units.split(",");

    // console.log("itemsArr: ", itemsArr);
    // console.log("qtyArr: ", qtyArr);

    // const results = [];

    for (let i = 0; i < itemsArr.length; i++) {
      const item = parseInt(itemsArr[i].trim());

      const matchingBarangayName = barangayList.find(
        (barangayItem) => barangayItem.name === barangay
      );

      const matchingInventoryItem = barangayInventoryList.find(
        (inventoryItem) => inventoryItem.item === item
      );

      const id = matchingInventoryItem.id;
      const qtyEach = qtyArr[i].trim();
      const qty =
        parseFloat(matchingInventoryItem.qty) +
        parseFloat(qtyEach) * parseFloat(instance);

      const unit = unitsArr[i].trim();
      const barangaySub = matchingBarangayName ? matchingBarangayName.id : "";
      // console.log("barangaySub: ", barangaySub);

      let itemExists = matchingInventoryItem !== undefined;

      if (itemExists) {
        await BarangayInventoryUpdate(id, item, unit, qty, barangaySub);
      }
    }

    try {
      await RepackedDelete(id);
      // onClose();
      // history.push("/admin/dashboard");
      setEntries((prevEntries) =>
        prevEntries.filter((item) => item.id !== row.id)
      );
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
              Repacked
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
                    {entries.reverse().map((row, index) => {
                      return (
                        <Tr key={index}>
                          {/* <Td style={{ textAlign: "center" }}>{countItem}</Td> */}
                          <Td>
                            <Text color={textColor} cursor="pointer" p="12px">
                              {row.items.split(", ").map((item, index) => {
                                const suffix =
                                  index === row.items.split(", ").length - 1
                                    ? ""
                                    : "; ";
                                const selectedItem = entry1.find(
                                  (itemList) => itemList.id === parseInt(item)
                                );
                                const itemName = selectedItem
                                  ? selectedItem.name
                                  : "Item not found";
                                return `${itemName} (${
                                  row.qty.split(", ")[index]
                                }${row.units.split(", ")[index]})${suffix}`;
                              })}
                            </Text>
                          </Td>
                          <Td style={{ textAlign: "center" }}>
                            {row.instance}
                          </Td>
                          <Td style={{ textAlign: "center" }}>{row.reason}</Td>
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
                                  handleDelete(
                                    row.items,
                                    row.qty,
                                    row.units,
                                    row.barangay,
                                    row.instance,
                                    row,
                                    row.id
                                  );
                                }
                              }}
                              style={{
                                maxWidth: "100px",
                                overflow: "hidden",
                                // textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}>
                              <Flex color="red.500" cursor="pointer" p="12px">
                                <Icon as={FaTrashAlt} me="4px" />
                                <Text fontSize="sm" fontWeight="semibold">
                                  DELETE
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
              {/* {entries.reverse().map((row, index) => {
                return (
                  <RepackedRow
                    key={index}
                    // entries={entries}
                    id={row.id}
                    items={row.items}
                    units={row.units}
                    qty={row.qty}
                    instance={row.instance}
                    reason={row.reason}
                    barangay={row.barangay}
                    countItem={countItem++}
                  />
                );
              })} */}
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      <AddModal
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
        finalRef={finalRef}
      />
      {/* ))} */}
    </>
  );
};

export default View;
