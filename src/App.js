import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Box, CssBaseline, Button, TextField, Typography } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';

function SnackbarApp() {
  const { enqueueSnackbar } = useSnackbar();
  const [currentTime, setCurrentTime] = useState('');
  const [barcode, setBarcode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBarcode = event.target.elements.barcode.value;

    // Véletlenszerű stílus választása
    const variants = ['success', 'warning', 'error'];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];

    enqueueSnackbar(newBarcode, { variant: randomVariant });
    setBarcode(''); // Input mező ürítése
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().toLocaleString();
      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" align="center">
          Iskolai jelenlét-nyilvántartó alkalmazás
        </Typography>
        <p>{currentTime}</p>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="barcode"
            label="Vonalkód"
            name="barcode"
            autoComplete="barcode"
            autoFocus
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Elküld
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

function App() {
  return (
    <SnackbarProvider maxSnack={5} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}>
      <SnackbarApp />
    </SnackbarProvider>

  );
}

export default App;
