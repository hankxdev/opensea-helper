import { Box, Button, ChakraProvider, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Layout from './Components/Layout'
import Web3 from 'web3'
import createMetaMaskProvider from 'metamask-extension-provider'
import { ethers } from "ethers";
import { initializeProvider } from '@metamask/providers';


export default function App() {

  const [mmProvider, setMmProvider] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState('')

  const initProvider = async () => {
    const provider = await createMetaMaskProvider()

    provider.on('error', (error) => {
    })

    if (provider) {
      console.log(provider.selectedAddress)
      const etherProvider = new ethers.providers.Web3Provider(provider.)
      const signer = etherProvider.getSigner()
      console.log(signer.getBalance(""))

    } else {
      alert("please install metamask")
    }
  }

  useEffect(() => {
    initProvider()
  }, [])

  useEffect(() => {

  }, [mmProvider])

  return (
    <ChakraProvider>
      <Layout>
        {mmProvider && <Flex>{isConnected && <Box>collcted</Box>}</Flex>}
      </Layout>
    </ChakraProvider>
  )
}
