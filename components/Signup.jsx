import React, { useState } from 'react';
import {
  Avatar,
  Button,
  ButtonGroup,
  Checkbox,
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
  ListItem,
  Radio,
  RadioGroup,
  Select,
  SelectField,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { BsEye, BsEyeFill, BsEyeSlash, BsEyeSlashFill, BsEyedropper, BsEyeglasses } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { GiEyeOfHorus, GiEyeball } from 'react-icons/gi';
import { AiFillEye } from 'react-icons/ai';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function Signup() {
  // it is used to set div top 0
  // {
  //   window.scrollTo(0, 0);
  // }
  const [passwordShow, setPasswordShow] = useState(false);
  const initialSignUpForm = { name: '', email: '', password: '', confirm_password: '', address: '', contact: '', gender: '', dob: '', blood: '' };
  const [signupForm, setSignupForm] = useState(initialSignUpForm);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
    dob: '',
    gender: '',
    password: '',
    confirm_password: '',
  });
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupHandler = () => {
    !agree
      ? toast({
          title: 'Please agree the check box',
          duration: '3000',
          status: 'error',
          isClosable: true,
        })
      : axios
          .post('patient', signupForm)
          .then((res) => {
            // console.log(res);
            toast({
              title: 'Thanks for registration',
              duration: '3000',
              status: 'success',
              isClosable: true,
            });
            const data = res.data.data;
            const token = res.data.token;
            dispatch({ type: 'isLogged', payload: data });
            localStorage.setItem('userToken', token);
            navigate('/patientDashboard');
          })
          .catch((err) => {
            const error = err.response.data;
            console.log(error);

            setError({
              name: error.name,
              email: error.email,
              address: error.address,
              contact: error.contact,
              dob: error.dob,
              gender: error.gender,
              password: error.password,
              confirm_password: error.confirm_password,
            });
          });
  };

  return (
    <>
      <Container maxW={'full'} h={'full'} p={4} style={{ minHeight: 'calc(100vh - 121px)' }}>
        <Stack w={['full', 'full', '46em']} margin={'auto'} boxShadow={['none', 'none', 'lg']} borderRadius={'xl'}>
          <VStack spacing={4} w={['full', 'full', '36em']} margin={'auto'} mt={['2', '4']} mb={4}>
            <Heading size={['md', 'lg']}>Create Account</Heading>
            <Avatar size={['md', 'lg']} />
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
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })}
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
                  type='email'
                  placeholder='Email Here'
                  name='email'
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })}
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
                  placeholder='Phone Number'
                  name='contact'
                  value={signupForm.contact}
                  onChange={(e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })}
                />
                <FormHelperText color={'red.500'} display={error.contact ? 'block' : 'none'}>
                  {error.contact}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Blood Group (Optional)</FormLabel>

                <Select
                  focusBorderColor='gray'
                  variant={'flushed'}
                  placeholder='Select Group'
                  name='blood'
                  value={signupForm.blood}
                  onChange={(e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })}
                >
                  <option value={'O+'}>O+</option>
                  <option value={'O-'}>O-</option>
                  <option value={'B+'}>B+</option>
                  <option value={'B-'}>B-</option>
                  <option value={'AB+'}>AB+</option>
                  <option value={'AB-'}>AB-</option>
                  <option value={'A-'}>A-</option>
                  <option value={'A+'}>A+</option>
                </Select>
              </FormControl>
            </Stack>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                focusBorderColor='gray'
                placeholder='Address Here'
                variant={'flushed'}
                name='address'
                value={signupForm.address}
                onChange={(e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })}
              />
              <FormHelperText color={'red.500'} display={error.address ? 'block' : 'none'}>
                {error.address}
              </FormHelperText>
            </FormControl>

            <Stack flexDir={['column', 'row']} w={'full'}>
              <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <RadioGroup>
                  <HStack overflow={'auto'}>
                    <Text>Male</Text>
                    <Radio value='M' name='gender' onChange={(e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })} />
                    <Text>Female</Text>
                    <Radio value='F' name='gender' onChange={(e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })} />
                    <Text>Other</Text>
                    <Radio value='O' name='gender' onChange={(e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })} />
                  </HStack>
                </RadioGroup>
                <FormHelperText color={'red.500'} display={error.gender ? 'block' : 'none'}>
                  {error.gender}
                </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>DOB</FormLabel>
                <Input type='date' name='dob' value={signupForm.dob} onChange={(e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })} />
                <FormHelperText color={'red.500'} display={error.dob ? 'block' : 'none'}>
                  {error.dob}
                </FormHelperText>
              </FormControl>
            </Stack>

            <Stack flexDir={['column', 'row']} w={'full'}>
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
            </Stack>

            <FormControl isRequired>
              <HStack>
                <Checkbox iconColor='red' borderColor={'gray'} name='agree' onChange={() => setAgree(!agree)}>
                  I declare by all the provided information is true.
                </Checkbox>
              </HStack>
            </FormControl>

            <Stack flexDir={['column', 'row']} justifyContent={'center'} alignSelf={'stretch'}>
              <Button type={'submit'} colorScheme={'red'} onClick={signupHandler}>
                Submit
              </Button>
              <Button type='reset' onClick={() => setSignupForm(initialSignUpForm)}>
                Clear
              </Button>
            </Stack>
            <HStack alignSelf={'flex-end'} mt={4}>
              <Text>Already have an account?</Text>
              <Link to={'/login'} onClick={(e) => window.scrollTo({ top: '0', behavior: 'smooth' })}>
                <Button variant={'link'}>Login Now</Button>
              </Link>
            </HStack>
          </VStack>
        </Stack>
      </Container>
    </>
  );
}

export default Signup;
