import Logo from '@/public/logo.png'
import Image from 'next/image'

import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";


import { Button, Stack, useTheme } from "@mui/material";
import AutoCompleteInputWrap from '@/components/form_inputs/auto-complete-input-wrap';
import { useWindowSize } from '@/context/window_size';

const NavigationBar = () => {

    const { isMobile, isTablet } = useWindowSize()
    const theme = useTheme()

    const isSmallScreen = isMobile || isTablet

    return (
        <Stack
             direction={'row'} 
             width={'100%'}
              alignItems={'center'}
               justifyContent={'space-around'}
               height={isSmallScreen ? 70: 100}
                >
           <Button
              sx={{color:'black'}}
               style={{ marginLeft: "20px", marginRight: "20px" }} 
               >
            <FaRegUser
                 size={ isSmallScreen ? 25:  40}
                />
         </Button>

            <AutoCompleteInputWrap AutocompleteOptionArray={[]}
                label={''}
                value={undefined}
                onChangeHandler={() => { }}
                Icon={<FaSearch size={ isSmallScreen ? 25:  30}/> }
                helpText={undefined}
                labelPosition={'top'}
                variant='outlined'
                bg='#ede7df'
                sx={{
                    height: isSmallScreen ? 50: 100
                }}
                textFieldProps={{
                    sx: {
                        borderRadius: 15,
                        bgcolor: '#ede7df',
                        minWidth: isMobile ? 100 : isTablet ? 200 : 300,
                        
                    }
                }}
            />

           <Button 
             sx={{color:'black'}} 
            style={{ marginRight: "20px" }}
            >

            <MdOutlineShoppingCart
                   size={isSmallScreen ? 30:  40}
                    
              />
              </Button>

            <Image
                src={Logo}
                alt="logo"
                height={isSmallScreen ? 70: 100}
                width={isSmallScreen ? 70: 100}
                style={{ marginRight: "auto" }}
            />
        </Stack>
    )

}

export default NavigationBar