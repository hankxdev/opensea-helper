import {useState, useEffect} from "react";
import {INFTProps, NFTCard} from "./NFT";
import {Flex, Box, Text} from '@chakra-ui/react'
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


const NFTList = ({address, network}: IProps) => {

  const [nftList, setNFTList] = useState([] as INFTListResp["assets"])
  const [loadingMsg, setLoadingMsg] = useState('loading your NFTs')

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
          // @ts-ignore
          // const tokens = new Array(20).fill(data.assets[1])
          setNFTList(data.assets)
        } else {
          setLoadingMsg("seems you don't have any NFT")
        }

      } else {
        setLoadingMsg("could not load your nfts ")
      }

    })
  }, [address])

  return (
    <Box color={"white"}>
      {nftList.length > 0 ? <Flex flexWrap={'wrap'}>
          {nftList.map((nft, index) => <NFTCard key={index} {...nft}/>)}</Flex> :
        <Flex justifyContent='center' flexDir="column">
          <Text variant="alert" fontSize={"xl"}>{loadingMsg}</Text>
        </Flex>}
    </Box>

  )
}

export default NFTList