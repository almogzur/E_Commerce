'use client';
import React from 'react';
import { Stack, Box, Typography, TextField, Button } from '@mui/material';
import Image from 'next/image';

const Footer = () => {
  return (
    <Box
      component="footer"
      dir="rtl"
      sx={{
        backgroundColor: '#f9f6f1',
        py: 6,
        px: { xs: 2, md: 8 },
        textAlign: 'right',
        mt: 8
    
     
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {/* לוגו */}

          <Image  
            src={'/logo.png'} 
            width={100}
             height={100}
              alt={''}
              
              />
 

        {/* אודות */}
        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight="bold">אודות</Typography>
          <Typography variant="body2">צור קשר</Typography>
          <Typography variant="body2">שאלות נפוצות</Typography>
        </Stack>

        {/* עזרה */}
        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight="bold">עזרה</Typography>
          <Typography variant="body2">משלוחים</Typography>
          <Typography variant="body2">החזרות</Typography>
          <Typography variant="body2">מדיניות פרטיות</Typography>
        </Stack>

        {/* ניוזלטר */}
        <Stack spacing={1} minWidth={250}>
          <Typography variant="subtitle1" fontWeight="bold">הצטרפו לרשימת התפוצה</Typography>
          <TextField
            placeholder="כתובת אימייל"
            variant="outlined"
            size="small"
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
            inputProps={{ style: { direction: 'rtl' } }}
          />
          <Button variant="contained" sx={{ backgroundColor: '#d46b35', color: '#fff' }}>
            הירשם
          </Button>
        </Stack>
      </Stack>

      {/* תחתית */}
      <Box mt={6} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          כל הזכויות שמורות © 2025
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
