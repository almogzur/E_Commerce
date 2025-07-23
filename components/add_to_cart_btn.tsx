'use client';
import React from 'react';
import { Button, } from '@mui/material';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useCart } from '@/context/cart_context'; // adjust path as needed
import { Product } from '@/util/zod/types';

type AddToCartButtonProps = {
  product: Product;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  
  const { addItemToCart, cartItems } = useCart();

  const quantityInCart =
    cartItems.find((item) => item.productId === product.id)?.quantity ;

  const handleClick = () => {
    console.log(quantityInCart)
    addItemToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image_url,
      quantity: 1
    });
  };

  return (

        <Button
              
          variant="contained"
          color="primary"
          onClick={handleClick}
          endIcon={<MdOutlineShoppingCart style={{marginRight: 5} }/>}
          sx={{
              mt: 2,
              bgcolor: '#d57641',
              '&:hover': { bgcolor: '#c86733' },
              borderRadius: '20px',
              px: 4,
              py: 1.5,
              fontWeight: 600,
            }}
        >
          הוסף לעגלה
        </Button>


  );
};

export default AddToCartButton;
