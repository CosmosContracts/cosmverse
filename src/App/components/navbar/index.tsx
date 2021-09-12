import * as React from "react";
import { Link as ReactRouterLink} from "react-router-dom"
import {
    Box,
    Flex,
    Text,
    IconButton,
    Image,
    Button,
    Stack,
    Collapse,
    Link,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
} from '@chakra-ui/icons';
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { MdAccountBalanceWallet } from "react-icons/md"
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { config } from "../../../config";
import { configKeplr } from "../../services/config/network";
import { loadKeplrWallet, WalletLoader } from "../../services/client/sdk";
import { useSdk } from "../../services/client/wallet";

import cosmverseLogo from "../../assets/logo.png";
import { formatAddress } from "../../services/utils";

export function Navbar(): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();
  const sdk = useSdk();

  async function init(loadWallet: WalletLoader) {
    // setInitializing(true);
    // clearError();

    try {
      const signer = await loadWallet(config.chainId, config.addressPrefix);
      sdk.init(signer);
    } catch (error) {
      console.error(error);
      // TODO: ui error
    }
  }

  async function initKeplr() {
    const anyWindow = window as KeplrWindow;
    try {
      await anyWindow.keplr?.experimentalSuggestChain(configKeplr(config));
      await anyWindow.keplr?.enable(config.chainId);
      await init(loadKeplrWallet);
    } catch (error) {
      console.error(error);
      // setError(Error(error).message);
    }
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderBottomColor={useColorModeValue('pink.400', 'gray.300')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link
              as={ReactRouterLink}
              to="/"
              _hover={{
                  textDecoration: 'none',
              }}>
              <Image src={cosmverseLogo} alt="cosmverse logo" height={6} />
          </Link>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <DesktopNav />
          <Button
            rightIcon={<MdAccountBalanceWallet />}
            fontSize={'sm'}
            fontWeight={500}
            variant={'outline'}
            borderRadius="50px"
            height="var(--chakra-sizes-8)"
            marginTop={"4px"}
            borderColor={useColorModeValue('gray.200', 'whiteAlpha.300')}
            onClick={sdk.address ? () => {} : initKeplr}
            >
            {sdk.address ? formatAddress(sdk.address) : 'Connect wallet'}
          </Button>
          <ColorModeSwitcher display={{ base: 'none', md: 'inline-flex' }} />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkHoverColor = useColorModeValue('pink.300', 'pink.400');

  return (
      <Stack direction={'row'} spacing={6} display={{ base: 'none', md: 'inline-flex' }}>
          <Link
              as={ReactRouterLink}
              to="/gallery"
              p={1.5}
              fontSize={'sm'}
              fontFamily={'mono'}
              fontWeight={'semibold'}
              _hover={{
                  color: linkHoverColor,
              }}>
              Explore
          </Link>
          <Button
              as={ReactRouterLink}
              to="/create"
              verticalAlign={"middle"}
              height="var(--chakra-sizes-8)"
              fontSize={'sm'}
              fontWeight={500}
              borderRadius={'50px'}
              color={'white'}
              bg='pink.500'
              _hover={{
                  bg: 'pink.700',
              }}>
              Create
          </Button>
      </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        as={ReactRouterLink}
        to={href}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Gallery',
    href: '/gallery',
  },
  {
    label: 'Create',
    href: '/create',
  },
];
