import { Button, Container, Heading, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ManagerPending() {
  const loggedManager = useSelector((state) => state.isLogged.data);
  const dispatch = useDispatch();

  const dispatchhandler = () => {
    dispatch({ type: 'isLogged', payload: '' });
    dispatch({ type: 'logout' });
  };

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
        <Stack flexDir={['column', 'row']}>
          <Heading color={'white'} size={['sm', 'md', 'lg']}>
            {loggedManager.status == 0 ? 'Thanks For Registeration' : ''}
          </Heading>
          <Heading color={'white'} size={['sm', 'md', 'lg']} textColor={'red.500'}>
            {loggedManager.email}
          </Heading>
        </Stack>
        <Heading color={'white'} size={'sm'}>
          {loggedManager.status == 2
            ? 'Your application has been canceled'
            : loggedManager.status == '3'
            ? 'You Terminated Your Services'
            : 'Your Application is under processing'}
        </Heading>

        <Link to={'/'}>
          <Button variant={'solid'} colorScheme='red' onClick={dispatchhandler}>
            Home
          </Button>
        </Link>
      </VStack>
    </Container>
  );
}

export default ManagerPending;
