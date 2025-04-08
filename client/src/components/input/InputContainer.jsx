import React from "react";
import Title from "../typography/Title";
import { Input, VStack } from "@chakra-ui/react";
import { placeholders } from "@/utils/placeholders";
import userStore from "@/zustand/user/userStore";

const InputContainer = ({ formType, name, title, mt }) => {
  const { profile, signin, signup } = userStore();

  const user = [
    {
      type: "profile",
    },
  ];

  const handleChange = (e, name) => {
    if (formType.includes(user)) {
      return;
    }
  };
  return (
    <VStack gap="2" align="flex-start" mt={mt || "10"}>
      <Title textStyle="md">{title}</Title>
      <Input
        placeholder={placeholders[name]}
        type="email"
        bg="#243647"
        color="#FFF"
        variant="subtle"
        pl="15"
        size="md"
        _placeholder={{ color: "#FFFFFF80" }}
        onChange={handleEmail}
        value={formType[name]}
      />
    </VStack>
  );
};

export default InputContainer;
