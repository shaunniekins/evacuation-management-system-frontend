// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
// Assets
import React from "react";
import View from "./components/View";

function Calamity() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Flex direction={"column"}>
        <View />
      </Flex>
    </Flex>
  );
}

export default Calamity;
