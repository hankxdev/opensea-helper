import './Popup.scss'

import { useContext, useEffect, useState } from 'react'

import { AppContext } from '../../reducer'
import BasicOptions from './components/BasicOptions'
import { Box } from '@chakra-ui/react'
import Footer from './components/Footer'
import Header from './components/Header'
import { IUserInfo } from '../../intefaces'
import LoginSection from './components/LoginSection'
import NFTList from './components/NFTList'
import TrackCollection from './components/TrackCollection'
import { checkToken } from '../../utils'
import { removeData } from '../../storage'

const Popup = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [showComponent, setShowComponent] = useState<string>('trackingList')
  const { state, dispatch } = useContext(AppContext)
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const logoutUser = () => {
    setIsLogin(false)
    dispatch({ type: 'RESET_USER_INFO' })
  }

  useEffect(() => {
    chrome.storage.sync.get('user', (i) => {
      const user = i.user as IUserInfo
      if (!user) {
        logoutUser()
        return
      }

      const { address, token, network } = user
      const loggedIn = checkToken(address, token)
      if (!loggedIn) {
        logoutUser()
        removeData('user')
      }
      setIsLogin(loggedIn)
      setShowComponent('trackingList')
      user.isPaidUser = true
      dispatch({ type: 'SET_USER_INFO', payload: user })
    })
  }, [])


  useEffect(() => {
    switchComponent(showComponent)
  }, [showComponent])

  const { userInfo } = state
  const switchComponent = (showComponent: string) => {
    switch (showComponent) {
      case 'trackingList':
        return <TrackCollection />
      case 'options':
        return <BasicOptions
          onBackToMain={() => {
            setShowComponent('trackingList')
          }}
        />
      case 'nftList':
        return <NFTList address={userInfo.address} network={userInfo.network} />
      default:
        return <LoginSection />
    }
  }

  return (
    <>
      <Box minH={540} p={0} className='App'>
        <Box>
          <Header onShowSidebar={toggleSidebar} showSidebarButton={true} />
        </Box>
        {isLogin ? (
          <>
            {switchComponent(showComponent)}
            <Footer
              onShowOptions={(e) => setShowComponent(e)}
            />
          </>
        ) : (
          <LoginSection />
        )}
      </Box>
    </>
  )
}

export default Popup
