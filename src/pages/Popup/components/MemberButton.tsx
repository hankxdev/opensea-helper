import React, { useState, useEffect } from 'react'
import { LockIcon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/react'
import '../Popup.scss'

const purchaseURL = 'options.html'

interface IProps {
  cssClass?: string
  style?: React.CSSProperties
}


const basicStyle = {
  borderRadius: "6px",
  border: "none",
  color: "#fff",
  background: "linear-gradient(72deg, #6056af 0%, #7e74d0 100%)",
  backgroundOrigin: "border-box",
  height: "30px",
  width: "70px",
  cursor: "pointer",

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
      className="memberlock"
      px={2}
    >
      <LockIcon />
      Member
    <Flex title={'Purchase to unlock'} onClick={gotoPurchase} justifyContent={"space-between"}
          alignItems={'center'}
          boxShadow='md'
          className={cssClass} style={{...style, ...basicStyle}} px={2}>
      <LockIcon/>Member
    </Flex>
  )
}

export default MemberButton
