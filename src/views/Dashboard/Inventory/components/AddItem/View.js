import {
  Button,Flex,Icon,Spacer,Text,Table,Thead,Tbody,Td,Tr,Th,TableContainer,useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import React from "react";
import { useState } from "react";
import { FaPencilAlt,FaPrint  } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import AddModal from "./AddModal";
import ItemRow from "./ItemRow";
import { ItemList } from "api/itemAPI";
const View = () => {
  const iconTeal = useColorModeValue("blue.300", "blue.300");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const [query, setQuery] = useState("");
  const entries = ItemList().filter(
    (entry) =>
      entry.name.toLowerCase().includes(query.toLowerCase()) ||
      entry.unit.toLowerCase().includes(query.toLowerCase())
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const handlePrint = () => {
  const printSection = document.getElementById("print-item");
  if (printSection) {
    const originalContents = document.body.innerHTML;
    const printContents = printSection.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    setTimeout(() => {
      window.location.reload();
    }, 100);  }};

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
                    background: "transparent", }}/>
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
              <div id="print-item">
            <Flex direction="column" w="100%">
              <TableContainer maxH="50vh" overflowY="auto" align={"center"}>
                <Table color={textColor} variant="striped" colorScheme="blue" border="1" >
                    <Thead>
                       <Tr >  <Td colspan="8"><Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>Items</Text></Td></Tr>
        <Tr>
          <Th style={{ width: '30%' }}>
            <Text fontSize="sm" fontWeight="semibold">
              Name
            </Text>
          </Th>
          <Th style={{ width: '30%' }}>
            <Text fontSize="sm" fontWeight="semibold">
              Unit
            </Text>
          </Th>
          <Th style={{ width: '40%' }}>
            <Text fontSize="sm" fontWeight="semibold">
              Actions
            </Text>
          </Th>
        </Tr>
      </Thead><Tbody></Tbody></Table>
    </TableContainer>
              {entries.reverse().map((row, index) => (
                <ItemRow
                    key={index}
                    id={row.id}
                    name={row.name}
                  unit={row.unit}/>
                ))}
              </Flex>
                </div>
          </Flex>
        </CardBody>
      </Card>
      <AddModal {...{ isOpen, onClose, initialRef, finalRef }} /></>);};
export default View;
