// Chakra imports
import { Flex } from "@chakra-ui/react";
// Assets
import React from "react";
import View from "./components/View";

function ResidentInformation() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Flex direction={"column"}>
        <View />
      </Flex>
    </Flex>
  );
}

export default ResidentInformation;
