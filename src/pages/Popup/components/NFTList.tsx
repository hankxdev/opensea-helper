import { Box, Flex, Text, Center } from '@chakra-ui/react'
import { INFTProps, NFTCard } from "./NFT";
import { useContext, useEffect, useState } from "react";

import { AppContext } from '../../../reducer'
import TokenListSkeleton from './TokenListSkeleton'

import LoadingSpinner from "./LoadingSpinner";


import axios from "axios";

interface IProps {
  address: string
  network: string
}

interface INFTListResp {
  assets: Array<INFTProps>
}


const getNFTListURL = (network: string, address: string) => {
  console.log(network)
  const apiURL = network !== '0x1' ? "https://api.opensea.io/api/v1/assets?owner=" : "https://api.opensea.io/assets?owner="
  return apiURL + '0x303181ACF601b672347aEc37DC6f4B6bE884BAa5'
  // return apiURL + address
}


const NFTList = ({ address, network }: IProps) => {

  const [nftList, setNFTList] = useState([] as INFTListResp["assets"])
  const [loadingMsg, setLoadingMsg] = useState('loading your NFTs')
  const { state } = useContext(AppContext)
  const { userInfo } = state

  const [hasError, setErrors] = useState(false)

  const getNFTList = (url: string): Promise<any> => {
    return axios.get(getNFTListURL(network, address))
  }

  useEffect(() => {
    if (!address) {
      return
    }

    getNFTList(getNFTListURL('0x1', address)).then(resp => {
      const data = resp.data as INFTListResp
      if (data && data.assets) {
        if (data.assets.length > 0) {
          setNFTList(data.assets)
        } else {
          setErrors(true)
          setLoadingMsg("seems you don't have any NFT")
        }

      } else {
        setErrors(true)
        setLoadingMsg("could not load your nfts ")
      }

    })
  }, [address])

  return (
    <>
      {
        userInfo.isPaidUser ? (<Box color={"white"}>
          {nftList.length > 0 ? <Flex flexWrap={'wrap'}>
            {nftList.map((nft, index) => <NFTCard key={index} {...nft} />)}</Flex> :
            <LoadingSpinner msg={loadingMsg} hasError={hasError}/>}
        </Box>) : <TokenListSkeleton />
      }
    </>
  )
}

export default NFTList