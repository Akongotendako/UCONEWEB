import { ROUTES } from "@/routes/routes";
import { HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EndButtons = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(ROUTES.ADMIN.ADMIN_PROFILE);
  };

  return (
    <HStack gap="5" color="#FFF">
      <Icon size="lg" _hover={{ color: "#94ADC7" }} cursor="pointer">
        <CiSearch />
      </Icon>

      <Icon size="lg" _hover={{ color: "#94ADC7" }} cursor="pointer">
        <IoIosNotificationsOutline />
      </Icon>

      <Icon
        size="lg"
        _hover={{ color: "#94ADC7" }}
        cursor="pointer"
        onClick={handleNavigation}
      >
        <MdOutlineAccountCircle />
      </Icon>
    </HStack>
  );
};

export default EndButtons;
