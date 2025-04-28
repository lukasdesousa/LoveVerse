import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LoveExample from './LoveExample';

export default function LoveArea() {
  return (
    <Box>
      <Card
        variant="outlined"
        sx={{
          height: '10%',  
          width: '100%',
          margin: 'auto',
        }}
      >
        <Typography level="h2" textColor="#000" sx={{ fontSize: 'lg' }}>
          Deixe tudo do seu jeito!
        </Typography>
        <CardCover
          sx={{
            background:
              'linear-gradient(to top, rgba(99, 176, 248, 0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(253, 253, 253, 0.8), rgba(0,0,0,0) 300px)',
            border: '1px solid',
            borderColor: '#e6e6e6',
            
          }}
        >
        </CardCover>
        <CardContent
          sx={{
            alignItems: 'self-end',
            justifyContent: 'flex-end',
            background:
            'linear-gradient(to top, rgba(99, 176, 248, 0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(253, 253, 253, 0.8), rgba(0,0,0,0) 300px)',
            border: '1px solid',
            borderColor: '#e6e6e6',
            backdropFilter: 'blur(1px)',
            padding: '10px',
            borderRadius: '10px'
          }}
        >
          <Typography component='div' sx={{ width: '100%'}}>
            <LoveExample />
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
