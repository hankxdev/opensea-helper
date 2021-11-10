import './Popup.scss'

import * as React from 'react'

import { Box } from '@chakra-ui/react'
import Footer from './components/Footer'
import Header from './components/Header'
import PopupBody from './components/PopupBody'
import SideBar from './components/SideBar'

const Popup = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)
  const toggleSidebar = () => {
    console.log('clicked')
    setSidebarOpen(!isSidebarOpen)
  }
  return (
    <>
      <SideBar onClose={toggleSidebar} isOpen={isSidebarOpen} />
      <Box minH={540} p={0} className="App">
        <Box boxShadow="0px 1px 8px 3px #0a0a0a;">
          <Header onShowSidebar={toggleSidebar} showSidebarButton={true} />
        </Box>
        <PopupBody />
        <Box
          position="absolute"
          bottom="0"
          w="100%"
          p={2}
          boxShadow="0px 4px 20px 2px #0a0a0a;"
        >
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default Popup
