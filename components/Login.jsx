import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  VStack,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Checkbox,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalBody,
  useDisclosure,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlash, BsEyeSlashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Login() {
  const toast = useToast();
  const [passwordShow, setPasswordShow] = useState(false);
  const [loginForm, setLoginForm] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState();

  const { token } = useParams();
  const passwordResetSendHandler = () => {
    axios
      .post('passwordResetRequest', email)
      .then((res) => {
        toast({
          title: 'Please Check Your Email',
          description: res.data.message,
          status: 'success',
          isClosable: true,
          duration: '5000',
        });
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Invalid Credentials',
          description: err.response.data.message,
          status: 'error',
          isClosable: true,
          duration: '5000',
        });
      });
  };

  const loginHandler = () => {
    axios
      .post('login', loginForm)
      .then((res) => {
        toast({
          title: 'Logged In',
          status: 'success',
          isClosable: true,
          duration: '3000',
        });

        const data = res.data.data;
        const userType = res.data.data.user_type;
        const token = res.data.token;
        dispatch({ type: 'isLogged', payload: data });
        localStorage.setItem('userToken', token);

        if (userType === '2') {
          navigate('/adminDashboard');
        } else if (userType === '1') {
          navigate('/managerDashboard');
        } else if (userType === '0') {
          navigate('/patientDashboard');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data === 'invalid credentials') {
          toast({
            title: 'Invalid Credentials',
            status: 'error',
            isClosable: true,
            duration: '3000',
          });
        }
        setPasswordError(err.response.data.password);
        setEmailError(err.response.data.email);
      });
  };

  return (
    <>
      <Container maxW={'full'} h={'full'} p={4} style={{ minHeight: 'calc(100vh - 121px)' }}>
        <VStack spacing={4} maxW={['full', 'full', '46em']} p={2} margin={'auto'} boxShadow={['none', 'none', 'xs']} borderRadius={'lg'}>
          <Heading size={['md', 'lg']} textAlign={'center'} mb={2}>
            Welcome Back
          </Heading>
          <Avatar size={['md', 'lg']}></Avatar>
          <VStack w={['full', 'full', '30em']} p={['0', '4']}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                variant={'flushed'}
                placeholder='XYZ@domain.com'
                focusBorderColor='gray'
                type='email'
                name='email'
                onChange={(e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value })}
              />

              <FormHelperText color={'red.500'} display={emailError ? 'block' : 'none'}>
                {emailError}
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={passwordShow ? 'text' : 'password'}
                  variant={'flushed'}
                  placeholder='Password'
                  focusBorderColor='gray'
                  name='password'
                  onChange={(e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value })}
                />
                <InputRightElement>
                  <IconButton icon={passwordShow ? <BsEyeSlashFill /> : <BsEyeFill />} variant={'ghost'} onClick={() => setPasswordShow(!passwordShow)} />
                </InputRightElement>
              </InputGroup>
              <FormHelperText color={'red.500'} display={passwordError ? 'block' : 'none'}>
                {passwordError}
              </FormHelperText>
            </FormControl>
            <Button alignSelf={'stretch'} colorScheme={'red'} onClick={loginHandler}>
              Login
            </Button>

            <Button alignSelf={'stretch'} variant={'link'} onClick={onOpen}>
              Forgot Password
            </Button>
            <Heading size={'sm'} mt={4}>
              OR
            </Heading>
            <HStack w={'full'} justifyContent={'flex-end'}>
              <Text>Don't have an account? </Text>
              <Link to={'/signup'} onClick={() => window.scrollTo({ top: '0', behavior: 'smooth' })}>
                <Button variant={'link'}>Signup Now</Button>
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Container>

      {/* forgot password modal */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton></ModalCloseButton>

          <ModalHeader>Reset Password</ModalHeader>
          <ModalBody>
            <Text>Provide email here</Text>
            <Input placeholder='Email Address' name='email' onChange={(e) => setEmail({ ...email, [e.target.name]: e.target.value })} />
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme='red' onClick={passwordResetSendHandler}>
                Send
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;
