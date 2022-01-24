import '../Popup.scss'
import * as React from 'react'
import {Box, Center, Flex, IconButton, Image, Text} from '@chakra-ui/react'
import {getEthPrice, getGasPrice} from '../services'
import Logo from '../../../assets/img/logowhite.png'

interface Props {
  onShowSidebar: Function
  showSidebarButton?: boolean
}

const Header = ({showSidebarButton = true, onShowSidebar}: Props) => {
  const [appName, setAppName] = React.useState('Nifty Owl')
  const [ethPrice, setEthPrice] = React.useState(0)
  const [gasFee, setGasFee] = React.useState(0)

  React.useEffect(() => {
    getEthPrice().then(setEthPrice)
    getGasPrice().then(setGasFee)
  }, [])

  return (
    <Flex className="headerbar">
      <Center flex="2" justifyContent="center">
        <Image src={Logo} w="30px"/> <Text className="appname">{appName}</Text>
      </Center>
      <Flex
        className="ethgas"
        opacity="0.8"
        paddingRight={2}
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
