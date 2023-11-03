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
import { useNavigate } from 'react-router-dom';

function Patients() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [patient, setPatient] = useState([]);
  const [changeForm, setChangeForm] = useState();
  const [userId, setUserId] = useState();
  const [passwordReset, setPasswordReset] = useState();
  const [searchStatus, setSearchStatus] = useState('');
  const [search, setSearch] = useState('');

  const editPatientHandler = (id) => {
    onOpen();
    setUserId(id);
  };
  const patientUpdateHandler = (id) => {
    if (changeForm) {
      axios
        .put(`patient/${id}`, changeForm, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then((res) => {
          toast({
            title: 'Patient Updated',
            status: 'success',
            duration: '3000',
            isClosable: true,
          });
        })
        .catch((err) => {
          const emailErr = err.response.data.email;
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
        .put(`patient/updatePassword/${id}`, passwordReset, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        .then((res) => {
          console.log(res);
          toast({
            title: 'Patient Updated',
            status: 'success',
            duration: '3000',
            isClosable: true,
          });
        })
        .catch((err) => {
          const passErr = err.response.data.p_password;
          console.log(err.response.data);
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

  useEffect(() => {
    axios
      .get(`patient`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        const data = res.data.data;
        setPatient(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patientUpdateHandler]);

  return (
    <>
      <Container maxW={['full', '6xl']} p={4}>
        <Heading size={'md'} textAlign={'center'}>
          Patients
        </Heading>

        <HStack p={2} justifyContent={'space-between'} wrap={'wrap'}>
          <Button colorScheme='red' size={'sm'} onClick={() => navigate('/signup')}>
            Add Patients
          </Button>

          <HStack>
            <Input placeholder='Name/Ph/Blood/Addr.' focusBorderColor='red' value={search} onChange={(e) => setSearch(e.target.value)} />
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
                <Th> Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Blood</Th>
                <Th>Gender</Th>
                <Th>Addr.</Th>
                <Th colSpan={2}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patient.map((p, i) => {
                switch (searchStatus) {
                  case 'search':
                    return p.email.toLowerCase().match(search) ||
                      p.name.toLowerCase().match(search) ||
                      p.p_contact.match(search) ||
                      p.p_address.toLowerCase().match(search) ||
                      p.p_contact.toString().match(search) ||
                      p.p_blood.toLowerCase().match(search) ? (
                      <Tr key={i + 1}>
                        <Td>{i + 1}</Td>
                        <Td>{p.name}</Td>
                        <Td>{p.email}</Td>
                        <Td>{p.p_contact}</Td>
                        <Td>{p.p_blood}</Td>
                        <Td>{p.p_gender == 'M' ? 'Male' : p.p_gender == 'F' ? 'Female' : 'Other'}</Td>
                        <Td>{p.p_address}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.400'} onClick={() => editPatientHandler(p.p_id)}>
                              Edit
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
                        <Td>{p.name}</Td>
                        <Td>{p.email}</Td>
                        <Td>{p.p_contact}</Td>
                        <Td>{p.p_blood}</Td>
                        <Td>{p.p_gender == 'M' ? 'Male' : p.p_gender == 'F' ? 'Female' : 'Other'}</Td>
                        <Td>{p.p_address}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.400'} onClick={() => editPatientHandler(p.p_id)}>
                              Edit
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
          <ModalHeader>Update Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={0}>
              <FormControl isRequired>
                <FormLabel>Patient Name</FormLabel>
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
                <FormLabel>Patient Email</FormLabel>
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
                <FormLabel>Blood Group</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='p_blood'
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
                  name='p_password'
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
                  name='p_contact'
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
                  name='p_address'
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
            <Button colorScheme='red' onClick={() => patientUpdateHandler(userId)}>
              Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Patients;
