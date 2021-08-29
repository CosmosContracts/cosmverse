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
  useToast,
} from "@chakra-ui/react"
import { FileUpload } from "../../components/file-upload"
import { useSdk } from "../../services/client/wallet";

export const Create = () => {
  const { getSignClient, address } = useSdk();
  const toast = useToast();

  async function createNft(e: any) {
    // TODO: use formik validations
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

    // const msg = {
    //   mint: {
    //     token_id: "",
    //     owner: address,
    //     name: name,
    //     description: description,
    //     image: "ipfs://QmSGiUSr8J5dqM4Td6MVoxjtNUrLXDfuwwRQyRxYM7keE7"
    //   }
    // };

    // const client = getSignClient();
    // const result = await client?.execute(address, "", msg);
  }

  return (
  <Flex
    py={{ base: 5 }}
    px={{ base: 4 }}
    borderBottom={1}
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
              <FileUpload accept="image/*" onDrop={acceptedFiles => console.log(acceptedFiles)} />
            </FormControl>
          </Box>
          <Box mt={4}>
            <FormControl id="name" isRequired>
              <FormLabel
                fontSize="sm"
                fontFamily="mono"
                fontWeight="semibold"
              >Name</FormLabel>
              <Input name="name" />
            </FormControl>
          </Box>
          <Box mt={4}>
            <FormControl id="description">
              <FormLabel
                fontSize="sm"
                fontFamily="mono"
                fontWeight="semibold"
              >Description</FormLabel>
              <Textarea name="description" placeholder="NFT description" />
            </FormControl>
          </Box>
          <Box mt={6}>
            <Button
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
