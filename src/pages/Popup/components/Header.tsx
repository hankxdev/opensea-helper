import '../Popup.scss'

import {
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Text,
  useConst,
} from '@chakra-ui/react'
import { getEthPrice, getGasPrice } from '../services'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from '../../../reducer'
import Logo from '../../../assets/img/logowhite.png'
import MemberButton from './MemberButton'

interface Props {
  onShowSidebar: Function
  showSidebarButton?: boolean
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
  const [appName, setAppName] = useState('Nifty Owl')
  const [ethPrice, setEthPrice] = useState(0)
  const [gasFee, setGasFee] = useState(0)
  const { state, dispatch } = useContext(AppContext)

  const { userInfo } = state

  useEffect(() => {
    getEthPrice().then(setEthPrice)
    getGasPrice().then(setGasFee)
  }, [])

  return (
    <Flex className="headerbar">
      <Center flex="5" justifyContent="center">
        <Image src={Logo} w="30px" /> <Text className="appname">{appName}</Text>
      </Center>
      <Flex
        flex="2"
        className="ethgas"
        opacity="0.8"
        paddingRight={2}
        flexDir="column"
        fontStyle="italic"
      >
        <Box>ETH: ${ethPrice}</Box>
        <Box>
          GAS:{' '}
          {userInfo.isPaidUser ? (
            gasFee.toFixed(2)
          ) : (
            <MemberButton cssClass="smallButton" />
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export default Header
