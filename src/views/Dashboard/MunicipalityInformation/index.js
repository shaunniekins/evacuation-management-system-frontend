import React from "react";
import { Flex } from "@chakra-ui/react";
import View from "./components/View";

function MunicipalityInformation() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Flex direction={"column"}>
        <View />
      </Flex>
    </Flex>
  );
}

export default MunicipalityInformation;
