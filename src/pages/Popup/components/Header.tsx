import * as React from 'react';
import { Box, Center, IconButton, Text, Flex } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

interface Props {
  onShowSidebar: Function
  showSidebarButton?: boolean,
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
  const [userName, setUsername] = React.useState('Hank');

  return (
    <Flex bg='tomato' p={1} justifyContent='center'>
      <Box flex='1'>
        {showSidebarButton && (
          <IconButton
            aria-label={'IconButton'}
            icon={<HamburgerIcon w={4} h={4} />}
            colorScheme='blackAlpha'
            variant='outline'
            onClick={() => {
              onShowSidebar();
            }}
          />
        )}
      </Box>
      <Center flex='1' h='40px'>
        <Text fontSize='xl'>Hello {userName}</Text>
      </Center>
      <Box flex='1' />
    </Flex>
  );
};

export default Header;
