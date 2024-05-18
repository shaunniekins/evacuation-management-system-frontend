// import { Flex, Text } from "@chakra-ui/react";

// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
// } from "@chakra-ui/react";

// // import { useContext } from "react";
// import React, { useContext } from "react";

// import AuthContext from "context/AuthContext";

// import { evacDistributeList } from "api/distributedEvacuees";
// import { EvacueeList } from "api/evacueeAPI";

// export const CompletedDistribution = () => {
//   let { userBarangay } = useContext(AuthContext);

//   const residentEntry = EvacueeList();

//   const entries = evacDistributeList().filter(
//     (entry) =>
//       entry.is_distributed === 1 &&
//       residentEntry.find(
//         (resident) =>
//           resident.barangay === userBarangay &&
//           resident.id === parseInt(entry.evacuee)
//       )
//   );

//   return (
//     <Flex m={"3rem"} direction={"column"} gap={"2rem"}>
//       <Text textAlign={"center"} fontSize={"35px"} as={"b"}>
//      MUNICIPALITY OF BUNAWAN
//       </Text>
//       <Text textAlign={"center"} fontSize={"xl"} as={"b"}>
//         Distribution of Goods to Evacuees in Barangay {userBarangay}: Recipients
//       </Text>
//       {entries.length > 0 ? (
//         <TableContainer>
//           <Table variant="simple">
//             <Thead>
//               <Tr>
//                 <Th>Evacuee</Th>
//                 {/* <Th>Repacked Item</Th> */}
//                 <Th>Calamity</Th>
//                 <Th>Date of Calamity</Th>
//                 <Th>Date Distributed</Th>
//                 <Th>Head of Family</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {entries.map((row, index) => (
//                 <Tr key={index}>
//                   <Td>
//                     {residentEntry.map((ent) => {
//                       return ent.id === parseInt(row.evacuee)
//                         ? `${ent.last_name}, ${ent.first_name} `
//                         : "";
//                     })}
//                   </Td>
//                   {/* <Td>{row.repackedItem}</Td> */}
//                   <Td>{row.calamity}</Td>
//                   <Td>{row.calamityDate}</Td>
//                   <Td>{row.dateDistributed}</Td>
//                   <Td>{row.headFamily}</Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Text textAlign={"center"} fontSize={"xl"} as={"i"}>
//           No entries to display
//         </Text>
//       )}
//     </Flex>
//   );
// };

import { Flex, Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import AuthContext from "context/AuthContext";
import { evacDistributeList } from "api/distributedEvacuees";
import { EvacueeList } from "api/evacueeAPI";
import { ItemList } from "api/itemAPI";
import { RepackedList } from "api/repackedAPI";


export const CompletedDistribution = (props) => {
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

  const { userBarangay } = useContext(AuthContext);
  const residentEntry = EvacueeList();
  const entries = evacDistributeList().filter(
    (entry) =>
      entry.is_distributed === 1 &&
      residentEntry.find(
        (resident) =>
          resident.barangay === userBarangay &&
          resident.id === parseInt(entry.evacuee)
      )
  );
  const repackedList = RepackedList();
  const itemsList = ItemList();

  const matchingRepackItem = repackedList.find(
    (item) => item.id === repackedItem
  );

  let matchingItemList = null;
  if (matchingRepackItem) {
    const itemIds = matchingRepackItem.items.split(", ");
    matchingItemList = itemIds.map((itemId, index) => {
      const item = itemsList.find((item) => item.id === parseInt(itemId));
      return {
        ...item,
        units: matchingRepackItem.units.split(", ")[index],
        qty: matchingRepackItem.qty.split(", ")[index],
      };
    });
  }

  return (
    <Flex m={"3rem"} direction={"column"} gap={"2rem"}>
      <Text textAlign={"center"} fontSize={"35px"} as={"b"}>
        MUNICIPALITY OF BUNAWAN
      </Text>
      <Text textAlign={"center"} fontSize={"xl"} as={"b"}>
        Distribution of Goods to Evacuees in Barangay {userBarangay}: Recipients
      </Text>
      {entries.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Evacuee</Th>
                <Th>Calamity</Th>
                <Th>Date of Calamity</Th>
                <Th>Date Distributed</Th>
                <Th>Repacked Item</Th>
              </Tr>
            </Thead>
            <Tbody>
          {entries.map((row, index) => {
  const matchingEvacuee = residentEntry.find((resident) => resident.id === parseInt(row.evacuee));
  const evacueeName = matchingEvacuee ? `${matchingEvacuee.last_name}, ${matchingEvacuee.first_name}` : "";
  return (
    <Tr key={index}>
      <Td>{evacueeName}</Td>
      <Td>{row.calamity}</Td>
      <Td>{row.calamityDate}</Td>
      <Td>{row.dateDistributed}</Td>
      <Td>
        {matchingItemList && matchingItemList.length > 0 ? (
          matchingItemList.map((item, index) => (
            <Text key={index} as="span" color="gray.500">
              {`${item.name} (${item.qty}${item.units})${index !== matchingItemList.length - 1 ? ", " : ""} `}
            </Text>
          ))
        ) : (
          <Text color="gray.500">-</Text>
        )}
      </Td>
    </Tr>
  );
})}

            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text textAlign={"center"} fontSize={"xl"} as={"i"}>
          No entries to display
        </Text>
      )}
    </Flex>
  );
};
