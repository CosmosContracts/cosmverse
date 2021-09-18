import * as React from "react";
import {
  chakra,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export function Pagination(): JSX.Element {
  const PagButton = (props: any) => {
    const activeStyle = {
      bg: useColorModeValue("gray.200", "whiteAlpha.200"),
    };
    return (
      <chakra.button
        mx={1}
        px={4}
        py={2}
        rounded="50px"
        color={useColorModeValue("gray.700", "gray.200")}
        fontWeight="semibold"
        fontSize="md"
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        cursor={props.disabled && "not-allowed"}
        {...(props.active && activeStyle)}
        display={props.p && !props.active && { base: "none", sm: "block" }}
      >
        {props.children}
      </chakra.button>
    );
  };
  return (
    <Flex
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex>
        <PagButton disabled>
          <Icon
            as={ChevronLeftIcon}
            boxSize={4}
          /> Previous
        </PagButton>
        <PagButton>
          Next
          <Icon
            as={ChevronRightIcon}
            boxSize={4}
          />
        </PagButton>
      </Flex>
    </Flex>
  );
};
