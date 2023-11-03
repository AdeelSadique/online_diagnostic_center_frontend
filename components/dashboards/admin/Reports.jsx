import {
  Button,
  Checkbox,
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
import { BiCloudUpload, BiSearch } from 'react-icons/bi';

function Reports() {
  const toast = useToast();
  const [reports, setReports] = useState([]);
  const [userId, setUserId] = useState();
  const [changeForm, setChangeForm] = useState();
  const [filePath, setFilePath] = useState([]);
  const [searchStatus, setSearchStatus] = useState('');
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();

  const reportEditHandler = (id) => {
    setUserId(id);
    onOpen();
  };
  const reportEditUploadHandler = (id) => {
    setUserId(id);
    onUploadOpen();
  };

  const reportUploadHandler = (id) => {
    const formData = new FormData();
    formData.append('r_file', filePath);
    formData.append('r_id', id);
    axios
      .post('report', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}`, Accept: 'application/json', 'content-type': 'multipart/form-data' },
      })
      .then((res) => {
        setUserId('');
        toast({
          title: 'Report Updated',
          status: 'success',
          duration: '3000',
          isClosable: true,
        });
      })
      .catch((err) => {
        setFilePath('');
        console.log(err.response.data);
        const Err = err.response.data.message;
        toast({
          title: Err,
          status: 'error',
          duration: '3000',
          isClosable: true,
        });
      });
    onUploadClose();
  };
  const reportUpdateHandler = (id) => {
    axios
      .put(`report/${id}`, changeForm, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        console.log(res);
        toast({
          title: 'Report Updated',
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

    setUserId('');
    setChangeForm('');
    onClose();
  };

  useEffect(() => {
    axios
      .get(`report`, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
      .then((res) => {
        const data = res.data.data;
        setReports(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reportUpdateHandler, reportEditHandler, reportUploadHandler]);
  return (
    <>
      <Container maxW={['full', '6xl']} p={4}>
        <Heading size={'md'} textAlign={'center'}>
          Reports
        </Heading>

        <HStack wrap={'wrap'} p={2} justifyContent={'space-between'}>
          <HStack wrap={'wrap'}>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('a')}>
              All
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('analyzing')}>
              Analyzing
            </Button>
            <Button variant={'outline'} colorScheme='red' size={['xs', 'sm']} onClick={() => setSearchStatus('processed')}>
              Processed
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
          <Table size={['sm', 'md']}>
            <Thead>
              <Tr>
                <Th>S#</Th>
                <Th>App. ID</Th>
                <Th>Patient ID</Th>
                <Th>Patient Name</Th>
                <Th>Report</Th>
                <Th>Status</Th>
                <Th colSpan={2}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reports.map((r, i) => {
                switch (searchStatus) {
                  case 'a':
                    return (
                      <Tr>
                        <Td>{i + 1}</Td>
                        <Td>{r.ap_id}</Td>
                        <Td>{r.appointment.patient.p_id}</Td>
                        <Td>{r.appointment.patient.name}</Td>
                        <Td>{r.r_file ? 'Uploaded' : 'Not Uploaded'}</Td>

                        <Td color={!r.r_status ? 'red' : ''}>{r.r_status ? 'Processed' : 'Pending'}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.400'} onClick={() => reportEditHandler(r.r_id)}>
                              Update
                            </Button>
                            <Button variant={'filled'} size={'sm'} bgColor={'green.500'} onClick={() => reportEditUploadHandler(r.r_id)}>
                              Upload
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    );
                    break;
                  case 'analyzing':
                    return r.r_status == 0 ? (
                      <Tr>
                        <Td>{i + 1}</Td>
                        <Td>{r.ap_id}</Td>
                        <Td>{r.appointment.patient.p_id}</Td>
                        <Td>{r.appointment.patient.name}</Td>
                        <Td>{r.r_file ? 'Uploaded' : 'Not Uploaded'}</Td>

                        <Td color={!r.r_status ? 'red' : ''}>{r.r_status ? 'Processed' : 'Pending'}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.400'} onClick={() => reportEditHandler(r.r_id)}>
                              Update
                            </Button>
                            <Button variant={'filled'} size={'sm'} bgColor={'green.500'} onClick={() => reportEditUploadHandler(r.r_id)}>
                              Upload
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;
                    break;

                  case 'processed':
                    return r.r_status == 1 ? (
                      <Tr>
                        <Td>{i + 1}</Td>
                        <Td>{r.ap_id}</Td>
                        <Td>{r.appointment.patient.p_id}</Td>
                        <Td>{r.appointment.patient.name}</Td>
                        <Td>{r.r_file ? 'Uploaded' : 'Not Uploaded'}</Td>

                        <Td color={!r.r_status ? 'red' : ''}>{r.r_status ? 'Processed' : 'Pending'}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.400'} onClick={() => reportEditHandler(r.r_id)}>
                              Update
                            </Button>
                            <Button variant={'filled'} size={'sm'} bgColor={'green.500'} onClick={() => reportEditUploadHandler(r.r_id)}>
                              Upload
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;

                  case 'search':
                    return r.appointment.patient.name.toLowerCase().match(search) ||
                      r.ap_id.toString().match(search) ||
                      r.appointment.patient.p_id.toString().match(search) ? (
                      <Tr>
                        <Td>{i + 1}</Td>
                        <Td>{r.ap_id}</Td>
                        <Td>{r.appointment.patient.p_id}</Td>
                        <Td>{r.appointment.patient.name}</Td>
                        <Td>{r.r_file ? 'Uploaded' : 'Not Uploaded'}</Td>

                        <Td color={!r.r_status ? 'red' : ''}>{r.r_status ? 'Processed' : 'Pending'}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.400'} onClick={() => reportEditHandler(r.r_id)}>
                              Update
                            </Button>
                            <Button variant={'filled'} size={'sm'} bgColor={'green.500'} onClick={() => reportEditUploadHandler(r.r_id)}>
                              Upload
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ) : null;

                  default:
                    return (
                      <Tr>
                        <Td>{i + 1}</Td>
                        <Td>{r.ap_id}</Td>
                        <Td>{r.appointment.patient.p_id}</Td>
                        <Td>{r.appointment.patient.name}</Td>
                        <Td>{r.r_file ? 'Uploaded' : 'Not Uploaded'}</Td>

                        <Td color={!r.r_status ? 'red' : ''}>{r.r_status ? 'Processed' : 'Pending'}</Td>
                        <Td>
                          <HStack>
                            <Button variant={'filled'} size={'sm'} bgColor={'orange.400'} onClick={() => reportEditHandler(r.r_id)}>
                              Update
                            </Button>
                            <Button variant={'filled'} size={'sm'} bgColor={'green.500'} onClick={() => reportEditUploadHandler(r.r_id)}>
                              Upload
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
          <ModalHeader>Update Patient Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6}>
              <FormControl>
                <FormLabel>Update Status</FormLabel>

                <Select
                  focusBorderColor='gray'
                  variant={'filled'}
                  name='r_status'
                  onChange={(e) => setChangeForm({ ...changeForm, [e.target.name]: e.target.value })}
                >
                  <option defaultChecked>Choose</option>
                  <option value={'1'}>Proccessed</option>
                  <option value={'0'}>Analyzing</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={() => reportUpdateHandler(userId)}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isUploadOpen} onClose={onUploadClose} size={['full', 'xl']}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Patient Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6}>
              <BiCloudUpload size={'80'} />
              <FormControl>
                <Input type='file' onChange={(e) => setFilePath(e.target.files[0])} />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' mr={3} onClick={onUploadClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={() => reportUploadHandler(userId)}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Reports;
