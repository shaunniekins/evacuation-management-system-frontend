import { Flex } from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Report from "./components/index";

function Tables() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} mt="24px">
      <Flex direction={"column"}>
        <Report />
      </Flex>
    </Flex>
  );
}

export default Tables;
