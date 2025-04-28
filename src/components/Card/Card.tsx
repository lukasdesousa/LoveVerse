import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import womansBg from '../../../public/img/huggingWomans.jpg';

export default function CardLove() {
  return (
        <Card sx={{ minHeight: '280px', width: 320, margin: 'auto' }}>
          <CardCover>
            <img
              src={womansBg.src}
              srcSet={womansBg.src}
              loading="lazy"
              alt=""
            />
          </CardCover>
          <CardCover
            sx={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
            }}
          />
          <CardContent sx={{ justifyContent: 'flex-end' }}>
            <Typography level="title-lg" textColor="#fff">
              Crie mensagens lindas e encantadoras em minutos
            </Typography>
            <Typography
              startDecorator={<LocationOnRoundedIcon />}
              textColor="neutral.300"
            >
              California, USA
            </Typography>
          </CardContent>
        </Card>
  );
}
