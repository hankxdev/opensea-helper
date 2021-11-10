import * as React from 'react'

import '../Popup.scss'

import { Box, Center, Flex, IconButton, Text } from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'

interface Props {
  onShowSidebar: Function
  showSidebarButton?: boolean
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
  const [appName, setAppName] = React.useState('NFT HNTR')
  const [ethPrice, setEthPrice] = React.useState(4700)
  const [gasFee, setGasFee] = React.useState(210)

  return (
    <Flex className="headerbar">
      {/* <Box flex="1">
        {showSidebarButton && (
          <IconButton
            aria-label={'IconButton'}
            icon={<HamburgerIcon w={4} h={4} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={() => {
              onShowSidebar()
            }}
          />
        )}
      </Box> */}
      <Center flex="2">
        <Text fontSize="xl">{appName}</Text>
      </Center>
      <Flex opacity="0.8" paddingRight={2} textAlign="right" flexDir="column" fontStyle="italic">
        <Box>ETH: ${ethPrice}</Box>
        <Box>GAS: ${gasFee}</Box>
      </Flex>
    </Flex>
  )
}

export default Header
