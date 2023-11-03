import {
  Avatar,
  AvatarBadge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  Text,
  CardFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  InputGroup,
  InputRightElement,
  Select,
  useToast,
  FormHelperText,
  Tag,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { CgChevronDown } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import Tests from '../../Tests';
import { useState } from 'react';
import { BsChatDots, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdRefresh } from 'react-icons/md';
function Patient() {
  const [activeMenu, setActiveMenu] = useState('home');
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const LoggedUser = useSelector((state) => state.isLogged.data);
  const status = useSelector((state) => state.isLogged.isLogged);
  const isLogged = status;
  const userName = LoggedUser.email;

  const logoutHandler = () => {
    const token = localStorage.getItem('userToken');
    axios
      .post(
        'logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast({
          title: 'Logged out',
          duration: '3000',
          status: 'success',
          isClosable: true,
        });
        localStorage.removeItem('userToken');
        dispatch({ type: 'logout' });
        navigate('/login');
      })
      .catch((err) => {
        navigate('/login');
        console.log(err);
      });
  };

  return (
    <>
      <Container maxW={'full'} h={'full'} p={4}>
        <Box pos={'sticky'} zIndex={'overlay'} top={'72px'} bgColor={'white'} pt={4}>
          <HStack justifyContent={'space-between'} alignItems={'center'} wrap={'wrap'}>
            <HStack>
              <Avatar size={['sm', 'md']} name={!isLogged ? null : userName}>
                <AvatarBadge boxSize={'0.9em'} bg={isLogged ? 'green.500' : 'red.500'} />
              </Avatar>
              {isLogged ? <Heading size={['xs', 'sm']}>{userName}</Heading> : <Heading size={'sm'}>Guest</Heading>}
            </HStack>

            <HStack>
              <Menu>
                <MenuButton size={['xs', 'sm', 'md']} as={Button} rightIcon={<CgChevronDown />} colorScheme='red' variant={'outline'}>
                  Account
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setActiveMenu('home')}>Home</MenuItem>
                  <MenuItem onClick={() => setActiveMenu('pro')}>Profile</MenuItem>
                  <MenuItem onClick={() => setActiveMenu('app')}>Appointments</MenuItem>
                  <MenuItem onClick={() => setActiveMenu('re')}>Results</MenuItem>
                  <MenuItem onClick={() => setActiveMenu('upp')}>Update Profile</MenuItem>
                  <MenuItem onClick={() => setActiveMenu('cp')}>Change Password</MenuItem>
                  <Divider />
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
              <IconButton variant={'ghost'} as={'button'} colorScheme='red' onClick={() => setActiveMenu('notification')}>
                <BsChatDots size={'30'} color='red' />
              </IconButton>
            </HStack>
          </HStack>
          <Divider p={2} />
        </Box>

        {activeMenu === 'home' ? (
          <Tests />
        ) : activeMenu === 'pro' ? (
          <Profile />
        ) : activeMenu === 'app' ? (
          <Appointments />
        ) : activeMenu === 're' ? (
          <Results />
        ) : activeMenu === 'upp' ? (
          <UpdateProfile />
        ) : activeMenu === 'cp' ? (
          <ChangePassword />
        ) : activeMenu === 'notification' ? (
          <Notification />
        ) : (
          <Tests />
        )}
      </Container>
    </>
  );
}

