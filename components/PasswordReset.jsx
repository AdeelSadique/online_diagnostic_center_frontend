import {
  Button,
  Container,
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
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

function PasswordReset() {
  const initialSignUpForm = { password: '', confirm_password: '' };
  const [signupForm, setSignupForm] = useState(initialSignUpForm);
  const [passwordShow, setPasswordShow] = useState(false);
  const [error, setError] = useState({
    password: '',
    confirm_password: '',
  });
  const toast = useToast();
  const [searchParams] = useSearchParams(window.location.search);
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const signupHandler = () => {
    axios
      .post(`passwordReset?token=${token}`, signupForm)
      .then((res) => {
        console.log(res);
        toast({
          title: 'Your Password is reset',
          duration: '3000',
          status: 'success',
          isClosable: true,
        });
        navigate('/login');
      })
      .catch((err) => {
        const error = err.response.data;
        console.log(error);

        setError({
          password: error.password,
          confirm_password: error.confirm_password || 'Invalid Token or Expired! Try agian',
        });
      });
  };

  return (
    <>
      <Container maxW={'container.sm'} p={8}>
        <VStack>
          <Heading size={'md'}>Create your new password</Heading>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              focusBorderColor='gray'
              type={passwordShow ? 'text' : 'password'}
              variant={'flushed'}
              placeholder='Password'
              name='password'
              value={signupForm.password}
              onChange={(e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })}
            />
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
                value={signupForm.confirm_password}
                onChange={(e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })}
              />
              <InputRightElement>
                <IconButton icon={passwordShow ? <BsEyeSlashFill /> : <BsEyeFill />} variant={'ghost'} onClick={(e) => setPasswordShow(!passwordShow)} />
              </InputRightElement>
            </InputGroup>
            <FormHelperText color={'red.500'} display={error.confirm_password ? 'block' : 'none'}>
              {error.confirm_password}
            </FormHelperText>
          </FormControl>
          <Stack flexDir={['column', 'row']} justifyContent={'center'} alignSelf={'stretch'}>
            <Button type={'submit'} colorScheme={'red'} onClick={signupHandler}>
              Submit
            </Button>
            <Button type='reset' onClick={() => setSignupForm(initialSignUpForm)}>
              Clear
            </Button>
          </Stack>
        </VStack>
      </Container>
    </>
  );
}

export default PasswordReset;
