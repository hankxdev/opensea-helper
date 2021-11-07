import * as React from 'react';

import { Box, Flex, Button, VStack } from '@chakra-ui/react';


const Content = () => {
  return (
    <Flex p={2} flexDir='column' justifyContent='space-between'>
      <VStack>
        <Button m={2} w="100%" colorScheme='red'>
          Track New Collections
        </Button>
        <Button m={2} w="100%" colorScheme='red'>
          Track New Collections
        </Button>
      </VStack>
    </Flex>
  );
};


export default Content;
