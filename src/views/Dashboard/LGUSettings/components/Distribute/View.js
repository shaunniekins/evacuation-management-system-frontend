// Chakra imports

import {
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import React from "react";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

import { useDisclosure } from "@chakra-ui/react";
import AddModal from "./AddModal";
import DistributeRow from "./DistributeRow";
import { StockinList } from "api/stockinAPI";
import { ItemList } from "api/itemAPI";
import { evacDistributeList } from "api/distributedEvacuees";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

import { EvacueeList } from "api/evacueeAPI";

import ReactToPrint from "react-to-print";
import PrintableDistribution from "./PrintableDistribution";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

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
  let { userBarangay } = useContext(AuthContext);

  const passValUserBarangay = userBarangay;
  // console.log("passValUserBarangay", passValUserBarangay);

  const residentEntry = EvacueeList();

  // const entries = StockinList();

  // const entries = evacDistributeList().filter(
  //   (entry) =>
  //     entry.calamity.toLowerCase().includes(query.toLowerCase()) ||
  //     entry.evacuee.toLowerCase().includes(query.toLowerCase())
  // );
  const [showPrintDialog, setShowPrintDialog] = useState(false);

  const entries = evacDistributeList().filter((entry) => {
    const matchingEntry = residentEntry.find(
      (disEntry) => disEntry.id === parseInt(entry.evacuee)
    );

    if (matchingEntry) {
      return (
        (matchingEntry.barangay === userBarangay &&
          (entry.evacuee
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase()) ||
            matchingEntry.first_name
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            matchingEntry.last_name
              .toLowerCase()
              .includes(query.toLowerCase()))) ||
        entry.calamity.toLowerCase().includes(query.toLowerCase())
      );
    }

    return (
      entry.evacuation &&
      entry.evacuation.toString().toLowerCase().includes(query.toLowerCase())
    );
  });

  const addEntries = ItemList();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [showPrintableReports, setShowPrintableReports] = useState(false);

  const inputRef = useRef(null);

  const componentRef = useRef();

  // console.log("userBarangay", userBarangay);

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
              Distribute to Evacuees
            </Text>
            <Flex gap={2}>
              {!showPrintableReports ? (
                <Button
                  bg={bgButton}
                  color="white"
                  fontSize="xs"
                  variant="no-hover"
                  onClick={onOpen}>
                  ADD NEW
                </Button>
              ) : (
                <p></p>
              )}

              <Button
                bg={bgButton}
                color="white"
                fontSize="xs"
                variant="no-hover"
                onClick={() => setShowPrintableReports(!showPrintableReports)}>
                {showPrintableReports
                  ? "SHOW DEFAULT DISPLAY"
                  : "SHOW PRINT DISPLAY"}
              </Button>
            </Flex>
          </Flex>
        </CardHeader>
        {!showPrintableReports ? (
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
                {entries.map((row, index) => {
                  return (
                    <DistributeRow
                      key={index}
                      id={row.id}
                      repackedItem={row.repackedItem}
                      calamity={row.calamity}
                      calamityDate={row.calamityDate}
                      dateDistributed={row.dateDistributed}
                      evacuee={row.evacuee}
                      headFamily={row.headFamily}
                      is_distributed={row.is_distributed}
                    />
                  );
                })}
              </Flex>
            </Flex>
          </CardBody>
        ) : (
          <>
            <ReactToPrint
              trigger={(triggerProps) => (
                <Button
                  {...triggerProps}
                  ml="auto"
                  w={"5rem"}
                  bg={"blue.400"}
                  color="white"
                  fontSize="xs"
                  variant="no-hover">
                  Print
                </Button>
              )}
              content={() => componentRef.current}
            />
            <PrintableDistribution ref={componentRef} />
          </>
        )}
     
      </Card>
      <AddModal
        userBarangay={userBarangay}
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
        finalRef={finalRef}
      />
    </>
  );
};

export default View;
