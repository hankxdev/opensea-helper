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

interface ITrackingCollection {
  name: string
  price: number
  url: string
}

interface IProps {
  onCancel: Function
}

const AddTrackingTokenForm = ({ onCancel }: IProps) => {
  const toast = useToast()
  const [collection, setCollection] = React.useState<ITrackingCollection>({
    name: '',
    price: 0,
    url: '',
  })

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

    getData(ACTION_NAME.TRACKING_TOKEN_LIST).then((result) => {
      let collections = result ? result : []
      collections.push(collection)
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
        })
      })
    })
  }

  return (
    <Flex flexDir="column">
      <Text fontSize="3xl" paddingBottom={3}>
        {' '}
        Add COLLECTION{' '}
      </Text>
      <FormControl id="collectionName">
        <FormLabel>Collection Name:</FormLabel>
        <Input
          type="text"
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
        <FormLabel>Opensea URL:</FormLabel>
        <Input
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
        <FormLabel>Price Lower Than:</FormLabel>
        <Input
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
      <Button mt={4} colorScheme="teal" onClick={saveCollection}>
        Submit
      </Button>
      <Button
        mt={4}
        colorScheme="red"
        onClick={() => {
          onCancel()
        }}
      >
        Cancel
      </Button>
    </Flex>
  )
}

export default AddTrackingTokenForm
