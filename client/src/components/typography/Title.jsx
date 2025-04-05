import { Text } from "@chakra-ui/react";
import React from "react";

const Title = ({ children, textAlign, textStyle, mt }) => {
  return (
    <Text color="#FFF" textStyle={textStyle || "xl"} textAlign={textAlign} mt={mt}>
      {children}
    </Text>
  );
};

export default Title;
