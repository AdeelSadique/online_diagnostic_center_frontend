import {
  Avatar,
  AvatarBadge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  useToast,
  VStack,
  Alert,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Tag,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaDiagnoses, FaRegHospital } from 'react-icons/fa';
import { MdPayment, MdPendingActions, MdSettings } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';
import { GrTest } from 'react-icons/gr';
import { BiMessage } from 'react-icons/bi';
import Appointments from './Appointments';
import Payments from './Payments';
import Tests from './Tests';
import Reports from './Reports';
import PatientMessges from './PatientMessges';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import Pending from './Pending';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Manager = () => {
  const [menu, setMenu] = useState('home');
  const manager = useSelector((state) => state.isLogged.data);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const terminateService = () => {
    onClose();

    const token = localStorage.getItem('userToken');
    axios
      .put(
        `manager/${manager.m_id}?status=3`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast({
          title: 'Your Services terminated successfully',
          duration: '5000',
          status: 'success',
        });
        localStorage.removeItem('userToken');
        dispatch({ type: 'logout' });
        dispatch({ type: 'isLogged', payload: '' });
        navigate('/login');
      })
      .catch((err) => {
        navigate('/login');
        console.log(err);
      });
  };

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
          title: res.data.message,
          duration: '3000',
          status: 'success',
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
      {manager.status === 1 ? (
        <Container maxW={'full'} p={['0', '2', '4']}>
          <Heading p={2} size={['sm', 'md', 'lg']}>
            Manager Dashboard
          </Heading>

          <Divider />

          <HStack p={2} alignItems={'center'} justifyContent={'space-between'} wrap={'wrap'}>
            <HStack spacing={4}>
              <Avatar>
                <AvatarBadge boxSize={'0.9em'} bgColor={'green.500'} />
              </Avatar>
              <Heading size={'xs'}>{manager.email}</Heading>
            </HStack>

            <Menu>
              <MenuButton as={Button} variant={'unstyled'} _hover={{ transform: 'rotate(7deg)' }}>
                <MdSettings size={'30'} />
              </MenuButton>

              <MenuList>
                <MenuItem onClick={() => setMenu('profile')}>Profile</MenuItem>
                <MenuItem onClick={() => setMenu('updateProfile')}>Update Profile</MenuItem>
                <MenuItem onClick={() => setMenu('changePassword')}>Change Password</MenuItem>
                <MenuItem onClick={onOpen}>Terminate Service</MenuItem>
                <Divider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>

          <Divider />

          {/* modal for terminate service */}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
              <ModalCloseButton></ModalCloseButton>
              <ModalHeader>Do you really want to terminate your service ?</ModalHeader>
              <ModalFooter>
                <HStack>
                  <Button onClick={onClose}>No</Button>
                  <Button colorScheme='red' onClick={terminateService}>
                    Yes
                  </Button>
                </HStack>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* mini menu  */}

          {menu != 'home' ? (
            <HStack p={4} justifyContent={'flex-start'} wrap={'wrap'}>
              <Button
                variant={'link'}
                onClick={() => {
                  setMenu('home');
                }}
                size={['xs', 'md']}
              >
                Home
              </Button>
              <Button
                colorScheme={menu === 'appointments' ? 'red' : null}
                variant={'link'}
                onClick={() => {
                  setMenu('appointments');
                }}
                size={['xs', 'md']}
              >
                Appointments
              </Button>

              <Button
                colorScheme={menu === 'payments' ? 'red' : null}
                variant={'link'}
                onClick={() => {
                  setMenu('payments');
                }}
                size={['xs', 'md']}
              >
                Payments
              </Button>
              <Button
                colorScheme={menu === 'reports' ? 'red' : null}
                variant={'link'}
                onClick={() => {
                  setMenu('reports');
                }}
                size={['xs', 'md']}
              >
                Reports
              </Button>
              <Button
                colorScheme={menu === 'tests' ? 'red' : null}
                variant={'link'}
                onClick={() => {
                  setMenu('tests');
                }}
                size={['xs', 'md']}
              >
                Tests
              </Button>
              <Button
                colorScheme={menu === 'messages' ? 'red' : null}
                variant={'link'}
                onClick={() => {
                  setMenu('messages');
                }}
                size={['xs', 'md']}
              >
                Patient Messages
              </Button>

              <Divider />
            </HStack>
          ) : null}

          {/* menu switching */}

          {menu === 'home' ? (
            <HomeComponent setMenu={setMenu} />
          ) : menu === 'appointments' ? (
            <Appointments />
          ) : menu === 'payments' ? (
            <Payments />
          ) : menu === 'tests' ? (
            <Tests />
          ) : menu === 'reports' ? (
            <Reports />
          ) : menu === 'messages' ? (
            <PatientMessges />
          ) : menu === 'profile' ? (
            <Profile />
          ) : menu === 'updateProfile' ? (
            <UpdateProfile />
          ) : menu === 'changePassword' ? (
            <ChangePassword />
          ) : (
            <HomeComponent />
          )}
        </Container>
      ) : (
        <Pending />
      )}
    </>
  );
};

// Manager dashboard home component

