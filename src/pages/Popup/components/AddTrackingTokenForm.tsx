import * as React from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
} from '@chakra-ui/react'

import { ACTION_NAME } from '../../../consts'
import { saveData } from '../../../storage'

interface ITrackingCollection {
  name: string
  price: number
  url: string
}


interface IProps {
  onCancel: Function
}

const AddTrackingTokenForm = ({ onCancel}: IProps) => {
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

    saveData(ACTION_NAME.TRACKING_TOKEN_LIST, collection).then(() => {
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
        <NumberInput
          defaultValue={0.1}
          step={0.01}
          value={collection.price}
          onChange={(value) => {
            console.log(value)
            setCollection({
              ...collection,
              price: Number(value),
            })
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={saveCollection}>
        Submit
      </Button>
      <Button mt={4} colorScheme="red" onClick={()=>{onCancel()}}>
        Cancel
      </Button>
    </Flex>
  )
}

export default AddTrackingTokenForm
