import * as React from 'react'
import '../Popup.scss'
import { Box, Button, Checkbox, Flex, Text, useToast } from '@chakra-ui/react'
import { getData, saveData } from '../../../storage'
import { IBasicOptions } from '../../intefaces'

interface IProps {
  onBackToMain: () => void
}

const BasicOptions = ({ onBackToMain }: IProps) => {
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
      } else {
        saveData('options', options)
      }
    })
  }

  React.useEffect(() => {
    getOptions()
  }, [])

  return (
    <Box p={4}>
      <Text className="pageheader"> Options </Text>
      <Checkbox
        className="optionslist"
        colorScheme={options.changeUI ? 'green' : 'red'}
        onChange={() => {
          setOptions({ ...options, changeUI: !options.changeUI })
        }}
        isChecked={options.changeUI}
      >
        Change Opensea UI
      </Checkbox>
      <Checkbox
      className="optionslist"
        colorScheme={options.autoBuy ? 'green' : 'red'}
        onChange={() => {
          setOptions({ ...options, autoBuy: !options.autoBuy })
        }}
        isChecked={options.autoBuy}
      >
        Auto Hit Buy Button
      </Checkbox>
      <Checkbox
      className="optionslist"
        colorScheme={options.showNotify ? 'green' : 'red'}
        onChange={() => {
          setOptions({ ...options, showNotify: !options.showNotify })
        }}
        isChecked={options.showNotify}
      >
        Show Notifications
      </Checkbox>
      <Flex flexDir="column">
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
            onBackToMain()
          }}
        >
          Save
        </Button>
        <Button
          className="cancelbutton"
          onClick={() => {
            onBackToMain()
          }}
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  )
}

export default BasicOptions
