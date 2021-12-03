import './Popup.scss'

import * as React from 'react'

import BasicOptions from './components/BasicOptions'
import { Box } from '@chakra-ui/react'
import Footer from './components/Footer'
import Header from './components/Header'
import LoginSection from './components/LoginSection'
import SideBar from './components/SideBar'
import TrackCollection from './components/TrackCollection'

const Popup = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)
  const [isLogin, setLogin] = React.useState(true)
  const [showOptions, setShowOptions] = React.useState(false)
  const [showMenu, setShowMenu] = React.useState(false)
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }
  return (
    <>
      <SideBar onClose={toggleSidebar} isOpen={isSidebarOpen} />
      <Box minH={540} p={0} className="App">
        <Box>
          <Header onShowSidebar={toggleSidebar} showSidebarButton={true} />
        </Box>
        {isLogin ? (
          <>
            {showOptions ? <BasicOptions onBackToMain={()=>{
              setShowOptions(false)
            }}/> : <TrackCollection />}
            <Footer
              onShowOptions={() => setShowOptions(!showOptions)}
              onShowMenu = {() => setShowMenu(!showMenu)}
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
