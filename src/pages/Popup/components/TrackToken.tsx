import '../Popup.scss'

import * as React from 'react'

import { Box, Button, Flex, Stat, StatNumber, VStack } from '@chakra-ui/react'
import { getData, saveData } from '../../../storage'

import { ACTION_NAME } from '../../../consts'
import { ITrackingToken } from '../intefaces'

const TrackToken = () => {
  const [monitoringTokens, setMonitoringTokens] = React.useState([
    'THE HUMANOIDS',
    'LAZY LIONS',
    'BORED APE YACHT CLUB',
    'GUTTER CAT GANG',
  ])

  const [loadingMsg, setLoadingMsg] = React.useState('loading your tracking tokens')

  const getMonitoringTokens = async () => {
    getData(ACTION_NAME.TRACKING_TOKEN_LIST).then((data) => {
      if(!data) {
      }
      if (data) {
        setMonitoringTokens(data)
      }
    })
  }

  React.useEffect(() => {
    getMonitoringTokens()
  }, [monitoringTokens])

  const addNewTracking = () => {}

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
          onClick={addNewTracking}
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

export default TrackToken
