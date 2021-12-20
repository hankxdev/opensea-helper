import './Popup.scss'

import * as React from 'react'

import BasicOptions from './components/BasicOptions'
import { Box } from '@chakra-ui/react'
import Footer from './components/Footer'
import Header from './components/Header'
import { IUserInfo } from '../../intefaces'
import LoginSection from './components/LoginSection'
import SideBar from './components/SideBar'
import TrackCollection from './components/TrackCollection'
import { checkToken } from '../../utils'

const Popup = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)
  const [isLogin, setIsLogin] = React.useState(false)
  const [showOptions, setShowOptions] = React.useState(false)
  const [showMenu, setShowMenu] = React.useState(false)
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  React.useEffect(() => {
    chrome.storage.sync.get(['user'], (i) => {
      const user = i.user as IUserInfo
      if (!user) {
        setIsLogin(false)
        return
      }
      const { address, token, network } = user
      const loggedIn = checkToken(user.token, user.address)
      setIsLogin(loggedIn)
    })
  }, [])

  return (
    <>
      <Box minH={540} p={0} className="App">
        <Box>
          <Header onShowSidebar={toggleSidebar} showSidebarButton={true} />
        </Box>
        {isLogin ? (
          <>
            {showOptions ? (
              <BasicOptions
                onBackToMain={() => {
                  setShowOptions(false)
                }}
              />
            ) : (
              <TrackCollection />
            )}
            <Footer
              onShowOptions={() => setShowOptions(!showOptions)}
              onShowMenu={() => setShowMenu(!showMenu)}
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
