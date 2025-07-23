import { useWindowSize } from "@/context/window_size";
import { StoreItem } from "@/util/zod/types";
import { Box, Button, SxProps, Typography, useTheme } from "@mui/material";
import { CldImage, CldImageProps } from 'next-cloudinary';
import { BigImageSizesProps } from "@/util/constant"
import { CSSProperties } from "react";


export type MainItemProps =
   Omit <CldImageProps , 'src'|'alt'  >  & {
    item: StoreItem;
    boxStyle?: SxProps;
    imageStyle?: CSSProperties;

};

const MainItem = ({ item,boxStyle, imageStyle }: MainItemProps) => {

  const { isDesktop , isTablet ,isMobile} = useWindowSize()

  const imageSize =  isDesktop ? BigImageSizesProps.desktop 
                              : isTablet ? BigImageSizesProps.tab 
                              : BigImageSizesProps.mobile

  const theme = useTheme()

  return (
    <Box 
      sx={{ 
          direction: 'rtl',
           position: 'relative',
                        transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              scale: 1.05,
                              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                            }, 
  

           ...boxStyle
           }} // Make Box relative
    > 
      <CldImage 
        src={item.image_url} 
        alt={item.name}
        width={imageSize.width}
        height={imageSize.height}
        style={{  ...imageStyle}}
        autoFocus
        draggable={false}

      />

      {/* Sale Badge Positioned Absolutely */}
      <div 
        style={{
          background: theme.palette.primary.main,
          color: 'white',
          borderRadius: 50,
          textAlign:"center"   ,    
          width: isMobile ? 60 : 70,
          padding: isMobile ? '2px 8px' : '8px 12px',
          position: 'absolute',
          top: 8,  // Adjust position as needed
          right:  isMobile? 6: 16,
          zIndex: 2,
          cursor:'default'
          
        }}
      >
      <Typography
      fontWeight={'bold'}
      fontSize={'1.2rem'}
      color="#fff"
      letterSpacing={3}
          >
         מצבע  
         </Typography>
    </div>
<Box mr={1} p={1}>
      <Typography variant="h6">{item.name}</Typography>
      <Typography>{item.price}</Typography>
      
</Box>
<Button variant="contained">קנה עכשיו</Button>
    </Box>
  );
};

export default MainItem;
