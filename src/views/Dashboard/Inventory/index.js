import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";
import ViewStockin from "./components/Stockin/View";
import ViewCashDonation from "./components/CashDonation/View";
import ViewAddItem from "./components/AddItem/View";
import ViewBarangayDistribution from "./components/BarangayDistribution/View";
import ViewRepacked from "./components/Repacked/View";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
function Calamity() {
  let { userPosition } = useContext(AuthContext);
  const isAdmin = userPosition === "Administrator";
  const isPersonnel = userPosition === "Personnel";
  const tabs = [
    { name: "Add Item", component: <ViewAddItem /> },
    { name: "Stock-in", component: <ViewStockin /> },
    { name: "Cash Donation", component: <ViewCashDonation /> },
  ];
  if (isAdmin) {
    tabs.push({ name: "Barangay Distribution", component: <ViewBarangayDistribution /> });
  }
  if (!isAdmin) {
    tabs.push({ name: "Repack", component: <ViewRepacked /> });
  }
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} mt="24px">
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
export default Calamity;
