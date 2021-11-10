import * as React from 'react'

import { Box, Button, Flex, Stat, StatNumber, VStack } from '@chakra-ui/react'

const PopupBody = () => {
  const [monitoringTokens, setMonitoringTokens] = React.useState([
    'HUMANOIDS',
    'LAZY LIONS',
    'BORED APE YACHT CLUB',
    'GUTTER CATA GANG',
  ])

  return (
    <Flex p={6} flexDir="column" justifyContent="space-between">
      <Flex justifyContent="space-between">
        <Box as="h2" fontSize="lg" fontWeight="semibold">
          MONITORING
        </Box>
        <Box
          lineHeight="30px"
          fontWeight="semibold"
          fontStyle="italic"
          color="#6a60bc"
        >
          ADD NEW
        </Box>
      </Flex>

      <VStack>
        {monitoringTokens.map((token, index) => (
          <Box w="100%" key={index} h="40px" bg="#6a60bc">
            <Box fontSize="18px">{token}</Box>
          </Box>
        ))}
      </VStack>
    </Flex>
  )
}

export default PopupBody
