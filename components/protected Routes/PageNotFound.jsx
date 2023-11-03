import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <Container
      maxW={'full'}
      style={{ minHeight: 'calc(100vh - 168px)' }}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      p={0}
      m={0}
      bgColor={'blackAlpha.700'}
    >
      <VStack>
        <Heading color={'white'}>404 | Page Not Found</Heading>
        <Link to={'/'}>
          <Button variant={'solid'} colorScheme='red'>
            Home
          </Button>
        </Link>
      </VStack>
    </Container>
  );
}

export default PageNotFound;
