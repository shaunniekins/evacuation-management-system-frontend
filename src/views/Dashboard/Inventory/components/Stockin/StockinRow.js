// import {
//   Box,
//   Button,
//   Icon,
//   Flex,
//   Text,
//   Table,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableContainer,
//   Thead,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
// import { StockinDelete } from "api/stockinAPI";
// import { useDisclosure } from "@chakra-ui/react";

// import UpdateModal from "./UpdateModal";
// import { ItemList } from "api/itemAPI";
// import { InventoryList, InventoryUpdate } from "api/inventoryAPI";

// import { useHistory } from "react-router-dom";

// function StockinRow(props) {
//   const { id, givenBy, donor, dateReceived, itemID, unit, qty, expir_date } = props;
//   const textColor = useColorModeValue("gray.700", "white");
//   const bgColor = useColorModeValue("#F8F9FA", "gray.800");
//   const nameColor = useColorModeValue("gray.500", "white");
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const initialRef = React.useRef(null);
//   const finalRef = React.useRef(null);
//   const history = useHistory();

//   const [itemName, setItemName] = useState("");

//   const addEntries = ItemList();
//   const entry1 = ItemList();
//   const selectedItem = entry1.find((item) => item.id === itemID);

//   useEffect(() => {
//     if (selectedItem) {
//       const itemNameCapitalized =
//         selectedItem.name.charAt(0).toUpperCase() + selectedItem.name.slice(1);
//       setItemName(itemNameCapitalized);
//     } else {
//       setItemName("");
//     }
//   }, [selectedItem]);

//   React.useEffect(() => {
//     // document.body.style.overflow = "unset";
//     // Specify how to clean up after this effect:
//     return function cleanup() { };
//   });

//   const inventoryList = InventoryList(id, itemID);

//   const handleDelete = async () => {
//     const itemIDValueSubmit = itemID;
//     const preQty = qty;
//     try {
//       await Promise.all(
//         inventoryList.map(async (entry) => {
//           if (parseInt(entry.item) === parseInt(itemID)) {
//             let computedQty = parseFloat(entry.qty) - parseFloat(preQty);
//             const resultInventory = await InventoryUpdate(
//               entry.id,
//               itemIDValueSubmit,
//               computedQty
//             );
//           }
//         })
//       );

//       await StockinDelete(id);
//       onClose();
//       history.push("/admin/dashboard");
//     } catch (error) {
//       alert("Failed");
//     }
//   };

//   return (
//     <>





//       <Box p="0px" bg={bgColor} my="5px" borderRadius="12px">
//         <Flex direction="column" justify={"center"} maxWidth="100%">
//         <TableContainer maxH="50vh" overflowY="auto">
//             <Table color={textColor} variant="striped" colorScheme="blue" border="1">
  
//           <Tbody>
//               <Tr>
//                   <Td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                     <Text color={textColor} cursor="pointer" p="12px">
//                     {itemName}
//                     </Text>
//                 </Td>
//                 <Td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                     <Text color={textColor} cursor="pointer" p="12px">
//                     {givenBy}
//                     </Text>
//                 </Td>
                         
//                 <Td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                     <Text color={textColor} cursor="pointer" p="12px">
//                     {dateReceived}
//                   </Text>
//                 </Td>
         
//                 <Td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                     <Text color={textColor} cursor="pointer" p="12px">
//                     {expir_date}
//                   </Text>
//                 </Td>
//                 <Td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                     <Text color={textColor} cursor="pointer" p="12px">
//                     {unit}
//                   </Text>
//                 </Td>
//                 <Td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                 <Text color={textColor} cursor="pointer" p="12px">
//                     {qty}
//                   </Text>
//                 </Td>
//           <Td  style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
         
