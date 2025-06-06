'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Grid, Menu, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function LoveHeader() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const router = useRouter();

  const menuItems: Array<{
    label: string;
    key: string;
    path?: string;
    children?: Array<{ label: string; key: string; path?: string }>;
  }> = [
    {
      label: "Criar mensagem",
      key: "mensagens",
      path: "/create",
    },
  ];

  const [current, setCurrent] = useState("projects");

  const onClick = (e) => {
    const selectedItem = menuItems.find(
      (item) => item.key === e.key || item.children?.some((child) => child.key === e.key)
    );

    if (selectedItem) {
      const path = selectedItem.path || selectedItem.children?.find((child) => child.key === e.key)?.path;
      if (path) {
        router.push(path);
      }
    }

    setCurrent(e.key);
  };

  const styles = {
    container: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      margin: "0 auto",
      maxWidth: token.screenXL,
      padding: screens.md ? `0px ${token.paddingLG}px` : `0px ${token.padding}px`,
    },
    header: {
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      position: "relative" as React.CSSProperties["position"],
    },
    logo: {
      display: "block" as React.CSSProperties["display"],
      height: token.sizeLG,
      left: "50%",
      position: screens.md ? "static" as React.CSSProperties["position"] : "absolute" as React.CSSProperties["position"],
      top: "50%",
      transform: screens.md ? " " : "translate(-50%, -50%)",
      textDecoration: "none",
      color: 'black',
    },
    menu: {
      backgroundColor: "transparent",
      borderBottom: "none",
      lineHeight: screens.sm ? "4rem" : "3.5rem",
      marginLeft: screens.md ? "0px" : `-${token.size}px`,
      width: screens.md ? "inherit" : token.sizeXXL,
      menuItems: {
        color: token.colorTextBase,
      }
    },
    menuContainer: {
      alignItems: "center",
      display: "flex",
      gap: token.size,
      width: "100%",
    },
  };

  return (
     
        <nav style={styles.header}>
          <div style={styles.container}>
            <div style={styles.menuContainer}>
              <a style={styles.logo} href="/">
                <h1 style={{fontFamily: 'var(--font-quicksand)'}}>Love<Span>Verse</Span></h1>
              </a>
              <Menu
                style={styles.menu}
                mode="horizontal"
                items={menuItems}
                onClick={onClick}
                selectedKeys={screens.md ? [current] : []}
                overflowedIndicator={<Button type="text" icon={<MenuOutlined />} />}
              />
            </div>
          </div>
        </nav>
      
  );
}

const Span = styled.span`
   background: linear-gradient(
      to right,
      #884ada 20%,
      #00affa 30%,
      #0190cd 70%,
      #cd43e9 80%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate;
    white-space: nowrap; /* ← impede quebra de linha */
        font-weight: 700;
        color: #000000;
        font-family: var(--font-quicksand);
`;
