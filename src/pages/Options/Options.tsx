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

const Options: React.FC<Props> = ({ title }: Props) => {
  const LoginWithMetaMask = async () => {}

  return (
    <Center p="10em" h="10vh%"color="white">
      <Button bg="black" onClick={LoginWithMetaMask}> Login With MetaMask </Button>
    </Center>
  )
}

export default Options
