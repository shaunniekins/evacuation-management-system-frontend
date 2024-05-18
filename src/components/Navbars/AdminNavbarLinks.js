import {
  Box,
  Flex,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
// import SignIn from "views/Auth/SignIn.js";
import SignIn from "views/Auth/SignIn";

import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import routes from "routes.js";
import RouteComponent from "routes";

import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import UpdateModal from "./UpdateUserPassword";

import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { BASE_URL } from "../../urlConfig";

export default function HeaderLinks(props) {
  const routes = RouteComponent();
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const [isError, setIsError] = useState(false);

  // Chakra Color Mode
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");
  const iconBoxInside = useColorModeValue("white", "white");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(true);
  };
  // const settingsRef = React.useRef();

  let { logoutUser } = useContext(AuthContext);
  let {
    userUserName,
    userName,
    userEmail,
    userMunicipality,
    userBarangay,
    userPosition,
    userContactNum,
    userImage,
  } = useContext(AuthContext);

userImage = `${BASE_URL}${userImage}`

  useEffect(() => {
    // console.log("isError:", isError);
  }, [isError]);

  return (
    <Flex alignItems="center" flexDirection="row">
      <Menu>
        <MenuButton
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="lg"
          // borderWidth="2px"
          borderColor={"blue.300"}
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "blue.400" }}
          _focus={{ boxShadow: "outline" }}>
          <Flex align={"center"}>
            {userImage && !isError ? (
              <Avatar
                mx={2}
                name={userImage}
                src={userImage}
                onError={() => setIsError(true)}
              />
            ) : (
              <Box px={2} mx={2} borderRadius={"50%"} bg={"blue.300"}>
                <ProfileIcon color={iconBoxInside} w="20px" h="35px" me="0px" />
              </Box>
            )}
            <Text fontSize={15}>{userName}</Text>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuGroup title="Profile Details">
            <MenuItem>
              <Flex direction={"column"}>
                <Flex>
                  {userImage && !isError ? (
                    <Avatar
                      w="70px"
                      h="70px"
                      me="0px"
                      // px={2}
                      mx={2}
                      name={userImage}
                      src={userImage}
                      onError={() => setIsError(true)}
                    />
                  ) : (
                    <Box px={2} mx={2} borderRadius={"50%"} bg={"blue.300"}>
                      <ProfileIcon
                        color={iconBoxInside}
                        w="50px"
                        h="65px"
                        me="0px"
                      />
                    </Box>
                  )}

                  <Flex direction={"column"} justify={"center"}>
                    <Text
                      fontWeight={"medium"}
                      fontSize={"sm"}
                      mb={"-2"}>{`${userName} - ${userPosition}`}</Text>
                    <Text
                      fontSize={"xs"}
                      fontWeight={"light"}
                      color={"gray.500"}>
                      {userEmail}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          {/* <MenuItem onClick={handleMenuClick}>
            Change username / password
          </MenuItem> */}
          {isOpen && <UpdateModal onClose={() => setIsOpen(false)} />}
          <MenuItem onClick={() => toggleColorMode()}>
            {colorMode === "dark" ? (
              <>
                <Flex alignItems="center">
                  <Text mr={2}>Switch to Light Mode</Text>
                  <SunIcon />
                </Flex>
              </>
            ) : (
              <Flex alignItems="center">
                <Text mr={2}>Switch to Dark Mode</Text>
                <MoonIcon />
              </Flex>
            )}
          </MenuItem>

          <MenuItem onClick={logoutUser}>Logout</MenuItem>
        </MenuList>
      </Menu>
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
