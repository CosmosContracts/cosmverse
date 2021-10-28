import "./homepage.css";

import * as React from "react"

import {
Box,
Button,
Flex,
Grid,
GridItem,
Image,
Stack
} from "@chakra-ui/react"
import { FaDiscord, FaTelegram, FaTwitter } from 'react-icons/fa';

import { SocialButton } from "../../components";
import cosmverseText from "../../assets/cosmoverse-fit.svg";

export const HomePage = () => {
  return (
    <React.Fragment>
        <Box w="100vw" h="100vh" className='home'>
          <Image maxH='36vh' src={cosmverseText} className='text'>
          </Image>
        </Box>

      <Box  className='planet'>
      </Box>

      <Box w="100vw" h="100vh" className='stars'>
      </Box>

      <Box className='content'>
          <Button
              fontSize={'sm'}
              size='lg'
              fontWeight={500}
              variant={'outline'}
              borderRadius='50px'
              height='var(--chakra-sizes-8)'
              marginTop={'4px'}
              backgroundColor='#1e7880'
              href='#'
            >
              Enter the CosmVerse
            </Button>

              <Stack direction={'row'} backgroundColor='#1e7880'>
                <SocialButton label={'Twitter'} href={'https://twitter.com/Cosmverse'} width='25' height='25'>
                  <FaTwitter />
                </SocialButton>
                <SocialButton label={'Telegram'} href={'https://t.me/Cosmverse_community'} width='19' height='19'>
                  <FaTelegram />
                </SocialButton>
                <SocialButton label={'Discord'} href={'https://discord.gg/6tbnz7ss'} width='19' height='19'>
                  <FaDiscord />
                </SocialButton>

              </Stack>

      </Box>
    </React.Fragment>



  );
}
