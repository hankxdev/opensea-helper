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
    <Box m={2} maxW='sm' borderWidth='1px' bgColor={"white"} borderRadius='lg' width={"250px"} overflow='hidden'
         onClick={() => {
           openURL(props.permalink)
         }}>
      <Box style={{height: "250px", width: "250px"}} alignItems={"center"}>
        <Image src={props.image_url} alt={props.name}/>
      </Box>
      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
          >
            {props.name}
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
        >
          {props.description}
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




