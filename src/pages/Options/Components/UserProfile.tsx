import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Square,
  Text,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios, { Method } from 'axios'

interface IProps {
  account: string
  network: string
  provider: any
}

interface INonceResponse {
  nonce: string
}

interface IVerifyResponse {
  token: string
}

const API = {
  getNonce: 'http://127.0.0.1:5001/nifty-owl/us-central1/getNonceToSign',
  verifyMessage:
    'http://127.0.0.1:5001/nifty-owl/us-central1/verifySignedMessage',
}
// const API = {
//   getNonce: 'https://us-central1-nifty-owl.cloudfunctions.net/getNonceToSign',
//   verifyMessage:
//     'https://us-central1-nifty-owl.cloudfunctions.net/verifySignedMessage',
// }

const UserProfile = ({ account, network, provider }: IProps) => {
  const [verified, setVerified] = useState(false)
  const [nonce, setNonce] = useState('')

  const toast = useToast()
  const showError = (error: string) => {
    toast({
      title: error,
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  const toHex = (stringToConvert: string) => {
    return stringToConvert
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  }

  const verifyAcount = async () => {
    let errorMsg = ''
    if (account === '') {
      errorMsg = 'not connected'
      toast({
        title: errorMsg,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    } else {
      let nonceResponse
      let nonce
      try {
        const data = JSON.stringify({
          address: account,
        })

        const config = {
          method: 'post' as Method,
          url: API.getNonce,
          headers: {
            'Content-Type': 'application/json',
          },
          data,
        }

        nonceResponse = await axios(config)
        
        nonce = nonceResponse.data.nonce
      } catch (e) {
        console.log(e)
        showError('error getting nonce')
        return
      }
      if (!nonce) {
        showError('error getting nonce')
        return
      }

      const signature = await provider.request({
        method: 'personal_sign',
        params: ['0x' + toHex(nonce), account],
      })

      console.log(signature)

      if (!signature) {
        showError('Looks like you are not able to sign messages')
        return
      }

      try {
        const verifyResponse = await axios.post(API.verifyMessage, {
          address: account,
          signature,
          nonce: nonce,
        })

        setVerified(verifyResponse.data.token)
      } catch (e) {
        console.log(e)
        showError('error verifying message')
      }
    }
  }

  return (
    <Center>
      <Flex color="white" flexDir="column">
        <Box fontSize="1.4rem">
          <Text>Your Account: {account}</Text>
          <Text>Current Network:{network}</Text>
        </Box>
        <Box>
          <Button
            color="black"
            onClick={() => {
              verifyAcount()
            }}
          >
            Verify Your Account
          </Button>
        </Box>
      </Flex>
    </Center>
  )
}

export default UserProfile
