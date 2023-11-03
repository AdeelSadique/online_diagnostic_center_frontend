import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import Aos from 'aos';
import 'aos/dist/aos.css';

function HowWeWork() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <VStack mt={4} id='howWeWork' scrollBehavior={'smooth'} overflow={'hidden'}>
        <Heading>How We Works</Heading>
        <Stack flexDir={['column', 'column', 'row']} p={4} spacing={4} justifyContent={'center'}>
          <Card boxShadow={'lg'} bgColor={'blackAlpha.300'} maxW={['full', 'full', '30%']} data-aos='zoom-out-left' data-aos-duration='400'>
            <CardHeader textAlign={'center'}>
              <Heading size={'md'} borderBottom={'1px'}>
                Book Test
              </Heading>{' '}
            </CardHeader>
            <CardBody textAlign={'center'}>
              <Text textAlign={'justify'}>
                Our website offers a seamless booking experience, designed to simplify the process and provide you with a hassale-free way to access the
                diagnostic test you need. With a wide range of tests available, from basic screenings to comprehensive panels, you can easily browse and select
                the tests that align with your specific goals and requirements. Upon successfull booking, you will receive a confirmation email with all the
                necessary details, including the appointment date, location and any additional instructions.
              </Text>
            </CardBody>
          </Card>
          <Card boxShadow={'lg'} bgColor={'blackAlpha.300'} maxW={['full', 'full', '30%']} data-aos='zoom-out-left' data-aos-duration='800'>
            <CardHeader textAlign={'center'}>
              <Heading size={'md'} borderBottom={'1px'}>
                Sample Collection
              </Heading>{' '}
            </CardHeader>
            <CardBody textAlign={'center'}>
              <Text textAlign={'justify'}>
                Sample Collection from home is a service that revolutionizes the way samples are collected for scientific analysis. Gone are the days of longs
                waits and inconvenient visits to the lab. With our innovative solution, individuals can now collect samples from the comfort of their own homes,
                ensuring a seamless and stress-free experience. When your samples arrive at our laboratory, Our lab team handles them with the utmost care and
                attention to detail.They follow strict protocols and quality controls measures to maintain the integrity of your samples throughout the analysis
                process.
              </Text>
            </CardBody>
          </Card>
          <Card boxShadow={'lg'} bgColor={'blackAlpha.300'} maxW={['full', 'full', '30%']} data-aos='zoom-out-left' data-aos-duration='1200'>
            <CardHeader textAlign={'center'}>
              <Heading size={'md'} borderBottom={'1px'}>
                Results
              </Heading>{' '}
            </CardHeader>
            <CardBody textAlign={'center'}>
              <Text textAlign={'justify'}>
                At our diagnostic center, we prioritize providing you with a seamless and convenient experience when it comes to accessing you test results.
                When our expert team examines and analyzer you diagnostic test, we ensure that your results are prommptly uploaded to our secure online
                platform, easily accessible from anywhere, anytime. Upon uploading your results, you will receive an notification via email or any other
                preferred method of communication. This notification will inform you that your results are now available on the website.
              </Text>
            </CardBody>
          </Card>
        </Stack>
      </VStack>
    </>
  );
}

export default HowWeWork;
