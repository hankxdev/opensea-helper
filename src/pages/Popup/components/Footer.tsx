import * as React from 'react'

import {Box, Flex} from '@chakra-ui/react'
import {ExternalLinkIcon, HamburgerIcon, SettingsIcon} from '@chakra-ui/icons'

interface Props {
  onShowOptions: (showComponent: string) => void
}

const Footer = ({onShowOptions}: Props) => {
  return (
    <Box
      position="absolute"
      bottom="0"
      w="100%"
      p={2}
      background='#19191c'
      boxShadow="0px 4px 4px 2px #0a0a0a;"
    >
      <Flex className="footer">
        <HamburgerIcon m={2} onClick={() => onShowOptions('nftList')}/>
        <SettingsIcon m={2} onClick={() => onShowOptions('options')}/>
        <ExternalLinkIcon m={2} onClick={() => onShowOptions('nftList')}/>
      </Flex>
    </Box>
  )
}

export default Footer
