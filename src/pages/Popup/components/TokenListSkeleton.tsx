import React from 'react'
import {Box, Flex, Skeleton} from '@chakra-ui/react'
import MemberButton from "./MemberButton";

const TokenListSkeleton = () => {
  const length = 15
  return (
    <Box className={'skeletonList'} style={{position: 'relative', height: "100%"}}>
      {Array.from(Array(length)).map((_, i) => (
        <Skeleton key={i} w="60px" h="84px">
        </Skeleton>
      ))}
      <Box bgGradient='linear(to-l, #6056af, #7e74d0)' className={'overlay'}/>
      <Flex className={'membershipButtonWrapper'} w='100%' h='100%' style={{position: "absolute"}}>
        <MemberButton cssClass={'bigButton'}/>
      </Flex>
    </Box>)
}

export default TokenListSkeleton