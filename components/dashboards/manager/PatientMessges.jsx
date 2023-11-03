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
  Text,
  Textarea,
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
import { useSelector } from 'react-redux';

function PatientMessges() {
  const [messages, setMesages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState('');
  const [userId, setUserId] = useState('');
  const [reply, setReply] = useState('');
  const [isReplied, setIsReplied] = useState();
  const [searchStatus, setSearchStatus] = useState('');
  const [search, setSearch] = useState('');
  const toast = useToast();

  const viewHandler = (data) => {
    setQuery(data[0]);
    setUserId(data[1]);
    setIsReplied(data[2]);
    onOpen();
  };
  const replyHandler = (id) => {
    !isReplied
      ? axios
          .put(`managerMessage/${id}`, reply, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
          .then((res) => {
            // console.log(res.data.data);

            toast({
              title: 'Replied',
              status: 'success',
              duration: '3000',
              isClosable: true,
            });
          })
          .catch((err) => {
            console.log(err);
            toast({
              title: err.response.message,
              status: 'error',
              duration: '3000',
              isClosable: true,
            });
          })
      : null;
    setQuery('');
    setReply('');
    setIsReplied('');
    setUserId('');
    onClose();
  };
  const manager = useSelector((state) => state.isLogged.data);
  useEffect(() => {
    axios
      .get(`managerMessages/${manager.m_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        const data = res.data.data;
        setMesages(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [replyHandler]);

  return (
    <>
      <Container maxW={['full', '6xl']} p={4}>
        <Heading size={'md'} textAlign={'center'}>
          Patient Messages
        </Heading>

        <HStack wrap={'wrap'} p={2} justifyContent={'space-between'}>
          <HStack>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']}>
              All
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('p')}>
              Pending
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('a')}>
              Answered
            </Button>
          </HStack>

          <HStack>
            <Input placeholder='Patient#/App#/Rep#' focusBorderColor='red' value={search} onChange={(e) => setSearch(e.target.value)} />
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
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Contact</Th>
                <Th>Status</Th>
                <Th colSpan={2}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {messages.map((m, i) => {
                switch (searchStatus) {
                  case 'search':
                    return m.name.toLowerCase().match(search) || m.email.toLowerCase().match(search) || m.contact.toString().match(search) ? (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{m.patient.name}</Td>
                        <Td>{m.patient.email}</Td>
                        <Td>{m.patient.p_contact}</Td>
                        <Td color={m.reply ? 'green' : ''}>{m.reply ? 'Answered' : 'Pending'}</Td>
                        <Td>
                          <HStack>
                            <Button size={'sm'} bgColor={'orange.400'} onClick={() => viewHandler([m.message, m.mm_id, m.reply])}>
                              View/Reply
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                  case 'p':
                    return m.status == 0 ? (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{m.patient.name}</Td>
                        <Td>{m.patient.email}</Td>
                        <Td>{m.patient.p_contact}</Td>
                        <Td color={m.reply ? 'green' : ''}>{m.reply ? 'Answered' : 'Pending'}</Td>
                        <Td>
                          <HStack>
                            <Button size={'sm'} bgColor={'orange.400'} onClick={() => viewHandler([m.message, m.mm_id, m.reply])}>
                              View/Reply
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;

                    break;
                  case 'a':
                    return m.status == 1 ? (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{m.patient.name}</Td>
                        <Td>{m.patient.email}</Td>
                        <Td>{m.patient.p_contact}</Td>
                        <Td color={m.reply ? 'green' : ''}>{m.reply ? 'Answered' : 'Pending'}</Td>
                        <Td>
                          <HStack>
                            <Button size={'sm'} bgColor={'orange.400'} onClick={() => viewHandler([m.message, m.mm_id, m.reply])}>
                              View/Reply
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;

                  default:
                    return (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{m.patient.name}</Td>
                        <Td>{m.patient.email}</Td>
                        <Td>{m.patient.p_contact}</Td>
                        <Td color={m.reply ? 'green' : ''}>{m.reply ? 'Answered' : 'Pending'}</Td>
                        <Td>
                          <HStack>
                            <Button size={'sm'} bgColor={'orange.400'} onClick={() => viewHandler([m.message, m.mm_id, m.reply])}>
                              View/Reply
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
          <ModalHeader>Patient Query</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Query</FormLabel>
                <Text>{query}</Text>
              </FormControl>
              <FormControl>
                {isReplied ? (
                  <FormControl>
                    <FormLabel>Replied</FormLabel>
                    <Textarea readOnly defaultValue={isReplied}></Textarea>
                  </FormControl>
                ) : (
                  <Textarea
                    placeholder='Comment Here'
                    name='reply'
                    rows={4}
                    onChange={(e) => setReply({ ...reply, [e.target.name]: e.target.value })}
                  ></Textarea>
                )}
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={() => replyHandler(userId)}>
              Reply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PatientMessges;
