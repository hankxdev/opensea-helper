import '../Popup.scss'

import * as React from 'react'

import { Box, Button, Flex, Stat, StatNumber, VStack } from '@chakra-ui/react'
import { getData, saveData } from '../../../storage'

import { ACTION_NAME } from '../../../consts'
import AddTrackingCollectionForm from './AddTrackingTokenForm'
import CollectionCard from './CollectionCard'
import { ITrackingCollection } from '../../intefaces'

const TrackCollection = () => {
  const [monitoringTokens, setMonitoringTokens] = React.useState<
    Array<ITrackingCollection>
  >([])
  const [isAddingTracking, setIsAddingTracking] = React.useState(false)
  const [currentToken, setCurrentToken] = React.useState<ITrackingCollection>({
    address: '',
    name: '',
    tracking: false,
    url: '',
    price: 0,
    banner: '',
    currentPrice: 0,
  })

  const [loadingMsg, setLoadingMsg] = React.useState(
    'loading your tracking tokens'
  )

  const getMonitoringTokens = async () => {
    getData(ACTION_NAME.TRACKING_TOKEN_LIST).then((data) => {
      if (!data || data.length < 1) {
        setLoadingMsg('no tracking token found')
      }
      if (data) {
        setMonitoringTokens(data)
      }
    })
  }

  const gotoEditToken = (token: ITrackingCollection) => {
    setCurrentToken(token)
    setIsAddingTracking(true)
  }

  React.useEffect(() => {
    getMonitoringTokens()
  }, [isAddingTracking, monitoringTokens])

  return (
    <Flex p={4} flexDir="column" justifyContent="space-between">
      <Box>
        {isAddingTracking ? (
          <AddTrackingCollectionForm
            token={currentToken}
            onCancel={() => {
              setIsAddingTracking(false)
            }}
          />
        ) : (
          <>
            <Flex justifyContent="space-between">
              <Box className="pageheader">MONITORING</Box>
              <Box
                className="new"
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
                  <CollectionCard
                    collection={token}
                    editToken={gotoEditToken}
                    key={index}
                  />
                ))}
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

export default TrackCollection
