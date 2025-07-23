'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, scale } from 'framer-motion';
import { StoreItem } from '@/util/zod/types';
import { CldImage } from 'next-cloudinary';
import { useWindowSize } from '@/context/window_size';
import { CarouselImageSize } from '@/util/constant';
import Link from 'next/link';
import { IconButton, Box, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function Carousel({ items }: { items: StoreItem[] }) {
  const { isDesktop, isTablet } = useWindowSize();
  const theme = useTheme()
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const imageSize = isDesktop ? CarouselImageSize.desktop
    : isTablet ? CarouselImageSize.tab
      : CarouselImageSize.mobile;

  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    if (carouselRef.current && innerRef.current) {
      const container = carouselRef.current;
      const content = innerRef.current;

      const marginPerItem = isDesktop ? 32 : isTablet ? 24 : 16;
      const childrenCount = content.children.length;
      const extraMargin = marginPerItem * childrenCount;
      const totalScroll = content.scrollWidth + extraMargin - container.offsetWidth;

      setMaxScroll(totalScroll > 0 ? totalScroll : 0);
    }
  }, [items, isDesktop, isTablet]);

  const scrollBy = (offset: number) => {
    const container = carouselRef.current;
    if (!container) return;

    const newScroll = Math.min(Math.max(scrollX + offset, 0), maxScroll);
    setScrollX(newScroll);
  };

  return (
    <Box position="relative" width="100%" overflow="hidden" ref={carouselRef}>
      {/* Arrows */}
      <IconButton
        onClick={() => scrollBy(-300)}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 10,
          transform: 'translateY(-50%)',
          zIndex: 15,
          bgcolor: theme.palette.primary.main,
          display: { xs: 'none', sm: 'flex' },
          scale: 1.5,
          '&:hover': {
            bgcolor: theme.palette.secondary.main,
          },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={() => scrollBy(300)}

        sx={{
          position: 'absolute',
          top: '50%',
          right: 15,
          transform: 'translateY(-50%)',
          zIndex: 10,
          bgcolor: theme.palette.primary.main,
          display: { xs: 'none', sm: 'flex' },
          scale: 1.5,
          '&:hover': {
            bgcolor: theme.palette.secondary.main,

          },
        }}
      >
        <ChevronRight />
      </IconButton>

      <motion.div
        ref={innerRef}
        drag="x"
        dragConstraints={{ left: -maxScroll, right: 0 }}
        dragElastic={0.2}
        animate={{ x: -scrollX }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
        style={{
          display: 'flex',
          gap: '1rem',
          willChange: 'transform',
          cursor: 'grab',
          padding: '1rem',
        }}
      >
        {items.slice(0, 8).map((itemData) => (
          <motion.div key={itemData.id} style={{ flexShrink: 0 }}>
            <Link href={`/product/${itemData.id}`}>
            <Box
               sx={{
                transition: 'all 0.3s ease-in-out',
                 '&:hover': {
                   scale: 1.05,
                   boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                 }, 
               }}
               >
              <CldImage
                src={itemData.image_url}
                width={imageSize.width}
                height={imageSize.height}
                alt={itemData.name}
                draggable={false}
                style={{
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                  width: imageSize.width,
                  height: imageSize.height,
                }}
              />
              </Box>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
}

export default Carousel;
