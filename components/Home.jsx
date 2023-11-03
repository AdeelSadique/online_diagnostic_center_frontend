import React, { useEffect, useState } from 'react';
import {
  Container,
  Stack,
  Image,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  HStack,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  IconButton,
} from '@chakra-ui/react';
import { AiOutlineSearch, AiOutlineArrowRight } from 'react-icons/ai';
import { BsHeartPulseFill } from 'react-icons/bs';
import { GiBlood, GiStomach, GiKidneys } from 'react-icons/gi';
import { MdBloodtype } from 'react-icons/md';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import HowWeWork from './HowWeWork';
import AboutUs from './AboutUs';
import Query from './Query';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaXRay } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { BiUpArrow, BiUpArrowAlt, BiUpArrowCircle } from 'react-icons/bi';
function Home() {
  useEffect(() => {
    Aos.init();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [scrollButton, setScrollButton] = useState('none');

  // scrolling to the top

  const scrollVisibleHandler = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setScrollButton('block');
    } else if (scrolled < 300) {
      setScrollButton('none');
    }
  };

  const searchHandler = () => {
    dispatch({ type: 'search', payload: search });
    navigate('/tests');
  };
  const stomach = 'stomach';
  const kidney = 'kidney';
  const blood = 'blood';
  const cardSearchHandler = (data) => {
    dispatch({ type: 'search', payload: data });
    navigate('/tests');
  };
  window.addEventListener('scroll', scrollVisibleHandler);
  return (
    <>
      <Container maxW={'full'} h={'full'} id='home' p={1} scrollBehavior={'smooth'}>
        <IconButton
          display={`${scrollButton}`}
          w={'10'}
          h={'10'}
          pos={'fixed'}
          zIndex={'overlay'}
          top={'90%'}
          left={['85%', '90%', '92%', '95%']}
          colorScheme='red'
          borderRadius={'full'}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <BiUpArrowCircle size={'40'} />
        </IconButton>
        <Stack w={'full'} h={'full'} flexDir={['column', 'column', 'column', 'row']}>
          <Image src='/assets/home.jpg' w={['full', 'full', 'full', 'xl', '2xl']} borderRadius={'lg'} opacity={'1'} />
          <VStack w={'full'} p={2} justifyContent={'center'} bgColor={'whitesmoke'} borderRadius={'lg'}>
            <Heading size={'lg'}>Book Diagnostic Tests</Heading>
            <Text>Choose from the list of top-selling packages tailored for you. We care for your health!</Text>
            {/* Searching Area */}
            <Stack flexDir={['column', 'column', 'column', 'row', 'row']} w={'full'} alignSelf={['stretch', 'flex-start']} mt={4}>
              <Input
                h={'12'}
                placeholder='Eg: Test, Price, Location'
                focusBorderColor='black'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button colorScheme={'red'} h={'12'} onClick={searchHandler}>
                <AiOutlineSearch size={'40'} />
              </Button>
            </Stack>
          </VStack>
        </Stack>
        {/* famous tests */}

        <VStack w={'full'} mt={4} mb={2}>
          <Heading>Famous Tests</Heading>
          <Divider />
          <HStack w={'full'} justifyContent={'space-evenly'} p={2} alignItems={'center'} flexWrap={'wrap'}>
            <Button w={'20'} h={'20'} borderRadius={'full'} border={'1px solid black'} variant={'solid'}>
              <GiKidneys size={'60'} color='black' />
            </Button>
            <Button w={'20'} h={'20'} borderRadius={'full'} border={'1px solid green'} variant={'solid'}>
              <BsHeartPulseFill size={'60'} color='black' />
            </Button>
            <Button w={'20'} h={'20'} borderRadius={'full'} border={'1px solid red'} variant={'solid'}>
              <GiStomach size={'60'} color='black' />
            </Button>
            <Button w={'20'} h={'20'} borderRadius={'full'} border={'1px solid blue'} variant={'solid'}>
              <MdBloodtype size={'60'} color='black' />
            </Button>
            <Button w={'20'} h={'20'} borderRadius={'full'} border={'1px solid orange'} variant={'solid'} display={['none', 'flex']}>
              <FaXRay size={'60'} color='black' />
            </Button>
          </HStack>
        </VStack>

        {/* All tests */}

        <Divider />
        <VStack mt={4} p={4} overflow={'auto'}>
          <Heading size={'md'}>All tests</Heading>
          <SimpleGrid w={'full'} columns={[1, 1, 2, 4, 4]} spacing={4}>
            <Card boxShadow={'lg'} variant={'filled'} data-aos='flip-up' data-aos-duration='400'>
              <CardHeader textAlign={'center'}>
                <Heading size={'md'}>500+</Heading>{' '}
              </CardHeader>
              <CardBody textAlign={'center'}>Tests are more.</CardBody>
              <CardFooter margin={'auto'}>
                <Link to={'/tests'}>
                  <Button colorScheme='red' borderRadius={'3xl'}>
                    View All
                    <AiOutlineArrowRight />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card boxShadow={'lg'} variant={'filled'} data-aos='flip-up' data-aos-duration='1000'>
              <CardHeader textAlign={'center'}>
                <Heading size={'md'}>Blood</Heading>{' '}
              </CardHeader>
              <CardBody textAlign={'center'}>Tests are more.</CardBody>
              <CardFooter>
                <Button colorScheme='red' margin={'auto'} borderRadius={'3xl'} onClick={() => cardSearchHandler(blood)}>
                  {/* <Link to={'tests'}>See More</Link> */}
                  See More
                </Button>
              </CardFooter>
            </Card>
            <Card boxShadow={'lg'} variant={'filled'} data-aos='flip-up' data-aos-duration='1500'>
              <CardHeader textAlign={'center'}>
                <Heading size={'md'}>Stomach</Heading>{' '}
              </CardHeader>
              <CardBody textAlign={'center'}>Tests are more.</CardBody>
              <CardFooter>
                <Button colorScheme='red' margin={'auto'} borderRadius={'3xl'} onClick={() => cardSearchHandler(stomach)}>
                  {/* <Link to={'tests'}>See More</Link> */}
                  See More
                </Button>
              </CardFooter>
            </Card>
            <Card boxShadow={'lg'} variant={'filled'} data-aos='flip-up' data-aos-duration='2000'>
              <CardHeader textAlign={'center'}>
                <Heading size={'md'}>Kidney</Heading>{' '}
              </CardHeader>
              <CardBody textAlign={'center'}>Tests are more.</CardBody>
              <CardFooter>
                <Button colorScheme='red' margin={'auto'} borderRadius={'3xl'} onClick={() => cardSearchHandler(kidney)}>
                  {/* <Link to={'tests'}>See More</Link> */}
                  See More
                </Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </VStack>

        {/* how we work component */}
        <Divider />
        <HowWeWork />
        <Divider />
        {/* about us component */}
        <AboutUs />
        <Divider />
        {/* send message to admin */}
        <Query />
      </Container>
    </>
  );
}

export default Home;
