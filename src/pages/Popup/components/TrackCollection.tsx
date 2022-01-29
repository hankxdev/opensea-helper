import '../Popup.scss'

import { useEffect, useState } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { getData } from '../../../storage'

import { ACTION_NAME } from '../../../consts'
import AddTrackingCollectionForm from './AddTrackingTokenForm'
import CollectionCard from './CollectionCard'
import { ITrackingCollection } from '../../../intefaces'

const TrackCollection = () => {
  const [monitoringTokens, setMonitoringTokens] = useState<Array<ITrackingCollection>>([])
  const [isAddingTracking, setIsAddingTracking] = useState(false)

  const [currentToken, setCurrentToken] = useState<ITrackingCollection>({
    address: '',
    name: '',
    tracking: false,
    url: '',
    price: 0,
    banner: '',
    currentPrice: 0,
  })
  const [loadingMsg, setLoadingMsg] = useState(
    'loading your tracking tokens',
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

  useEffect(() => {
    getMonitoringTokens()
  }, [isAddingTracking])

  return (
    <Flex p={4} flexDir='column' justifyContent='space-between'>
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
            <Flex justifyContent='space-between'>
              <Box className='pageheader'>MONITORING</Box>
              <Box
                className='new'
                onClick={() => {
                  setIsAddingTracking(true)
                }}
              >
                ADD NEW
              </Box>
            </Flex>

            {monitoringTokens && monitoringTokens.length > 0 ? (
              <Box className='collection-list'>
                {monitoringTokens.map((token, index) => (
                  <CollectionCard
                    index={index}
                    collection={token}
                    editToken={gotoEditToken}
                    key={index}
                  />
                ))}
              </Box>
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
