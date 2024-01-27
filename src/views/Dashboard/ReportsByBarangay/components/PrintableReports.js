import React from "react";
import { Flex, Text } from "@chakra-ui/react";

import {
  GenderReport,
  BarangayReport,
  PWDReport,
  AgeReport,
  IPReport,
} from "./Report";
import TableList from "./TableList";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

export class PrintableReports extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedReports: props.selectedReports,
    };
  }
  render() {
    const { selectedReports, startDate, endDate } = this.props;

    return (
      <Flex m={"3rem"} direction={"column"} gap={"2rem"}>
        {selectedReports.includes("age") && (
          <div className="report-container">
            <Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
              Age{" "}
            </Text>
            <AgeReport startDate={startDate} endDate={endDate} />
          </div>
        )}
        {selectedReports.includes("barangay") && (
          <div className="report-container">
            <Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
              Barangay{" "}
            </Text>
            <BarangayReport startDate={startDate} endDate={endDate} />
          </div>
        )}
        {selectedReports.includes("gender") && (
          <div className="report-container">
            <Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
              Gender{" "}
            </Text>
            <GenderReport startDate={startDate} endDate={endDate} />
          </div>
        )}
        {selectedReports.includes("pwd") && (
          <div className="report-container">
            <Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
              PWD{" "}
            </Text>
            <PWDReport startDate={startDate} endDate={endDate} />
          </div>
        )}
        {selectedReports.includes("ip") && (
          <div className="report-container">
            <Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
              IP{" "}
            </Text>
            <IPReport startDate={startDate} endDate={endDate} />
          </div>
        )}
        {selectedReports.includes("table") && (
          <div className="report-container">
            <Text
              fontWeight={"semibold"}
              fontSize={"50px"}
              textAlign={"center"}>
              {/* MUNICAPALITY OF BUNAWAN{" "} */}
            </Text>{" "}
            <Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
              {/* List of Evacuee{" "} */}
            </Text>
            <TableList startDate={startDate} endDate={endDate} />
          </div>
        )}
      </Flex>
    );
  }
}

export default PrintableReports;
