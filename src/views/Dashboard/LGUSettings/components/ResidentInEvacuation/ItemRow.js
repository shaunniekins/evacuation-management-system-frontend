import {
  Box,
  Button,
  Icon,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { resEvacDelete } from "api/residentInEvacuationAPI";
import { useDisclosure } from "@chakra-ui/react";

import { EvacueeList } from "api/evacueeAPI";
import { EvacuationCenterList } from "api/evacuationCenterAPI";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "context/AuthContext";
function ItemRow(props) {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const { id, resident, evacuation, isHead, date } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  let { userPosition, userBarangay } = useContext(AuthContext);
  const history = useHistory();

  const residentEntry = EvacueeList();
  const evacuationCenterEntry = EvacuationCenterList();

  const matchingResidentEntry = residentEntry
    .find(
    (entry) => entry.id === resident
  );
  const matchingEvacuationCenterEntry = evacuationCenterEntry
     .filter((entry) => entry.barangay === userBarangay)
  .find(
    (entry) => entry.id === evacuation
  );

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Box pl="24px" bg={bgColor} my="15px" borderRadius="12px">
        <Flex justify="space-between" w="100%">
          <Flex
            direction="column"
            align={"flex-start"}
            justify={"center"}
            maxWidth="70%">
            <Text color={nameColor} fontSize="md" fontWeight="bold" mb="5px">
              {matchingResidentEntry
                ? `${matchingResidentEntry.first_name} ${matchingResidentEntry.last_name}`
                : ""}
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              <Text as="span" color="gray.400">
                {isHead === "HEAD" ? "Head of the Family" : "Member of the Family"}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              {matchingEvacuationCenterEntry && (
                <Text as="span" color="gray.400">
                  {matchingEvacuationCenterEntry.name}
                </Text>
              )}
            </Text>

            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              <Text as="span" color="gray.400">
                {date}
              </Text>
            </Text>
          </Flex>
          <Flex
            direction={{ sm: "column", md: "row" }}
            align="flex-start"
            p={{ md: "18px" }}>
            <Button
              p="0px"
              bg="transparent"
              mb={{ sm: "10px", md: "0px" }}
              me={{ md: "12px" }}
              onClick={async () => {
                await resEvacDelete(id);
                history.push("/admin/resident-information");
              }}>
              <Flex color="red.500" cursor="pointer" align="center" p="12px">
                <Icon as={FaTrashAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold">
                  DELETE
                </Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default ItemRow;
