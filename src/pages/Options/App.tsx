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

import Layout from './Components/Layout'
import MetaMaskIcon from '../../assets/img/metamask-fox.svg'
import UserProfile from './Components/UserProfile'
import createMetaMaskProvider from 'metamask-extension-provider'

import NFTList from './Components/NFTList'

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
    const accounts = await mmProvider.enable()
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

  useEffect(() => {
    initProvider()
  }, [])

  return (
    <ChakraProvider>
      <Layout>
        {showTokenList ? <NFTList address={account} network={network}/> : (
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
            <Image w="300px" src={MetaMaskIcon}/>
            {!isConnected ? (
              <Button
                className='submitbutton'
                isLoading={isConnecting}
                onClick={() => {
                  connectWithMetaMask()
                }}
              >
                Connect With Metamask
              </Button>
            ) : (
              <UserProfile
                account={account}
                network={network}
                provider={mmProvider}
                showTokenList={() => {
                  setShowTokenList(true)
                }}
              />
            )}
          </Flex>)}

      </Layout>
    </ChakraProvider>
  )
}
