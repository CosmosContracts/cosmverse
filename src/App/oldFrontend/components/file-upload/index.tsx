import * as React from "react";
import {
  chakra,
  Box,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { DropzoneProps, useDropzone } from "react-dropzone";

export function FileUpload(props: DropzoneProps): JSX.Element {
  const {
    acceptedFiles,
    isDragAccept,
    getRootProps,
    getInputProps,
  } = useDropzone(props)

  const acceptedFileItems = acceptedFiles.map(file => file.name).join(',');

  const uploadContainer = (
    <Stack spacing={1} textAlign="center">
      <Icon
        mx="auto"
        boxSize={12}
        color={useColorModeValue("gray.200", "gray.200")}
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Icon>
      <Flex
        fontSize="sm"
        color={useColorModeValue("red.600", "red.600")}
        alignItems="baseline"
      >
        <chakra.label
          htmlFor="file-upload"
          cursor="pointer"
          rounded="md"
          fontSize="md"
          color={useColorModeValue("red.700", "brand.200")}
          pos="relative"
          _hover={{
            color: useColorModeValue("red.400", "brand.300"),
          }}
        >
          <span>Upload a file</span>
          <VisuallyHidden>
            <input {...getInputProps()} />
          </VisuallyHidden>
        </chakra.label>
        <Text pl={1}>or drag and drop</Text>
      </Flex>
      <Text
        fontSize="xs"
        color={useColorModeValue("gray.500", "gray.500")}
      >
        PNG, JPG, JPEG, SVG or GIF up to 10MB
      </Text>
    </Stack>
  );

  function previewImage(acceptedFiles:File[]) : JSX.Element { 
    if (acceptedFiles.length > 0){
      console.log("previewing image!");
      return (< Image src={URL.createObjectURL(acceptedFiles[0])}/>);
    }
    return (<Image/>);
  }

  const filenameContainer = (
    <Flex
      fontSize="sm"
      fontFamily="mono"
      color={useColorModeValue("black.200", "whiteAlpha.900")}
    >
      {acceptedFileItems} 
    </Flex>
  );

  const acceptDropColor = useColorModeValue("gray.300", "gray.500");
  const normalDropColor = useColorModeValue("gray.300", "gray.500");

  return (
    <Box>
      <Flex>
        {previewImage(acceptedFiles)}
      </Flex>
      <Flex
        mt={1}
        justify="center"
        px={6}
        pt={5}
        pb={6}
        borderWidth={2}
        borderColor={isDragAccept ? acceptDropColor : normalDropColor}
        borderStyle="dashed"
        rounded="md"
        {...getRootProps()}
      >
        {acceptedFileItems ? filenameContainer : uploadContainer}
      </Flex>
    </Box>    
  );
}
