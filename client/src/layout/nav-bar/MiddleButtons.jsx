import { ROUTES } from "@/routes/routes";
import { HStack, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import ShopMenuItems from "./ShopMenuItems";

const MiddleButtons = ({ role }) => {
  const handleNavigation = () => {
    return role === "admin" ? ROUTES.ADMIN.ADMIN_HOME : ROUTES.USER.USER_HOME;
  };

  return (
    <HStack gap="10">
      <Link
        as={ReactRouterLink}
        to={handleNavigation()}
        color="#FFF"
        textDecoration="none"
        _hover={{ color: "#94ADC7" }}
      >
        Home
      </Link>

      {/** Shop */}
      <ShopMenuItems />

      <Link color="#FFF" textDecoration="none" _hover={{ color: "#94ADC7" }}>
        {role === "admin" ? "Student" : "Cart"}
      </Link>

      <Link color="#FFF" textDecoration="none" _hover={{ color: "#94ADC7" }}>
        Orders
      </Link>
    </HStack>
  );
};

export default MiddleButtons;
