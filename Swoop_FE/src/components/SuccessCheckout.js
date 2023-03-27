import { Box, Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

export default function SuccessCheckout() {

  const navigate = useNavigate();

  return (

    <Box m={5}>
      <Typography variant='h5' my={4}> Thank you for your order! <br></br>
      Your Payment was sucessful </Typography>
      <Button variant='outlined' onClick={() => navigate('/')}>Back to Main Page</Button>
    </Box>

  );
}