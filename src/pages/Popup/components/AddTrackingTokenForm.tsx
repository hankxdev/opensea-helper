import * as React from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import { getData, saveData } from '../../../storage'

import { ACTION_NAME } from '../../../consts'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { ITrackingCollection } from '../../intefaces'
import { getCollectionData } from '../services'

interface IProps {
  token: ITrackingCollection
  onCancel: Function
}

const AddTrackingCollectionForm = ({ token, onCancel }: IProps) => {
  const toast = useToast()
  const [collection, setCollection] = React.useState<ITrackingCollection>(token)

  const saveCollection = () => {
    if (
      collection.name === '' ||
      collection.url === '' ||
      collection.price === 0 ||
      collection.price < 0
    ) {
      toast({
        title: `All fields are required, please chekc`,
        status: 'error',
        position: 'top',
        isClosable: true,
      })
      return
    }

    getData(ACTION_NAME.TRACKING_TOKEN_LIST).then(async (result:Array<ITrackingCollection>) => {
      let collections = result ? result : []
      const extraData = await getCollectionData(collection)
      collection.banner = extraData.collection.banner_image_url
      collection.currentPrice = extraData.collection.stats.floor_price
      const collectionIndex = collections.findIndex(
        (item: ITrackingCollection) => item.url === collection.url
      )
      if (collectionIndex !== -1) {
        collections[collectionIndex] = collection
      } else {
        collections.push(collection)
      }
      saveData(ACTION_NAME.TRACKING_TOKEN_LIST, collections).then(() => {
        toast({
          title: `${collection.name} has been added`,
          status: 'success',
          position: 'top',
          isClosable: true,
        })
        setCollection({
          name: '',
          price: 0,
          url: '',
          address: '',
          tracking: false,
          banner: '',
          currentPrice: 0,
        })
      })
    })
  }

  return (
    <Flex flexDir="column">
      <Flex justifyContent="space-between">
        <Text className="pageheader"> Add COLLECTION </Text>
        <ArrowBackIcon
          className="back"
          fontSize="1.2rem"
          onClick={() => onCancel()}
        />
      </Flex>

      <FormControl id="collectionName">
        <FormLabel className="fieldtitle">Collection Name:</FormLabel>
        <Input
          className="fieldinput"
          type="text"
          fontSize="12px"
          value={collection.name}
          onChange={(e) => {
            setCollection({
              ...collection,
              name: e.target.value.trim(),
            })
          }}
        />
      </FormControl>
      <FormControl id="collection URL">
        <FormLabel className="fieldtitle">Opensea URL:</FormLabel>
        <Input
          className="fieldinput"
          fontSize="12px"
          type="url"
          value={collection.url}
          onChange={(e) => {
            setCollection({
              ...collection,
              url: e.target.value.trim(),
            })
          }}
        />
      </FormControl>
      <FormControl id="collectionPrice">
        <FormLabel className="fieldtitle">Price Lower Than:</FormLabel>
        <Input
          className="fieldinput"
          fontSize="12px"
          value={collection.price}
          type="number"
          onChange={(e) => {
            setCollection({
              ...collection,
              price: Number(e.target.value),
            })
          }}
        />
      </FormControl>
      <Button className="submitbutton" onClick={saveCollection}>
        Submit
      </Button>
      <Button
        className="cancelbutton"
        onClick={() => {
          onCancel()
        }}
      >
        Cancel
      </Button>
    </Flex>
  )
}

export default AddTrackingCollectionForm
