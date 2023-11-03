import { Box,  SkeletonCircle, SkeletonText} from '@chakra-ui/react';
import React from 'react';

function Loader() {
  return (
    <Box padding='6' boxShadow='lg' bg='whitesmoke' w={'full'} h={'320px'}>
      <SkeletonCircle size='10' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    </Box>
  );
}

export default Loader;