import {
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [passwordShow, setPasswordShow] = useState(false);
  const [changeForm, setChangeForm] = useState([]);
  const [error, setError] = useState({ oldPass: '', newPass: '', confirmPass: '' });
  const toast = useToast();
  const navigate = useNavigate();

  const manager = useSelector((state) => state.isLogged.data);
  const passwordUpdateHandler = () => {
    const id = manager.m_id;
    axios
      .put(`manager/changePassword/${id}`, changeForm, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        toast({
          title: 'Password updated',
          description: 'Please Login',
          duration: '5000',
          status: 'success',
          isClosable: true,
        });
        navigate('/login');
      })
      .catch((err) => {
        console.log(err.response);
        const oldPass = err.response.data.old_password;
        const newPass = err.response.data.new_password;
        const confirmPass = err.response.data.confirm_password;
        const invalid = err.response.data.invalid;
        const same = err.response.data.same;
        setError({
          oldPass: oldPass || invalid || same,
          newPass: newPass,
          confirmPass: confirmPass,
        });
      });
  };

  return (
    <>
      <Container maxW={'container.lg'} p={4} style={{ minHeight: 'calc(100vh - 265px)' }}>
        <Heading size={'md'} p={2} textAlign={'center'}>
          Change Password
        </Heading>
        <VStack maxW={['full', 'xl']} margin={'auto'} p={4}>
          <FormControl isRequired>
            <FormLabel>Old Password</FormLabel>
            <InputGroup>
              <Input
                focusBorderColor='gray'
                type={passwordShow ? 'text' : 'password'}
                variant={'outline'}
                placeholder='Old Password'
                name='old_password'
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
              />
            </InputGroup>
            <FormHelperText color={'red.500'} display={error.oldPass ? 'block' : 'none'}>
              {error.oldPass}
            </FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                focusBorderColor='gray'
                type={passwordShow ? 'text' : 'password'}
                variant={'outline'}
                placeholder='New Password'
                name='new_password'
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
              />
            </InputGroup>
            <FormHelperText color={'red.500'} display={error.newPass ? 'block' : 'none'}>
              {error.newPass}
            </FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                focusBorderColor='gray'
                type={passwordShow ? 'text' : 'password'}
                variant={'outline'}
                placeholder='Confirm Password'
                name='confirm_password'
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
              />
              <InputRightElement>
                <IconButton icon={passwordShow ? <BsEyeSlashFill /> : <BsEyeFill />} variant={'ghost'} onClick={() => setPasswordShow(!passwordShow)} />
              </InputRightElement>
            </InputGroup>
            <FormHelperText color={'red.500'} display={error.confirmPass ? 'block' : 'none'}>
              {error.confirmPass}
            </FormHelperText>
          </FormControl>

          <Stack flexDir={['column', 'row']} alignSelf={['stretch', 'center']}>
            <Button>Cancel</Button>
            <Button colorScheme='red' onClick={passwordUpdateHandler}>
              Update
            </Button>
          </Stack>
        </VStack>
      </Container>
    </>
  );
}

export default ChangePassword;
