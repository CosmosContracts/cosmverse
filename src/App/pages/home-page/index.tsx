import './homepage.css';

import { Box, Button, Flex, Image, Stack } from '@chakra-ui/react';
import * as React from 'react';
import { FaDiscord, FaGithub, FaMedium, FaTelegram, FaTwitter } from 'react-icons/fa';

import cosmverseText from '../../assets/cosmoverse-fit.svg';
import { SocialButton } from '../../components';

export const HomePage = () => {
  return (
    <React.Fragment>

      <Flex w={[
        '100vw',
        '100vw',
        '100vw',
        '100vw'
      ]}
      h={[
        '100vh',
        '100vh',
        '100vh',
        '100vh'
      ]}


        direction={[
          'column',
          'column',
          'row',
          'row'
        ]}
        zIndex='0'

      >


        <Box w="100vw" h="100vh" zIndex='1' position='absolute' bg='black'>
          <Image src={cosmverseText} className='text' margin='4vw'>
          </Image>
        </Box>


        <Box w="100vw" h="100vh" zIndex='2' display={['flex','','','']} flexDirection={['column','column','column','column']} alignItems='center'>
          <Box
            w={[
            '320px',
            '450px',
            '550px',
            '700px'
          ]}
            h={[
            '320px',
            '450px',
            '550px',
            '700px'
            ]}

            top={[
                '10vh',
                '10vh',
                '20vh',
                '24vh',
              ]}

            position={[
                'relative',
                'relative',
                'absolute',
                'absolute'
            ]}

            zIndex='2'
              className='planet'>
          </Box>

        </Box>

        <Box w="100vw" h="100vh" className='stars' zIndex='3' position={['absolute','absolute','absolute','absolute']}>
        </Box>

        <Box zIndex='3'
           w={[
            'auto',
            '100vw',
            '100vw',
            '500px'
          ]}
          position={[
            'relative',
            'relative',
            'absolute',
            'absolute'
          ]}

          margin='0 auto'
          className='content'
          bottom={[
            '10vh',
            '10vh',
            '10vh',
            '25vh'
          ]}
          left={[
            '0',
            '0',
            '0',
            '60%'
          ]}

          display={[
            'flex',
            'flex',
            'flex',
            'flex',

          ]}

          flexDirection={[
            'column',
            'column',
            'column',
            'column'
          ]}
          alignItems='center'
        >


            <Button
              fontSize={'sm'}
              size='2lg'
              fontWeight={500}
              variant={'solid'}
              w='232px'
              borderRadius='50px'
              height='var(--chakra-sizes-10)'
              marginTop={'4px'}
              backgroundColor='#1e7880'
              href='#'
              mb='10px'
            >
              Comming Soon...
          </Button>

          <Stack direction={'row'}>
                <SocialButton label={'Medium'} href={'https://medium.com/@Cosmverse'} width='40px' height='40px' backgroundColor='#1e7880'>
                  <FaMedium />
                </SocialButton>
                <SocialButton label={'Twitter'} href={'https://twitter.com/Cosmverse'} width='40px' height='40px' backgroundColor='#1e7880'>
                  <FaTwitter />
                </SocialButton>
                <SocialButton label={'Telegram'} href={'https://t.me/Cosmverse_community'} width='40px' height='40px' backgroundColor='#1e7880'>
                    <FaTelegram />
                </SocialButton>
                <SocialButton label={'Github'} href={'https://github.com/CosmosContracts/cosmverse'} width='40px' height='40px' backgroundColor='#1e7880'>
                  <FaGithub />
                </SocialButton>
                <SocialButton label={'Discord'} href={'https://discord.gg/6tbnz7ss'} width='40px' height='40px' backgroundColor='#1e7880'>
                  <FaDiscord />
                </SocialButton>

          </Stack>

      </Box>
      </Flex>
    </React.Fragment>



  );
}
