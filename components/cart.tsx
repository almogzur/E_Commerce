'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoMdClose as CloseIcon } from "react-icons/io";
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useWindowSize } from '@/context/window_size';
import { useCart } from '@/context/cart_context';
import { Badge, Box, Stack } from '@mui/material';
import { CldImage } from 'next-cloudinary';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    backgroundColor: '#fdfaf6',
    width: '100%',
    maxWidth: 500,
    margin: 0,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: theme.spacing(1),
    },
  },
}));

export default function Cart() {
  const [open, setOpen] = React.useState(false);

  const { isMobile, isTablet } = useWindowSize();

  const { cartItems , clearCart } = useCart();

  const isSmallScreen = isMobile || isTablet;

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Badge
        badgeContent={cartItems.length}
        color="primary"
        sx={{ padding: 0.5, mr: 2, cursor: 'pointer' }}
        onClick={handleClickOpen}
      >
        <MdOutlineShoppingCart size={isSmallScreen ? 28 : 36} />
      </Badge>

      <BootstrapDialog onClose={handleClose} open={open} dir="rtl">
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600, fontSize: 20 }}>
          סל הקניות שלך
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            left: 8,
            top: 8,
            color: theme.palette.grey[900],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          {cartItems.length === 0 ? (
            <Typography color="text.secondary">
              הסל שלך ריק כרגע.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {cartItems.map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <Box flex={1} minWidth={0}>
                    <Typography fontWeight={600}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      מחיר: {item.price} ₪ × {item.quantity}
                    </Typography>
                    <Typography variant='body2'>סה״כ: {item.price * item.quantity} ₪ </Typography>
                  </Box>

                  <CldImage
                    alt={item.name}
                    src={item.imageUrl}
                    height={100}
                    width={100}
                    style={{ borderRadius: 8 }}
                  />
                </Stack>
              ))}
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Stack
            direction={isSmallScreen ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems="stretch"
            width="100%"
            gap={1}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#d57641',
                '&:hover': { bgcolor: '#c86733' },
                borderRadius: '20px',
                px: 4,
                py: 1,
                fontWeight: 600,
                color: '#fff',
              }}
            >
              מעבר לתשלום
            </Button>

         { cartItems.length ?   <Button
              onClick={() => clearCart()}
              variant="outlined"
              fullWidth
              sx={{ borderRadius: '20px' }}
            >
              נקה סל
            </Button>: null
            }
          </Stack>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
