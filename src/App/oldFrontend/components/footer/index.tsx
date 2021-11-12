import * as React from "react";

import {
  Box,
  Container,
  Stack,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaDiscord, FaGithub, FaTelegram, FaTwitter } from 'react-icons/fa';

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

  export function Footer(): JSX.Element {
    return (
      <Box
        borderTop={1}
        borderStyle={'solid'}
        borderTopColor={useColorModeValue('cyan.900', 'white.200')}>
        <Container
          as={Stack}
          maxW={'7xl'}
          py={3}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text fontSize={'sm'}
                fontFamily={'mono'}>© JUNO Team</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'https://twitter.com/Cosmverse'} width='5' height='5'>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'Telegram'} href={'https://t.me/Cosmverse_community'} width='5' height='5'>
              <FaTelegram />
            </SocialButton>
            <SocialButton label={'Github'} href={'https://twitter.com/Cosmverse'} width='5' height='5'>
              <FaGithub />
            </SocialButton>
            <SocialButton label={'Discord'} href={'https://discord.gg/6tbnz7ss'} width='5' height='5'>
              <FaDiscord />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    );
  }
