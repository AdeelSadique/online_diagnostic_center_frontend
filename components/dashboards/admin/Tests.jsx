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
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

function Tests() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAddTestOpen, onOpen: onAddTestOpen, onClose: onAddTestClose } = useDisclosure();
  const toast = useToast();
  const [tests, setTests] = useState([]);
  const [testId, setTestId] = useState();
  const [changeForm, setChangeForm] = useState();
  const [searchStatus, setSearchStatus] = useState('');
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState([]);
  const testEditHandler = (id) => {
    setTestId(id);
    onOpen();
  };
  const testUpdateHandler = (id) => {
    axios
      .put(`test/${id}`, changeForm, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        toast({
          title: 'Test Updated',
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
      });
    setTestId('');
    setChangeForm('');
    onClose();
  };
  const testAddHandler = () => {
    axios
      .post(`test`, changeForm, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        toast({
          title: 'Test Added',
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
      });
    setChangeForm('');
    onAddTestClose();
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    axios
      .get(`test`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const data = res.data.data;
        setTests(data);
      })
      .catch((err) => {
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
  }, [testUpdateHandler, testAddHandler]);

  return (
    <>
      <Container maxW={['full', '6xl']} p={4}>
        <Heading size={'md'} textAlign={'center'}>
          Tests
        </Heading>

        <HStack p={2} justifyContent={'space-between'} wrap={'wrap'}>
          <Button colorScheme='red' size={'sm'} onClick={onAddTestOpen}>
            Add Test
          </Button>

          <HStack>
            <Input placeholder='Name/Cat/Loca.' focusBorderColor='red' value={search} onChange={(e) => setSearch(e.target.value)} />
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
                <Th>Test Name</Th>
                <Th>Test category</Th>
                <Th>Hospital</Th>
                <Th>Fee</Th>
                <Th>T.Slot</Th>
                <Th>Location</Th>
                <Th>M.ID</Th>
                <Th>Status</Th>
                <Th>Rating</Th>
                <Th colSpan={2}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tests.map((t, i) => {
                switch (searchStatus) {
                  case 'search':
                    return t.t_name.toLowerCase().match(search) ||
                      t.t_category.toLowerCase().match(search) ||
                      t.manager.hospital_name.toLowerCase().match(search) ||
                      t.t_location.toLowerCase().match(search) ||
                      t.reporting_time.toString().match(search) ||
                      t.t_price.toString().match(search) ||
                      t.manager.m_id.toString().match(search) ||
                      t.t_status.toString().match(search) ? (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{t.t_name}</Td>
                        <Td>{t.t_category}</Td>
                        <Td>{t.manager.hospital_name}</Td>
                        <Td>{t.t_price}</Td>
                        <Td>{t.reporting_time}</Td>
                        <Td>{t.t_location}</Td>
                        <Td>{t.manager.m_id}</Td>
                        <Td color={!t.t_status ? 'red' : ''}>{t.t_status ? 'Active' : 'Block'}</Td>
                        <Td>
                          <HStack>
                            <RatingComponent rating={rating} id={t.t_id} key={i} />
                          </HStack>
                        </Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.400'} onClick={() => testEditHandler(t.t_id)}>
                              Edit
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
                        <Td>{t.t_name}</Td>
                        <Td>{t.t_category}</Td>
                        <Td>{t.manager.hospital_name}</Td>
                        <Td>{t.t_price}</Td>
                        <Td>{t.reporting_time}</Td>
                        <Td>{t.t_location}</Td>
                        <Td>{t.manager.m_id}</Td>
                        <Td color={!t.t_status ? 'red' : ''}>{t.t_status ? 'Active' : 'Block'}</Td>
                        <Td>
                          <HStack>
                            <RatingComponent rating={rating} id={t.t_id} key={i} />
                          </HStack>
                        </Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.400'} onClick={() => testEditHandler(t.t_id)}>
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
          <ModalHeader>Update Test</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={0}>
              <FormControl isRequired>
                <FormLabel>Change Test Status</FormLabel>
                <Select name='t_status' required onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}>
                  <option defaultChecked>Select</option>
                  <option value={0}>Block</option>
                  <option value={1}>Active</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Test Name</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='t_name'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Test Category</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='t_category'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Test Price</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='t_price'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Reporting Time</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='reporting_time'
                  placeholder='Like 10:00 AM, 12:00 PM'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Test Location</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='t_location'
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
            <Button colorScheme='red' onClick={() => testUpdateHandler(testId)}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isAddTestOpen} onClose={onAddTestClose} size={['full', 'xl']}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Test</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={0}>
              <FormControl isRequired>
                <FormLabel>Manager ID</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='m_id'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Test Name</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='t_name'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Test Category</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='t_category'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Test Price</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='t_price'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Reporting Time</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='reporting_time'
                  placeholder='Like 10:00 AM, 12:00 PM'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Test Location</FormLabel>
                <Input
                  focusBorderColor='gray'
                  variant={'flushed'}
                  type='text'
                  name='t_location'
                  required
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' mr={3} onClick={onAddTestClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={() => testAddHandler()}>
              Add
            </Button>
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
  return isNaN(avgRating) ? 0 + '/5' : avgRating + '/5';
};

export default Tests;
