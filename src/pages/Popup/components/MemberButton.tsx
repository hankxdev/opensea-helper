import React, { useState, useEffect } from 'react'
import { LockIcon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/react'
import '../Popup.scss'

const purchaseURL = 'options.html'

interface IProps {
  cssClass?: string
  style?: React.CSSProperties
}

const MemberButton = (props: IProps) => {
  const { cssClass, style } = props
  const gotoPurchase = () => {
    chrome.tabs.create({
      url: purchaseURL,
    })
  }

  return (
    <Flex
      title={'Purchase to unlock'}
      onClick={gotoPurchase}
      justifyContent={'space-between'}
      alignItems={'center'}
      className={`memberlock ${cssClass}`}
      style={{ ...style }}
      px={2}
    >
      <LockIcon />Member
    </Flex>
  )
}

export default MemberButton
