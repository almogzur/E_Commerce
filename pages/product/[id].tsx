// pages/product/[id].tsx
import { GetServerSideProps } from 'next'
import { Product } from '@/util/zod/types'
import { Box, Stack, Typography, Button } from '@mui/material'
import { CldImage } from 'next-cloudinary'
import NavigationBar from '@/components/navigation'
import Footer from '@/components/footer'
import AddToCartButton from '@/components/add_to_cart_btn'

type Props = {
  product: Product | null
}


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const id = context.query.id

  const cleanId = Array.isArray(id) ? id[0] : id

  // Validate: only numbers allowed
  if (!cleanId || !/^\d+$/.test(cleanId)) {
    return { notFound: true }
  }

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/products/${cleanId}`)

  if (!res.ok) {
    return { notFound: true }
  }

  const product: Product = await res.json()

  return { props: { product } }
}


export default function ProductPage({ product }: Props) {
  if (!product) return <p>Product not found</p>

  return (
    <>
     <NavigationBar
     applyMargin={false}
     />
    <Box
      sx={{
        bgcolor: '#fdfaf6',
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 6 },
        direction: 'rtl',
        textAlign: 'right',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="center"
      >
        {/* תמונה */}
        <Box flex={1} display="flex" justifyContent="center">
          <CldImage
            src={product.image_url || ''}
            width={400}
            height={500}
            alt={product.name}
            style={{
              borderRadius: '16px',
              backgroundColor: '#f0ebe4',
              objectFit: 'contain',
              aspectRatio: '3/4',
            }}
          />
        </Box>

        {/* פרטים */}
        <Stack 
             flex={1}
             maxWidth={500}
             mt={{ xs: 4, md: 0 }}
             >
          <Typography variant="h4" fontWeight={700} color="#1f1f1f" gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="body1" fontSize={16} color="#3d3d3d" mb={2}>
            {product.description || 'אין תיאור זמין.'}
          </Typography>

          <Typography variant="h5" fontWeight={600} color="#000" mb={2}>
           {product.price} ₪  
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={1}>
            במלאי: {product.quantity_in_stock}
          </Typography>


         <AddToCartButton product={product} />

          <Button
            variant="contained"
            sx={{
              mt: 2,
              mb: 4,
              bgcolor: '#d57641',
              '&:hover': { bgcolor: '#c86733' },
              borderRadius: '20px',
              px: 4,
              py: 1.5,
              fontWeight: 600,
            }}
          >
            קנה עכשיו
          </Button>

 

        </Stack>

        
      </Stack>

    </Box>
    <Footer/>
    </>
  )
  
}
