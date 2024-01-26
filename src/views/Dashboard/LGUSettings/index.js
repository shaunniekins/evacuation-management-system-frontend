// Chakra imports
import { Flex } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";
// import View from "components/EvacueeList/View";
import View from "./components/ResidentList/View";
import ViewResEvac from "./components/ResidentInEvacuation/View";
import ViewDistribute from "./components/Distribute/View";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

function Tables() {
  let { userPosition } = useContext(AuthContext);
  const isAdmin = userPosition === "Administrator";
  const isPersonnel = userPosition === "Personnel";

  const tabs = [{ name: "List of Residents", component: <View /> }];

  if (isPersonnel) {
    tabs.push(
      {
        name: "Residents in Evacuation Center",
        component: <ViewResEvac />,
      },
      {
        name: "Distribute Goods",
        component: <ViewDistribute />,
      }
    );
  }

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Tabs align="end" variant="soft-rounded" colorScheme="blue">
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab.name}>{tab.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.name}>{tab.component}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Tables;
