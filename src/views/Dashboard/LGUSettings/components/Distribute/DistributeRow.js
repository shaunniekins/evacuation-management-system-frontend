// import {
//   Box,
//   Button,
//   Icon,
//   Flex,
//   Text,
//   Table,
//   Thead,
//   Tbody,
//   Th,
//   Tr,
//   Td,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
// import { StockinDelete } from "api/stockinAPI";
// import { useDisclosure } from "@chakra-ui/react";
// import { ItemList } from "api/itemAPI";
// import { InventoryList, InventoryUpdate } from "api/inventoryAPI";
// import { evacDistributeUpdate } from "api/distributedEvacuees";
// import { RepackedList, RepackedUpdate, RepackedDelete } from "api/repackedAPI";
// import { evacDistributeDelete } from "api/distributedEvacuees";

// import { useHistory } from "react-router-dom";
// import { EvacueeList } from "api/evacueeAPI";

// function DistributeRow(props) {
//   const {
//     id,
//     repackedItem,
//     calamity,
//     calamityDate,
//     dateDistributed,
//     evacuee,
//     headFamily,
//     is_distributed,
//   } = props;

//   const history = useHistory();

//   const textColor = useColorModeValue("gray.700", "white");
//   const bgColor = useColorModeValue("#F8F9FA", "gray.800");
//   const nameColor = useColorModeValue("gray.500", "white");
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const initialRef = React.useRef(null);
//   const finalRef = React.useRef(null);

//   const [itemName, setItemName] = useState("");
//   const repackedList = RepackedList();

//   const entry1 = ItemList();

//   React.useEffect(() => {
//     return function cleanup() {};
//   });

//   const residentEntry = EvacueeList();

//   const matchingResidentEntry = residentEntry.find(
//     (entry) => entry.id === parseInt(evacuee)
//   );

//   // const inventoryList = InventoryList(id, itemID);

//   const handleDelete = async () => {
//     const itemIDValueSubmit = repackedItem;
//     // const newInstance = instance;
//     try {
//       await Promise.all(
//         repackedList.map(async (entry) => {
//           if (entry.id === parseInt(repackedItem)) {
//             const newInstance = parseInt(entry.StockinDeleteinstance) + 1;

//             const resultInventory = await RepackedUpdate(
//               entry.id,
//               entry.items,
//               entry.units,
//               entry.qty,
//               newInstance,
//               entry.reason,
//               entry.barangay
//             );
//           }
//         })
//       );

//       await evacDistributeDelete(id);
//       onClose();
//       history.push("/admin/resident-information");
//     } catch (error) {
//       alert("Failed");
//     }
//   };

//   const [isCheckedDistributed, setIsCheckedDistributed] =
//     useState(is_distributed);

//   const handleCheckboxChange = () => {
//     const updatedValue = !isCheckedDistributed;
//     setIsCheckedDistributed(updatedValue);

//     evacDistributeUpdate(
//       id,
//       repackedItem,
//       calamity,
//       calamityDate,
//       dateDistributed,
//       evacuee,
//       headFamily,
//       updatedValue ? 1 : 0
//     );
//   };

//   return (
//     <>
//       {/* <Box py="10px" px="24px" bg={bgColor} my="15px" borderRadius="12px">
//         <Flex justify="space-between" w="100%">
//           <Flex direction="column" justify={"center"} maxWidth="70%">
//             <Text color={nameColor} fontSize="md" fontWeight="bold" mb="5px">
//               {matchingResidentEntry
//                 ? `${matchingResidentEntry.first_name} ${matchingResidentEntry.last_name}`
//                 : ""}
//             </Text>
//             <Text color="gray.400" fontSize="sm" fontWeight="semibold">
//               Calamity:{" "}
//               <Text as="span" color="gray.500">
//                 {`${calamity} -  ${calamityDate}`}
//               </Text>
//             </Text>
//             <Text color="gray.400" fontSize="sm" fontWeight="semibold">
//               Repacked Item:{" "}
//               <Text as="span" color="gray.500">
//                 {repackedItem}
//               </Text>
//             </Text>
//             <Text color="gray.400" fontSize="sm" fontWeight="semibold">
//               Date Distributed:{" "}
//               <Text as="span" color="gray.500">
//                 {dateDistributed}
//               </Text>
//             </Text>
//             <Text color="gray.400" fontSize="sm" fontWeight="semibold">
//               Head of the Family:{" "}
//               <Text as="span" color="gray.500">
//                 {headFamily === "yes" ? "Head of the Family" : "Member"}
//               </Text>
//             </Text>
//           </Flex>
//           <Flex
//             direction={{ sm: "column", md: "row" }}
//             align="center"
//             p={{ md: "24px" }}>
//             <Checkbox
//               isChecked={isCheckedDistributed}
//               onChange={handleCheckboxChange}>
//               <Text fontSize="sm" fontWeight="semibold">
//                 DISTRIBUTED
//               </Text>
//             </Checkbox>

