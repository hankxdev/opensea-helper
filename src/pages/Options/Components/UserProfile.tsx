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

import { IUserInfo } from '../../../intefaces'
import { checkToken } from '../../../utils'

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
  getNonce: 'https://us-central1-nifty-owl.cloudfunctions.net/getNonceToSign',
  verifyMessage:
    'https://us-central1-nifty-owl.cloudfunctions.net/verifySignedMessage',
}

const UserProfile = ({ account, network, provider }: IProps) => {
  const [verified, setVerified] = useState(false)
  const [nonce, setNonce] = useState('')
  const [token, setToken] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const toast = useToast()
  const showError = (error: string) => {
    toast({
      title: error,
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
    setIsVerifying(false)
  }

  const toHex = (stringToConvert: string) => {
    return stringToConvert
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  }

  const verifyAcount = async () => {
    setIsVerifying(true)
    let errorMsg = ''
    if (account === '') {
      showError('Please connect to MetaMask')
      return
    }
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
      const { token } = verifyResponse.data
      if (!checkToken(account, token)) {
        showError('Could not verify you')
        setIsVerifying(false)
        return
      }

      setToken(token)
      setVerified(true)
      setIsVerifying(false)
      chrome.storage.sync.set({
        user: {
          address: account,
          network,
          token,
        } as IUserInfo,
      })
    } catch (e) {
      console.log(e)
      showError('error verifying message')
    }
  }
  return (
    <Flex flexDir="column" maxW="335px" alignItems="center">
      <Box fontSize="1rem" w="100%">
        <Text noOfLines={3}>Your Account: {account}</Text>
      </Box>
      {verified ? (
        <Text fontSize="1.2rem" color="green">
          Verified! Now you can use the extension.
        </Text>
      ) : (
        <Box>
          <Button
            isLoading={isVerifying}
            onClick={() => {
              verifyAcount()
            }}
          >
            Verify Account
          </Button>
        </Box>
      )}
    </Flex>
  )
}

export default UserProfile
