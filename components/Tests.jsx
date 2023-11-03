import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  HStack,
  Heading,
  Text,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  VStack,
  useDisclosure,
  FormLabel,
  FormControl,
  Textarea,
  Stack,
  Tag,
  useToast,
  FormHelperText,
  RadioGroup,
  Radio,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillStar, AiOutlineSearch, AiOutlineStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { GiHospital } from 'react-icons/gi';
import Loader from '../src/Loader';
import { BiUpArrowCircle } from 'react-icons/bi';

function Tests() {
  const isLogged = useSelector((state) => state.isLogged.isLogged);
  const [tests, setTests] = useState([]);
  const [activeTests, setActiveTests] = useState([]);
  const [search, setSearch] = useState();
  const [searchValue, setSearchValue] = useState();
  const [managerQuestion, setManagerQuestion] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAppRegOpen, onOpen: onAppRegOpen, onClose: onAppRegClose } = useDisclosure();
  const toast = useToast();
  const [error, setError] = useState({ message: '' });
  const [testId, setTestId] = useState('');
  const [testInfo, setTestInfo] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState([]);

  const patient = useSelector((state) => state.isLogged.data);
  const searchData = useSelector((state) => state.search.initialValue);
  const [loading, setLoading] = useState(true);
  const [scrollButton, setScrollButton] = useState('none');
  const [feedback, setFeedback] = useState([]);
  // scrolling to the top

  const scrollVisibleHandler = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setScrollButton('block');
    } else if (scrolled < 300) {
      setScrollButton('none');
    }
  };

  const filteredTests = tests.filter((test) => {
    return test.t_status;
  });

  const searchHandler = () => {
    setSearchValue(search);
  };
  const setTestIdHandler = (id) => {
    setTestId(id);
    onOpen();
  };

  const appointmentHandler = (test) => {
    if (isLogged) {
      setTestInfo(test);
      onAppRegOpen();
    } else {
      toast({
        title: 'You are not logged!',
        description: 'Create account or login first',
        status: 'warning',
        duration: '3000',
        isClosable: true,
      });
      navigate('/login');
    }
  };
  const bookAppointment = () => {
    const pId = patient.p_id;
    const mId = testInfo.manager.m_id;
    const tId = testInfo.t_id;
    const ap_type = appointmentType;
    const ap_date = appointmentDate;
    const t_amount = testInfo.t_price;
    let formData = new FormData();

    formData.append('m_id', mId);
    formData.append('p_id', pId);
    formData.append('t_id', tId);
    formData.append('ap_type', ap_type);
    formData.append('ap_date', ap_date);
    formData.append('b_amount', t_amount);

    const token = localStorage.getItem('userToken');
    axios
      .post('appointment', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast({
          title: 'Your Appointment is Booked!',
          description: 'You will be notified soon',
          status: 'success',
          duration: '3000',
          isClosable: true,
        });
        onAppRegClose();
      })
      .catch((err) => {
        const error = err.response.data;
        toast({
          title: error.b_amount || error.ap_date || error.ap_type,
          status: 'error',
          duration: '3000',
          isClosable: true,
        });

        console.log(err);
      });
  };

  const messageSendHandler = (id) => {
    const token = localStorage.getItem('userToken');

    const pId = patient.p_id;
    const mId = id;

    let formData = new FormData();
    formData.append('m_id', mId);
    formData.append('p_id', pId);
    formData.append('message', managerQuestion);

    axios
      .post('managerMessage', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast({
          title: 'You Query is submitted!',
          description: 'You will be notified soon! Please check notification',
          status: 'success',
          duration: '3000',
          isClosable: true,
        });
        onClose();
      })
      .catch((err) => {
        const message = err.response.data.message;
        setError({ message: message });
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');

    axios
      .get('test', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTests(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });

    axios
      .get(`rating`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRating(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (searchData != '') {
      setSearch(searchData);
      dispatch({ type: 'search', payload: '' });
    } else {
      setSearch(search);
    }

    axios
      .get('feedback')
      .then((res) => {
        setFeedback(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [rating, tests]);
  window.addEventListener('scroll', scrollVisibleHandler);
  return (
    <>
      <Container maxW={'full'} h={'full'} p={4} overflow={'auto'}>
        <IconButton
          display={`${scrollButton}`}
          w={'10'}
          h={'10'}
          pos={'fixed'}
          zIndex={'overlay'}
          top={'90%'}
          left={['85%', '90%', '92%', '95%']}
          colorScheme='red'
          borderRadius={'full'}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <BiUpArrowCircle size={'40'} />
        </IconButton>
        <Stack flexDir={['column', 'row']} alignItems={'center'} p={4} maxW={'full'} justifyContent={'flex-end'}>
          <Input maxW={'lg'} focusBorderColor='black' value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button bgColor={'red.500'} w={['full', '12']} h={'12'} borderRadius={['4', 'full']} onClick={searchHandler}>
            <AiOutlineSearch size={'20'} />
          </Button>
        </Stack>

        <SimpleGrid templateColumns={'repeat(auto-fill, minmax(240px, 1fr))'} spacing={4}>
          {loading ? (
            <Loader />
          ) : (
            filteredTests.map((test) =>
              test.t_name.toLowerCase().match(searchValue || search) ||
              test.t_price.toString().match(searchValue || search) ||
              test.t_location.toLowerCase().match(searchValue || search) ||
              test.reporting_time.toLowerCase().match(searchValue || search) ? (
                <Card boxShadow={'md'} variant={'filled'} key={test.t_id}>
                  <CardHeader textAlign={'center'}>
                    <HStack justifyContent={'space-between'}>
                      <Heading size={'md'}>{test.t_name}</Heading>
                      <Tag variant={'solid'}>{<RatingComponent rating={rating} id={test.t_id} />}</Tag>
                    </HStack>
                  </CardHeader>
                  <CardBody textAlign={'center'}>
                    <VStack alignItems={'flex-start'}>
                      <HStack>
                        <Heading size={['sm', 'md']}>Categ:</Heading>
                        <Text>{test.t_category}</Text>
                      </HStack>
                      <HStack>
                        <Heading size={['sm', 'md']}>Time:</Heading>
                        <Text>{test.reporting_time}</Text>
                      </HStack>
                      <HStack>
                        <Heading size={['sm', 'md']}>Fee:</Heading>
                        <Text>{test.t_price}</Text>
                      </HStack>
                      <HStack>
                        <Heading size={['sm', 'md']}>Addr:</Heading>
                        <Text>{test.t_location}</Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                  <CardFooter>
                    <Button colorScheme='red' margin={'auto'} borderRadius={'3xl'} onClick={() => appointmentHandler(test)}>
                      Book Test
                    </Button>
                    <Button colorScheme='red' variant={'outline'} margin={'auto'} borderRadius={'3xl'} onClick={() => setTestIdHandler(test.m_id)}>
                      Contact
                    </Button>
                  </CardFooter>
                </Card>
              ) : null
            )
          )}
        </SimpleGrid>
      </Container>
      {/* contact with diagnostic center modal */}
      {isLogged ? (
        <Modal isOpen={isOpen} onClose={onClose} size={['full', '2xl', '2xl']} closeOnEsc>
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
                <Button colorScheme='red' onClick={() => messageSendHandler(testId)}>
                  Send
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose} size={['full', 'full', '2xl']} closeOnEsc>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton></ModalCloseButton>

            <ModalHeader>You are not logged in</ModalHeader>
            <ModalBody>
              <Text>Please Login First</Text>
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Button onClick={onClose}>Cancel</Button>
                <Link to={'/login'}>
                  <Button colorScheme='red'>Login</Button>
                </Link>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Appointment Registeration modal */}
      <Modal isOpen={isAppRegOpen} onClose={onAppRegClose} size={['full', '2xl']} closeOnEsc>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton></ModalCloseButton>

          <ModalHeader>Book Your Appointment </ModalHeader>
          <ModalBody>
            <Stack flexDir={['column', 'row']} justifyContent={'space-around'}>
              <VStack width={'100%'} p={4} alignItems={'flex-start'} border={'1px solid whitesmoke'} borderRadius={'lg'}>
                <VStack alignSelf={'center'}>
                  <GiHospital size={'60'} />
                </VStack>
                <HStack justifyContent={'space-between'} w={'full'}>
                  <Heading size={'sm'}>Patient Name:</Heading>
                  <Text>{patient.name}</Text>
                </HStack>
                <HStack justifyContent={'space-between'} w={'full'}>
                  <Heading size={'sm'}>Patient Email:</Heading>
                  <Text>{patient.email}</Text>
                </HStack>
                <HStack justifyContent={'space-between'} w={'full'}>
                  <Heading size={'sm'}>Patient Contact:</Heading>
                  <Text>{patient.p_contact}</Text>
                </HStack>
                <VStack w={'full'}>
                  <Heading size={'sm'} alignSelf={'center'}>
                    Patient Address:
                  </Heading>
                  <Text alignSelf={'flex-start'}>{patient.p_address}</Text>
                </VStack>
              </VStack>
              <VStack width={'100%'} p={4} alignItems={'flex-start'} bgColor={'whitesmoke'} borderRadius={'lg'}>
                <Heading size={'md'} alignSelf={'center'}>
                  Billing
                </Heading>

                <HStack justifyContent={'space-between'} w={'full'}>
                  <Heading size={'sm'}>Test Name:</Heading>
                  <Text>{testInfo.t_name}</Text>
                </HStack>
                <HStack justifyContent={'space-between'} w={'full'}>
                  <Heading size={'sm'}>Test Categ.:</Heading>
                  <Text>{testInfo.t_category}</Text>
                </HStack>
                <HStack justifyContent={'space-between'} w={'full'}>
                  <Heading size={'sm'}>Test Fee:</Heading>
                  <Text>{testInfo.t_price}</Text>
                </HStack>
                <HStack justifyContent={'space-between'} w={'full'}>
                  <Heading size={'sm'}>Reporting Time:</Heading>
                  <Text>{testInfo.reporting_time}</Text>
                </HStack>
                <Stack flexDir={['column', 'row']} justifyContent={'space-between'} w={'full'}>
                  <Heading size={'sm'}>Appointment Date:</Heading>

                  <Input type='date' size={'sm'} w={'3qq0'} focusBorderColor='black' onChange={(e) => setAppointmentDate(e.target.value)} />
                </Stack>
                <Stack flexDir={['column', 'row']} justifyContent={'space-between'} w={'full'}>
                  <Heading size={'sm'}>Appointment Type:</Heading>
                  <RadioGroup>
                    <HStack>
                      <Text>Home</Text>
                      <Radio value='home' onChange={(e) => setAppointmentType(e.target.value)} />
                      <Text>Hospital</Text>
                      <Radio value='hospital' onChange={(e) => setAppointmentType(e.target.value)} />
                    </HStack>
                  </RadioGroup>
                </Stack>
                <VStack justifyContent={'space-between'} w={'full'}>
                  <Heading size={'sm'} alignSelf={'center'}>
                    Location:
                  </Heading>
                  <Text alignSelf={'flex-start'}>{testInfo.t_location}</Text>
                </VStack>
              </VStack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button onClick={onAppRegClose}>Cancel</Button>
              <Button colorScheme='red' onClick={bookAppointment}>
                Book
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const RatingComponent = ({ id, rating }) => {
  const totalRating = rating
    .filter((r) => {
      return r.t_id === id;
    })
    .map((r) => {
      return r.rating;
    });
  const sumRating = totalRating.reduce((e, n) => {
    return (e += n);
  }, 0);

  const avgRating = Math.round(sumRating / totalRating.length);

  const star = [];

  for (let i = 0; i < 5; i++) {
    const comp = i < avgRating ? <AiFillStar color='yellow' size={'16'} key={i} /> : <AiOutlineStar size={'16'} key={i} />;
    star.push(comp);
  }
  return star;
};

export default Tests;
