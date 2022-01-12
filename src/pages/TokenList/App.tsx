import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Flex,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'


export default function App() {

  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        bg="gray.800"
      >
      </Flex>
    </ChakraProvider>
  )
}
