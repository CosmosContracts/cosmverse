import * as React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Button,
  useColorModeValue,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react';
import { MdAccountBalanceWallet } from "react-icons/md";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { useSdk } from "../../services/client/wallet";
import { config } from "../../../config";
import { configKeplr } from "../../services/config/network";
import { loadKeplrWallet, WalletLoader } from "../../services/client/sdk";
import userLogo from "../../assets/user-default.svg";

export function AccountButton(): JSX.Element {
  const sdk = useSdk();

  async function init(loadWallet: WalletLoader) {
    const signer = await loadWallet(config.chainId, config.addressPrefix);
    sdk.init(signer);
  }

  async function initKeplr() {
    // clearError();
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

  const loginButton = (
    <Button
      rightIcon={<MdAccountBalanceWallet />}
      fontSize={'sm'}
      fontWeight={500}
      variant={'outline'}
      borderRadius="50px"
      height="var(--chakra-sizes-8)"
      marginTop={"4px"}
      borderColor={useColorModeValue('gray.200', 'whiteAlpha.300')}
      onClick={initKeplr}
    >
      Connect wallet
    </Button>
  );

  const accountButton = (
    <Menu>
      <MenuButton>
        <Avatar size="sm" name="Juno" src={userLogo} />
      </MenuButton>
      <MenuList>
        <MenuItem
          as={ReactRouterLink}
          to={`/account/${sdk.address}`}>My Items</MenuItem>
        {/* <MenuItem onClick={logout}>Disconnect</MenuItem> */}
      </MenuList>
    </Menu>
  );

  return sdk.address ? accountButton : loginButton;
}
