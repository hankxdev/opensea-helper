import React from 'react'
import {Box, Flex, Skeleton} from '@chakra-ui/react'
import MemberButton from "./MemberButton";
import '../Popup.scss'

const TokenListSkeleton = () => {
  const length = 16
  return (
    <Box className={'portgrid'} style={{position: 'relative', height: "100%"}}>
      {Array.from(Array(length)).map((_, i) => (
        <Skeleton className={'portgriditem'}>
        </Skeleton>
      ))}
      <Box className={'overlay'}/>
      <Flex className={'membershipButtonWrapper'} w='100%' h='100%' style={{position: "absolute"}}>
        <MemberButton cssClass={'memberlock'}/>
      </Flex>
    </Box>)
}

export default TokenListSkeleton