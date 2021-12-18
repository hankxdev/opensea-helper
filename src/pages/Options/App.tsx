import { Box, Button, ChakraProvider, Flex, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Layout from './Components/Layout'
import createMetaMaskProvider from 'metamask-extension-provider'

import ethers from 'ethers'


export default function App() {

  const toast = useToast()
  const [mmInstalled, setMMInstalled] = useState(false)
  const [mmProvider, setMmProvider] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState('')

  const initProvider = async () => {
    const provider = await createMetaMaskProvider()

    provider.on('error', (error) => {
      setMMInstalled(false)
      console.log('error')
    })

    if (provider) {
      setMMInstalled(true)
      setMmProvider(provider)
      provider.enable()
    } else {
      alert('please install metamask')
    }
  }

  const connectWithMetaMask = async () => {
    try {

    } catch (e) {
      
    }
  }

  useEffect(() => {
    initProvider()
  }, [])


  return (
    <ChakraProvider>
      <Layout>
        {
          mmInstalled && !account ?
            <Box>
              <Button onClick={() => {
                connectWithMetaMask()
              }}>Connect With Metamask</Button>
            </Box>
            : null
        }
      </Layout>
    </ChakraProvider>
  )
}
