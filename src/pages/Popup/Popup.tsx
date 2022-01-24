import './Popup.scss'

import * as React from 'react'

import BasicOptions from './components/BasicOptions'
import {Box} from '@chakra-ui/react'
import Footer from './components/Footer'
import Header from './components/Header'
import {IUserInfo} from '../../intefaces'
import LoginSection from './components/LoginSection'
import TrackCollection from './components/TrackCollection'
import {checkToken} from '../../utils'
import {removeData} from '../../storage'
import NFTList from '../Options/Components/NFTList'


const Popup = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)
  const [isLogin, setIsLogin] = React.useState(false)
  const [showOptions, setShowOptions] = React.useState(false)
  const [showTokenList, setShowTokenList] = React.useState(false)
  const [showMenu, setShowMenu] = React.useState(false)
  const [showComponent, setShowComponent] = React.useState<string>('trackingList')
  const [user, setUser] = React.useState<IUserInfo>({
    address: '',
    network: '',
    token: ''
  })
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  React.useEffect(() => {
    chrome.storage.sync.get('user', (i) => {
      const user = i.user as IUserInfo
      if (!user) {
        setIsLogin(false)
        return
      }

      const {address, token, network} = user
      const loggedIn = checkToken(address, token)
      if (!loggedIn) {
        removeData('user')
      }
      setIsLogin(loggedIn)
      setShowComponent('trackingList')
      setUser(user)
    })
  }, [])

  React.useEffect(()=>{
    switchComponent(showComponent)
  }, [showComponent])

  const switchComponent = (showComponent: string): React.ReactElement => {
    switch (showComponent) {
      case 'trackingList':
        return <TrackCollection/>
      case 'options':
        return <BasicOptions
          onBackToMain={() => {
            setShowComponent('trackingList')
          }}
        />
      case 'nftList':
        return <NFTList address={user.address} network={user.network}/>
      default:
        return <LoginSection/>
    }
  }

  return (
    <>
      <Box minH={540} p={0} className="App">
        <Box>
          <Header onShowSidebar={toggleSidebar} showSidebarButton={true}/>
        </Box>
        {isLogin ? (
          <>
            {switchComponent(showComponent)}
            <Footer
              onShowOptions={(e) => setShowComponent(e)}
            />
          </>
        ) : (
          <LoginSection/>
        )}
      </Box>
    </>
  )
}

export default Popup
