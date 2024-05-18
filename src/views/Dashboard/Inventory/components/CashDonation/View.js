// Chakra imports
import {
  Box,
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
import React from "react";
import { FaPencilAlt,FaPrint } from "react-icons/fa";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import AddModal from "./AddModal";
import CashdonationRow from "./CashdonationRow";
import { cashDonationList } from "api/cashDonationAPI";

const View = () => {
  const iconTeal = useColorModeValue("blue.300", "blue.300");
   const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const [query, setQuery] = useState("");

  const entries = cashDonationList().filter(
    (entry) =>

      entry.controlNumber.toLowerCase().includes(query.toLowerCase()) ||
      entry.givenBy.toLowerCase().includes(query.toLowerCase()) ||
      entry.donor.toLowerCase().includes(query.toLowerCase()) ||
       entry.date.toLowerCase().includes(query.toLowerCase()) ||
      entry.modeOfTransfer.toLowerCase().includes(query.toLowerCase())
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const handlePrint = () => {
  const printSection = document.getElementById("print-donation");
  if (printSection) {
    const originalContents = document.body.innerHTML;
    const printContents = printSection.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    setTimeout(() => {
      window.location.reload();
    }, 100); // Delay the reload to allow the buttons to be clickable after closing the print dialog
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
              {/* Cash Donation */}
           </Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
            <Button
              bg={bgButton}
              color="white"
              fontSize="xs"
              variant="no-hover"
              onClick={onOpen}>
              ADD NEW
            </Button>
    
          
             {/* <Button
              bg={bgButton}
              color="white"
              fontSize="xs"
              variant="no-hover"
              onClick={handlePrint}>
              <Icon as={FaPrint} me="2" />
              PRINT
            </Button> */}
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
            <div id="print-donation">
            <Flex direction="column" w="100%">
<Box p="0px" bg={bgColor} my="5px" borderRadius="12px">
        <Flex direction="column" justify={"center"} maxWidth="100%">
                      <TableContainer maxH="50vh" overflowY="auto">

              <Table color={textColor} variant="striped" colorScheme="blue" border="1"  direction="column" justify={"center"} maxWidth="100%">
                <Thead>
                    <Tr >  <Td colspan="8"><Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>Cash Donation</Text></Td></Tr>
          <Tr>
            <Th width="20%" p="12px" textAlign="center">
              From
            </Th>
            <Th width="20%" p="12px" textAlign="center">
              Donor
            </Th>
            <Th width="15%" p="12px" textAlign="center">
              Date Received
            </Th>
            <Th width="20%" p="12px" textAlign="center">
              Mode of Transfer
            </Th>
            <Th width="10%" p="12px" textAlign="center">
              Amount
            </Th>
            <Th width="15%" p="12px" textAlign="center">
              Action
            </Th>
          </Tr>
        </Thead>
                <Tbody>
                 
                </Tbody>
                </Table>

              </TableContainer>
       </Flex>
      </Box>
            {entries.reverse().map((row, index)=> {
                // console.log(row.date);
                return (
                  <CashdonationRow
                    key={index}
                    id={row.id}
                    controlNumber={row.controlNumber}
                    givenBy={row.givenBy}
                    donor={row.donor}
                    amount={row.amount}
                    modeOfTransfer={row.modeOfTransfer}
                    date={row.date}
                  />
                );
              })}
              </Flex>
              </div>
          </Flex>
        </CardBody>
      </Card>

      <AddModal {...{ isOpen, onClose, initialRef, finalRef }} />
    </>
  );
};

export default View;
