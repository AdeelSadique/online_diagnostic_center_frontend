import { Spinner, VStack } from '@chakra-ui/react';
import React from 'react';

function LoadingCircle() {
  return (
    <VStack h={'100vh'} w={'full'} justifyContent={'center'} alignItems={'center'} bgColor={'whitesmoke'}>
      <Spinner thickness='2px' speed='1s' emptyColor='gray.200' color='red.500' size='xl' />
    </VStack>
  );
}

export default LoadingCircle;
