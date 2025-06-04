import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';
import { SafetyOutlined } from '@ant-design/icons';

export default function MessagePrice() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '500px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
        gap: 2,
      }}
    >
      <Card
        size="lg"
        variant="solid"
        sx={{ bgcolor: 'neutral.100' }}
      >
        <div style={{display: 'flex'}}>
          <Chip sx={{marginRight: '5px'}} size="md" variant="outlined">
            Menor preço
          </Chip>
          <Chip size="md" variant="outlined">
           Compra segura <SafetyOutlined />
          </Chip>
        </div>
        <Typography level="h2">Mensagem</Typography>
        <Divider inset="none" />
        <List
          size="sm"
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            mx: 'calc(-1 * var(--ListItem-paddingX))',
          }}
        >
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
           Interativa
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
           Preço baixo
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            1 Imagem
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            QR Code
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Música
          </ListItem>
        </List>
        <span style={{color: 'black', fontFamily: 'var(--font-quicksand)'}}>Duração de 5 dias</span>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            R$7,90{' '}
            <Typography textColor="text.tertiary" sx={{ fontSize: 'sm' }}>
              / pagamento único
            </Typography>
          </Typography>
          <Button style={{backgroundColor: '#000000'}} endDecorator={<KeyboardArrowRight />}><Link style={{color: 'white', textDecoration: 'none'}} href={'/create'}>Criar</Link></Button>
        </CardActions>
      </Card>
    </Box>
  );
}
