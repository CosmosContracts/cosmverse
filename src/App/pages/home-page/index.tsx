import './homepage.css';

import * as React from 'react';

import { Box, Flex, Stack } from '@chakra-ui/react';
import { FaDiscord, FaGithub, FaMedium, FaTelegram, FaTwitter } from 'react-icons/fa';

import { SocialButton } from '../../components';
import  cosmverseHomepage  from '../../assets/background-home2.jpg';
import  cosmverseLogo  from '../../assets/cosmverse_logo.svg';

export const HomePage = () => {
  return (
    <React.Fragment>


    <Flex flexDirection='column' alignItems='center'>

      <Box w='100vw' h='100vh' backgroundImage={cosmverseHomepage} zIndex='-1' position='relative' backgroundSize='cover'>
      </Box>

      <Box w='150px' h='150px' backgroundImage={cosmverseLogo} zIndex='1' position='absolute' top='0vh' alignSelf={['center','center','flex-end','flex-end']} backgroundSize='cover'>
      </Box>



      <Stack direction={'row'} zIndex='1' position='absolute' bottom={['25vh','10vh']}>
        <SocialButton label={'Medium'} href={'https://medium.com/@Cosmverse'} width='40px' height='40px' backgroundColor='white'>
          <FaMedium />
        </SocialButton>
        <SocialButton label={'Twitter'} href={'https://twitter.com/Cosmverse'} width='40px' height='40px' backgroundColor='white'>
          <FaTwitter />
        </SocialButton>
        <SocialButton label={'Telegram'} href={'https://t.me/cosmverse_official'} width='40px' height='40px' backgroundColor='white'>
            <FaTelegram />
        </SocialButton>
        <SocialButton label={'Github'} href={'https://github.com/CosmosContracts/cosmverse'} width='40px' height='40px' backgroundColor='white'>
          <FaGithub />
        </SocialButton>
        <SocialButton label={'Discord'} href={'https://discord.gg/6tbnz7ss'} width='40px' height='40px' backgroundColor='white'>
          <FaDiscord />
        </SocialButton>

      </Stack>
    </Flex>

    </React.Fragment>
  );
}
