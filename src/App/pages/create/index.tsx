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
} from "@chakra-ui/react"
import { FileUpload } from "../../components/file-upload"

export const Create = () => (
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
        <Box as={'form'} id="nft-form">
        <Box>
            <FormControl id="name" isRequired>
              <FormLabel
                fontSize="sm"
                fontFamily="mono"
                fontWeight="semibold"
              >Image</FormLabel>
              <FileUpload accept="image/*"/>
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
)
