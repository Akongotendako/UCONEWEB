import CardContainer from "@/components/card/CardContainer";
import InputContainer from "@/components/input/InputContainer";
import LogoContainer from "@/components/logo/LogoContainer";
import Description from "@/components/typography/description";
import Title from "@/components/typography/Title";
import { Flex } from "@chakra-ui/react";
import React from "react";

const Login = () => {
  return (
    <Flex Flex w="100vw" h="100%" align="center" justify="center" mH="100vh">
      <LogoContainer />
      <CardContainer>
        <Title textAlign="center">Welcome Back</Title>
        <Description color="#94ADC7">
          See what's new at Uc Merch! Explore our latest arrivals and campus
          gear.
        </Description>

        <InputContainer name="email" title="Email"/>
      </CardContainer>
    </Flex>
  );
};

export default Login;
