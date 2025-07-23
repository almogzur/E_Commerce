
import MainItem from "@/components/main_item"
import SmallItem from "@/components/small_item"
import { useWindowSize } from "@/context/window_size"
import { StoreItem } from "@/util/zod/types"
import {  Stack } from "@mui/material"


const BestSelling = ({ items }: { items: StoreItem[] }) => {

    const { isMobile  , isDesktop} = useWindowSize()

    return (
 
<Stack
  sx={{
    direction: 'rtl',
    maxWidth: 1450,
    overflowX: isMobile ? 'hidden' : 'scroll', // ✅ Always show scrollbar on desktop
    overflowY: 'hidden',
     scrollbarWidth:  'auto',
    mx: 'auto',
    
    
    '&::-webkit-scrollbar': {
      height: 6,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#ccc',
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f1f1f1',
    },
  }}
  direction={isMobile ? 'column' : 'row'}
  justifyContent={ 'center'}
  alignItems={isMobile ? 'center' : 'flex-start'}
  m={isMobile ? 1 : 2}
  gap={isDesktop ? 15 : 3}
  tabIndex={1}
>


            <MainItem item={items[0]}  />

            <Stack >

                <Stack   direction={'row'}>
                    <SmallItem item={items[1]}/>
                    <SmallItem item={items[2]} />
                </Stack>

                <Stack direction={'row'}  >
                    <SmallItem item={items[3]} />
                    <SmallItem item={items[4]} />
                </Stack>

            </Stack>


 </Stack>


    )
}

export default BestSelling