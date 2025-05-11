import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import priceIcon from 'public/img/price-icon.png';

export default function PriceCard() {
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                margin: '10px auto',
                backgroundColor: 'white',
                maxWidth: '550px',
                width: '100%',
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <AspectRatio ratio="1" sx={{ width: 90 }}>
                <img
                    src={priceIcon.src}
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <CardContent>
                <Typography level="title-lg" id="card-description">
                    Mensagem LoveVerse
                </Typography>
                <Typography
                    level="body-sm"
                    aria-describedby="card-description"
                    sx={{ mb: 1 }}
                >
                    <Link
                        overlay
                        underline="none"
                        sx={{ color: 'text.tertiary', fontWeight: 'bold' }}
                    >
                        <s style={{ color: 'red' }}>R$ 21,90</s> &nbsp; <span style={{ marginLeft: '2px', color: 'green' }}>R$ 8,90</span>
                    </Link>
                </Typography>
                <div style={{ display: 'flex' }}>
                    <Chip
                        variant="outlined"
                        color='primary'
                        size="sm"
                        sx={{ pointerEvents: 'none', marginRight: '5px' }}
                    >
                        Duração de 5 dias
                    </Chip>
                    <Chip
                        variant="outlined"
                        color="primary"
                        size="sm"
                        sx={{ pointerEvents: 'none' }}
                    >
                        Promoção
                    </Chip>
                </div>
            </CardContent>
        </Card>
    );
}