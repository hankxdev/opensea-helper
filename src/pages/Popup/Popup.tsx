import * as React from 'react';
import './Popup.scss';

import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';
import { Box } from '@chakra-ui/react';


const Popup = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const toggleSidebar = () => {
    console.log('clicked');
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <SideBar onClose={toggleSidebar} isOpen={isSidebarOpen} />
      <Box minH={540} p={0} className='App'>
        <Header onShowSidebar={toggleSidebar} showSidebarButton={true} />
        <Content/>
      </Box>
    </>

  );
};

export default Popup;
