import * as React from "react"
import {
  Box,
} from "@chakra-ui/react"
import { useParams } from "react-router-dom";

interface DetailParams {
    readonly id: string;
}

export const Detail = () => {
    const { id } = useParams<DetailParams>();
    
    return (
        <Box textAlign="center" fontSize="xl">
            Detail {id}
        </Box>
    );
}