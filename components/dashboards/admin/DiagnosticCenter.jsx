import {
  Alert,
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
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Navigate, useNavigate } from 'react-router-dom';

function DiagnosticCenter() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [managers, setManagers] = useState([]);
  const [searchStatus, setSearchStatus] = useState('');
  const [search, setSearch] = useState('');
  const [changeForm, setChangeForm] = useState();
  const [userId, setUserId] = useState();
  const [passwordReset, setPasswordReset] = useState();
  const [rating, setRating] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const modalAndIdHandeler = (id) => {
    onOpen();
    setUserId(id);
  };
  const editManagerHandler = (id) => {
    if (changeForm) {
      axios
        .put(`manager/${id}`, changeForm, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}`, Accept: 'application/json' } })
        .then((res) => {
          toast({
            title: 'Manager Updated',
            status: 'success',
            duration: '3000',
            isClosable: true,
          });
        })
        .catch((err) => {
          const emailErr = err.response.data.email;
          console.log(err.response);
          toast({
            title: emailErr,
            status: 'error',
            duration: '3000',
            isClosable: true,
          });
        });
    }

    if (passwordReset) {
      axios
        .put(`manager/updatePassword/${id}`, passwordReset, {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}`, Accept: 'application/json' },
        })
        .then((res) => {
          toast({
            title: 'Password Updated',
            status: 'success',
            duration: '3000',
            isClosable: true,
          });
        })
        .catch((err) => {
          const passErr = err.response.data.password;
          console.log(err.response);
          toast({
            title: passErr,
            status: 'error',
            duration: '3000',
            isClosable: true,
          });
        });
    }
    setChangeForm('');
    setPasswordReset('');

    onClose();
  };
  const deleteManagerHandler = (id) => {
    axios
      .delete(`manager/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        toast({
          title: 'Manager Deleted',
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
      .get(`manager`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        setManagers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [editManagerHandler, deleteManagerHandler]);

  return (
    <>
      <Container maxW={['full', '6xl']} p={4}>
        <Heading size={'md'} textAlign={'center'}>
          Diagnostic Centers
        </Heading>

        <HStack wrap={'wrap'} p={2} justifyContent={'space-between'}>
          <HStack wrap={'wrap'}>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('a')}>
              All
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('p')}>
              Pending
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('r')}>
              Registered
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('t')}>
              Terminated
            </Button>
            <Button colorScheme='red' size={['xs', 'sm']} onClick={() => navigate('/hospitalReg')}>
              Add Diagnostic
            </Button>
          </HStack>

          <HStack>
            <Input placeholder='Center/Manager/Contact' focusBorderColor='red' value={search} onChange={(e) => setSearch(e.target.value)} />
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
                <Th>Hospital </Th>
                <Th> Name</Th>
                <Th> Email</Th>
                <Th>Phone</Th>
                <Th>Address</Th>
                <Th>Status</Th>
                <Th colSpan={4}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {managers.map((m, i) => {
                switch (searchStatus) {
                  case 'p':
                    return m.status == '0' ? (
                      <Tr key={i + 1}>
                        <Td>{i + 1}</Td>
                        <Td>{m.hospital_name}</Td>
                        <Td>{m.name}</Td>
                        <Td>{m.email}</Td>
                        <Td>{m.m_contact}</Td>
                        <Td>{m.m_address}</Td>
                        <Td color={m.status === 1 ? '' : 'red'}>
                          {m.status == 3 ? 'Terminated' : m.status == 1 ? 'Accepted' : m.status == 2 ? 'Rejected' : 'Pending'}
                        </Td>

                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.500'} onClick={() => modalAndIdHandeler(m.m_id)}>
                              Edit
                            </Button>
                            <Button variant={'filled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteManagerHandler(m.m_id)}>
                              Del
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;
                  case 't':
                    return m.status == '3' ? (
                      <Tr key={i + 1}>
                        <Td>{i + 1}</Td>
                        <Td>{m.hospital_name}</Td>
                        <Td>{m.name}</Td>
                        <Td>{m.email}</Td>
                        <Td>{m.m_contact}</Td>
                        <Td>{m.m_address}</Td>
                        <Td color={m.status === 1 ? '' : 'red'}>
                          {m.status == 3 ? 'Terminated' : m.status == 1 ? 'Accepted' : m.status == 2 ? 'Rejected' : 'Pending'}
                        </Td>

                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.500'} onClick={() => modalAndIdHandeler(m.m_id)}>
                              Edit
                            </Button>
                            <Button variant={'filled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteManagerHandler(m.m_id)}>
                              Del
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;
                  case 'r':
                    return m.status == '1' ? (
                      <Tr key={i + 1}>
                        <Td>{i + 1}</Td>
                        <Td>{m.hospital_name}</Td>
                        <Td>{m.name}</Td>
                        <Td>{m.email}</Td>
                        <Td>{m.m_contact}</Td>
                        <Td>{m.m_address}</Td>
                        <Td color={m.status === 1 ? '' : 'red'}>
                          {m.status == 3 ? 'Terminated' : m.status == 1 ? 'Accepted' : m.status == 2 ? 'Rejected' : 'Pending'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.500'} onClick={() => modalAndIdHandeler(m.m_id)}>
                              Edit
                            </Button>
                            <Button variant={'filled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteManagerHandler(m.m_id)}>
                              Del
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;
                  case 'a':
                    return (
                      <Tr key={i + 1}>
                        <Td>{i + 1}</Td>
                        <Td>{m.hospital_name}</Td>
                        <Td>{m.name}</Td>
                        <Td>{m.email}</Td>
                        <Td>{m.m_contact}</Td>
                        <Td>{m.m_address}</Td>
                        <Td color={m.status === 1 ? '' : 'red'}>
                          {m.status == 3 ? 'Terminated' : m.status == 1 ? 'Accepted' : m.status == 2 ? 'Rejected' : 'Pending'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'filled'} size={'xs'} bgColor={'orange.500'} onClick={() => modalAndIdHandeler(m.m_id)}>
                              Edit
                            </Button>
                            <Button variant={'filled'} size={'xs'} bgColor={'red.500'} onClick={() => deleteManagerHandler(m.m_id)}>
                              Del
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    );
                    break;

                  case 'search':
                    return m.email.toLowerCase().match(search) ||
                      m.name.toLowerCase().match(search) ||
                      m.hospital_name.toLowerCase().match(search) ||
                      m.m_contact.toString().match(search) ? (
                      <Tr>
                        <Td>{i + 1}</Td>
                        <Td>{m.hospital_name}</Td>
                        <Td>{m.name}</Td>
                        <Td>{m.email}</Td>
                        <Td>{m.m_contact}</Td>
                        <Td>{m.m_address}</Td>
                        <Td color={m.status === 1 ? '' : 'red'}>
                          {m.status == 3 ? 'Terminated' : m.status == 1 ? 'Accepted' : m.status == 2 ? 'Rejected' : 'Pending'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.500'} onClick={() => modalAndIdHandeler(m.m_id)}>
                              Edit
                            </Button>
                            <Button variant={'filled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteManagerHandler(m.m_id)}>
                              Del
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;

                  default:
                    return (
                      <Tr key={i + 1}>
                        <Td>{i + 1}</Td>
                        <Td>{m.hospital_name}</Td>
                        <Td>{m.name}</Td>
                        <Td>{m.email}</Td>
                        <Td>{m.m_contact}</Td>
                        <Td>{m.m_address}</Td>
                        <Td color={m.status === 1 ? '' : 'red'}>
                          {m.status == 3 ? 'Terminated' : m.status == 1 ? 'Accepted' : m.status == 2 ? 'Rejected' : 'Pending'}
                        </Td>
                        <Td rowGap={1}>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.500'} onClick={() => modalAndIdHandeler(m.m_id)}>
                              Edit
                            </Button>
                            <Button variant={'filled'} size={'sm'} bgColor={'red.500'} onClick={() => deleteManagerHandler(m.m_id)}>
                              Del
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
          <ModalHeader>Update Manager</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={0}>
              <FormControl>
                <FormLabel>Update Managers Request</FormLabel>

                <Select
                  focusBorderColor='gray'
                  variant={'filled'}
                  name='status'
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                >
                  <option defaultChecked>Choose</option>
                  <option value={'1'}>Accept</option>
                  <option value={'2'}>Reject</option>
                  <option value={'3'}>Terminate</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Manager Name</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='name'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Manager Email</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='email'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Hospital Name</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='hospital_name'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='m_password'
                  required
                  onChange={(e) => setPasswordReset({ ...passwordReset, [e.target.name]: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Contact</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='m_contact'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='m_address'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={() => editManagerHandler(userId)}>
              Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DiagnosticCenter;
