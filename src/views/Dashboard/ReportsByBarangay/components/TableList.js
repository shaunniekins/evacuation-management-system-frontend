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

const TableList = ({ startDate, endDate }) => {
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    onOpen();
  };
  const [query, setQuery] = useState("");
  // const filteredEntries = resEvacList().filter(
  //   (entry) =>
  //     entry.first_name.toLowerCase().includes(query.toLowerCase()) ||
  //     entry.last_name.toLowerCase().includes(query.toLowerCase()) ||
  //     entry.occupation.toLowerCase().includes(query.toLowerCase()) ||
  //     entry.occupation.toLowerCase().includes(query.toLowerCase()) ||
  //     entry.municipality.toLowerCase().includes(query.toLowerCase()) ||
  //     entry.barangay.toLowerCase().includes(query.toLowerCase()) ||
  //     entry.civil_status.toLowerCase().includes(query.toLowerCase())
  // );

  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  const handleFilter = () => {
    // your filtering logic here, using startDate and endDate
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthdateObj = new Date(birthdate);
    let age = today.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = today.getMonth() - birthdateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdateObj.getDate())
    ) {
      age--;
    }
    return age;
  };
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
    evacuationName = center ? `${center.name}` : "";
  });

  return (
    <>
      {/* <Flex
        direction={{ sm: "column", md: "row" }}
        align="center"
        w="100%"
        justify="center"
        py="1rem"> */}
      {/* <Flex
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
          <Button p="0px" bg="transparent" w="16px" h="16px" variant="no-hover">
            <Icon as={FaPencilAlt} />
          </Button>
        </Flex> */}
      {/* </Flex> */}
      {/* <Select></Select> */}
      <Flex direction="column" w="100%">
        <TableContainer maxH="50vh" overflowY="auto">
          <Table color={textColor} variant="striped" colorScheme="blue">
            <Thead>
              <Tr my=".8rem" pl="0px">
                <Th color="gray.400">Resident Name</Th>
                <Th color="gray.400">Evacuation Center</Th>
                <Th color="gray.400">Family Function</Th>
                <Th color="gray.400">Date </Th>
                <Th color="gray.400" pr="0px">
                  Options
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredEvacueesList.map((row, index) => (
                <Tr key={index}>
                  {/* <Td>{row.id}</Td> */}
                  <Td>{name}</Td>
                  <Td>{evacuationName}</Td>
                  <Td>{row.isHead}</Td>
                  <Td>{row.date}</Td>
                  <Td>
                    <Flex justify="space-around">
                      <Button
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => {
                          resEvacDelete(row.id);
                          history.push("/admin/users");
                        }}>
                        <Icon as={FaTrashAlt} />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default TableList;
