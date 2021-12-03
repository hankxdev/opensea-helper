import '../Popup.scss'

import * as React from 'react'

import { Box, Flex, Image } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { getData, saveData } from '../../../storage'

import { ACTION_NAME } from '../../../consts'
import { ITrackingCollection } from '../../intefaces'

type TokenCardProps = {
  collection: ITrackingCollection
  editToken: (collection: ITrackingCollection) => void
}

const CollectionCard = ({ collection, editToken }: TokenCardProps) => {
  const { name, price, url, tracking, banner, currentPrice } = collection
  const sampleImage = 'https://avatars.githubusercontent.com/u/4986062?v=4'

  const deleteToken = () => {
    getData(ACTION_NAME.TRACKING_TOKEN_LIST).then((result) => {
      const updaedList = result.filter((t: ITrackingCollection) => {
        return t.name !== name
      })
      saveData(ACTION_NAME.TRACKING_TOKEN_LIST, updaedList).then(() => {})
    })
  }

  return (
    <Box position="relative" className="collection">
      <Image src={banner || sampleImage} className="collectionbackground"/>
      <Flex justifyContent="space-between" position="relative">
        <Box className="collectiontitle">{name}</Box>
        <Box className="collectionfloor">Floor {currentPrice}</Box>
        <Flex justifyContent="space-between">
          <Box>
            <EditIcon
              mr={2}
              cursor="pointer"
              onClick={() => {
                editToken(collection)
              }}
            />
          </Box>
          <Box>
            <DeleteIcon
              className="deleteicon"
              cursor="pointer"
              onClick={() => {
                deleteToken()
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default CollectionCard
