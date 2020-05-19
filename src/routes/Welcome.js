import React from 'react';
import { Heading, Text, Flex, Grid, Image } from '@chakra-ui/core';
import LoginButton from '../components/LoginButton';

import graphic from '../undraw_calendar_dutt.svg';

const CallToAction = () => (
  <Flex order={[2, 1]} direction="column" justify="center" align="center">
    <Heading
      as="h1"
      fontSize={['4xl', '5xl']}
      textAlign="center"
      fontWeight={700}
      mb={4}
    >
      When you need more control and flexiblity.
    </Heading>
    <Text fontSize="xl" textAlign="center" mb={4} fontWeight={300}>
      D8Picker helps you schedule aperiodic events with ease.
    </Text>
    <LoginButton />
  </Flex>
);

const Graphic = () => (
  <Flex order={[1, 2]} direction="column" justify="center" align="center">
    <Image src={graphic} />
  </Flex>
);

const Welcome = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      backgroundColor="#ebf1f1"
      h="100%"
      p="2rem"
    >
      <Grid
        width="100%"
        gap={2}
        alignItems="center"
        justifyContent="center"
        templateColumns="repeat(auto-fit, minmax(349px, 1fr))"
      >
        <CallToAction />
        <Graphic />
      </Grid>
    </Flex>
  );
};

export default Welcome;
