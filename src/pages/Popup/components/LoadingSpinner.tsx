import { Spinner, Flex, Text } from "@chakra-ui/react"
import { InfoIcon } from "@chakra-ui/icons"


type IProps = {
  msg: string
  hasError?: boolean
}


const LoadingSpinner = ({ msg, hasError }: IProps) => {


  return (
    <Flex justifyContent="center" flexDir="column" alignItems="center" h="485px" w="100%">
      {hasError ? <InfoIcon w={8} h={8} color="red.500" /> :
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />}
      <Text mt="1" fontSize="xl" color={hasError ? "red.500" : "white"}>{msg}</Text>

    </Flex>
  )
}

export default LoadingSpinner