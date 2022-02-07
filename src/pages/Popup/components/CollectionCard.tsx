import '../Popup.scss'

import { Box, Flex, Image } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useContext, useEffect } from 'react'

import { AppContext } from '../../../reducer'
import { ITrackingCollection } from '../../../intefaces'
import MemberButton from './MemberButton'
import ShowChartIcon from '../../../assets/img/show-chart.svg'

type TokenCardProps = {
  collection: ITrackingCollection
  editToken: (collection: ITrackingCollection) => void
  deleteToken: (collection: ITrackingCollection) => void
  index: number
}
const sampleImage = 'https://avatars.githubusercontent.com/u/4986062?v=4'


const CollectionCard = ({ collection, editToken, deleteToken, index }: TokenCardProps) => {
  const { name, banner, currentPrice } = collection
  const {state, dispatch} = useContext(AppContext)

  const { userInfo } = state

  return (
    <Box position='relative' className='collection' my={1}>
      <Image src={banner || sampleImage} className='collectionbackground' />
      <Flex justifyContent='space-between' position='relative' alignItems='center'>
        <Box className='collectiontitle' w='40%' onClick={() => {
          chrome.tabs.create({ url: `https://opensea.io/collection/${name}?search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW` })
        }}>
          {name}
        </Box>
        <Image cursor='pointer' src={ShowChartIcon} w='14px' h='14px' className='collectionchart' onClick={() => {
          chrome.tabs.create({ url: `https://opensea.io/collection/${name}?tab=activity` })
        }} />
        {
          userInfo.isPaidUser || index < 2 ? (<Box textAlign='center'>
            <span className='collectionfloor'>Floor {currentPrice}</span>
          </Box>) : <MemberButton />
        }

        <Flex justifyContent='space-between'>
          <Box>
            <EditIcon
              mr={2}
              cursor='pointer'
              onClick={() => {
                editToken(collection)
              }}
            />
          </Box>
          <Box>
            <DeleteIcon
              className='deleteicon'
              cursor='pointer'
              onClick={()=>deleteToken(collection)}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default CollectionCard
