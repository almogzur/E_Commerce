import Logo from '@/public/logo.png'
import Image from 'next/image'

import { FaRegUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


import { Stack,  } from "@mui/material";
import AutoCompleteInputWrap from '@/components/form_inputs/auto-complete-input-wrap';
import { useWindowSize } from '@/context/window_size';
import Cart from './cart';
import Link from 'next/link';


export type NavigationBarPropsType = {
    applyMargin?: boolean
}

const NavigationBar = ({applyMargin}: NavigationBarPropsType) => {

    const { isMobile, isTablet  } = useWindowSize()

    const isSmallScreen = isMobile || isTablet

    return (
        <Stack
            bgcolor='#ede7df'
            boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
             direction={'row'} 
             width={'100%'}
              alignItems={'center'}
   
               height={isSmallScreen ? 70: 100}
               style={{direction:'rtl'}}
               mb={applyMargin ? 0:  2}
            
                >

            <FaRegUser
                 size={ isSmallScreen ? 25:  30}
                 style={{ marginRight: "10px", marginLeft: "10px" }}
                />


            <AutoCompleteInputWrap AutocompleteOptionArray={[]}
                label={''}
                value={undefined}
                onChangeHandler={() => { }}
                 m={0}
                    
                helpText={undefined}
                labelPosition={'top'}
                variant='outlined'
                textFieldProps={{
                    sx: {
                        borderRadius: 15,
                        bgcolor: '#ede7df',
                        minWidth: isMobile ? 100 : isTablet ? 200 : 300,
                              
                    },
                    slotProps:{
                        input:{
                            style:{
                                borderRadius:15,
                                backgroundColor:'#ede7df'
                            },
                              startAdornment:  <FaSearch size={ isSmallScreen ? 25:  30}/>
                    }}
                }}
            />

            <Cart/>

        <Link
         href={'/'}
         style={{ marginRight: "auto" }}
         >
            <Image
                src={Logo}
                alt="logo"
                height={isSmallScreen ? 70: 100}
                width={isSmallScreen ? 70: 100}
  
            />
            </Link>
        </Stack>
    )

}

export default NavigationBar