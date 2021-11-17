import '../Popup.scss'

import * as React from 'react'

import { Box, Button, Flex, Stat, StatNumber, VStack } from '@chakra-ui/react'
import { getData, saveData } from '../../../storage'

import { ACTION_NAME } from '../../../consts'
import AddTrackingTokenForm from './AddTrackingTokenForm'
import { ITrackingToken } from '../intefaces'
import TokenCard from './TokenCard'

const TrackToken = () => {
  const [monitoringTokens, setMonitoringTokens] = React.useState<Array<ITrackingToken>>([])
  const [isAddingTracking, setIsAddingTracking] = React.useState(false)

  const [loadingMsg, setLoadingMsg] = React.useState(
    'loading your tracking tokens',
  )

  const getMonitoringTokens = async () => {
    getData(ACTION_NAME.TRACKING_TOKEN_LIST).then((data) => {
      if (!data) {
        setLoadingMsg('no tracking token found')
      }
      if (data) {
        setMonitoringTokens(data)
      }
    })
  }

  React.useEffect(() => {
    console.log('TrackToken useEffect')
    getMonitoringTokens()
  }, [isAddingTracking])

  return (
    <Flex p={6} flexDir='column' justifyContent='space-between'>
      <Box>
        {isAddingTracking ? (
          <AddTrackingTokenForm
            onCancel={() => {
              setIsAddingTracking(false)
            }}
          />
        ) : (
          <>
            <Flex justifyContent='space-between'>
              <Box as='h2' fontSize='lg' fontWeight='semibold'>
                MONITORING
              </Box>
              <Box
                lineHeight='30px'
                fontWeight='semibold'
                fontStyle='italic'
                color='#6a60bc'
                marginBottom='20px'
                onClick={() => {
                  setIsAddingTracking(true)
                }}
              >
                ADD NEW
              </Box>
            </Flex>
            {monitoringTokens && monitoringTokens.length > 0 ? (
              <VStack>
                {monitoringTokens.map((token, index) => (
                  <TokenCard {...token} key={index} />
                ))
                }
              </VStack>
            ) : (
              <Box>
                <Box>{loadingMsg}</Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Flex>
  )
}

export default TrackToken
