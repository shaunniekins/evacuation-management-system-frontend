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
import React from "react";
import { useState } from "react";
import { FaPencilAlt,FaPrint } from "react-icons/fa";

import { useDisclosure } from "@chakra-ui/react";
import AddModal from "./AddModal";
import DistributeBarangayRow from "./DistributeBarangayRow";
// import { StockinList } from "api/stockinAPI";
import { RepackedList } from "api/repackedAPI";
import { ItemList } from "api/itemAPI";
import { InventoryList } from "api/inventoryAPI";
import { BarangayInventoryList } from "api/inventoryPerBarangayAPI";
import { DistributeBarangayInventoryList } from "api/distributeBarangayAPI";

const View = () => {
  const iconTeal = useColorModeValue("blue.300", "blue.300");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const [query, setQuery] = useState("");
  const entries = DistributeBarangayInventoryList().filter(
    (entry) =>
      (entry.item &&
        entry.item.toString().toLowerCase().includes(query.toLowerCase())) ||
      (entry.unit &&
        entry.unit.toString().toLowerCase().includes(query.toLowerCase()))
  );

  const addEntries = ItemList();
  const inventoryEntries = InventoryList();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const handlePrint = () => {
  const printSection = document.getElementById("print-brgydis");
  if (printSection) {
    const originalContents = document.body.innerHTML;
    const printContents = printSection.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    setTimeout(() => {
      window.location.reload();
    }, 100); 
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
              {/* Barangay Distribution */}
      </Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
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
                  placeholder="Filter"
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
<div id="print-brgydis">
               <TableContainer maxH="50vh" overflowY="auto">
              <Table color={textColor} variant="striped" colorScheme="blue" border="1">
                <Thead>
       <Tr >  <Td colspan="8"><Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>Barangay Distribution</Text></Td></Tr>
                  <Th style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <Text  color={textColor} cursor="pointer" p="12px" align={"center"}>
                        ITEM
                  </Text>
                    </Th>
                    <Th style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Text  color={textColor} cursor="pointer" p="12px"  align={"center"}>
                        BARANGAY
                    </Text>
                  </Th>
                    <Th style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Text  color={textColor} cursor="pointer" p="12px"  align={"center"}>
                        Date Received
                    </Text>
                  </Th>
                   <Th style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Text  color={textColor} cursor="pointer" p="12px"  align={"center"}>
                        OPTION
                    </Text>
                    </Th>
                </Thead>
                <Tbody>
                 
                </Tbody>
                </Table>

              </TableContainer>
              {entries.map((row, index) => {
                return (
                  <DistributeBarangayRow
                    key={index}
                    id={row.id}
                    item={row.item}
                    unit={row.unit}
                    qty={row.qty}
                    barangay={row.barangay}
                    date={row.date}
                  />
                );
              })}
                </div>
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
    </>
  );
};
export default View;
