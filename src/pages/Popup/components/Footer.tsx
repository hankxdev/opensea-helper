import * as React from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { ExternalLinkIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons'

const Footer = () => {
  return (
    <Flex
      as="footer"
      fontSize="24px"
      color="#6a60bc"
      align="center"
      justify="center"
      w="100%"
    >
      <HamburgerIcon m={2} />
      <SettingsIcon m={2} />
      <ExternalLinkIcon m={2} />
    </Flex>
  )
}

export default Footer
