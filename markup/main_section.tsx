import { useWindowSize } from "@/context/window_size";
import Image from "next/image";

const MainSection = () => {

    const { isMobile, isTablet } = useWindowSize()

  return (
    <div
      style={{
        width: "100%",      // Takes full width of the parent container
        maxWidth: "1920px", // Optional: sets a max width
        margin: "20px auto",   // Optional: center the image container
        height:  isMobile? "300px":  "500px",    // Fixed height, does not shrink/grow
        position: "relative", // Required when using layout="fill"
        overflow: "hidden",
           aspectRatio: "16 / 9",
           
      }}
    >
      <Image
        src="/main_section.png"
        alt="main_section"
        fill  // Makes the image cover the container

      />
    </div>
  );
};

export default MainSection;
