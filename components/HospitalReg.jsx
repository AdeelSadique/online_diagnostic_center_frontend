import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import { FaHospitalUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function HospitalReg() {
  const [passwordShow, setPasswordShow] = useState(false);
  const [regForm, setRegForm] = useState([]);
  const [error, setError] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
    hospital_name: '',
    password: '',
    confirm_password: '',
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const registrationHandler = () => {
    axios
      .post('manager', regForm)
      .then((res) => {
        toast({
          title: 'Thanks for registration!',
          description: 'You can provide your services after verification',
          status: 'success',
          duration: '5000',
          isClosable: true,
        });
        const data = res.data.data;
        const token = res.data.token;
        dispatch({ type: 'isLogged', payload: data });
        localStorage.setItem('userToken', token);
        navigate('/managerDashboard');
      })
      .catch((err) => {
        console.log(err);
        const name = err.response.data.name;
        const email = err.response.data.email;
        const m_address = err.response.data.address;
        const m_contact = err.response.data.contact;
        const hospital_name = err.response.data.hospital_name;
        const m_password = err.response.data.password;
        const confirm_password = err.response.data.confirm_password;
        setError({
          name: name,
          email: email,
          address: m_address,
          contact: m_contact,
          hospital_name: hospital_name,
          password: m_password,
          confirm_password: confirm_password,
        });
      });
  };

  return (
    <>
      <Container p={'8'} maxW={'full'} minH={'79.5vh'}>
        <VStack spacing={4}>
          <Heading size={['md', 'lg']}>Register Your Hospital</Heading>

          <Button w={'20'} h={'20'} borderRadius={'full'} variant={'unstyled'}>
            <FaHospitalUser size={'60'} />
          </Button>
        </VStack>
        <VStack maxW={'full'}>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'flushed'}
                type='text'
                placeholder='Name Here'
                required
                name='name'
                onChange={(e) => setRegForm({ ...regForm, [e.target.name]: e.target.value })}
              />
              <FormHelperText color={'red.500'} display={error.name ? 'block' : 'none'}>
                {error.name}
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'flushed'}
                type='text'
                placeholder='Email Address'
                required
                name='email'
                onChange={(e) => setRegForm({ ...regForm, [e.target.name]: e.target.value })}
              />
              <FormHelperText color={'red.500'} display={error.email ? 'block' : 'none'}>
                {error.email}
              </FormHelperText>
            </FormControl>
          </Stack>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isRequired>
              <FormLabel>Contact</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'flushed'}
                type='text'
                placeholder='Contact No'
                required
                name='contact'
                onChange={(e) => setRegForm({ ...regForm, [e.target.name]: e.target.value })}
              />
              <FormHelperText color={'red.500'} display={error.contact ? 'block' : 'none'}>
                {error.contact}
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Hospital Name</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'flushed'}
                type='text'
                placeholder='Hospital Name'
                required
                name='hospital_name'
                onChange={(e) => setRegForm({ ...regForm, [e.target.name]: e.target.value })}
              />
              <FormHelperText color={'red.500'} display={error.hospital_name ? 'block' : 'none'}>
                {error.hospital_name}
              </FormHelperText>
            </FormControl>
          </Stack>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  focusBorderColor='gray'
                  type={passwordShow ? 'text' : 'password'}
                  variant={'flushed'}
                  placeholder='Password'
                  name='password'
                  onChange={(e) => setRegForm({ ...regForm, [e.target.name]: e.target.value })}
                />
              </InputGroup>
              <FormHelperText color={'red.500'} display={error.password ? 'block' : 'none'}>
                {error.password}
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  focusBorderColor='gray'
                  type={passwordShow ? 'text' : 'password'}
                  variant={'flushed'}
                  placeholder='Confirm Password'
                  name='confirm_password'
                  onChange={(e) => setRegForm({ ...regForm, [e.target.name]: e.target.value })}
                />
                <InputRightElement>
                  <IconButton icon={passwordShow ? <BsEyeSlashFill /> : <BsEyeFill />} variant={'ghost'} onClick={() => setPasswordShow(!passwordShow)} />
                </InputRightElement>
              </InputGroup>
              <FormHelperText color={'red.500'} display={error.confirm_password ? 'block' : 'none'}>
                {error.confirm_password}
              </FormHelperText>
            </FormControl>
          </Stack>
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              focusBorderColor='gray'
              type='text'
              variant={'flushed'}
              placeholder='Address'
              name='address'
              onChange={(e) => setRegForm({ ...regForm, [e.target.name]: e.target.value })}
            />
            <FormHelperText color={'red.500'} display={error.address ? 'block' : 'none'}>
              {error.address}
            </FormHelperText>
          </FormControl>
          <Stack flexDir={['column', 'row']} w={'full'} justifyContent={['stretch', 'center']}>
            <Button alignSelf={'stretch'} colorScheme={'red'} onClick={registrationHandler}>
              Register
            </Button>
            <Button>Clear</Button>
          </Stack>
          <VStack>
            <Heading size={'sm'} mt={4}>
              OR
            </Heading>
            <HStack w={'full'}>
              <Text>Already Registered? </Text>
              <Link to={'/login'}>
                <Button variant={'link'}>Login Now</Button>
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </>
  );
}

export default HospitalReg;
