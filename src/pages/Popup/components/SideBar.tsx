import * as React from 'react';

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

interface Props {
  onClose: Function;
  isOpen: boolean;
}

const MenuItems = ({ onClick }: { onClick: Function }) => {
  return (
    <VStack>
      <Button w={'100%'} colorScheme='red'>
        Menu Item 1
      </Button>
      <Button  w={'100%'} colorScheme='red' >
        Menu Item 2
      </Button>
      <Button  w={'100%'} colorScheme='red'>
        Menu Item 3
      </Button>
    </VStack>
  );
};


const SideBar = ({ onClose, isOpen }: Props) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement='left'
      onClose={() => onClose()}
    >
      <DrawerOverlay />
      <DrawerContent bgColor={'gray.700'}>
        <DrawerCloseButton />
        <DrawerHeader borderBottom={1}>Your Content</DrawerHeader>
        <DrawerBody>
          <MenuItems onClick={onClose}/>
        </DrawerBody>
        <DrawerFooter>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBar;
