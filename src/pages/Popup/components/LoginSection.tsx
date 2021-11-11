import "../login.scss"

import * as React from 'react'

import {Box, Button, Flex} from '@chakra-ui/react'

const LoginSection = () => {

  const [ButtonText, setButtonText] = React.useState('Login With Discord')

  return (
    <Flex className="login">
      <Box>
        <Button>
          {ButtonText}
        </Button>
      </Box>
      
    </Flex>
  )
}


export default LoginSection