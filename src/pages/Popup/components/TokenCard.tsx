import * as React from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { getData, saveData } from '../../../storage'

import { ACTION_NAME } from '../../../consts'
import { ITrackingToken } from '../intefaces'

const TokenCard = (token: ITrackingToken) => {
  const { name, price, url, tracking } = token


  const deleteToken = () => {
    getData(ACTION_NAME.TRACKING_TOKEN_LIST).then(result => {
      const updaedList = result.filter((t: ITrackingToken) => {
        return t.name !== name
      })
      saveData(ACTION_NAME.TRACKING_TOKEN_LIST, updaedList).then(()=>{

      })
    })
  }

  return (
    <Box className='collection'>
      <Flex justifyContent='space-between'>
        <Box className='collectiontitle'>{name}</Box>
        <Box>
          <DeleteIcon onClick={() => {
            deleteToken()
          }} />
        </Box>
      </Flex>

    </Box>
  )
}


export default TokenCard
