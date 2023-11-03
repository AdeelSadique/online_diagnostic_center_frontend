import React, { useState } from 'react';
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BiTestTube } from 'react-icons/bi';
import { CgChevronDoubleDown, CgMenuGridR } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Header() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [activeMenu, setActiveMenu] = useState('home');
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const toast = useToast();

  // mobile home handler for close drawer and scroll to top
  const collapseHomeHandler = () => {
    onClose();
    window.scrollTo({ top: '0', behavior: 'smooth' });
  };
  const testDispatchHandler = () => {
    setActiveMenu('test');
    dispatch({ type: 'search', payload: '' });
  };
  const logoutHandler = () => {
    onClose();
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
          title: 'Logged out',
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
  const loggedData = useSelector((state) => state.isLogged.data);
  const status = useSelector((state) => state.isLogged.isLogged);
  const Auth = {
    isLogged: status,
    userType: loggedData.user_type,
    userName: loggedData.email,
  };

  return (
    <>
      <Stack
        bgColor={'red.500'}
        p={4}
        flexDir={'row'}
        justifyContent={'space-between'}
        overflow={'auto'}
        pos={'sticky'}
        top={0}
        zIndex={'overlay'}
        scrollBehavior={'smooth'}
        minH={'1px'}
      >
        <HStack>
          <IconButton variant={'ghost'}>
            <Link to={'/'} onClick={() => window.scrollTo({ top: '0px', behavior: 'smooth' })}>
              <BiTestTube size={40}></BiTestTube>
            </Link>
          </IconButton>
          <Heading size={'sm'} color={'white'}>
            Fast Test
          </Heading>
        </HStack>
        <HStack display={['none', 'none', 'none', 'flex']} spacing={2}>
          <Link to={'/'} onClick={() => window.scrollTo({ top: '0px', behavior: 'smooth' })}>
            <Button variant={activeMenu === 'home' ? 'solid' : 'ghost'} onClick={() => setActiveMenu('home')}>
              {' '}
              Home
            </Button>
          </Link>
          <Link to={'/tests'} onClick={() => window.scrollTo({ top: '0', behavior: 'smooth' })}>
            <Button variant={activeMenu === 'test' ? 'solid' : 'ghost'} onClick={testDispatchHandler}>
              Tests
            </Button>
          </Link>
          <Link to={'/hospitalReg'}>
            <Button variant={activeMenu === 'hospital' ? 'solid' : 'ghost'} onClick={() => setActiveMenu('hospital')}>
              Hospital Reg
            </Button>
          </Link>
          <HashLink to={'/#howWeWork'}>
            <Button variant={activeMenu === 'work' ? 'solid' : 'ghost'} onClick={() => setActiveMenu('work')}>
              How we work
            </Button>
          </HashLink>
          <HashLink to={'/#aboutUs'}>
            <Button variant={activeMenu === 'about' ? 'solid' : 'ghost'} onClick={() => setActiveMenu('about')}>
              About US
            </Button>
          </HashLink>
          <HashLink to={'/#query'}>
            <Button variant={activeMenu === 'query' ? 'solid' : 'ghost'} onClick={() => setActiveMenu('query')}>
              Query
            </Button>
          </HashLink>
        </HStack>
        <HStack>
          {Auth.isLogged ? (
            <Link
              to={`${
                Auth.userType === '0' ? '/patientDashboard' : Auth.userType === '1' ? '/managerDashboard' : Auth.userType === '2' ? '/adminDashboard' : '/login'
              }`}
              onClick={() => window.scrollTo({ top: '0', behavior: 'smooth' })}
            >
              <Button display={['none', 'none', 'none', 'block']} onClick={() => setActiveMenu('profile')}>
                Profile
              </Button>
            </Link>
          ) : (
            <Link to={'/login'} onClick={() => window.scrollTo({ top: '0', behavior: 'smooth' })}>
              <Button display={['none', 'none', 'none', 'block']} onClick={() => setActiveMenu('login')}>
                Login
              </Button>
            </Link>
          )}
          {/* mobile device menu button */}
          <Button display={['block', 'block', 'block', 'none']} onClick={onOpen}>
            <CgMenuGridR size={'25'} />{' '}
          </Button>
        </HStack>
      </Stack>

      {/* drawer for mini devices */}
      <Drawer isOpen={isOpen} onClose={onClose} placement='start'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <BiTestTube size={40}></BiTestTube>
              <Text>Fast Test</Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} w={'full'} alignItems={'strech'}>
              <HStack>
                <Avatar name={!Auth.isLogged ? null : Auth.userName}>
                  <AvatarBadge boxSize={'0.9em'} bg={Auth.isLogged ? 'green.500' : 'red.500'} />
                </Avatar>
                {Auth.isLogged ? <Heading size={'sm'}>{Auth.userName}</Heading> : <Heading size={'sm'}>Guest</Heading>}
              </HStack>
              <Link to={'/'}>
                <Button variant={'outline'} w={'full'} onClick={collapseHomeHandler}>
                  Home
                </Button>
              </Link>
              <Link to={'/tests'}>
                <Button variant={'outline'} w={'full'} onClick={onClose}>
                  Tests
                </Button>
              </Link>
              <Link to={'/hospitalReg'}>
                <Button variant={'outline'} w={'full'} onClick={onClose}>
                  Hospital Reg
                </Button>
              </Link>
              <HashLink to={'/#howWeWork'}>
                <Button variant={'outline'} w={'full'} onClick={onClose}>
                  How we work
                </Button>
              </HashLink>
              <HashLink to={'/#aboutUs'}>
                <Button variant={'outline'} w={'full'} onClick={onClose}>
                  About US
                </Button>
              </HashLink>
              <HashLink to={'/#query'}>
                <Button variant={'outline'} w={'full'} onClick={onClose}>
                  Query
                </Button>
              </HashLink>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            {Auth.isLogged ? (
              <VStack w={'full'} alignItems={'stretch'}>
                <Link
                  to={`${
                    Auth.userType === '0'
                      ? '/patientDashboard'
                      : Auth.userType === '1'
                      ? '/managerDashboard'
                      : Auth.userType === '2'
                      ? '/adminDashboard'
                      : '/login'
                  }`}
                >
                  <Button w={'full'} colorScheme={'red'} onClick={onClose}>
                    Profile
                  </Button>
                </Link>
                <Button w={'full'} colorScheme={'red'} onClick={logoutHandler}>
                  Logout
                </Button>
              </VStack>
            ) : (
              <VStack w={'full'} alignItems={'stretch'}>
                <Link to={'/login'}>
                  <Button w={'full'} colorScheme={'red'} onClick={onClose}>
                    Login
                  </Button>
                </Link>
              </VStack>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
