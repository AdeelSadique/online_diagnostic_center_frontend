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
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaDiagnoses, FaRegHospital } from 'react-icons/fa';
import { MdPayment, MdPendingActions, MdSettings } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';
import { GrTest } from 'react-icons/gr';
import { BiMessage } from 'react-icons/bi';
import Appointments from './Appointments';
import DiagnosticCenter from './DiagnosticCenter';
import Patients from './Patients';
import Payments from './Payments';
import Tests from './Tests';
import Reports from './Reports';
import PatientMessges from './PatientMessges';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [menu, setMenu] = useState('home');
  const loggedData = useSelector((state) => state.isLogged);

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
      <Container maxW={'full'} p={['0', '2', '4']}>
        <Heading p={2} size={['sm', 'md', 'lg']}>
          Admin Dashboard
        </Heading>
        <Divider />

        <HStack p={2} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={4} wrap={'wrap'}>
            <Avatar>
              <AvatarBadge boxSize={'0.9em'} bgColor={'green.500'} />
            </Avatar>
            <Heading size={'xs'}>{loggedData.data.email}</Heading>
          </HStack>

          <Menu>
            <MenuButton as={Button} variant={'unstyled'} _hover={{ transform: 'rotate(7deg)' }}>
              <MdSettings size={'30'} />
            </MenuButton>

            <MenuList>
              <MenuItem
                onClick={() => {
                  setMenu('profile');
                }}
              >
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <Divider />

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
              colorScheme={menu === 'diagnostic' ? 'red' : null}
              variant={'link'}
              onClick={() => {
                setMenu('diagnostic');
              }}
              size={['xs', 'md']}
            >
              Diagnostic Center
            </Button>
            <Button
              colorScheme={menu === 'patients' ? 'red' : null}
              variant={'link'}
              onClick={() => {
                setMenu('patients');
              }}
              size={['xs', 'md']}
            >
              Patients
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
        ) : menu === 'diagnostic' ? (
          <DiagnosticCenter />
        ) : menu === 'patients' ? (
          <Patients />
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
        ) : (
          <HomeComponent />
        )}
      </Container>
    </>
  );
};

// Admin dashboard home component

const HomeComponent = ({ setMenu }) => {
  const [appointments, setAppointments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [patients, setPatients] = useState([]);
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
  useEffect(() => {
    fetchQuery('appointment', setAppointments);
    fetchQuery('manager', setManagers);
    fetchQuery('patient', setPatients);
    fetchQuery('billing', setPayments);
    fetchQuery('report', setReports);
    fetchQuery('test', setTests);
    fetchQuery('adminMessage', setMessages);
  }, []);

  let pendingAppointments = appointments.filter((a, i) => {
    return a.ap_status === 0;
  });
  let pendingManager = managers.filter((m, i) => {
    return m.status === 0;
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

      <Card _hover={{ transform: 'scale(1.01)', cursor: 'pointer' }} bgColor={'whitesmoke'} onClick={() => setMenu('diagnostic')}>
        <CardHeader margin={'auto'}>
          <FaRegHospital size={'40'} />
        </CardHeader>
        <CardBody>
          <VStack>
            <Heading textAlign={'center'} size={'md'}>
              Total: {managers.length}
            </Heading>
            <Heading textAlign={'center'} size={'xs'}>
              Pending: {pendingManager.length}
            </Heading>
          </VStack>
        </CardBody>
        <CardFooter margin={'auto'}>
          <Heading textAlign={'center'} size={'sm'}>
            Diagnostic Center
          </Heading>
        </CardFooter>
      </Card>

      <Card _hover={{ transform: 'scale(1.01)', cursor: 'pointer' }} bgColor={'whitesmoke'} onClick={() => setMenu('patients')}>
        <CardHeader margin={'auto'}>
          <FaDiagnoses size={'40'} />
        </CardHeader>
        <CardBody>
          <Heading textAlign={'center'} size={'md'}>
            Total: {patients.length}
          </Heading>
        </CardBody>
        <CardFooter margin={'auto'}>
          <Heading textAlign={'center'} size={'sm'}>
            Patients
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

export default Admin;
