import { Button, Container, HStack, Heading, IconButton, Input, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchStatus, setSearchStatus] = useState('');
  const [search, setSearch] = useState('');
  const toast = useToast();

  const acceptAppointmentHandler = (id) => {
    axios
      .put(`appointment/${id}?ap_status=1`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        toast({
          title: 'Appointment Accepted',
          status: 'success',
          duration: '3000',
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const cancelAppointmentHandler = (id) => {
    axios
      .put(`appointment/${id}?ap_status=2`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        toast({
          title: 'Appointment Canceled',
          status: 'warning',
          duration: '3000',
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteAppointmentHandler = (id) => {
    axios
      .delete(`appointment/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        toast({
          title: 'Appointment Deleted',
          status: 'error',
          duration: '3000',
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`appointment`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        setAppointments(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [acceptAppointmentHandler, cancelAppointmentHandler, deleteAppointmentHandler]);

  return (
    <>
      <Container maxW={['full', '6xl']} p={4}>
        <Heading size={'md'} textAlign={'center'}>
          Appointments
        </Heading>

        <HStack wrap={'wrap'} p={2} justifyContent={'space-between'}>
          <HStack wrap={'wrap'}>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('a')}>
              All
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('conducted')}>
              Conducted
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('analyzing')}>
              Analyzing
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('p')}>
              Pending
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('b')}>
              Booked
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('r')}>
              Rejected
            </Button>
          </HStack>

          <HStack>
            <Input placeholder='Patient/Test/Fee' focusBorderColor='red' value={search} onChange={(e) => setSearch(e.target.value)} />
            <IconButton colorScheme='red' onClick={() => setSearchStatus('search')}>
              <BiSearch />
            </IconButton>
          </HStack>
        </HStack>

        <TableContainer p={['2', '4']}>
          <Table size={'sm'}>
            <Thead>
              <Tr>
                <Th>S#</Th>
                <Th>App ID</Th>
                <Th>P. Name</Th>
                <Th>T. Name</Th>
                <Th>Fee</Th>
                <Th>Time</Th>
                <Th>Type</Th>
                <Th>Location</Th>
                <Th>Status</Th>
                <Th colSpan={2}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointments.map((a, i) => {
                switch (searchStatus) {
                  case 'analyzing':
                    return a.ap_status === 3 ? (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{a.ap_id}</Td>
                        <Td>{a.patient.name}</Td>
                        <Td>{a.test.t_name}</Td>
                        <Td>{a.test.t_price}</Td>
                        <Td>{a.test.reporting_time}</Td>
                        <Td>{a.ap_type}</Td>
                        <Td>{a.test.t_location}</Td>
                        <Td color={a.ap_status === 1 ? 'orange' : a.ap_status === 3 ? 'green' : a.ap_status === 4 ? 'green' : 'red'}>
                          {a.ap_status == 0
                            ? 'Pending'
                            : a.ap_status == 1
                            ? 'Accepted'
                            : a.ap_status == 2
                            ? 'Rejected'
                            : a.ap_status == 3
                            ? 'Analyzing'
                            : 'Conducted'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'green.500'} onClick={() => acceptAppointmentHandler(a.ap_id)}>
                              A
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'orange.500'} onClick={() => cancelAppointmentHandler(a.ap_id)}>
                              C
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteAppointmentHandler(a.ap_id)}>
                              D
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;
                  case 'conducted':
                    return a.ap_status === 4 ? (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{a.ap_id}</Td>
                        <Td>{a.patient.name}</Td>
                        <Td>{a.test.t_name}</Td>
                        <Td>{a.test.t_price}</Td>
                        <Td>{a.test.reporting_time}</Td>
                        <Td>{a.ap_type}</Td>
                        <Td>{a.test.t_location}</Td>
                        <Td color={a.ap_status === 1 ? 'orange' : a.ap_status === 3 ? 'green' : a.ap_status === 4 ? 'green' : 'red'}>
                          {a.ap_status == 0
                            ? 'Pending'
                            : a.ap_status == 1
                            ? 'Accepted'
                            : a.ap_status == 2
                            ? 'Rejected'
                            : a.ap_status == 3
                            ? 'Analyzing'
                            : 'Conducted'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'green.500'} onClick={() => acceptAppointmentHandler(a.ap_id)}>
                              A
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'orange.500'} onClick={() => cancelAppointmentHandler(a.ap_id)}>
                              C
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteAppointmentHandler(a.ap_id)}>
                              D
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;
                  case 'p':
                    return a.ap_status == '0' ? (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{a.ap_id}</Td>
                        <Td>{a.patient.name}</Td>
                        <Td>{a.test.t_name}</Td>
                        <Td>{a.test.t_price}</Td>
                        <Td>{a.test.reporting_time}</Td>
                        <Td>{a.ap_type}</Td>
                        <Td>{a.test.t_location}</Td>
                        <Td color={a.ap_status === 1 ? 'orange' : a.ap_status === 3 ? 'green' : a.ap_status === 4 ? 'green' : 'red'}>
                          {a.ap_status == 0
                            ? 'Pending'
                            : a.ap_status == 1
                            ? 'Accepted'
                            : a.ap_status == 2
                            ? 'Rejected'
                            : a.ap_status == 3
                            ? 'Analyzing'
                            : 'Conducted'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'green.500'} onClick={() => acceptAppointmentHandler(a.ap_id)}>
                              A
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'orange.500'} onClick={() => cancelAppointmentHandler(a.ap_id)}>
                              C
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteAppointmentHandler(a.ap_id)}>
                              D
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;
                  case 'a':
                    return (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{a.ap_id}</Td>
                        <Td>{a.patient.name}</Td>
                        <Td>{a.test.t_name}</Td>
                        <Td>{a.test.t_price}</Td>
                        <Td>{a.test.reporting_time}</Td>
                        <Td>{a.ap_type}</Td>
                        <Td>{a.test.t_location}</Td>
                        <Td color={a.ap_status === 1 ? 'orange' : a.ap_status === 3 ? 'green' : a.ap_status === 4 ? 'green' : 'red'}>
                          {a.ap_status == 0
                            ? 'Pending'
                            : a.ap_status == 1
                            ? 'Accepted'
                            : a.ap_status == 2
                            ? 'Rejected'
                            : a.ap_status == 3
                            ? 'Analyzing'
                            : 'Conducted'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'green.500'} onClick={() => acceptAppointmentHandler(a.ap_id)}>
                              A
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'orange.500'} onClick={() => cancelAppointmentHandler(a.ap_id)}>
                              C
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteAppointmentHandler(a.ap_id)}>
                              D
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    );
                    break;
                  case 'b':
                    return a.ap_status == '1' ? (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{a.ap_id}</Td>
                        <Td>{a.patient.name}</Td>
                        <Td>{a.test.t_name}</Td>
                        <Td>{a.test.t_price}</Td>
                        <Td>{a.test.reporting_time}</Td>
                        <Td>{a.ap_type}</Td>
                        <Td>{a.test.t_location}</Td>
                        <Td color={a.ap_status === 1 ? 'orange' : a.ap_status === 3 ? 'green' : a.ap_status === 4 ? 'green' : 'red'}>
                          {a.ap_status == 0
                            ? 'Pending'
                            : a.ap_status == 1
                            ? 'Accepted'
                            : a.ap_status == 2
                            ? 'Rejected'
                            : a.ap_status == 3
                            ? 'Analyzing'
                            : 'Conducted'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'green.500'} onClick={() => acceptAppointmentHandler(a.ap_id)}>
                              A
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'orange.500'} onClick={() => cancelAppointmentHandler(a.ap_id)}>
                              C
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteAppointmentHandler(a.ap_id)}>
                              D
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;
                  case 'r':
                    return a.ap_status == '2' ? (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{a.ap_id}</Td>
                        <Td>{a.patient.name}</Td>
                        <Td>{a.test.t_name}</Td>
                        <Td>{a.test.t_price}</Td>
                        <Td>{a.test.reporting_time}</Td>
                        <Td>{a.ap_type}</Td>
                        <Td>{a.test.t_location}</Td>
                        <Td color={a.ap_status === 1 ? 'orange' : a.ap_status === 3 ? 'green' : a.ap_status === 4 ? 'green' : 'red'}>
                          {a.ap_status == 0
                            ? 'Pending'
                            : a.ap_status == 1
                            ? 'Accepted'
                            : a.ap_status == 2
                            ? 'Rejected'
                            : a.ap_status == 3
                            ? 'Analyzing'
                            : 'Conducted'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'green.500'} onClick={() => acceptAppointmentHandler(a.ap_id)}>
                              A
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'orange.500'} onClick={() => cancelAppointmentHandler(a.ap_id)}>
                              C
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteAppointmentHandler(a.ap_id)}>
                              D
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;
                  case 'search':
                    return a.ap_type.match(search) ||
                      a.patient.name.toLowerCase().match(search) ||
                      a.test.t_name.toLowerCase().match(search) ||
                      a.test.t_location.toLowerCase().match(search) ? (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{a.ap_id}</Td>
                        <Td>{a.patient.name}</Td>
                        <Td>{a.test.t_name}</Td>
                        <Td>{a.test.t_price}</Td>
                        <Td>{a.test.reporting_time}</Td>
                        <Td>{a.ap_type}</Td>
                        <Td>{a.test.t_location}</Td>
                        <Td color={a.ap_status === 1 ? 'orange' : a.ap_status === 3 ? 'green' : a.ap_status === 4 ? 'green' : 'red'}>
                          {a.ap_status == 0
                            ? 'Pending'
                            : a.ap_status == 1
                            ? 'Accepted'
                            : a.ap_status == 2
                            ? 'Rejected'
                            : a.ap_status == 3
                            ? 'Analyzing'
                            : 'Conducted'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'green.500'} onClick={() => acceptAppointmentHandler(a.ap_id)}>
                              A
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'orange.500'} onClick={() => cancelAppointmentHandler(a.ap_id)}>
                              C
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteAppointmentHandler(a.ap_id)}>
                              D
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;

                  default:
                    return (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{a.ap_id}</Td>
                        <Td>{a.patient.name}</Td>
                        <Td>{a.test.t_name}</Td>
                        <Td>{a.test.t_price}</Td>
                        <Td>{a.test.reporting_time}</Td>
                        <Td>{a.ap_type}</Td>
                        <Td>{a.test.t_location}</Td>
                        <Td color={a.ap_status === 1 ? 'orange' : a.ap_status === 3 ? 'green' : a.ap_status === 4 ? 'green' : 'red'}>
                          {a.ap_status == 0
                            ? 'Pending'
                            : a.ap_status == 1
                            ? 'Accepted'
                            : a.ap_status == 2
                            ? 'Rejected'
                            : a.ap_status == 3
                            ? 'Analyzing'
                            : 'Conducted'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'green.500'} onClick={() => acceptAppointmentHandler(a.ap_id)}>
                              A
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'orange.500'} onClick={() => cancelAppointmentHandler(a.ap_id)}>
                              C
                            </Button>
                            <Button variant={'unstyled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteAppointmentHandler(a.ap_id)}>
                              D
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    );
                    break;
                }
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Appointments;
