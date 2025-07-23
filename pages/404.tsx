// components/NotFound.tsx
import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { IoStorefront as Storefront } from "react-icons/io5";
import { FaSearch as Search } from "react-icons/fa";


const NotFound = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f9f6f1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        textAlign: 'center',
      }}
    >
      <Search size={100} style={{color: '#D86F45'}} />
      <Typography variant="h3" fontWeight="bold" mt={2} mb={1}>
      לא מצאנו את העמוד המבוקש 
      </Typography>
      <Typography variant="h6" color="text.secondary" maxWidth={500}>
        אופס! לא הצלחנו למצוא את מה שחיפשת. ייתכן שהמוצר או הדף  הועבר או נמחק.
      </Typography>

      <Stack spacing={2} mt={4}>
        <Button
          variant="contained"
          sx={{ bgcolor: '#D86F45', px: 4, py: 1.5 }}
          onClick={handleBackToHome}
        >
            חזרה לדף הבית 
        </Button>
        <Button
          variant="outlined"
          startIcon={<Storefront />}
          onClick={() => router.push('/shop')}
        >
          המשך לקנות 
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFound;
