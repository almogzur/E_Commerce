import { ImageSizePopsType } from "./zod/types"





export const  SmallImageSizesProps :ImageSizePopsType = {
  mobile: {
    width: 150,
    height: 190, // 60% of 360
  },
  tab: {
    width: 180,
    height: 200, // 60% of 768
  },
  desktop: {
    width: 240,
    height: 300, // 60% of 1200
  },
} as const

export const   BigImageSizesProps :ImageSizePopsType = {
  mobile: {
    width: 260,
    height: 340, // 60% of 360
  },
  tab: {
    width: 300,
    height: 350, // 60% of 768
  },
  desktop: {
    width: 400,
    height: 500, // 60% of 1200
  },

}as const

export const CarouselImageSize : ImageSizePopsType = {
  mobile: {
    width: 220,
    height: 300, // 60% of 360
  },
  tab: {
    width: 240,
    height: 300, // 60% of 768
  },
  desktop: {
    width: 300,
    height: 400, // 60% of 1200
  },
}