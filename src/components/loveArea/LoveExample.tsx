"use client";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import Link from "next/link";
import Image from "next/image";
import HeartAnim from "../HeartsAnim/HeartsAnim";

// Images
import happy from 'public/img/happy.jpg';

// 🎨 Criando um tema personalizado
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#d24d19", 
          solidHoverBg: "#c05c15",
        },
        neutral: {
          softBg: "#F5F5F5",
          softColor: "#333",
        },
      },
    },
  },
  typography: {
    h2: {
      fontSize: "1.8rem",
      fontWeight: "bold",
    },
    "body-md": {
      fontSize: "1rem",
      color: "#666",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

const LoveExample = () => {
  return (
    <CssVarsProvider theme={theme}>
      <Card
        variant="outlined"
        color="primary"
        invertedColors
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%" },
          overflow: "hidden",
          height: {
            xs: '50%'
          },
          borderRadius: "16px",
          boxShadow: "lg",
          padding: "24px",
        }}
      >
        <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
          <CardContent>
            <section style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ textAlign: 'center' }} level="h4">Escolha sua faixa favorita!</Typography>
              <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <HeartAnim />
                <Typography level="h4">Com carinho, de: <span style={{color: 'pink'}}>João</span></Typography>
                <Typography level="h4">Para: <span style={{color: 'pink'}}>Cláudia</span></Typography>
                <Typography level="body-md" sx={{ margin: '22px 0px', textAlign: 'center', width: '80%'}}>Olá meu amor! Hoje estamos celebrando um dia muito especial em nossas vidas, feliz 1 ano de namoro pra gente! Que possamos a cada dias mais nos apaixonar um pelo outro, e que nossa relação permaneça sempre forte
                  Através desta carta, venho expressar meu enorme amor por você, selecionei uma imagem incrível do dia do nosso casamento, neste dia, me apaixonei por você 3000x mais! Eu te amo, para sempre</Typography>
                  <Image 
                  src={happy}
                  alt="Foto de um casal feliz"
                  width={300}
                  height={200}
                  style={{borderRadius: '10px'}}
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL="https://img.freepik.com/fotos-gratis/noiva-e-noivo-se-casando-na-praia_23-2149043966.jpg?ga=GA1.1.1608259094.1741548888&semt=ais_hybrid"
                  quality={80}
                  />
                  <Typography level="body-lg" sx={{ textAlign: 'center', width: '80%'}}>Eu te amo há 1230 dias</Typography>
                  <Typography level="body-lg" sx={{ textAlign: 'center', width: '80%'}}>Nos conhecemos há 2270 dias</Typography>
                <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12px auto' }}>
                </section>
                <section>
                  <Typography level="h4">Suas fotos preferidas</Typography>
                </section>
                <Typography level="h4">E confia na gente pro resto! 😉</Typography>
              </section>
            </section>
          </CardContent>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="md" fullWidth style={{ transition: '0.3s' }}>
            <Link href="/analyser" style={{ width: '100%', color: 'inherit', textDecoration: 'none' }}>
              Criar meu bilhete
            </Link>
          </Button>
        </CardActions>
      </Card>
    </CssVarsProvider>
  );
};

export default LoveExample;
