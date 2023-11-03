import { Button, HStack, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Footer() {
  return (
    <>
      <HStack justifyContent={'center'} p={4} w={'full'} bgColor={'blackAlpha.500'}>
        <Heading size={['xs', 'sm', 'md']}>www.fasttest.com &copy; All Rights Reserved 2023</Heading>
      </HStack>

      <Stack flexDir={['column', 'row']} bgColor={'blackAlpha.500'} justifyContent={'center'} maxW={'full'} alignItems={'center'} p={2}>
        <Link to={'/'} onClick={() => window.scrollTo({ top: '0px', behavior: 'smooth' })}>
          <Button variant={'link'} color={'whiteAlpha.800'}>
            {' '}
            Home
          </Button>
        </Link>
        <Link to={'/tests'} onClick={() => window.scrollTo({ top: '0', behavior: 'smooth' })}>
          <Button variant={'link'} color={'whiteAlpha.800'}>
            Tests
          </Button>
        </Link>
        <Link to={'/hospitalReg'}>
          <Button variant={'link'} color={'whiteAlpha.800'}>
            Hospital Reg
          </Button>
        </Link>
        <HashLink to={'/#howWeWork'}>
          <Button variant={'link'} color={'whiteAlpha.800'}>
            How we work
          </Button>
        </HashLink>
        <HashLink to={'/#aboutUs'}>
          <Button variant={'link'} color={'whiteAlpha.800'}>
            About US
          </Button>
        </HashLink>
        <HashLink to={'/#query'}>
          <Button variant={'link'} color={'whiteAlpha.800'}>
            Query
          </Button>
        </HashLink>
      </Stack>
    </>
  );
}

export default Footer;
