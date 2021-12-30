import * as React from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react'

import {ArrowBackIcon} from '@chakra-ui/icons'
import {ITrackingCollection} from '../../../intefaces'
import {ACTION_NAME, crm} from "../../../consts";
import {useEffect} from "react";
import {getData, saveData} from "../../../storage";
import {getCollectionData} from "../services";

interface IProps {
  token: ITrackingCollection
  onCancel: Function
}

const AddTrackingCollectionForm = ({token, onCancel}: IProps) => {
  const toast = useToast()
  const [collection, setCollection] = React.useState<ITrackingCollection>(token)
  const [isSaving, setIsSaving] = React.useState(false)

  React.useEffect(() => {
    setCollection({
      ...collection,
      name: getCollectionNameFromURL(collection.url),
    })
  }, [collection.url])

  const getCollectionNameFromURL = (url: string): string => {
    if (!url) {
      return ''
    }

    return collection.url.split('/')[4]
  }

  const handleCancel = () => {
    resetCollection()
    onCancel()
  }

  const resetCollection = () => {
    setCollection({
      address: '',
      name: '',
      tracking: true,
      url: '',
      price: 0,
      banner: '',
      currentPrice: 0,
    })
  }

  const saveCollection = async () => {
    if (
      collection.name === '' ||
      collection.url === '' ||
      collection.price === 0 ||
      collection.price < 0
    ) {
      toast({
        title: `All fields are required, please check`,
        status: 'error',
        position: 'top',
        isClosable: true,
      })
      return
    }
    setCollection(collection)
    setIsSaving(true)
    const result = await getData(ACTION_NAME.TRACKING_TOKEN_LIST) as Array<ITrackingCollection>
    let collections = result ? result : []
    const extraData = await getCollectionData(collection)
    collection.banner = extraData.collection.banner_image_url
    collection.currentPrice = extraData.collection.stats.floor_price
    collection.tracking = true
    const collectionIndex = collections.findIndex(
      (item: ITrackingCollection) => item.url === collection.url
    )
    if (collectionIndex !== -1) {
      collections[collectionIndex] = collection
    } else {
      collections.push(collection)
    }
    await saveData(ACTION_NAME.TRACKING_TOKEN_LIST, collections)
    toast({
      title: `${collection.name} has been added`,
      status: 'success',
      position: 'top',
      isClosable: true,
    })
    setIsSaving(false)
    resetCollection()
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
      {collection.name ? (
        <FormControl id="collectionName">
          <Text fontSize="2em" className="collectionName">
            {collection.name}
          </Text>
        </FormControl>
      ) : (
        ''
      )}
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
        {isSaving ? <Spinner color="red.500"/> : 'Save'}
      </Button>
      <Button className="cancelbutton" onClick={handleCancel}>
        Cancel
      </Button>
    </Flex>
  )
}

export default AddTrackingCollectionForm
