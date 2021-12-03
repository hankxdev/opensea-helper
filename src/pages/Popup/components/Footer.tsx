import * as React from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { ExternalLinkIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons'

interface Props {
  onShowOptions: () => void
  onShowMenu: () => void
}

const Footer = ({ onShowMenu, onShowOptions }: Props) => {
  return (
    <Box
      position="absolute"
      bottom="0"
      w="100%"
      p={2}
      boxShadow="0px 4px 4px 2px #0a0a0a;"
    >
      <Flex className="footer">
        <HamburgerIcon m={2} onClick={onShowMenu} />
        <SettingsIcon m={2} onClick={onShowOptions} />
        <ExternalLinkIcon m={2} />
      </Flex>
    </Box>
  )
}

export default Footer
