import { CSSProperties } from "react"
import { MainItemProps } from "./main_item"
import { CldImage } from 'next-cloudinary'
import { Box, Typography , Stack} from "@mui/material"
import { SmallImageSizesProps } from "@/util/constant"
import { useWindowSize } from "@/context/window_size"
import Link from "next/link"

type SmallItemProps = MainItemProps & {
    imageStyles?: CSSProperties
    boxStyle?: CSSProperties
}



const SmallItem = ({ item, boxStyle, imageStyles }: SmallItemProps) => {

  const { isDesktop , isTablet , isMobile} = useWindowSize()
  

  const imageSize =  isDesktop ? SmallImageSizesProps.desktop 
                              : isTablet ? SmallImageSizesProps.tab 
                              : SmallImageSizesProps.mobile


    return (
        <Link   href={{
            pathname: '/product/[slug]',
              query: { slug: item.id },
        }}
        style={{ textDecoration: 'none' }}
        
        >
        <Box
            sx={{
                m: 1,
     
                tabIndex: 1,
                ...boxStyle,
                direction: 'rtl',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    scale: 1.05,
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                },
                animation: 'ease-in-out',
            }}
            onClick={() => {console.log(item)}}
        >
            <CldImage
                src={item.image_url}
                width={imageSize.width}
               height={imageSize .height}
                alt={item.name}
                draggable={false}
                loading='eager'
                autoFocus
                style={{ ...imageStyles }}

                    />

            <Stack 
                direction={ isMobile ? 'column' : 'row'} 
                p={1}
                gap={2}
             >
   
            <Typography  fontWeight={'bold'} >
                {item.name} 
            </Typography>
            <Typography>
                {item.price} ₪ 
            </Typography>

            </Stack>
            

        </Box>
        </Link>
    )

}

export default SmallItem