const HomeComponent = ({ setMenu }) => {
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reports, setReports] = useState([]);
  const [tests, setTests] = useState([]);
  const [messages, setMessages] = useState([]);

  function fetchQuery(params, func) {
    axios
      .get(`${params}`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        func(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const manager = useSelector((state) => state.isLogged.data);
  useEffect(() => {
    fetchQuery(`managersAppointment/${manager.m_id}`, setAppointments);
    fetchQuery(`managerBills/${manager.m_id}`, setPayments);
    fetchQuery(`managerReports/${manager.m_id}`, setReports);
    fetchQuery(`managerTests/${manager.m_id}`, setTests);
    fetchQuery(`managerMessages/${manager.m_id}`, setMessages);
  }, []);

  let pendingAppointments = appointments.filter((a, i) => {
    return a.ap_status === 0;
  });

  let paidPayment = payments.filter((b, i) => {
    return b.b_status === 1;
  });
  let unPaidPayment = payments.filter((b, i) => {
    return b.b_status === 0;
  });
  let pendingDues = payments
    .map((b) => {
      if (b.b_status === 0) {
        return Math.floor(b.b_amount);
      } else {
        return 0;
      }
    })
    .reduce((a, i) => {
      return (a += i);
    }, 0);
  let paidDues = payments
    .map((b) => {
      if (b.b_status === 1) {
        return Math.floor(b.b_amount);
      } else {
        return 0;
      }
    })
    .reduce((a, i) => {
      return (a += i);
    }, 0);
  let pendingReports = reports.filter((r, i) => {
    return r.r_status === 0;
  });

  return (
    <SimpleGrid templateColumns={'repeat(auto-fill, minmax(220px ,1fr))'} spacing={4} p={4}>
      <Card _hover={{ transform: 'scale(1.01)', cursor: 'pointer' }} bgColor={'whitesmoke'} onClick={() => setMenu('appointments')}>
        <CardHeader margin={'auto'}>
          <MdPendingActions size={'40'} />
        </CardHeader>
        <CardBody>
          <VStack>
            <Heading textAlign={'center'} size={'md'}>
              Total: {appointments.length}
            </Heading>
            <Heading textAlign={'center'} size={'xs'}>
              Pending: {pendingAppointments.length}
            </Heading>
          </VStack>
        </CardBody>
        <CardFooter margin={'auto'}>
          <Heading textAlign={'center'} size={'sm'}>
            Appointments
          </Heading>
        </CardFooter>
      </Card>

      <Card _hover={{ transform: 'scale(1.01)', cursor: 'pointer' }} bgColor={'whitesmoke'} onClick={() => setMenu('payments')}>
        <CardHeader margin={'auto'}>
          <MdPayment size={'40'} />
        </CardHeader>
        <CardBody>
          <VStack>
            <Heading textAlign={'center'} size={'md'}>
              Total: {payments.length}
            </Heading>
            <Heading textAlign={'center'} size={'xs'}>
              Paid: {paidPayment.length}
            </Heading>
            <Heading textAlign={'center'} size={'xs'}>
              Unpaid: {unPaidPayment.length}
            </Heading>
            <Heading textAlign={'center'} size={'xs'}>
              Paid Dues: {isNaN(paidDues) ? 0 : paidDues}
            </Heading>
            <Heading textAlign={'center'} size={'xs'}>
              Pending Dues: {isNaN(pendingDues) ? 0 : pendingDues}
            </Heading>
          </VStack>
        </CardBody>
        <CardFooter margin={'auto'}>
          <Heading textAlign={'center'} size={'sm'}>
            Payments
          </Heading>
        </CardFooter>
      </Card>

      <Card _hover={{ transform: 'scale(1.01)', cursor: 'pointer' }} bgColor={'whitesmoke'} onClick={() => setMenu('reports')}>
        <CardHeader margin={'auto'}>
          <TbReportAnalytics size={'40'} />
        </CardHeader>
        <CardBody>
          <VStack>
            <Heading textAlign={'center'} size={'md'}>
              Total: {reports.length}
            </Heading>
            <Heading textAlign={'center'} size={'xs'}>
              Pending: {pendingReports.length}
            </Heading>
          </VStack>
        </CardBody>
        <CardFooter margin={'auto'}>
          <Heading textAlign={'center'} size={'sm'}>
            Reports
          </Heading>
        </CardFooter>
      </Card>
      <Card _hover={{ transform: 'scale(1.01)', cursor: 'pointer' }} bgColor={'whitesmoke'} onClick={() => setMenu('tests')}>
        <CardHeader margin={'auto'}>
          <GrTest size={'40'} />
        </CardHeader>
        <CardBody>
          <Heading textAlign={'center'} size={'md'}>
            Total: {tests.length}
          </Heading>
        </CardBody>
        <CardFooter margin={'auto'}>
          <Heading textAlign={'center'} size={'sm'}>
            Tests
          </Heading>
        </CardFooter>
      </Card>
      <Card _hover={{ transform: 'scale(1.01)', cursor: 'pointer' }} bgColor={'whitesmoke'} onClick={() => setMenu('messages')}>
        <CardHeader margin={'auto'}>
          <BiMessage size={'40'} />
        </CardHeader>
        <CardBody>
          <Heading textAlign={'center'} size={'md'}>
            Total: {messages.length}
          </Heading>
        </CardBody>
        <CardFooter margin={'auto'}>
          <Heading textAlign={'center'} size={'sm'}>
            Patient Messages
          </Heading>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
};

export default Manager;
