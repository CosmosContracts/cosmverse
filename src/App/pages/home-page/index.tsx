import "./homepage.css";

import * as React from "react"

import {
Box,
Button,
Flex,
Grid,
GridItem,
Stack,
Text
} from "@chakra-ui/react"
import { FaDiscord, FaTelegram, FaTwitter } from 'react-icons/fa';

import { SocialButton } from "../../components";

export const HomePage = () => {
  return (

    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center" className='homepage'>

      <Grid h="100%" w="100%" templateColumns="repeat(3, 1fr)" templateRows="repeat(3,1fr)">
        <GridItem colSpan={3} rowSpan={1} bg="papayawhip" colStart={1} colEnd={4}>

          <Flex h="100%" w="100%"alignItems="center" justifyContent="center">
              <Text fontFamily={'mono'}  color='white'>
                    CosmVerse
                </Text>
            </Flex>

        </GridItem>


        <GridItem colSpan={1} colStart={2} colEnd={3} rowSpan={1} >
        <Box w='3xl' h="3xl" className='planet'>
          </Box>
        </GridItem>
        <GridItem colSpan={1}  colStart={3} colEnd={4} rowSpan={1} >
          <Flex h="100%" w="100%"alignItems="center" justifyContent="center" flexDirection='column'>

          <Button
            fontSize={'sm'}
            fontWeight={500}
            variant={'outline'}
            borderRadius="50px"
            height="var(--chakra-sizes-8)"
            marginTop={"4px"}
            backgroundColor='#ffffffff'
            href='#'
          >
            Enter the CosmVerse
          </Button>

            <Stack direction={'row'} backgroundColor='#ffffffff'>
              <SocialButton label={'Twitter'} href={'https://twitter.com/Cosmverse'} width='19' height='19'>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'Telegram'} href={'https://t.me/Cosmverse_community'} width='19' height='19'>
                <FaTelegram />
              </SocialButton>
              <SocialButton label={'Discord'} href={'https://discord.gg/6tbnz7ss'} width='19' height='19'>
                <FaDiscord />
              </SocialButton>

            </Stack>


          </Flex>


        </GridItem>
        </Grid>





    </Flex>

  );
}
