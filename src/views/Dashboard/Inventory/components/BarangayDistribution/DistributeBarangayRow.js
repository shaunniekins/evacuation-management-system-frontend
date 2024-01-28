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
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { BarangayInventoryDelete } from "api/inventoryPerBarangayAPI";
import { useDisclosure } from "@chakra-ui/react";
import { DistributeBarangayInventoryDelete } from "api/distributeBarangayAPI";

import { useHistory } from "react-router-dom";

import { ItemList } from "api/itemAPI";
import { InventoryList, InventoryUpdate } from "api/inventoryAPI";
import { BarangayList } from "api/barangayAPI";
import {
  BarangayInventoryUpdate,
  BarangayInventoryList,
} from "api/inventoryPerBarangayAPI";

function DistributeBarangayRow(props) {
  const { id, item, unit, qty, barangay, date } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const itemEntry = ItemList();

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

  useEffect(() => {
    // document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });

  let matchingItemEntry;
  if (Array.isArray(itemEntry)) {
    matchingItemEntry = itemEntry.find(
      (entry) => parseInt(entry.id) === parseInt(item)
    );
  }

  const matchingbarangayList = barangayList.find(
    (entry) => parseInt(entry.id) === parseInt(barangay)
  );

  const inventoryList = InventoryList(id, item);

  const history = useHistory();

  const handleDelete = async () => {
    const itemIDValueSubmit = item;
    const preQty = qty;

    try {
      await Promise.all(
        inventoryList.map(async (entry) => {
          if (parseInt(entry.item) === parseInt(item)) {
            let computedQty = parseFloat(entry.qty) + parseFloat(preQty);
            const resultInventory = await InventoryUpdate(
              entry.id,
              itemIDValueSubmit,
              computedQty
            );
            // alert("Done");
          }
        })
      );
    } catch (error) {
      alert("Failed");
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
      onClose();
    } catch (error) {
      alert("Failed");
    }

    history.push("/admin/dashboard");
  };

  return (
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
                    maxWidth: "110px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                  <Text
                    color={textColor}
                    cursor="pointer"
                    p="12px"
                    align={"center"}>
                    {`${matchingItemEntry ? matchingItemEntry.name : ""} - 
            ${qty} ${unit}`}
                  </Text>
                </Td>
                <Td
                  style={{
                    maxWidth: "110px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                  <Text
                    color={textColor}
                    cursor="pointer"
                    p="12px"
                    align={"center"}>
                    {matchingbarangayList ? matchingbarangayList.name : ""}
                  </Text>
                </Td>
                <Td
                  style={{
                    maxWidth: "110px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                  <Text
                    color={textColor}
                    cursor="pointer"
                    p="12px"
                    align={"center"}>
                    {date}
                  </Text>
                </Td>

                <Td
                  style={{
                    maxWidth: "110px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                  <Button
                    p="0px"
                    bg="transparent"
                    mb={{ sm: "10px", md: "0px" }}
                    me={{ md: "12px" }}
                    onClick={() => handleDelete(id, item)}>
                    <Flex
                      color="red.500"
                      cursor="pointer"
                      align="center"
                      p="12px">
                      <Icon as={FaTrashAlt} me="4px" />
                      <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        align={"center"}>
                        DELETE
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

    // <>
    //   <Box px="24px" bg={bgColor} my="15px" borderRadius="12px">
    //     <Flex justify="space-between" w="100%">
    //       <Flex direction="column" justify={"center"} maxWidth="70%">
    //         {/* <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">

    //         </Text> */}
    //         <Text color="gray.400" fontSize="sm" fontWeight="semibold">
    //           Item:{" "}
    //           <Text as="span" color="gray.500">
    //             {`${matchingItemEntry ? matchingItemEntry.name : ""} -
    //             ${qty} ${unit}`}
    //           </Text>
    //         </Text>

    //         <Text color="gray.400" fontSize="sm" fontWeight="semibold">
    //           Barangay:{" "}
    //           <Text as="span" color="gray.500">
    //             {matchingbarangayList ? matchingbarangayList.name : ""}
    //           </Text>
    //         </Text>
    //         <Text color="gray.400" fontSize="sm" fontWeight="semibold">
    //           Date:{" "}
    //           <Text as="span" color="gray.500">
    //             {date}
    //           </Text>
    //         </Text>
    //       </Flex>
    //       <Flex
    //         direction={{ sm: "column", md: "row" }}
    //         align="center"
    //         p={{ md: "24px" }}>
    //         <Button
    //           p="0px"
    //           bg="transparent"
    //           mb={{ sm: "10px", md: "0px" }}
    //           me={{ md: "12px" }}
    //           onClick={() => handleDelete(id, item)}>
    //           <Flex color="red.500" cursor="pointer" align="center" p="12px">
    //             <Icon as={FaTrashAlt} me="4px" />
    //             <Text fontSize="sm" fontWeight="semibold">
    //               DELETE
    //             </Text>
    //           </Flex>
    //         </Button>
    //       </Flex>
    //     </Flex>
    //   </Box>
    // </>
  );
}

export default DistributeBarangayRow;
