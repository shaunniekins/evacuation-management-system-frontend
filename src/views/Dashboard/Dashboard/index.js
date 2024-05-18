import { Flex, SimpleGrid, useColorModeValue ,Text} from "@chakra-ui/react";
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
  PersonIcon,
  SupportIcon,
} from "components/Icons/Icons.js";
import React, { useEffect, useState } from "react";
import MiniStatistics from "./components/MiniStatistics";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { resEvacList } from "api/residentInEvacuationAPI";
import { EvacueeList } from "api/evacueeAPI";
import { BarangayList } from "api/barangayAPI";
import { EvacuationCenterList } from "api/evacuationCenterAPI";
import { HomeIcon } from "components/Icons/Icons";
export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  let { userPosition, userBarangay } = useContext(AuthContext);
  const isAdmin = userPosition == "Personnel" ? false : true;
  const evacList = resEvacList();
  const evacueeList = EvacueeList();
  const barangayList = BarangayList();
  const evacuationCenterList = EvacuationCenterList();
  const evacuationCenterListLeftRemaining = EvacuationCenterList();
  let maleNum = 0;
  let femaleNum = 0;
  let familyNum = 0;
  let barangayNum = barangayList.length;
  let evacuationNum = 0;
  if (!isAdmin) {
    for (let i = 0; i < evacList.length; i++) {
      const residentId = evacList[i].resident;
      const evacuee = evacueeList.find(
        (e) => e.id === residentId && e.barangay === userBarangay
      );
      if (evacuee) {
        if (evacuee.gender.toLowerCase() === "male") ++maleNum;
        else if (evacuee.gender.toLowerCase() === "female") ++femaleNum;
        if (evacuee.is_head.toLowerCase() === "head") ++familyNum;
      }
    }
    for (let i = 0; i < evacuationCenterList.length; i++) {
      if (evacuationCenterList[i].barangay === userBarangay) {
        ++evacuationNum;
      }
    }
  } else if (isAdmin) {
    for (let i = 0; i < evacList.length; i++) {
      const residentId = evacList[i].resident;
      const evacuee = evacueeList.find((e) => e.id === residentId);
      if (evacuee) {
        if (evacuee.gender.toLowerCase() === "male") {
          ++maleNum;
        } else if (evacuee.gender.toLowerCase() === "female") {
          ++femaleNum;
        }
        if (evacuee.is_head.toLowerCase() === "head") ++familyNum;
      }
    }
    evacuationNum = evacuationCenterList.length;
  }
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="24px">
        <MiniStatistics
          title={"Number of Evacuees"}
          amount={maleNum + femaleNum}
          icon={<PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Number of Families"}
          amount={familyNum}
          icon={<PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Number of Male"}
          amount={maleNum}
          icon={<PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Number of Female"}
          amount={femaleNum}
          
          icon={<PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        {isAdmin && (
          <MiniStatistics
            title={"Number of Evacuation Center"}
            amount={evacuationNum}
            icon={<SupportIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        )}
        {isAdmin && (
          <MiniStatistics
            title={"Number of Barangay"}
            amount={barangayNum}
            icon={<SupportIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        )}
      </SimpleGrid>
       <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} >
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="24px" width={"100%"}>
                  {!isAdmin &&
  evacuationCenterListLeftRemaining.filter((center) => center.barangay === userBarangay)
          .map((center) => {
            const matchingEntries = evacList.filter(
              (entry) => entry.evacuation === center.id
            );
            const numEvacuees = matchingEntries.length;
            const numResidents = matchingEntries.reduce((acc, entry) => {
              return acc + entry.resident;
            }, 0);
            const remainingCapacity = center.capacity - numResidents;
            return (
              <MiniStatistics
                key={center.id}
                title={center.name}
                amount={`${numEvacuees} / ${center.capacity} ( ${center.capacity - numEvacuees} vacants)`} 
          icon={<HomeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      );
          })}
    {isAdmin &&
      evacuationCenterListLeftRemaining
        .filter((center) => center.barangay)
        .map((center) => {
          const matchingEntries = evacList.filter(
            (entry) => entry.evacuation === center.id
          );
          const numEvacuees = matchingEntries.length;
          const numResidents = matchingEntries.reduce((acc, entry) => {
            return acc + entry.resident;
          }, 0);
          const remainingCapacity = center.capacity - numResidents;
          return (
            <MiniStatistics
              key={center.id}
              title={center.name}
              amount={`${numEvacuees} / ${center.capacity} (${center.capacity - numEvacuees} vacancies)`}
              icon={<HomeIcon h="24px" w="24px" color={iconBoxInside} />}
            />
          );
        })}
  </SimpleGrid>
</Flex>
    </Flex>
  );
}
