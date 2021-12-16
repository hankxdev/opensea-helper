import './Options.scss'

import * as React from 'react'

import { Box, Button, Center, Flex, Spinner } from '@chakra-ui/react'

interface Props {
  title: string
}

interface NonceResponse {
  nonce: string
}
interface VerifyResponse {
  token: string
}

const Options = ({ title }: Props) => {
  return <Center p="10em" h="10vh%" color="white"></Center>
}

export default Options