//             <Button
//               p="0px"
//               bg="transparent"
//               mb={{ sm: "10px", md: "0px" }}
//               me={{ md: "12px" }}
//               onClick={() => handleDelete(id, repackedItem)}>
//               <Flex color="red.500" cursor="pointer" align="center" p="12px">
//                 <Icon as={FaTrashAlt} me="4px" />
//                 <Text fontSize="sm" fontWeight="semibold">
//                   DELETE
//                 </Text>
//               </Flex>
//             </Button>
//           </Flex>
//         </Flex>
//       </Box>
//  */}




// <Box py="10px" px="24px" bg={bgColor} my="15px" borderRadius="12px" boxShadow="md">
//   <Table variant="simple">
//     <thead>
//       <tr>
//         <Th>Resident Name</Th>
//         <Th>Calamity</Th>
//          <Th>Pakcs</Th>
//         <Th>Date Distributed</Th>
//         <Th>Head of the Family</Th>
//               <Th colSpan={2}>Action</Th>
//               <Th></Th>
        
      
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <Td>
//           <Text color={nameColor} fontSize="md" fontWeight="bold">
//             {matchingResidentEntry
//               ? `${matchingResidentEntry.first_name} ${matchingResidentEntry.last_name}`
//               : ""}
//           </Text>
//         </Td>
//         <Td>
//           <Text color="gray.400" fontSize="sm" fontWeight="semibold">
//             {`${calamity} - ${calamityDate}`}
//           </Text>
//               </Td>
//                           <Td>
//                      <Text as="span" color="gray.500">
//                 {repackedItem}
//               </Text> 
//         </Td>
//         <Td>
//           <Text color="gray.400" fontSize="sm" fontWeight="semibold">
//             {dateDistributed} 
//           </Text>
//               </Td>
  
//         <Td>
//           <Text color="gray.400" fontSize="sm" fontWeight="semibold">
//             {headFamily === "yes" ? "Head of the Family" : "Member"}
//           </Text>
//         </Td>
//         <Td>
//           <Checkbox
//             isChecked={isCheckedDistributed}
//             onChange={handleCheckboxChange}
//             size="sm"
//             colorScheme="blue"
//             color="gray.500"
//           >
//             <Text fontSize="sm" fontWeight="semibold">
//               DISTRIBUTED
//             </Text>
//           </Checkbox>
//         </Td>
//         <Td>
//           <Button
//             p="0px"
//             bg="transparent"
//             onClick={() => handleDelete(id, repackedItem)}
//           >
//             <Flex
//               color="red.500"
//               cursor="pointer"
//               align="center"
//               p="12px"
//               _hover={{ color: "red.600" }}
//             >
//               <Icon as={FaTrashAlt} me="4px" />
//               <Text fontSize="sm" fontWeight="semibold">
//                 DELETE
//               </Text>
//             </Flex>
//           </Button>
//         </Td>
//       </tr>
//     </tbody>
//   </Table>
// </Box>


//     </>
//   );
// }

// export default DistributeRow;





import {
  Box,
  Button,
  Icon,
  Flex,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { StockinDelete } from "api/stockinAPI";
import { useDisclosure } from "@chakra-ui/react";
import { ItemList } from "api/itemAPI";
import { InventoryList, InventoryUpdate } from "api/inventoryAPI";
import { evacDistributeUpdate } from "api/distributedEvacuees";
import { RepackedList, RepackedUpdate, RepackedDelete } from "api/repackedAPI";
import { evacDistributeDelete } from "api/distributedEvacuees";

import { useHistory } from "react-router-dom";
import { EvacueeList } from "api/evacueeAPI";

function DistributeRow(props) {
  const {
    id,
    repackedItem,
    calamity,
    calamityDate,
    dateDistributed,
    evacuee,
    headFamily,
    is_distributed,
  } = props;

  const history = useHistory();

  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [itemName, setItemName] = useState("");
  const repackedList = RepackedList();
  const itemsList = ItemList();

  // console.log("repackedList: ", repackedList)

  const matchingRepackItem = repackedList.find((item) => item.id === repackedItem);

  let matchingItemList = null;
  if (matchingRepackItem) {
    const itemIds = matchingRepackItem.items.split(', ');
    matchingItemList = itemIds.map((itemId, index) => {
      const item = itemsList.find((item) => item.id === parseInt(itemId));
      return {
        ...item,
        units: matchingRepackItem.units.split(', ')[index],
        qty: matchingRepackItem.qty.split(', ')[index],
      };
    });
  }
  
  React.useEffect(() => {
    return function cleanup() {};
  });

  const residentEntry = EvacueeList();

  const matchingResidentEntry = residentEntry.find(
    (entry) => entry.id === parseInt(evacuee)
  );

  // const inventoryList = InventoryList(id, itemID);

  const handleDelete = async () => {
    const itemIDValueSubmit = repackedItem;
    // const newInstance = instance;
    try {
      await Promise.all(
        repackedList.map(async (entry) => {
          if (entry.id === parseInt(repackedItem)) {
            const newInstance = parseInt(entry.StockinDeleteinstance) + 1;

            const resultInventory = await RepackedUpdate(
              entry.id,
              entry.items,
              entry.units,
              entry.qty,
              newInstance,
              entry.reason,
              entry.barangay
            );
          }
        })
      );

      await evacDistributeDelete(id);
      onClose();
      history.push("/admin/resident-information");
    } catch (error) {
      alert("Failed");
    }
  };

  const [isCheckedDistributed, setIsCheckedDistributed] =
    useState(is_distributed);

  const handleCheckboxChange = () => {
    const updatedValue = !isCheckedDistributed;
    setIsCheckedDistributed(updatedValue);

    evacDistributeUpdate(
      id,
      repackedItem,
      calamity,
      calamityDate,
      dateDistributed,
      evacuee,
      headFamily,
      updatedValue ? 1 : 0
    );
  };

  return (
    <>
      <Box py="10px" px="24px" bg={bgColor} my="15px" borderRadius="12px">
        <Flex justify="space-between" w="100%">
          <Flex direction="column" justify={"center"} maxWidth="70%">
       <Text color={nameColor} fontSize="md" fontWeight="bold" mb="5px">
  {matchingResidentEntry
    ? `${matchingResidentEntry.first_name} ${matchingResidentEntry.last_name}`
    : ""}
</Text>

            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Calamity:{" "}
              <Text as="span" color="gray.500">
                {`${calamity} -  ${calamityDate}`}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Repacked Item:{" "}
              <Text as="span" color="gray.500">
                
              {matchingItemList && matchingItemList.map((item, index) => (
                <Text key={index} as="span" color="gray.500">
                  {`${item.name} (${item.qty}${item.units})${index !== matchingItemList.length - 1 ? ',' : ''} `}
                </Text>
              ))}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Date Distributed:{" "}
              <Text as="span" color="gray.500">
                {dateDistributed}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Head of the Family:{" "}
              <Text as="span" color="gray.500">
                {headFamily === "head" ? "Head of the Family" : "Member"}
              </Text>
            </Text>
          </Flex>
          <Flex
            direction={{ sm: "column", md: "row" }}
            align="center"
            p={{ md: "24px" }}>
            <Checkbox
              isChecked={isCheckedDistributed}
              onChange={handleCheckboxChange}>
              <Text fontSize="sm" fontWeight="semibold">
                DISTRIBUTED
              </Text>
            </Checkbox>

            <Button
              p="0px"
              bg="transparent"
              mb={{ sm: "10px", md: "0px" }}
              me={{ md: "12px" }}
              onClick={() => handleDelete(id, repackedItem)}>
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

export default DistributeRow;