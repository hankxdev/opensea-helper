import * as React from 'react'

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
  useToast,
} from '@chakra-ui/react'
import { getData, saveData } from '../../../storage'

interface IBasicOptions {
  changeUI: boolean
  autoBuy: boolean
  showNotify: boolean
}

const BasicOptions = () => {
  const [options, setOptions] = React.useState<IBasicOptions>({
    changeUI: true,
    autoBuy: false,
    showNotify: true,
  })

  const toast = useToast()

  const getOptions = () => {
    getData('options').then((data) => {
      if (data) {
        setOptions(data)
      }
    })
  }

  React.useEffect(() => {
    getOptions()
  }, [])

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Basic Options
      </Text>
      <Flex flexDir="column" justify="space-between">
        <FormControl>
          <FormLabel htmlFor="changeUI">Change UI</FormLabel>
          <Checkbox
            id="changeUI"
            type="checkbox"
            checked={options.changeUI}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setOptions({ ...options, changeUI: e.target.checked })
            }}
          />
          <FormHelperText>
            Change UI to match the theme of the website
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="autoBuy">Auto Buy</FormLabel>
          <Checkbox
            id="autoBuy"
            type="checkbox"
            checked={options.autoBuy}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setOptions({ ...options, autoBuy: e.target.checked })
            }}
          />
          <FormHelperText>
            Automatically buy tokens when you have enough ETH
          </FormHelperText>
        </FormControl>
      </Flex>
      <Flex justify="space-between">
        <FormControl>
          <FormLabel htmlFor="showNotify">Show Notify</FormLabel>
          <Checkbox
            id="showNotify"
            type="checkbox"
            checked={options.showNotify}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setOptions({ ...options, showNotify: e.target.checked })
            }}
          />
          <FormHelperText>
            Show a notification when you have enough ETH to buy tokens
          </FormHelperText>
        </FormControl>
      </Flex>
      <Button
        mt={4}
        className="submitbutton"
        onClick={() => {
          saveData('options', options)
          toast({
            title: 'Options saved',
            description: 'Your options have been saved',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        }}
      >
        Save
      </Button>
    </Box>
  )
}

export default BasicOptions
