import * as React from "react";
import {
  Center,
  Spinner,
} from "@chakra-ui/react";

export function LoadingSpinner(): JSX.Element {
  return (
    <Center>
      <Spinner size="xl" />
    </Center>
  );
}