const Profile = () => {
  const patient = useSelector((state) => state.isLogged.data);

  return (
    <>
      <Container maxW={'container.lg'} p={4} style={{ minHeight: 'calc(100vh - 265px)' }}>
        <VStack w={'full'} spacing={8}>
          <Tag alignSelf={'flex-end'}>Joined at {patient.created_at}</Tag>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isReadOnly>
              <FormLabel>Patient Name</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='text' value={patient.name} />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Patient Email</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='email' value={patient.email} />
            </FormControl>
          </Stack>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl isReadOnly>
              <FormLabel>Patient Contact</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='text' value={patient.p_contact} />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Patient Blood</FormLabel>
              <Input focusBorderColor='gray' variant={'filled'} type='email' value={patient.p_blood} />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Patient Gender</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'filled'}
                type='email'
                value={patient.p_gender == 'M' ? 'Male' : patient.p_gender == 'F' ? 'Female' : 'Other'}
              />
            </FormControl>
          </Stack>
          <FormControl isReadOnly>
            <FormLabel>Patient Address</FormLabel>
            <Input focusBorderColor='gray' variant={'filled'} type='email' value={patient.p_address} />
          </FormControl>
        </VStack>
      </Container>
    </>
  );
};
const Appointments = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [appointments, setAppointments] = useState([]);
  const [managerQuestion, setManagerQuestion] = useState();
  const [managerId, setManagerId] = useState();
  const [error, setError] = useState({ message: '' });
  const [searchStatus, setSearchStatus] = useState('');
  const loggedUser = useSelector((state) => state.isLogged.data);

  const setManagerIdHandler = (id) => {
    setManagerId(id);
    onOpen();
  };

  const messageSendHandler = (id) => {
    const token = localStorage.getItem('userToken');

    const pId = loggedUser.p_id;
    const mId = id;

    let formData = new FormData();
    formData.append('message', managerQuestion);
    formData.append('m_id', mId);
    formData.append('p_id', pId);

    axios
      .post('managerMessage', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast({
          title: 'You Query is submitted!',
          description: 'You will be notified soon! Please check notification',
          status: 'success',
          duration: '3000',
          isClosable: true,
        });
      })
      .catch((err) => {
        const message = err.response.data.message;
        setError({ message: message });
        console.log(err);
      });
    onClose();
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    axios
      .get(`patientAppointments/${loggedUser.p_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAppointments(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container minW={'full'} p={4} h={'full'}>
        <HStack p={['2', '4']} justifyContent={'center'} borderBottom={'1px'} wrap={'wrap'} mb={4}>
          <Button variant={['link', 'solid']} colorScheme='red' size={['xs', 'sm', 'md']} onClick={() => setSearchStatus('a')}>
            All
          </Button>

          <Button variant={['link', 'outline']} colorScheme='red' size={['xs', 'sm', 'md']} onClick={() => setSearchStatus('analyzing')}>
            Analyzing
          </Button>
          <Button variant={['link', 'outline']} colorScheme='red' size={['xs', 'sm', 'md']} onClick={() => setSearchStatus('b')}>
            Conducted
          </Button>
          <Button variant={['link', 'outline']} colorScheme='red' size={['xs', 'sm', 'md']} onClick={() => setSearchStatus('p')}>
            Pending
          </Button>
          <Button variant={['link', 'outline']} colorScheme='red' size={['xs', 'sm', 'md']} onClick={() => setSearchStatus('c')}>
            Confirmed
          </Button>
          <Button variant={['link', 'outline']} colorScheme='red' size={['xs', 'sm', 'md']} onClick={() => setSearchStatus('r')}>
            Rejected
          </Button>
        </HStack>

        <SimpleGrid templateColumns={'repeat(auto-fill, minmax(280px, 1fr))'} spacing={4}>
          {appointments.map((a, i) => {
            switch (searchStatus) {
              case 'a':
                return <AppointmentCard key={i} a={a} i={i} setManagerIdHandler={setManagerIdHandler} />;
                break;
              case 'analyzing':
                return a.ap_status === 3 ? <AppointmentCard key={i} a={a} i={i} setManagerIdHandler={setManagerIdHandler} /> : null;
                break;
              case 'b':
                return a.ap_status === 4 ? <AppointmentCard key={i} a={a} i={i} setManagerIdHandler={setManagerIdHandler} /> : null;
                break;
              case 'p':
                return a.ap_status === 0 ? <AppointmentCard key={i} a={a} i={i} setManagerIdHandler={setManagerIdHandler} /> : null;
                break;
              case 'c':
                return a.ap_status === 1 ? <AppointmentCard key={i} a={a} i={i} setManagerIdHandler={setManagerIdHandler} /> : null;
                break;
              case 'r':
                return a.ap_status === 2 ? <AppointmentCard key={i} a={a} i={i} setManagerIdHandler={setManagerIdHandler} /> : null;
                break;

              default:
                return <AppointmentCard key={i} a={a} i={i} setManagerIdHandler={setManagerIdHandler} />;
                break;
            }
          })}
        </SimpleGrid>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size={['full', 'full', '2xl']} closeOnEsc>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton></ModalCloseButton>

          <ModalHeader>Feel free to ask anything</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea rows={6} placeholder='Write your query here' value={managerQuestion} onChange={(e) => setManagerQuestion(e.target.value)} />
              <FormHelperText color={'red.500'} display={error.message ? 'block' : 'none'}>
                {error.message}
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme='red' onClick={() => messageSendHandler(managerId)}>
                Send
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const AppointmentCard = ({ a, i, setManagerIdHandler }) => {
  const [rating, setRating] = useState(0);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [apId, setApId] = useState();
  const [pId, setPId] = useState();
  const [tId, setTid] = useState();
  const [feedback, setFeedback] = useState();
  const manager = useSelector((state) => state.isLogged.data);
  const setIdHandler = (data) => {
    setApId(data[0]);
    setPId(data[1]);
    setTid(data[2]);
    onOpen();
  };
  const Review = () => {
    let form = new FormData();

    form.append('ap_id', apId);
    form.append('p_id', pId);
    form.append('t_id', tId);
    form.append('m_id', manager.m_id);
    form.append('rating', rating);
    form.append('feedback', feedback);

    const token = localStorage.getItem('userToken');
    rating != 0
      ? axios
          .post('rating', form, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            toast({
              title: 'Thanks for rating!',
              status: 'success',
              duration: '3000',
              isClosable: true,
            });
            onClose();
          })
          .catch((err) => {
            console.log(err);

            toast({
              title: err.response.data.feedback,
              status: 'error',
              duration: '3000',
              isClosable: true,
            });
          })
      : toast({
          title: 'Rating field is required',
          status: 'error',
          duration: '3000',
          isClosable: true,
        });
  };

  return (
    <>
      <Card boxShadow={'md'} variant={'filled'} key={i}>
        <CardHeader textAlign={'center'} p={2}>
          <HStack justifyContent={'space-between'}>
            <Tag variant={'solid'}>
              Status :{' '}
              {a.ap_status === 2 ? 'Canceled' : a.ap_status === 1 ? 'Confirmed' : a.ap_status === 3 ? 'Analyzing' : a.ap_status === 4 ? 'Conducted' : 'Pending'}
            </Tag>
            <Tag variant={'outline'} size={'sm'}>
              {a.created_at}
            </Tag>
          </HStack>
        </CardHeader>
        <CardBody textAlign={'center'} p={2}>
          <VStack alignItems={'flex-start'}>
            <HStack justifyContent={'space-between'} w={'full'}>
              <Heading size={['xs', 'sm']}>Appointment ID :</Heading>
              <Text>{a.ap_id}</Text>
            </HStack>
            <HStack justifyContent={'space-between'} w={'full'}>
              <Heading size={['xs', 'sm']}>Appointment Type :</Heading>
              <Text>{a.ap_type}</Text>
            </HStack>
            <HStack justifyContent={'space-between'} w={'full'}>
              <Heading size={['xs', 'sm']}>Test Name :</Heading>
              <Text>{a.test.t_name}</Text>
            </HStack>
            <HStack justifyContent={'space-between'} w={'full'}>
              <Heading size={['xs', 'sm']}>Test Category :</Heading>
              <Text>{a.test.t_category}</Text>
            </HStack>
            <HStack justifyContent={'space-between'} w={'full'}>
              <Heading size={['xs', 'sm']}>Test Fee :</Heading>
              <Text>{a.test.t_price}</Text>
            </HStack>
            <HStack justifyContent={'space-between'} w={'full'}>
              <Heading size={['xs', 'sm']}>Bill Status :</Heading>
              <Text>{a.b_status ? 'Paid' : 'unpaid'}</Text>
            </HStack>
            <HStack justifyContent={'space-between'} w={'full'}>
              <Heading size={['xs', 'sm']}>Appointment Date :</Heading>
              <Text>{a.ap_date}</Text>
            </HStack>
            <Stack flexDir={['column', 'row']} alignItems={'flex-start'} justifyContent={'space-between'} w={'full'}>
              <Heading size={['xs', 'sm']}>Appointment Time :</Heading>
              <Text>{a.test.reporting_time}</Text>
            </Stack>
            <HStack justifyContent={'space-between'} w={'full'}>
              <Heading size={['xs', 'sm']}>Hospital Name :</Heading>
              <Text>{a.test.manager.hospital_name}</Text>
            </HStack>
            <VStack alignItems={'flex-start'} w={'full'}>
              <Heading size={['xs', 'sm']} alignSelf={'center'}>
                Hospital Address
              </Heading>
              <Text>{a.test.t_location}</Text>
            </VStack>
          </VStack>
        </CardBody>
        <CardFooter>
          <HStack w={'full'} justifyContent={'space-between'}>
            <Button variant={'solid'} colorScheme='red' onClick={() => setManagerIdHandler(a.m_id)}>
              Chat
            </Button>
            {a.ap_status === 3 || a.ap_status === 4 ? (
              <Button onClick={() => setIdHandler([a.ap_id, a.p_id, a.t_id])} variant={'outline'} colorScheme='red'>
                Review Now
              </Button>
            ) : (
              ''
            )}
          </HStack>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size={['full', 'xl']} closeOnEsc>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton></ModalCloseButton>

          <ModalHeader>Review you experience </ModalHeader>
          <ModalBody>
            <VStack>
              <HStack justifyContent={'center'}>
                {[...Array(5)].map((_, i) => {
                  const starVal = i + 1;
                  return starVal <= rating ? (
                    <AiFillStar size={'30'} onClick={() => setRating(starVal)} key={i} />
                  ) : (
                    <AiOutlineStar size={'30'} onClick={() => setRating(starVal)} key={i} />
                  );
                })}
              </HStack>

              <FormControl>
                <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4} placeholder='Share you feedback' />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button onClick={onClose}>Close</Button>
              <Button colorScheme='red' onClick={Review}>
                Review
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Results = () => {
  const [reports, setReports] = useState([]);
  const token = localStorage.getItem('userToken');
  const loggedUser = useSelector((state) => state.isLogged.data);
  const toast = useToast();

  const downloadHandler = (file) => {
    axios
      .get(`downloadReport/${file}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          responseType: 'blob',
        },
      })
      .then((res) => {
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', file);
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        err.response.status === 404
          ? toast({
              title: 'Report not available',
              description: 'or maybe deleted from server',
              status: 'error',
              duration: '3000',
              isClosable: true,
            })
          : console.log(err);
      });
  };

  useEffect(() => {
    const id = loggedUser.p_id;
    axios
      .get(`patientReports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setReports(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container maxW={['full', '2xl', '4xl']} p={['0', '2']}>
        <Heading size={'md'} textAlign={'center'} p={2}>
          Result Section
        </Heading>

        <TableContainer>
          <Table size={['sm', 'sm', 'md']} variant={'striped'}>
            <Thead>
              <Tr>
                <Th>Appointment ID</Th>
                <Th>Test Name</Th>
                <Th>Test Fee</Th>
                <Th>Appoitnment D/T</Th>
                <Th>Result</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reports.map((r, i) => {
                return r.appointment.ap_status === 3 || r.appointment.ap_status === 4 ? (
                  <Tr key={i}>
                    <Td>{r.ap_id}</Td>
                    <Td>{r.appointment.test.t_name}</Td>
                    <Td>{r.appointment.test.t_price}</Td>
                    <Td>
                      {r.appointment.ap_date} {r.appointment.test.reporting_time}
                    </Td>
                    <Td>
                      <Button size={'xs'} variant={'link'} onClick={() => downloadHandler(r.r_file)}>
                        {r.r_status == 0 ? 'Not Uploaded yet' : 'Download'}
                      </Button>
                    </Td>
                  </Tr>
                ) : null;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};
const UpdateProfile = () => {
  const patient = useSelector((state) => state.isLogged.data);
  const [changeForm, setChangeForm] = useState([]);
  const [contactError, setContactError] = useState();
  const toast = useToast();
  const dispatch = useDispatch();

  const profileUpdateHandler = () => {
    const id = patient.p_id;
    axios
      .put(`patient/${id}`, changeForm, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        console.log(res.data);
        toast({
          title: 'Profile updated',
          duration: '3000',
          status: 'success',
          isClosable: true,
        });
        const data = res.data.data;
        dispatch({ type: 'isLogged', payload: data });
      })
      .catch((err) => {
        const error = err.response.data.p_contact;
        setContactError(error.toString().slice(6, 50));
        console.log(error);
      });
  };

  return (
    <>
      <Container maxW={['full', '4xl', '6xl']}>
        <Heading p={2} size={'md'} textAlign={'center'}>
          Update Profile
        </Heading>

        <VStack w={'full'} spacing={8}>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl>
              <FormLabel>Patient Name ({patient.name})</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'filled'}
                type='text'
                name='name'
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Patient Contact ({patient.p_contact})</FormLabel>
              <Input
                focusBorderColor='gray'
                variant={'filled'}
                type='text'
                name='p_contact'
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
              />
              <FormHelperText color={'red.500'} display={contactError ? 'block' : 'none'}>
                {contactError}
              </FormHelperText>
            </FormControl>
          </Stack>
          <Stack flexDir={['column', 'row']} w={'full'}>
            <FormControl>
              <FormLabel>Patient Blood ({patient.p_blood})</FormLabel>
              <Select
                name='p_blood'
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                focusBorderColor='gray'
                variant={'filled'}
              >
                <option defaultChecked>Choose</option>
                <option value={'O+'}>O+</option>
                <option value={'O-'}>O-</option>
                <option value={'A+'}>A+</option>
                <option value={'A-'}>A-</option>
                <option value={'AB+'}>AB+</option>
                <option value={'AB-'}>AB-</option>
                <option value={'B+'}>B+</option>
                <option value={'B-'}>B-</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Patient Gender ({patient.p_gender == 'M' ? 'Male' : patient.p_gender == 'F' ? 'Female' : 'Other'})</FormLabel>

              <Select
                name='p_gender'
                focusBorderColor='gray'
                variant={'filled'}
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
              >
                <option defaultChecked>Choose</option>
                <option value={'M'}>Male</option>
                <option value={'F'}>Female</option>
                <option value={'O'}>Other</option>
              </Select>
            </FormControl>
          </Stack>
          <FormControl>
            <FormLabel>Patient Address ({patient.p_address})</FormLabel>
            <Input
              focusBorderColor='gray'
              variant={'filled'}
              type='text'
              name='p_address'
              onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
            />
          </FormControl>

          <Stack flexDir={['column', 'row']} alignSelf={['stretch', 'flex-end']}>
            <Button colorScheme='red' onClick={profileUpdateHandler}>
              Change
            </Button>
          </Stack>
        </VStack>
      </Container>
    </>
  );
};
const ChangePassword = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [changeForm, setChangeForm] = useState([]);
  const [error, setError] = useState({ oldPass: '', newPass: '', confirmPass: '' });
  const toast = useToast();
  const navigate = useNavigate();

  const patient = useSelector((state) => state.isLogged.data);
  const passwordUpdateHandler = () => {
    const id = patient.p_id;
    axios
      .put(`patient/changePassword/${id}`, changeForm, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
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
      <Container size={['full', '6xl']}>
        <VStack>
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

          <Stack flexDir={['column', 'row']} alignSelf={['stretch', 'flex-end']}>
            <Button colorScheme='red' onClick={passwordUpdateHandler}>
              Update
            </Button>
          </Stack>
        </VStack>
      </Container>
    </>
  );
};
const Notification = () => {
  const patient = useSelector((state) => state.isLogged.data);
  const [chat, setChat] = useState([]);
  const refreshChat = () => {
    refreshChat();
  };
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const id = patient.p_id;
    axios
      .get(`patientMessage/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setChat(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshChat]);

  return (
    <>
      <Container maxW={'container.lg'} p={['0', '4']} style={{ minHeight: 'calc(100vh - 265px)' }}>
        <VStack w={'full'} spacing={8}>
          <VStack w={'full'} alignItems={'center'} overflowX={'auto'}>
            <VStack w={['full', '80%']} bgColor={'whitesmoke'} boxShadow={'lg'} p={['2', '4']} borderRadius={'xl'} border={'1px solid black'}>
              <IconButton size={'sm'} variant={'ghost'} colorScheme='black' alignSelf={'flex-end'} onClick={refreshChat}>
                <MdRefresh />
              </IconButton>
              {chat.map((c, i) => (
                <>
                  <Heading size={'sm'} alignSelf={'flex-start'} key={i}>
                    {c.message}
                  </Heading>

                  <VStack alignSelf={'flex-end'}>
                    <Tag size={'sm'} alignSelf={'flex-end'}>
                      {c.manager.email}
                    </Tag>
                    <Text>{!c.reply ? 'Not replied' : c.reply}</Text>
                  </VStack>
                </>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};

export default Patient;
