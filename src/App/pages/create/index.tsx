import * as React from "react"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useBoolean,
  useToast,
} from "@chakra-ui/react"
import { FileUpload } from "../../components/file-upload"
import { useSdk } from "../../services/client/wallet";
import { CW721 } from "../../services/client/cw721";
import { unSanitizeIpfsUrl, uploadFile } from "../../services/ipfs/client";
import { Bech32, toHex } from "@cosmjs/encoding";
import { useState } from "react";
import { config } from "../../../config";

function generateId(address: string) {
  // TODO: Format ID?
  const pubkey = toHex(Bech32.decode(address).data);
  return (
    pubkey?.substr(2, 10) +
    pubkey?.substring(pubkey.length - 8) +
    '-' +
    Math.random().toString(36).substr(2, 9)
  ).toUpperCase();
}

export const Create = () => {
  const toast = useToast();
  const { getSignClient, address } = useSdk();
  const [files, setFiles] = useState<File[]>();
  const [nftName, setNftName]= useState<string>();
  const [description, setDescription]= useState<string>();
  const [loading, setLoading] = useBoolean();

  const clearFields = () => {
    setFiles([]);
    setNftName('');
    setDescription('');
  };

  async function createNft(e: any) {
    // TODO: use formik validations
    // TODO: disable and animate button (loading)
    e.preventDefault();

    if (!address) {
      toast({
        title: "Account required.",
        description: "Please connect wallet.",
        status: "warning",
        position: "top",
        isClosable: true,
      });

      return;
    }

    if (!files || files.length === 0) {
      return;
    }

    setLoading.on();
    // TODO: Show ID after load page
    const nftId = generateId(address);

    try {
      const fileHash = await uploadFile(files[0]);
      console.log(fileHash, nftId);
      const nftMsg = {
        token_id: nftId,
        owner: address,
        name: nftName!,
        description: description,
        image: unSanitizeIpfsUrl(fileHash)
      };

      const contract = CW721(config.contract).useTx(getSignClient()!);

      const result = await contract.mint(address, nftMsg);

      console.log(result);

      clearFields();
      setLoading.off();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Invalid tx",
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
      setLoading.off();
    }
  }

  return (
  <Flex
    py={{ base: 5 }}
    px={{ base: 4 }}
    mb={8}
    justifyContent="center"
    alignItems="center"
    direction="row">
    <Box maxW="500px" w="100%">
      <Box>
        <Box mt={6} mb={10}>
          <Heading as="h3" fontSize="3xl">Create a single NFT</Heading>
        </Box>
        <Box as={'form'} id="nft-form" onSubmit={createNft}>
        <Box>
            <FormControl id="name" isRequired>
              <FormLabel
                fontSize="sm"
                fontFamily="mono"
                fontWeight="semibold"
              >Image</FormLabel>
              <FileUpload accept="image/*" onDrop={acceptedFiles => setFiles(acceptedFiles)} />
            </FormControl>
          </Box>
          <Box mt={4}>
            <FormControl id="name" isRequired>
              <FormLabel
                fontSize="sm"
                fontFamily="mono"
                fontWeight="semibold"
              >Name</FormLabel>
              <Input
                name="name"
                spellCheck={false}
                onChange={e => setNftName(e.target.value)} />
            </FormControl>
          </Box>
          <Box mt={4}>
            <FormControl id="description">
              <FormLabel
                fontSize="sm"
                fontFamily="mono"
                fontWeight="semibold"
              >Description</FormLabel>
              <Textarea name="description"
                placeholder="NFT description"
                spellCheck={false}
                onChange={e => setDescription(e.target.value)} />
            </FormControl>
          </Box>
          <Box mt={6}>
            <Button
              isLoading={loading}
              loadingText="Minting"
              type="submit"
              height="var(--chakra-sizes-10)"
              fontSize={'md'}
              fontWeight="semibold"
              borderRadius={'50px'}
              color={'white'}
              bg="pink.500"
              _hover={{
                bg: "pink.700",
              }}>
              Create
            </Button>
          </Box>
        </Box>
      </Box>

    </Box>
  </Flex>
  );
}
