import '../login.scss'

import * as React from 'react'

import { Box, Button, Flex } from '@chakra-ui/react'

const LoginSection = () => {
  return (
    <Flex className="login">
      <Box>
        <Button
          onClick={() => {
            chrome.tabs.create({ url: 'options.html' })
          }}
        >
          Login
        </Button>
      </Box>
    </Flex>
  )
}

export default LoginSection
