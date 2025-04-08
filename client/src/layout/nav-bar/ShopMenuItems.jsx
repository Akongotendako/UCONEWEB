import { ROUTES } from "@/routes/routes";
import productStore from "@/zustand/product/productStore";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Menu, Portal, HStack, Link, Icon, Flex, Box } from "@chakra-ui/react";
import { RiArrowDropDownLine } from "react-icons/ri";

const ShopMenuItems = () => {
  const { clearAllProperties } = productStore();

  const shopMenuItems = [
    {
      value: "All",
      text: "All",
      as: ReactRouterLink,
      to: ROUTES.ADMIN.ADMIN_SHOP.ALL,
      onClick: () => clearAllProperties(),
    },
    {
      value: "Lanyard",
      text: "Lanyard",
      as: ReactRouterLink,
      to: ROUTES.ADMIN.ADMIN_SHOP.ALL,
    },
    {
      value: "T-Shirt",
      text: "T-Shirt",
      as: ReactRouterLink,
      to: ROUTES.ADMIN.ADMIN_SHOP.ALL,
    },
    {
      value: "Uniform",
      text: "Uniform",
      as: ReactRouterLink,
      to: ROUTES.ADMIN.ADMIN_SHOP.ALL,
    },
    {
      value: "Add Product",
      text: "Add Product",
      as: ReactRouterLink,
      to: ROUTES.ADMIN.ADMIN_SHOP.ADD_ITEM,
      onClick: () => clearAllProperties(),
    },
  ];

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <HStack align="center">
          <Link
            color="#FFF"
            textDecoration="none"
            _hover={{ color: "#94ADC7" }}
            as={ReactRouterLink}
            to={ROUTES.ADMIN.ADMIN_SHOP}
          >
            Shop
          </Link>
          <Icon
            size="lg"
            _hover={{ color: "#94ADC7" }}
            cursor="pointer"
          >
            <RiArrowDropDownLine color="#FFF" />
          </Icon>
        </HStack>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content bg="#243647" px="3 !important" py="5 !important">
            <Flex direction="column" gap="2">
              {shopMenuItems.map((item) => (
                <Menu.Item
                  key={item.value}
                  value={item.value}
                  as={item.as}
                  to={item.to}
                  onClick={item.onClick}
                  color="#FFF"
                  mb="2 !important"
                  _hover={{ color: "#94ADC7" }}
                  bg="transparent"
                  _focus={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                >
                  {item.text}
                </Menu.Item>
              ))}
            </Flex>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default ShopMenuItems;