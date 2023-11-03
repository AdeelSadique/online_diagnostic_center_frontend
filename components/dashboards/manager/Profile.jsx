import { Avatar, Container, Divider, FormControl, FormLabel, Heading, Input, Stack, Tag, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const manager = useSelector((state) => state.isLogged.data);

  return (
    <>
      <VStack>
        <Heading size={'md'} p={2} textAlign={'center'}>
          Manager Profile
        </Heading>
        <Avatar />
        <Tag alignSelf={'flex-end'}>Joined at {manager.created_at}</Tag>
      </VStack>
      <Container maxW={'container.lg'} p={4} style={{ minHeight: 'calc(100vh - 265px)' }}>
        <VStack w={'full'} spacing={8}>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isReadOnly>
              <FormLabel>Manager Name</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='text' placeholder={manager.name} />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Manager Email</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='text' placeholder={manager.email} />
            </FormControl>
          </Stack>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isReadOnly>
              <FormLabel>Hospital Name</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='text' placeholder={manager.hospital_name} />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Contact</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='text' placeholder={manager.m_contact} />
            </FormControl>
          </Stack>
          <FormControl isReadOnly>
            <FormLabel>Address</FormLabel>
            <Input focusBorderColor='gray' variant={'filled'} type='text' placeholder={manager.m_address} />
          </FormControl>
        </VStack>
      </Container>
    </>
  );
}

export default Profile;
