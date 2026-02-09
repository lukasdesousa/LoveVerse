'use client';

import styled from 'styled-components';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import Link from 'next/link';

export default function LoveHeader() {

  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 968px)');
  
  useEffect(() => {
    if(!isSmallScreen) {
      setOpen(false);
    }
  }, [isSmallScreen])

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <HeaderContainer>
      <Link href={'/'} style={{textDecoration: 'none', color: 'inherit'}}>
        <Logo>Love<span>Verse</span></Logo>
      </Link>

      <Menu>
        <MenuItem href="/criar">Criar cartinha</MenuItem>
        <MenuItem href="/termos/loveverse">Termos de uso</MenuItem>
        <MenuItem href="/tutorial/loveverse">Tutorial</MenuItem>
      </Menu>

        <Drawer
          placement='bottom'
          width={500}
          closeIcon={false}
          height={400}
          style={{borderRadius: '30px 30px 0px 0px'}}
          onClose={onClose}
          open={open}
        >
          <Line />
          <DrawerMenuOpts>
            <Link style={{textDecoration: 'none', color: 'inherit'}} href={'/criar'}><h1>Criar cartinha</h1></Link>
            <Link style={{textDecoration: 'none', color: 'inherit'}} href={'/termos/loveverse'}><h1>Termos de uso</h1></Link>
            <Link style={{textDecoration: 'none', color: 'inherit'}} href={'/tutorial/loveverse'}><h1>Tutorial</h1></Link>
            <Link style={{textDecoration: 'none', color: 'inherit'}} href={'/contato/loveverse'}><h1>Contato</h1></Link>
          </DrawerMenuOpts>
          <Line02 />
          <LtTitle>
            <p>©2025 LoveVerse Space</p>
          </LtTitle>
        </Drawer>

    <RightAction href={'/contato/loveverse'}>Contato</RightAction>
    <MenuOutlined className='btn-menu' onClick={() => showDrawer()}/>
    </HeaderContainer>
  );
}

const Line = styled.span`
  display: block;
  margin: auto;
  border: 2px solid #e6e6e6;
  border-radius: 10px;
  height: 7px;
  background-color: #e6e6e6;
  width: 50px;
`;

const Line02 = styled.span`
  display: block;
  margin: 40px auto 0px auto;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  background-color: #e6e6e6;
  width: 100%;
`;

const LtTitle = styled.section`
  text-align: center;

  p {
    margin-top: 20px;
    font-weight: bold;
    opacity: 0.7;
    font-family: var(--font-quicksand);
  }
`;

const DrawerMenuOpts = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;
  gap: 30px;
  margin-top: 70px;

  h1 {
    font-family: var(--font-quicksand);
  }
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 90px;
  font-family: var(--font-quicksand);

  .btn-menu {
    @media (min-width: 968px) {
    display: none;
  }
  }

  @media (max-width: 968px) {
    justify-content: space-between;
    padding: 25px 34px
  }
`;
const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;

  span {
    background: linear-gradient(to right, #884ada, #00affa, #0190cd, #cd43e9);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate;
  }
`;

const Menu = styled.nav`
  display: flex;
  gap: 28px;

  @media (max-width: 968px) {
    display: none;
  }
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  color: #111;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s;

  &:hover {
    color: #884ada;
  }
`;

const RightAction = styled(Link)`
  font-weight: 500;
  font-size: 0.95rem;
  color: #111;
  text-decoration: none;
  cursor: pointer;

  @media (max-width: 968px) {
    display: none;
  }

  &:hover {
    color: #884ada;
  }
`;
