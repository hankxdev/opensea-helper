import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Flex,
  Image,
  Text,
  useToast,
  Alert, AlertIcon
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import Layout from './Components/Layout'
import MetaMaskIcon from '../../assets/img/metamask-fox.svg'
import UserProfile from './Components/UserProfile'
import createMetaMaskProvider from 'metamask-extension-provider'

import { checkToken } from '../../utils'
import { removeData } from '../../storage'
import { userReducer } from '../../reducer'

export default function App() {
  const toast = useToast()
  const [mmInstalled, setMMInstalled] = useState(false)
  const [mmProvider, setMmProvider] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState('')
  const [network, setNetwork] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [showTokenList, setShowTokenList] = useState(false)

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
      setIsConnecting(false)
      toast({
        title: 'please install metamask',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const connectWeb3 = async () => {
    const accounts = await mmProvider.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])
    setIsConnected(true)
    setIsConnecting(false)
  }

  const connectWithMetaMask = async () => {
    setIsConnecting(true)

    try {
      connectWeb3()
    } catch (e) {
      setIsConnecting(false)
      toast({
        duration: 3000,
        isClosable: true,
        title: 'please install metamask',
      })
    }
  }
  const checkUser = () => {
    chrome.storage.sync.get('user', (i) => {
      const user = i.user
      if (!user) {
        return
      }

      const { address, token, network } = user
      const loggedIn = checkToken(address, token)
      if (!loggedIn) {
        removeData('user')
        return
      }
      setIsConnected(true)
      setAccount(user.address)
    })
  }

  useEffect(() => {
    initProvider()
    // checkUser()
  }, [])

  return (
    <ChakraProvider>
      <Layout>
        <Flex
          backgroundColor="white"
          minH="600px"
          p="1rem"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          flexDirection="column"
          justifyContent="space-around"
          maxW="335px"
        >
          <Image w="300px" src={MetaMaskIcon} />
          <Alert status="info" variant="subtle" alignItems="center">
            <AlertIcon />
            <Text wordBreak="break-word" fontSize="14px"><a href='https://niftyowl.io'><b>Nifty Owl Pass</b></a> (NFT) Required: <br />
              1: Link Account
              <br />
              2: Verify NFT Ownership
              <br />
              
       
            </Text>
          </Alert>
          {!isConnected ? (
            <Button
              className='submitbutton'
              isLoading={isConnecting}
              onClick={() => {
                connectWithMetaMask()
              }}
            >
              Verify Account
            </Button>
          ) : (
            <UserProfile
              account={account}
              network={network}
              provider={mmProvider}
            />
          )}
        </Flex>
      </Layout>
    </ChakraProvider>
  )
}
