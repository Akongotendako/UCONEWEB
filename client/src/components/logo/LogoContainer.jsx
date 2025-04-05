import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import UcMerchLogo from '../../assets/shopping-cart.png'
import Title from "../typography/Title";

const LogoContainer = ({ isCancel }) => {
  return (
    <Flex
      direction="row"
      position={isCancel ? "" : "absolute"}
      top="20px"
      left="20px"
      align="center"
      gap="3"
    >
      <Image
        height="50px"
        width="50px"
        fit="cover"
        src={UcMerchLogo}
        alt="Uc merch logo"
      />

      <Title>UC Merch</Title>
    </Flex>
  );
};

export default LogoContainer;
