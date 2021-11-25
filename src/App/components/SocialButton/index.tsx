import * as React from 'react';

import {
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';

import { ReactNode } from 'react';

export const SocialButton = ({
    children,
    label,
    href,
    width,
    height,
    backgroundColor
  }: {
    children: ReactNode;
    label: string;
    href: string;
    width: string;
    height: string;
    backgroundColor: string
  }) => {
    return (
      <chakra.button
        bg={useColorModeValue(backgroundColor, 'whiteAlpha.100')}
        rounded={'full'}
        w={width}
        h={height}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('cyan.900', 'cyan.900'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };