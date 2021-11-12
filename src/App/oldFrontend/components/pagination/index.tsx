import * as React from "react";
import {
  chakra,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  readonly step: number;
  readonly total: number;
  readonly onChangePage: (page: number) => void;
}

export function Pagination({
  step,
  total,
  onChangePage,
}: PaginationProps): JSX.Element {
  const [previous, setPrevious] = useState<boolean>();
  const [next, setNext] = useState<boolean>();
  const [currentPage, setPage] = useState<number>(1);

  const PagButton = (props: any) => {
    const activeStyle = {
      bg: useColorModeValue("cyan.900", "cyan.900"),
    };
    return (
      <chakra.button
        mx={1}
        px={4}
        py={2}
        rounded="50px"
        onClick={props.onClick}
        color={useColorModeValue("cyan.900", "white.200")}
        fontWeight="semibold"
        fontSize="md"
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        disabled={props.disabled}
        cursor={props.disabled && "not-allowed"}
        {...(props.active && activeStyle)}
        display={props.p && !props.active && { base: "none", sm: "block" }}
      >
        {props.children}
      </chakra.button>
    );
  };

  const getValidPages = useCallback((page: number) => {
    const pages = Math.ceil(total / step);

    if (page <= 1) {
      page = 1;
    } else if (page >= pages) {
      page = pages;
    }

    return [page, pages];
  }, [total, step]);

  const calculatePage = useCallback((pageNum: number) => {
    const [pageVal, pages] = getValidPages(pageNum);
    setPrevious(pageVal > 1)
    setNext(pageVal < pages);
    setPage(pageVal);

    return pageVal;
  }, [getValidPages]);

  useEffect(() => {
    calculatePage(currentPage);
  }, [calculatePage, currentPage]);

  const handleStep = (page: number) => {
    const validPage = calculatePage(page);
    onChangePage(validPage);
  };

  return (
    <Flex
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex>
        <PagButton disabled={!previous} onClick={() => handleStep(currentPage - 1)}>
          <Icon
            as={ChevronLeftIcon}
            boxSize={4}
          /> Previous
        </PagButton>
        <PagButton disabled={!next} onClick={() => handleStep(currentPage + 1)}>
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
