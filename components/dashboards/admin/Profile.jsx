import {  Container, FormControl, FormLabel, Heading, Input, Stack, Tag, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const [admin, setAdmin] = useState([]);

  const adminData = useSelector((state) => state.isLogged.data);
  useEffect(() => {
    const id = adminData.a_id;
    axios
      .get(`admin/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        setAdmin(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <VStack>
        <Heading size={'md'} p={2} textAlign={'center'}>
          Admin Profile
        </Heading>
        <Tag alignSelf={'flex-end'}>Joined at {admin.created_at}</Tag>
      </VStack>
      <Container maxW={'container.lg'} p={4} style={{ minHeight: 'calc(100vh - 265px)' }}>
        <VStack w={'full'} spacing={8}>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isReadOnly>
              <FormLabel>Manager Name</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='text' value={admin.name} />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Manager Email</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='email' value={admin.email} />
            </FormControl>
          </Stack>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isReadOnly>
              <FormLabel>Manager Contact</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='text' value={admin.a_contact} />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Gender</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'filled'}
                type='email'
                value={admin.a_gender == 'M' ? 'Male' : admin.a_gender == 'F' ? 'Female' : 'Other'}
              />
            </FormControl>
          </Stack>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isReadOnly>
              <FormLabel>Date of Birth</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='text' value={admin.a_dob} />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Password</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='password' value='12345678' />
            </FormControl>
          </Stack>
          <FormControl isReadOnly>
            <FormLabel>Address</FormLabel>
            <Input focusBorderColor='gray' variant={'filled'} type='text' value={admin.a_address} />
          </FormControl>
        </VStack>
      </Container>
    </>
  );
}

export default Profile;
