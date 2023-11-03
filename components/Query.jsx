import { Button, FormControl, FormHelperText, FormLabel, Heading, Input, Textarea, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

function Query() {
  const toast = useToast();
  const [error, setError] = useState({ name: '', email: '', contact: '', message: '' });
  const [adminQuestion, setAdminQuestion] = useState([]);

  const messageSendHandler = () => {
    axios
      .post('adminMessage', adminQuestion)
      .then((res) => {
        console.log(res);
        toast({
          title: 'You Query is recieved!',
          description: 'You will be notified soon via email! ',
          status: 'success',
          duration: '5000',
          isClosable: true,
        });
        setAdminQuestion();
      })
      .catch((err) => {
        console.log(err);
        const name = err.response.data.name;
        const email = err.response.data.email;
        const contact = err.response.data.contact;
        const message = err.response.data.message;
        setError({ name: name, email: email, contact: contact, message: message });
      });
  };

  return (
    <>
      <VStack id='query' p={4} spacing={4}>
        <Heading>Leave your query</Heading>
        <VStack w={['full', '30em']}>
          <FormControl>
            <FormLabel>Name *</FormLabel>
            <Input placeholder='Name Here' name='name' onChange={(e) => setAdminQuestion({ ...adminQuestion, [e.target.name]: e.target.value })} />
            <FormHelperText color={'red.500'} display={error.name ? 'block' : 'none'}>
              {error.name}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Email *</FormLabel>
            <Input placeholder='XYZ@domain.com' name='email' onChange={(e) => setAdminQuestion({ ...adminQuestion, [e.target.name]: e.target.value })} />
            <FormHelperText color={'red.500'} display={error.email ? 'block' : 'none'}>
              {error.email}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Contact *</FormLabel>
            <Input placeholder='03XXXXXXX' name='contact' onChange={(e) => setAdminQuestion({ ...adminQuestion, [e.target.name]: e.target.value })} />
            <FormHelperText color={'red.500'} display={error.contact ? 'block' : 'none'}>
              {error.contact}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Message *</FormLabel>
            <Textarea
              rows={8}
              placeholder='Type your message here'
              name='message'
              onChange={(e) => setAdminQuestion({ ...adminQuestion, [e.target.name]: e.target.value })}
            />
            <FormHelperText color={'red.500'} display={error.message ? 'block' : 'none'}>
              {error.message}
            </FormHelperText>
          </FormControl>
          <Button bgColor={'red.500'} alignSelf={'flex-end'} onClick={messageSendHandler}>
            Send
          </Button>
        </VStack>
      </VStack>
    </>
  );
}

export default Query;
