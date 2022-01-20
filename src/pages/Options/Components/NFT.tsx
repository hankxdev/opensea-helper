import {Box, Image} from "@chakra-ui/react";


export interface ICollectionProps {
  description: string
  slug: string
  name: string
}

export interface ILastSaleProps {
  total_price: string
  payment_token: {
    symbol: string
    decimals: number
  }
}

export interface INFTProps {
  name: string
  image_url: string
  token_id: string
  description: string
  permalink: string
  collection: ICollectionProps,
  last_sale: ILastSaleProps
}

const parsePrice = (decimal: number, origin: string): Number => {
  return Number(origin) / (10 ** decimal)
}

const openURL = (url: string) => {
  // chrome.tabs.create({url})
  window.open(url, "_blank")
}


export const NFTCard = (props: INFTProps) => {
  return (
    <Box m={1} maxW='sm' borderWidth='1px' bgColor={"white"} borderRadius='lg' width={"80px"} overflow='hidden'
         onClick={() => {
           openURL(props.permalink)
         }}>
      <Box style={{height: "80px", width: "80px"}} alignItems={"center"}>
        <Image src={props.image_url} alt={props.name}/>
      </Box>
      <Box pt='2'>
        <Box display='flex' alignItems='baseline'>
          <Box
            color='gray.500'
            fontSize='12px'
            textTransform='uppercase'
          >
            {props.name}
          </Box>
        </Box>
        {/*<Box>*/}
        {/*  {parsePrice(props.last_sale.payment_token.decimals, props.last_sale.total_price)}*/}
        {/*  <Box as='span' color='gray.600' fontSize='sm'>*/}
        {/*    {props.last_sale?.payment_token.symbol}*/}
        {/*  </Box>*/}
        {/*</Box>*/}

      </Box>
    </Box>
  )
}




