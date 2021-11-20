import React from 'react';
import { Center, HStack, Spinner, Heading } from 'native-base';

const Carregando = () => (
  <Center flex={1}>
    <HStack space={2} alignItems="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Carregando
      </Heading>
    </HStack>
  </Center>
);

export default Carregando;
