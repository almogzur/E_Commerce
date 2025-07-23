import { useWindowSize } from "@/context/window_size";
import {  Stack } from "@mui/material";
import Image from "next/image";

const MainSection = () => {
  
  const { isMobile  } = useWindowSize()

  return (
    <Stack direction={'row'} justifyContent={'center'} >
      <Image
        src="/main_section_cover.png"
        alt="main_section"
        height={ isMobile ? 400: 500}
        width={1450}
      />
      </Stack>

  );
};

export default MainSection;
