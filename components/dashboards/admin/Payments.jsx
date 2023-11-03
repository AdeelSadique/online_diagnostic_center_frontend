import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

function Payments() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [payments, setPayments] = useState([]);
  const [userId, setUserId] = useState();
  const [changeForm, setChangeForm] = useState();
  const [searchStatus, setSearchStatus] = useState('');
  const [search, setSearch] = useState('');

  const paymentEditHandler = (id) => {
    setUserId(id);
    onOpen();
  };
  const paymentUpdateHandler = (id) => {
    axios
      .put(`billing/${id}`, changeForm, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        toast({
          title: 'Payent Updated',
          status: 'success',
          duration: '3000',
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.response);
        const Err = err.response.data.message;
        toast({
          title: Err,
          status: 'error',
          duration: '3000',
          isClosable: true,
        });
      });
    setChangeForm('');
    onClose();
  };
  const paymentDeleteHandler = (id) => {
    axios
      .delete(`billing/${id}`, changeForm, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        console.log(res);
        toast({
          title: 'Payment Deleted',
          status: 'success',
          duration: '3000',
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.response);
        const Err = err.response.data.message;
        toast({
          title: Err,
          status: 'error',
          duration: '3000',
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    axios
      .get(`billing`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        const data = res.data.data;
        setPayments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [paymentEditHandler, paymentUpdateHandler, paymentDeleteHandler]);
  return (
    <>
      <Container maxW={['full', '6xl']} p={4}>
        <Heading size={'md'} textAlign={'center'}>
          Payments
        </Heading>

        <HStack wrap={'wrap'} p={2} justifyContent={'space-between'}>
          <HStack>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('a')}>
              All
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('p')}>
              Paid
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('u')}>
              Unpaid
            </Button>
          </HStack>

          <HStack>
            <Input placeholder='Patient/App/Fee/Test' focusBorderColor='red' value={search} onChange={(e) => setSearch(e.target.value)} />
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
                <Th>P.Name</Th>
                <Th>T.Name</Th>
                <Th>Fee</Th>
                <Th>Date/Time</Th>
                <Th>Status</Th>
                <Th colSpan={2}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {payments.map((p, i) => {
                switch (searchStatus) {
                  case 'a':
                    return (
                      <Tr key={i + 1}>
                        <Td>{i + 1}</Td>
                        <Td>{p.appointment.ap_id}</Td>
                        <Td>{p.appointment.patient.name}</Td>
                        <Td>{p.appointment.test.t_name}</Td>
                        <Td>{p.b_amount}</Td>
                        <Td>{p.appointment.ap_date + ' ' + p.appointment.test.reporting_time}</Td>
                        <Td color={!p.b_status ? 'red' : ''}>{p.b_status == 0 ? 'Pending' : 'Paid'}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={['xs', 'sm']} bgColor={'orange.500'} onClick={() => paymentEditHandler(p.appointment.ap_id)}>
                              Update
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    );
                    break;
                  case 'p':
                    return p.b_status == 1 ? (
                      <Tr key={i + 1}>
                        <Td>{i + 1}</Td>
                        <Td>{p.appointment.ap_id}</Td>
                        <Td>{p.appointment.patient.name}</Td>
                        <Td>{p.appointment.test.t_name}</Td>
                        <Td>{p.b_amount}</Td>
                        <Td>{p.appointment.ap_date + ' ' + p.appointment.test.reporting_time}</Td>
                        <Td color={!p.b_status ? 'red' : ''}>{p.b_status == 0 ? 'Pending' : 'Paid'}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={['xs', 'sm']} bgColor={'orange.500'} onClick={() => paymentEditHandler(p.appointment.ap_id)}>
                              Update
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;

                  case 'u':
                    return p.b_status == 0 ? (
                      <Tr key={i + 1}>
                        <Td>{i + 1}</Td>
                        <Td>{p.appointment.ap_id}</Td>
                        <Td>{p.appointment.patient.name}</Td>
                        <Td>{p.appointment.test.t_name}</Td>
                        <Td>{p.b_amount}</Td>
                        <Td>{p.appointment.ap_date + ' ' + p.appointment.test.reporting_time}</Td>
                        <Td color={!p.b_status ? 'red' : ''}>{p.b_status == 0 ? 'Pending' : 'Paid'}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={['xs', 'sm']} bgColor={'orange.500'} onClick={() => paymentEditHandler(p.appointment.ap_id)}>
                              Update
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;

                  case 'search':
                    return p.appointment.patient.name.toLowerCase().match(search) ||
                      p.appointment.test.t_name.toLowerCase().match(search) ||
                      p.b_amount.toString().match(search) ||
                      p.ap_id.toString().match(search) ||
                      p.appointment.patient.p_id.toString().match(search) ? (
                      <Tr key={i + 1}>
                        <Td>{i + 1}</Td>
                        <Td>{p.appointment.ap_id}</Td>
                        <Td>{p.appointment.patient.name}</Td>
                        <Td>{p.appointment.test.t_name}</Td>
                        <Td>{p.b_amount}</Td>
                        <Td>{p.appointment.ap_date + ' ' + p.appointment.test.reporting_time}</Td>
                        <Td color={!p.b_status ? 'red' : ''}>{p.b_status == 0 ? 'Pending' : 'Paid'}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={['xs', 'sm']} bgColor={'orange.500'} onClick={() => paymentEditHandler(p.appointment.ap_id)}>
                              Update
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;

                  default:
                    return (
                      <Tr key={i + 1}>
                        <Td>{i + 1}</Td>
                        <Td>{p.appointment.ap_id}</Td>
                        <Td>{p.appointment.patient.name}</Td>
                        <Td>{p.appointment.test.t_name}</Td>
                        <Td>{p.b_amount}</Td>
                        <Td>{p.appointment.ap_date + ' ' + p.appointment.test.reporting_time}</Td>
                        <Td color={!p.b_status ? 'red' : ''}>{p.b_status == 0 ? 'Pending' : 'Paid'}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={['xs', 'sm']} bgColor={'orange.500'} onClick={() => paymentEditHandler(p.appointment.ap_id)}>
                              Update
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

      <Modal isOpen={isOpen} onClose={onClose} size={['full', 'xl']}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Update Payment</FormLabel>

              <Select
                focusBorderColor='gray'
                variant={'filled'}
                name='b_status'
                onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
              >
                <option defaultChecked>Choose</option>
                <option value={1}>Paid</option>
                <option value={0}>Unpaid</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={() => paymentUpdateHandler(userId)}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Payments;
