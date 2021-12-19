import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Text,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import Layout from './Components/Layout'
import UserProfile from './Components/UserProfile'
import createMetaMaskProvider from 'metamask-extension-provider'
import ethers from 'ethers'

export default function App() {
  const toast = useToast()
  const [mmInstalled, setMMInstalled] = useState(false)
  const [mmProvider, setMmProvider] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState('')
  const [network, setNetwork] = useState('')

  const initProvider = async () => {
    const provider = await createMetaMaskProvider()
    provider.on('error', (error) => {
      setMMInstalled(false)
      console.log('error')
    })

    if (provider) {
      setMMInstalled(true)
      setMmProvider(provider)
      provider.on('chainChanged', (chainId) => {
        // @ts-ignore
        setNetwork(chainId)
      })
      // @ts-ignore
      provider.on('connect', (connect: ConnectInfo) => {
        setNetwork(connect.chainId)
      })
    } else {
      toast({
        title: 'please install metamask',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const connectWeb3 = async () => {
    const accounts = await mmProvider.enable()
    setAccount(accounts[0])
    setIsConnected(true)
  }

  const connectWithMetaMask = async () => {
    try {
      connectWeb3()
    } catch (e) {
      toast({
        duration: 3000,
        isClosable: true,
        title: 'please install metamask',
      })
    }
  }

  useEffect(() => {
    initProvider()
  }, [])

  return (
    <ChakraProvider>
      <Layout>
        {!isConnected ? (
          <Box>
            <Button
              onClick={() => {
                connectWithMetaMask()
              }}
            >
              Connect With Metamask
            </Button>
          </Box>
        ) : (
          <UserProfile
            account={account}
            network={network}
            provider={mmProvider}
          />
        )}
      </Layout>
    </ChakraProvider>
  )
}
