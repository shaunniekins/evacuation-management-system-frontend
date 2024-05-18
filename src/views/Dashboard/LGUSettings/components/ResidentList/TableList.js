import {
  Flex,
  Text,
  Progress,
  Button,
  Icon,
  useColorModeValue,
  Spacer,
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

import { EvacueeList, evacueeDelete } from "api/evacueeAPI";
import UpdateModal from "./UpdateModal";

import { useHistory } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

const TableList = () => {
  // const textColor = useColorModeValue("gray.700", "white");
  const iconTeal = useColorModeValue("blue.300", "blue.300");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  let { userPosition, userBarangay } = useContext(AuthContext);
  const isAdmin = userPosition == "Personnel" ? false : true;

  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    onOpen();
  };
  const [query, setQuery] = useState("");
  const filteredEntries = EvacueeList().filter((entry) => {
    if (isAdmin) {
      return (
        entry.first_name.toLowerCase().includes(query.toLowerCase()) ||
        entry.last_name.toLowerCase().includes(query.toLowerCase()) ||
        entry.occupation.toLowerCase().includes(query.toLowerCase()) ||
        entry.municipality.toLowerCase().includes(query.toLowerCase()) ||
        entry.barangay.toLowerCase().includes(query.toLowerCase()) ||
        entry.civil_status.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return (
        entry.barangay === userBarangay &&
        (entry.first_name.toLowerCase().includes(query.toLowerCase()) ||
          entry.last_name.toLowerCase().includes(query.toLowerCase()) ||
          entry.occupation.toLowerCase().includes(query.toLowerCase()) ||
          entry.municipality.toLowerCase().includes(query.toLowerCase()) ||
          entry.civil_status.toLowerCase().includes(query.toLowerCase()))
      );
    }
  });

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
  const calculatelengthofyear = (LentghOfYear) => {
      const today = new Date();
    const birthdateObj = new Date(LentghOfYear);
    let length_of_year_count = today.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = today.getMonth() - birthdateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdateObj.getDate())
    ) {
      length_of_year_count--;
    }
    return length_of_year_count;
  };
  return (
    <>
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
          <Button p="0px" bg="transparent" w="16px" h="16px" variant="no-hover">
            <Icon as={FaPencilAlt} />
          </Button>
        </Flex>
      </Flex>
      <Flex direction="column" w="100%">
        <TableContainer maxH="50vh" overflowY="auto">
          <Table color={textColor} variant="striped" colorScheme="blue">
            <Thead>
              <Tr my=".8rem" pl="0px">
                {/* <Th color="gray.400" ps="0px">
                  ID
                </Th> */}
                <Th color="gray.400">Last Name</Th>
                <Th color="gray.400">First Name</Th>
                <Th color="gray.400">Middle Name</Th>
                <Th color="gray.400">Municipality</Th>
                <Th color="gray.400">Barangay</Th>
                <Th color="gray.400">Contact Number</Th>
                <Th color="gray.400">Gender</Th>
                <Th color="gray.400">Birthday</Th>
                <Th color="gray.400">Age</Th>
                <Th color="gray.400">Civil Status</Th>
                <Th color="gray.400">Occupation</Th>
                <Th color="gray.400">Resident Status</Th>
                <Th color="gray.400">PWD</Th>
                <Th color="gray.400">Indigenous Person</Th>
                <Th color="gray.400">Head of the Family</Th>
                <Th color="gray.400">Senior Citizens</Th>
                <Th color="gray.400" pr="0px">Household Number</Th>
                <Th color="gray.400" pr="0px">Street</Th>
                <Th color="gray.400" pr="0px"> Lenght Of Year</Th>
                <Th color="gray.400" pr="0px">Options</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredEntries.map((row, index) => (
                <Tr key={index}>
                  {/* <Td>{row.id}</Td> */}
                  <Td>{row.last_name}</Td>
                  <Td>{row.first_name}</Td>
                  <Td>{row.middle_name}</Td>
                  <Td>{row.municipality}</Td>
                  <Td>{row.barangay}</Td>
                  <Td>{row.contact_num}</Td>
                  <Td>{row.gender}</Td>
                  <Td>{row.birthday}</Td>
                  <Td>{calculateAge(row.birthday)}</Td>
                  <Td>{row.civil_status}</Td>
                  <Td>{row.occupation}</Td>
                  <Td>{row.resident_status}</Td>
                  <Td>{row.is_pwd}</Td>
                  <Td>{row.is_ip}</Td>
                  <Td>{row.is_head}</Td>
                  <Td>{row.is_senior}</Td>
                  <Td>{row.household_num}</Td>
                      <Td>{row.street_add}</Td>
                        <Td>{calculatelengthofyear(row.length_of_year)}</Td>
                  <Td>
                    <Flex justify="space-around">
                      <Button
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => handleEditClick(row)}>
                        <Icon as={FaPencilAlt} />
                      </Button>
                      <Button
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => {
                          evacueeDelete(row.id);
                          history.push("/admin/resident-information");
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

      <UpdateModal
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
        finalRef={finalRef}
        {...selectedRow}
      />
    </>
  );
};

export default TableList;
