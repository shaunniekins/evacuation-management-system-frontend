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
  const barangayEntry = BarangayList();
  const barangayInventoryList = BarangayInventoryList();

  React.useEffect(() => {
    // document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });

  const matchingItemEntry = itemEntry.find(
    (entry) => parseInt(entry.id) === parseInt(item)
  );

  const matchingBarangayEntry = barangayEntry.find(
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
    <>
      
      
      

         <Box p="0px" bg={bgColor} my="5px" borderRadius="12px">
        <Flex direction="column" justify={"center"} maxWidth="100%">
        <TableContainer maxH="50vh" overflowY="auto">
            <Table color={textColor} variant="striped" colorScheme="blue" border="1">
   
              <Tbody> 
                
              <Tr   >
                <Td style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <Text color={textColor} cursor="pointer" p="12px"  align={"center"}>
                 {`${matchingItemEntry ? matchingItemEntry.name : ""} - 
                ${qty} ${unit}`}
              </Text>
            </Td>
            <Td style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <Text  color={textColor} cursor="pointer" p="12px" align={"center"}>
                 {matchingBarangayEntry ? matchingBarangayEntry.name : ""}
              </Text>
                  </Td>
            <Td style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <Text  color={textColor} cursor="pointer" p="12px" align={"center"}>
                 {date}
              </Text>
                  </Td>

                   
                <Td  style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <Button
              p="0px"
              bg="transparent"
              mb={{ sm: "10px", md: "0px" }}
              me={{ md: "12px" }}
              onClick={() => handleDelete(id, item)} >
              <Flex color="red.500" cursor="pointer" align="center" p="12px" >
                <Icon as={FaTrashAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold"  align={"center"}>
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








    </>
  );
}

export default DistributeBarangayRow;
