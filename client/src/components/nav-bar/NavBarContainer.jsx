import { Flex } from "@chakra-ui/react";
import React from "react";
import LogoContainer from "../logo/LogoContainer";
import MiddleButtons from "./MiddleButtons";
import EndButtons from "./EndButtons";

const NavBarContainer = () => {
  return (
    <Flex
      borderColor="#FFF"
      borderBottomWidth="1px"
      w="100%"
      bg="#121A21"
      position="sticky"
      top="0"
      left="0"
      direction="row"
      zIndex="1000"
      align="center"
      justify="space-between"
      p="5"
    >
      <LogoContainer isCancel={true} />

      <MiddleButtons />

      <EndButtons />
    </Flex>
  );
};

export default NavBarContainer;
