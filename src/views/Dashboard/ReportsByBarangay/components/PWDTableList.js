import {
  Flex,
  Text,
  Progress,
  Button,
  DatePicker,
  Icon,
  useColorModeValue,
  Spacer,
  Select,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

import { EvacueeList, evacueeDelete } from "api/evacueeAPI";
import { useHistory } from "react-router-dom";

import { resEvacList, resEvacDelete } from "api/residentInEvacuationAPI";
// import UpdateModal from "./UpdateModal";
import { EvacuationCenterList } from "api/evacuationCenterAPI";
// import { EvacueeList } from "api/evacueeAPI";

const PWDTableList = ({ startDate, endDate }) => {
  // const textColor = useColorModeValue("gray.700", "white");
  const iconTeal = useColorModeValue("blue.300", "blue.300");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const evacueeList = EvacueeList();
  const evacuationList = EvacuationCenterList();
  const evacList = resEvacList();

  const history = useHistory();

  let { userPosition, userBarangay } = useContext(AuthContext);
  const isAdmin = userPosition == "Personnel" ? false : true;

  const filteredEvacueesList = resEvacList().filter((entry) => {
    if (!isAdmin) {
      const evacuee = evacueeList.find(
        (evacuee) => evacuee.id === entry.resident
      );
      if (evacuee && evacuee.barangay === userBarangay) {
        if (startDate && endDate) {
          const date = new Date(entry.date);
          return date >= new Date(startDate) && date <= new Date(endDate);
        }
        return true;
      }
      return false;
    }
    return true;
  });

  let name;
  let evacuationName;
  const idToNameEvacuee = evacList.map((row) => {
    const evacuee = evacueeList.find((evacuee) => evacuee.id === row.resident);
    name = evacuee ? `${evacuee.first_name} ${evacuee.last_name}` : "";
  });

  const idToNameCenter = evacList.map((row) => {
    const center = evacuationList.find(
      (center) => center.id === row.evacuation
    );
    evacuationName = center ? `${center.name} `: "";
  });

  const evacueeIdToName = (id) => {
    const evacuee = evacueeList.find((evacuee) => evacuee.id === id);
    return evacuee ? `${evacuee.first_name} ${evacuee.last_name}`: "";
  };

const evacueeIdToAge = (id) => {
  const evacuee = evacueeList.find((evacuee) => evacuee.id === id);
  if (evacuee) {
    const birthday = new Date(evacuee.birthday);
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds between the current date and the birthday
    const ageInMilliseconds = currentDate - birthday;
    
    // Convert the age from milliseconds to years
    const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
    
    return ageInYears;
  } else {
    return "";
  }
};

    const evacueeIdToGender = (id) => {
    const evacuee = evacueeList.find((evacuee) => evacuee.id === id);
    return evacuee ? ` ${evacuee.gender}` : "";
    };
      const evacueeIdToIp = (id) => {
    const evacuee = evacueeList.find((evacuee) => evacuee.id === id);
    return evacuee ? ` ${evacuee.is_ip}` : "";
  };

  const centerIdToName = (id) => {
    const center = evacuationList.find((center) => center.id === id);
    return center ? `${center.name}` : "";
  };
      const evacueeIdToPWD = (id) => {
    const evacuee = evacueeList.find((evacuee) => evacuee.id === id);

    return evacuee ? `${evacuee.is_pwd}` : "";
      };
  
   const evacueeIdToSenior = (id) => {
    const evacuee = evacueeList.find((evacuee) => evacuee.id === id);

    return evacuee ? `${evacuee.is_senior}` : "";
  };


  return (
    <>
      <Flex direction="column" w="100%">
        <TableContainer maxH="50vh" overflowY="auto">
          <Table color={textColor} variant="striped" colorScheme="blue">
            <Thead>
                     <Tr colspan ="8" Align={"center"} >    
                <Td colspan="8">  <Text fontWeight={"semibold"} fontSize={"35px"} textAlign={"center"} >
                  
              MUNICAPALITY OF BUNAWAN {""} 
                </Text></Td>
        </Tr>  <Tr >  <Td colspan="8"><Text fontWeight={"semibold"} fontSize={"xl"} textAlign={"center"}>
              
             List of PWD{" "}
                </Text></Td>
              </Tr>
              <Tr my=".8rem" pl="0px"textAlign={"center"}>
                <Th color="gray.400">Resident Name</Th>
                <Th color="gray.400">Age</Th>
                <Th color="gray.400">Gender</Th>
                <Th color="gray.400">PWD</Th>
                <Th color="gray.400">IP</Th>
                <Th color="gray.400">Senior Cetizen</Th>
                <Th color="gray.400">Evacuation Center</Th>
                {/* <Th color="gray.400">Family</Th> */}
                <Th color="gray.400">Date </Th>
                
                {/* <Th color="gray.400" pr="0px">
                  Options
                </Th> */}
              </Tr>
            </Thead>
            <Tbody >
          {filteredEvacueesList.map((row, index) =>
  evacueeIdToPWD(row.resident) === "PWD" ? (
    <Tr key={index} color={textColor} cursor="pointer" p="9px" >
      <Td p="9px">{evacueeIdToName(row.resident)}</Td>
      <Td p="9px">{evacueeIdToAge(row.resident)}</Td>
      <Td p="9px">{evacueeIdToGender(row.resident)}</Td>
      <Td p="9px">{evacueeIdToPWD(row.resident)}</Td>
      <Td p="9px">{evacueeIdToIp(row.resident)}</Td>
      <Td p="9px">{evacueeIdToSenior(row.resident)}</Td>
      <Td p="9px">{centerIdToName(row.evacuation)}</Td>
      <Td p="9px">{row.date}</Td>
    </Tr>
  ) : null
)}

            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default PWDTableList;