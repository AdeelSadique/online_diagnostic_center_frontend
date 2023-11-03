import { Button, Container, Divider, FormControl, FormLabel, Heading, Input, Stack, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function UpdateProfile() {
  const [changeForm, setChangeForm] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();

  const manager = useSelector((state) => state.isLogged.data);

  const UpdateProfileHandler = () => {
    console.log(changeForm);

    changeForm == ''
      ? toast({ title: 'Please fill any field', status: 'warning', duration: '3000', isClosable: true })
      : axios
          .put(`manager/${manager.m_id}`, changeForm, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}`, Accept: 'application/json' } })
          .then((res) => {
            toast({
              title: 'Your Profile is Updated',
              status: 'success',
              duration: '3000',
              isClosable: true,
            });
            setChangeForm('');
          })
          .catch((err) => {
            const emailErr = err.response.data.email;
            console.log(err.response);
            toast({
              title: emailErr,
              status: 'error',
              duration: '3000',
              isClosable: true,
            });
          });
  };

  useEffect(() => {
    axios
      .get(`manager/${manager.m_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}`, Accept: 'application/json' } })
      .then((res) => {
        if (res.data.status == 'success') {
          dispatch({ type: 'isLogged', payload: res.data.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [UpdateProfileHandler]);

  return (
    <>
      <Heading size={'md'} p={2} textAlign={'center'}>
        Update Profile
      </Heading>
      <Container maxW={'container.lg'} p={4} style={{ minHeight: 'calc(100vh - 265px)' }}>
        <VStack w={'full'} spacing={8}>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isRequired>
              <FormLabel>Manager Name ({manager.name})</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'outline'}
                type='text'
                required
                name='name'
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Manager Email ({manager.email})</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'outline'}
                type='email'
                name='email'
                required
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
              />
            </FormControl>
          </Stack>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isRequired>
              <FormLabel>Hospital Name ({manager.hospital_name})</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'outline'}
                type='text'
                name='hospital_name'
                required
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Contact ({manager.m_contact})</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'outline'}
                type='text'
                name='m_contact'
                required
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
              />
            </FormControl>
          </Stack>
          <FormControl isRequired>
            <FormLabel>Address ({manager.m_address})</FormLabel>
            <Input
              focusBorderColor='gray'
              variant={'outline'}
              type='text'
              name='m_address'
              required
              onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
            />
          </FormControl>
          <Stack flexDir={['column', 'row']} alignSelf={['stretch', 'center']}>
            <Button>Cancel</Button>
            <Button colorScheme='red' onClick={UpdateProfileHandler}>
              Update
            </Button>
          </Stack>
        </VStack>
      </Container>
    </>
  );
}

export default UpdateProfile;
