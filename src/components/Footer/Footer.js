/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function Footer(props) {
  // const linkTeal = useColorModeValue("teal.400", "red.200");=
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="center"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; Copyright {1900 + new Date().getYear()}{" "}
        <Link
          // color={linkTeal}
          color="blue.400"
          href="https://www.linkedin.com/in/shaun-niel-ochavo-97915a232/"
          target="_blank"
        >
          {/* shaunniekins */}
        </Link>
      </Text>
    </Flex>
  );
}
