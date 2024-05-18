import { useState } from "react";
import { Select } from "@chakra-ui/react";
// Chakra imports
import {
  Button,
  Flex,
  Grid,
  Input,
  Box,
  FormControl,
  FormLabel,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  // Select,
  ModalBody,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import React from "react";
// import EvacueeList from "./EvacueeList/View";
import TableList from "./TableList";
import SeniorTableList from "./SeniorTableList";
import PWDTableList from "./PWDTableList";
import IPTableList from "./IPTableList";
import ReactToPrint from "react-to-print";
import PrintableReports from "./PrintableReports";
import { useReactToPrint } from "react-to-print";

import {
  GenderReport,
  BarangayReport,
  PWDReport,
  AgeReport,
  IPReport,
  SeniorReport
} from "./Report";
import { useRef } from "react";

// import jsPDF from "jspdf";

const Report = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // console.log("startDate1: ", startDate);
  // console.log("endDate: ", endDate);

  const handleFilter = () => {
    // your filtering logic here, using startDate and endDate
  };

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  const reportOptions = [
    { name: "Age Report", value: "age" },
    { name: "Barangay Report", value: "barangay" },
    { name: "Gender Report", value: "gender" },
    { name: "PWD Report", value: "pwd" },
    { name: "IP Report", value: "ip" },
    { name: "Senior Report", value: "is_senior" },
    { name: "Evacuee List", value: "table" },
    { name: "Senior List", value: "senior" },
    { name: "PWD List", value: "PWDList" },
     { name: "Indigenous Peoples", value: "INPList" },
  ];

  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [selectedReports, setSelectedReports] = useState(
    reportOptions.map((option) => option.value)
  );

  const [selectedReport, setSelectedReport] = useState("evacuees");
  const [showPrintableReports, setShowPrintableReports] = useState(false);
  const [showPrintButton, setShowPrintButton] = useState(true);

  const handleSelectChange = (event) => {
    setSelectedReport(event.target.value);
  };

  const renderReport = () => {
    switch (selectedReport) {
      case "evacuees":
        return <TableList startDate={startDate} endDate={endDate} />;
      case "senior":
        return <SeniorTableList startDate={startDate} endDate={endDate} />;
      case "PWDList":
        return <PWDTableList startDate={startDate} endDate={endDate} />;
      case "INPList":
        return <IPTableList startDate={startDate} endDate={endDate} />;
      case "gender":
        return <GenderReport startDate={startDate} endDate={endDate} />;
      case "barangay":
        return <BarangayReport startDate={startDate} endDate={endDate} />;
      case "pwd":
        return <PWDReport startDate={startDate} endDate={endDate} />;
      case "age":
        return <AgeReport startDate={startDate} endDate={endDate} />;
      case "ip":
        return <IPReport startDate={startDate} endDate={endDate} />;
      case "is_senior":
        return <SeniorReport startDate={startDate} endDate={endDate} />;
      default:
        return <GenderReport startDate={startDate} endDate={endDate} />;
    }
  };

  // onClick={handlePrintDialogOpen}

  const handlePrintDialogClose = () => {
    setShowPrintDialog(false);
  };

  const handlePrintDialogOpen = () => {
    setShowPrintDialog(true);
    setShowPrintButton(false);
  };

  const handleReportsSelection = (selectedOptions) => {
    setSelectedReports(selectedOptions);
  };

  const componentRef = useRef();

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
              Reports
            </Text>
            <Flex direction={"column"} gap={"1rem"} align={"flex-end"}>
              <Flex align={"center"}>
                <Button
                  mb={"1rem"}
                  bg={bgButton}
                  color="white"
                  fontSize="xs"
                  variant="no-hover"
                  onClick={() =>
                    setShowPrintableReports(!showPrintableReports)
                  }>
                  {showPrintableReports
                    ? "SHOW REPORT DISPLAY"
                    : "SHOW PRINT DISPLAY"}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </CardHeader>

        {!showPrintableReports ? (
          <CardBody>
            <Flex direction={"column"} w={"100%"}>
              <Select
                value={selectedReport}
                onChange={handleSelectChange}
                //   px="1rem"
                py="0.75rem"
                //   mb={4}
                border="1px solid"
                borderRadius="15px"
                borderColor={borderColor}
                bg="transparent"
                h={12}>
                <option value="evacuees">Evacuee List Report</option>
                <option value="senior">Senior List Report</option>
                <option value="PWDList">PWD List Report</option>
                <option value="INPList">Indigenous Peoples</option>
                <option value="gender">Gender Report</option>
                <option value="barangay">Barangay Report</option>
                <option value="pwd">PWD Report</option>
                <option value="ip">IP Report</option>
                <option value="is_senior">Senior Cetizen</option>
                <option value="age">Age Report</option>
              </Select>
              <Flex justify={"flex-end"}>
                <Flex align="flex-end" justify={"flex-end"}>
                  <FormControl>
                    <FormLabel w={"30%"} fontSize={"12px"}>
                      From
                    </FormLabel>
                    <Input
                      w={"100%"}
                      fontSize={"12px"}
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel w={"30%"} fontSize={"12px"}>
                      To
                    </FormLabel>
                    <Input
                      w={"100%"}
                      fontSize={"12px"}
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </FormControl>
                  {/* <Flex>
                    <Button
                      bg={bgButton}
                      color="white"
                      fontSize="xs"
                      variant="no-hover"
                      onClick={handleFilter}>
                      Filter
                    </Button>
                  </Flex> */}
                </Flex>
              </Flex>
              <Flex direction={"column"} width={"100%"}>
                {renderReport()}
              </Flex>
            </Flex>
          </CardBody>
        ) : (
          <>
            <Flex direction={"row"} justify={"flex-end"} gap={"0.5rem"}>
              {showPrintButton ? (
                <ReactToPrint
                  trigger={(triggerProps) => (
                    <Button
                      bg={"blue.400"}
                      color="white"
                      fontSize="xs"
                      variant="no-hover">
                      Print
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              ) : (
                ""
              )}
              <Button
                bg={"blue.400"}
                color="white"
                fontSize="xs"
                variant="no-hover"
                onClick={handlePrintDialogOpen}>
                Filter Print
              </Button>
            </Flex>

            <Modal
              isCentered
              w={"1rem"}
              isOpen={showPrintDialog}
              onClose={handlePrintDialogClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Select reports to print</ModalHeader>
                <ModalBody>
                  <CheckboxGroup onChange={handleReportsSelection}>
                    <Flex direction="column">
                      <Grid
                        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                        gridGap="1rem"
                        my="1rem">
                        {reportOptions.map((option) => (
                          <Checkbox key={option.value} value={option.value}>
                            {option.name}
                          </Checkbox>
                        ))}
                      </Grid>
                    </Flex>
                  </CheckboxGroup>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={handlePrintDialogClose}>Cancel</Button>
                  <ReactToPrint
                    trigger={(triggerProps) => (
                      <Button {...triggerProps} ml={3}>
                        Print
                      </Button>
                    )}
                    content={() => componentRef.current}
                  />
                </ModalFooter>
              </ModalContent>
            </Modal>
            <PrintableReports
              startDate={startDate}
              endDate={endDate}
              ref={componentRef}
              selectedReports={selectedReports}
            />
          </>
        )}
      </Card>
    </>
  );
};

export default Report;
