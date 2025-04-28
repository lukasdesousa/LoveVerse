"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Drawer, DrawerProps, Space } from "antd";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { RootState } from "@/store/store";
import LogoutButton from './button/LogOut';

const CustomDrawer: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.user); // Acessa o estado do usuário
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();

  const showDefaultDrawer = () => {
    setSize('default');
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button onClick={showDefaultDrawer}>
          <FaUser />
        </Button>
      </Space>
      <Drawer
        title={`Menu`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={<Space><FaUser /></Space>}
      >
        {loading ? (
          <p>Carregando...</p>
        ) : user ? (
          <p>Bem-vindo(a), {user.name}!</p>
        ) : (
          <>
            <Link href={'/login'}><p>Login</p></Link><br />
            <Link href={'/register'}><p>Registrar</p></Link><br />
          </>
        )}<br />
        {user && <LogoutButton />}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
