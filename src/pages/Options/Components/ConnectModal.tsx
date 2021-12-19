import {
  Box, Button, Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

interface IProps {
  connect: () => void
}


const ConnectModal = ({ connect }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect With Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Button onClick={() => {
            connect()
          }}>Connect with Metamask</Button>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConnectModal
