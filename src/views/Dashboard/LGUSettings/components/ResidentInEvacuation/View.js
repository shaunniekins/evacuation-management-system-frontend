import {
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import AddModal from "./AddModal";
// import { CalamityList } from "api/calamityAPI";
import { resEvacList } from "api/residentInEvacuationAPI";
import ItemRow from "./ItemRow";
import { EvacueeList } from "api/evacueeAPI";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

const View = () => {
  const iconTeal = useColorModeValue("blue.300", "blue.300");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  const [query, setQuery] = useState("");
  const residentEntry = EvacueeList();

  let { userBarangay } = useContext(AuthContext);

  const entries = resEvacList().filter((entry) => {
    const matchingEntry = residentEntry.find(
      (resEntry) => resEntry.id === entry.resident
    );

    if (matchingEntry) {
      return (
        matchingEntry.barangay === userBarangay &&
        (entry.resident
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase()) ||
          matchingEntry.first_name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          matchingEntry.last_name.toLowerCase().includes(query.toLowerCase()))
      );
    }

    return (
      entry.evacuation &&
      entry.evacuation.toString().toLowerCase().includes(query.toLowerCase())
    );
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Card p="16px" mt="24px">
        <CardHeader>
          <Flex
            justify="space-between"
            align="center"
            minHeight="60px"
            w="100%">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Residents in Evacuation Center
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
                width="100%"
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
              {entries.map((row, index) => {
                // console.log(row.date);
                return (
                  <ItemRow
                    key={index}
                    id={row.id}
                    resident={row.resident}
                    evacuation={row.evacuation}
                    isHead={row.isHead}
                    date={row.date}
                  />
                );
              })}
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      <AddModal {...{ isOpen, onClose, initialRef, finalRef }} />
    </>
  );
};

export default View;
