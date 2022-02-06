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
  const apiURL = network !== '0x1' ? "https://api.opensea.io/api/v1/assets?owner=" : "https://api.opensea.io/assets?owner="
  // return apiURL + '0x303181ACF601b672347aEc37DC6f4B6bE884BAa5'
  return apiURL + address
}

type NFTLastSale = {
  symbol: string
  price: number
}

const defaultSale = { symbol: 'ETH', price: 0 }

const parsePrice = (decimals: number, price: number) => {
  return price / (10 ** decimals)
}

const calculateNFTTotalPrice = (nfts: Array<INFTProps>) => {
  let total = [{ ...defaultSale }] as Array<{ symbol: string, price: number }>
  nfts.forEach(nft => {
    const sale = getNFTPrice(nft)
    const index = total.findIndex(t => t.symbol === sale.symbol)
    if (index === -1) {
      total.push(sale)
    } else {
      total[index].price += sale.price
    }
  })
  return total
}


const getNFTPrice = (nft: INFTProps): NFTLastSale => {
  const price = { ...defaultSale }
  if (!nft.last_sale) {
    return price
  }
  const { symbol, decimals } = nft.last_sale.payment_token
  const { total_price } = nft.last_sale
  return {
    symbol,
    price: parsePrice(decimals, Number(total_price))
  }
}


const NFTList = ({ address, network }: IProps) => {

  const [nftList, setNFTList] = useState([] as INFTListResp["assets"])
  const [loadingMsg, setLoadingMsg] = useState('loading your NFTs')
  const [toalSale, setTotalSale] = useState([{ ...defaultSale }] as Array<NFTLastSale>)
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
          const totalSale = calculateNFTTotalPrice(data.assets)
          setTotalSale(totalSale)
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
          {nftList.length > 0 ?
            (
              <>
                <Flex justifyContent="space-between" className='nftlist-bar' bgGradient="linear(to-l, #7928CA, #FF0080)">
                  <Box className='bar-address'>Address: {address}</Box>
                  <Box className='bar-total-sale'>Value: {toalSale.map((s, i) => {
                    return <span key={i}>{s.price} {' ' + s.symbol}</span>
                  })}</Box>
                </Flex>
                <Flex flexWrap={'wrap'}>
                  {nftList.map((nft, index) => <NFTCard key={index} {...nft} />)}
                </Flex>
              </>
            ) :
            <LoadingSpinner msg={loadingMsg} hasError={hasError} />}
        </Box>) : <TokenListSkeleton />
      }
    </>
  )
}

export default NFTList