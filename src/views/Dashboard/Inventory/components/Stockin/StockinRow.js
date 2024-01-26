import {
  Box,
  Button,
  Icon,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { StockinDelete } from "api/stockinAPI";
import { useDisclosure } from "@chakra-ui/react";

import UpdateModal from "./UpdateModal";
import { ItemList } from "api/itemAPI";
import { InventoryList, InventoryUpdate } from "api/inventoryAPI";

import { useHistory } from "react-router-dom";

function StockinRow(props) {
  const { id, givenBy, donor, dateReceived, itemID, unit, qty } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const history = useHistory();

  const [itemName, setItemName] = useState("");

  const addEntries = ItemList();
  const entry1 = ItemList();
  const selectedItem = entry1.find((item) => item.id === itemID);

  useEffect(() => {
    if (selectedItem) {
      const itemNameCapitalized =
        selectedItem.name.charAt(0).toUpperCase() + selectedItem.name.slice(1);
      setItemName(itemNameCapitalized);
    } else {
      setItemName("");
    }
  }, [selectedItem]);

  React.useEffect(() => {
    // document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });

  const inventoryList = InventoryList(id, itemID);

  const handleDelete = async () => {
    const itemIDValueSubmit = itemID;
    const preQty = qty;
    try {
      await Promise.all(
        inventoryList.map(async (entry) => {
          if (parseInt(entry.item) === parseInt(itemID)) {
            let computedQty = parseFloat(entry.qty) - parseFloat(preQty);
            const resultInventory = await InventoryUpdate(
              entry.id,
              itemIDValueSubmit,
              computedQty
            );
          }
        })
      );

      await StockinDelete(id);
      onClose();
      history.push("/admin/dashboard");
    } catch (error) {
      alert("Failed");
    }
  };

  return (
    <>
      <Box p="24px" bg={bgColor} my="15px" borderRadius="12px">
        <Flex justify="space-between" w="100%">
          <Flex direction="column" justify={"center"} maxWidth="70%">
            <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
              {itemName}
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Given by:{" "}
              <Text as="span" color="gray.500">
                {givenBy}
              </Text>
            </Text>
            {donor ? (
              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Name:{" "}
                <Text as="span" color="gray.500">
                  {donor}
                </Text>
              </Text>
            ) : (
              <p></p>
            )}
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Date Received:{" "}
              <Text as="span" color="gray.500">
                {dateReceived}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Unit:{" "}
              <Text as="span" color="gray.500">
                {unit}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Quantity:{" "}
              <Text as="span" color="gray.500">
                {qty}
              </Text>
            </Text>
          </Flex>
          <Flex
            direction={{ sm: "column", md: "row" }}
            align="center"
            p={{ md: "24px" }}>
            <Button
              p="0px"
              bg="transparent"
              mb={{ sm: "10px", md: "0px" }}
              me={{ md: "12px" }}
              onClick={() => handleDelete(id, itemID)}>
              <Flex color="red.500" cursor="pointer" align="center" p="12px">
                <Icon as={FaTrashAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold">
                  DELETE
                </Text>
              </Flex>
            </Button>
            <Button p="0px" bg="transparent">
              <Flex color={textColor} cursor="pointer" align="center" p="12px">
                <Icon as={FaPencilAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold" onClick={onOpen}>
                  EDIT
                </Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Box>

      <UpdateModal
        {...{
          addEntries,
          id,
          givenBy,
          donor,
          dateReceived,
          itemID,
          // unit,
          qty,
          isOpen,
          onClose,
          initialRef,
          finalRef,
        }}
      />
    </>
  );
}

export default StockinRow;
