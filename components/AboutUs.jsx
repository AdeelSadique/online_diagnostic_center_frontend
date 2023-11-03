import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react';
import React from 'react';

function AboutUs() {
  return (
    <>
      <VStack id='aboutUs' scrollBehavior={'smooth'} mt={4} p={['2', '4']}>
        <Heading>About US</Heading>
        <Accordion allowMultiple defaultIndex={[0, 1]} w={'full'}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  <b>Overview</b>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              The "Fast Test" is a comprehensive digital solution aimed at revolutionizing the way people access diagnostic services. The project integrates
              modern technology to provide a seamless and user-friendly experience for individuals seeking diagnostic tests. It streamlines the process of
              finding diagnostic centers, scheduling sample collections, and receiving accurate and timely test reports.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  <b>Features</b>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Accordion allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                      <Box as='span' flex='1' textAlign='left'>
                        <b>Diagnostic Center Locator</b>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    The platform includes a user-friendly interface that allows users to search for nearby diagnostic centers based on location, services
                    offered, and user reviews. This feature provides a convenient way for individuals to find the most suitable diagnostic center for their
                    needs.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                      <Box as='span' flex='1' textAlign='left'>
                        <b>Appointment Scheduling</b>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    Users can easily schedule appointments for sample collection at their preferred diagnostic centers through the online platform. They can
                    choose a date and time that best fits their schedule, eliminating the need for long waiting times.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                      <Box as='span' flex='1' textAlign='left'>
                        <b>Sample Collection at Home</b>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    One of the standout features of the system is the option for sample collection at home. Registered medical professionals visit the user's
                    location to collect samples, ensuring comfort and convenience, especially for those with mobility constraints.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                      <Box as='span' flex='1' textAlign='left'>
                        <b>Secure Sample Handling</b>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    The project places a strong emphasis on maintaining sample integrity and security. The collected samples are properly labeled, stored, and
                    transported to the diagnostic centers, adhering to the highest standards of safety and hygiene.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                      <Box as='span' flex='1' textAlign='left'>
                        <b>Digital Test Reports</b>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    The collected samples undergo rigorous and accurate testing using state-of-the-art laboratory equipment. The system ensures timely
                    processing of tests, reducing the waiting period for results.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                      <Box as='span' flex='1' textAlign='left'>
                        <b>Efficient Laboratory Testing</b>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    Once the test results are ready, users receive digital reports through the online platform. These reports are comprehensive, easy to
                    understand, and accessible from any device with internet connectivity.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'red.500', color: 'white' }}>
                      <Box as='span' flex='1' textAlign='left'>
                        <b>User Profiles and History</b>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    Registered users have access to their personal profiles, where they can view their testing history, upcoming appointments, and previous test
                    reports. This feature promotes proactive health management.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </>
  );
}

export default AboutUs;