//             <Button 
//               p="0px"
//               bg="transparent"
//               mb={{ sm: "10px", md: "0px" }}
//               me={{ md: "12px" }}
//               onClick={() => handleDelete(id, itemID)} style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//               <Flex color="red.500" cursor="pointer" align="center" p="12px">
//                 <Icon as={FaTrashAlt} me="4px" />
//                 <Text fontSize="sm" fontWeight="semibold">
//                   DELETE
//                 </Text>
//                  </Flex>
//                 </Button>
//                 {/* </Td>
//                 <Td style={{ maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> */}
//                  <Button p="0px" bg="transparent"  style={{ maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                 <Flex color={textColor} cursor="pointer" p="12px">
//                 <Icon as={FaPencilAlt} me="4px" />
//                 <Text fontSize="sm" fontWeight="semibold" onClick={onOpen}>
//                   EDIT
//                 </Text>
//               </Flex>
//             </Button>
          
           
          
//               </Td>
        
//             </Tr>
//           </Tbody>
//           </Table>
//           </TableContainer>
//           </Flex>
//       </Box>

//       <UpdateModal
//         {...{
//           addEntries,
//           id,
//           givenBy,
//           donor,
//           dateReceived,

//           itemID,
//           expir_date,
//           // unit,
//           qty,
//           isOpen,
//           onClose,
//           initialRef,
//           finalRef,
//         }}
//       />
//     </>
//   );
// }

// export default StockinRow;
import {
  Box,
  Button,
  Icon,
  Flex,
  Text,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Thead,
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
  const { id, givenBy, donor, dateReceived, itemID, unit, qty, expir_date } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const history = useHistory();

  const [itemName, setItemName] = useState("");
  const [isExpired, setIsExpired] = useState(false);

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

  useEffect(() => {
    const currentDate = new Date();
    const expirationDate = new Date(expir_date);

    setIsExpired(
      currentDate.toDateString() === expirationDate.toDateString()
    );
  }, [expir_date]);

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
<Box p="0px" bg={bgColor} my="5px" borderRadius="12px">
  <TableContainer maxH="50vh" overflowY="auto">
    <Table color={textColor} variant="striped" colorScheme="blue" border="1">
      {/* <Thead>
        <Tr>
          <Th width="20%" p="12px" textAlign="center">
            Item Name
          </Th>
          <Th width="15%" p="12px" textAlign="center">
            Given By
          </Th>
          <Th width="15%" p="12px" textAlign="center">
            Date Received
          </Th>
          <Th width="15%" p="12px" textAlign="center">
            Expiration Date
          </Th>
          <Th width="10%" p="12px" textAlign="center">
            Unit
          </Th>
          <Th width="10%" p="12px" textAlign="center">
            Quantity
          </Th>
          <Th width="15%" p="12px" textAlign="center">
            Actions
          </Th>
        </Tr>
      </Thead> */}
      <Tbody>
        <Tr>
          <Td width="20%" p="12px" textAlign="center">
            {itemName}
          </Td>
          <Td width="15%" p="12px" textAlign="center">
            {givenBy}
          </Td>
          <Td width="15%" p="12px" textAlign="center">
            {dateReceived}
          </Td>
          <Td width="15%" p="12px" textAlign="center" color={isExpired ? "red" : textColor}>
            {isExpired ? "Expired" : expir_date}
          </Td>
          <Td width="10%" p="12px" textAlign="center">
            {unit}
          </Td>
          <Td width="10%" p="12px" textAlign="center">
            {qty}
          </Td>
          <Td width="15%" p="12px" textAlign="center">
            <Button p="0px" bg="transparent" onClick={() => handleDelete(id, itemID)}>
              <Flex color="red.500" cursor="pointer" align="center">
                <Icon as={FaTrashAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold">
                  DELETE
                </Text>
              </Flex>
            </Button>
            <Button p="0px" bg="transparent">
              <Flex color={textColor} cursor="pointer">
                <Icon as={FaPencilAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold" onClick={onOpen}>
                  EDIT
                </Text>
              </Flex>
            </Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  </TableContainer>
</Box>



      <UpdateModal
        {...{
          addEntries,
          id,
          givenBy,
          donor,
          dateReceived,
          itemID,
          expir_date,
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
