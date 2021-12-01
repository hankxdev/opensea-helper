import '../Popup.scss'

import * as React from 'react'

import { Box, Center, Flex, IconButton, Text } from '@chakra-ui/react'
import { getEthPrice, getGasPrice } from '../services'

import { HamburgerIcon } from '@chakra-ui/icons'

interface Props {
  onShowSidebar: Function
  showSidebarButton?: boolean
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
  const [appName, setAppName] = React.useState('Nifty Owl')
  const [ethPrice, setEthPrice] = React.useState(0)
  const [gasFee, setGasFee] = React.useState(0)

  React.useEffect(() => {
    getEthPrice().then(setEthPrice)
    getGasPrice().then(setGasFee)
  }, [])

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
      <Flex
        opacity="0.8"
        paddingRight={2}
        textAlign="right"
        flexDir="column"
        fontStyle="italic"
      >
        <Box>ETH: ${ethPrice}</Box>
        <Box>GAS: ${gasFee.toFixed(2)}</Box>
      </Flex>
    </Flex>
  )
}

export default Header
