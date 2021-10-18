import * as React from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaDiscord, FaTelegram, FaTwitter } from 'react-icons/fa';
import { ReactNode } from 'react';


const SocialButton = ({
    children,
    label,
    href,
  }: {
    children: ReactNode;
    label: string;
    href: string;
  }) => {
    return (
      <chakra.button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'full'}
        w={5}
        h={5}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
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
        borderTopColor={useColorModeValue('778885', '778885')}>
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
            <SocialButton label={'Twitter'} href={'https://twitter.com/Cosmverse'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'Telegram'} href={'https://t.me/Cosmverse_community'}>
              <FaTelegram />
            </SocialButton>
            <SocialButton label={'Discord'} href={'https://discord.gg/6tbnz7ss'}>
              <FaDiscord />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    );
  }
