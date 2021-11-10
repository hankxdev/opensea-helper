import * as React from 'react'
import { Box, Button, Flex, Stat, StatNumber, VStack } from '@chakra-ui/react'
import '../Popup.scss'

const PopupBody = () => {
  const [monitoringTokens, setMonitoringTokens] = React.useState([
    'THE HUMANOIDS',
    'LAZY LIONS',
    'BORED APE YACHT CLUB',
    'GUTTER CAT GANG',
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
          marginBottom="20px"
        >
          ADD NEW
        </Box>
      </Flex>

      <VStack>
        {monitoringTokens.map((token, index) => (
          <Box className="collection">
            <Box className="collectiontitle">{token}</Box>
          </Box>
        ))}
      </VStack>
    </Flex>
  )
}

export default PopupBody
