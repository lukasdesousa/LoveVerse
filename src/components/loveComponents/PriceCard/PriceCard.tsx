import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import priceIcon from 'public/img/price-icon.png';
import styled from 'styled-components';

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
                    alt="Imagem envelope amor loveverse"
                />
            </AspectRatio>
            <CardContent>
                <Typography fontWeight={500} level="title-lg" id="card-description">
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
                        <div>
                            De: <OldPrice>R$ 21,90</OldPrice> &nbsp;<br />
                            Por: <NewPrice>R$ 7,90</NewPrice>
                        </div>
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
                        Interativa
                    </Chip>
                </div>
            </CardContent>
        </Card>
    );
}

const OldPrice = styled.span`
  text-decoration: line-through;
  color: gray;
`;

const NewPrice = styled.span`
  font-weight: bold;
  color: #07891a;
`;