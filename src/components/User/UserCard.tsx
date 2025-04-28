"use client";

import React, { useState, useEffect } from "react";
import { EditOutlined, LogoutOutlined} from "@ant-design/icons";
import { Avatar, Card, Flex, Modal, message, notification } from "antd";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Typography } from "@mui/material";
import { updateUser } from "@/store/userSlice";
import { AppDispatch } from "@/store/store";

const UserCard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [api, contextHolder] = notification.useNotification();
  const dispatch: AppDispatch = useDispatch();

  // Estados locais para edição, inicializados com os dados do Redux, se disponíveis
  const [name, setName] = useState<string>("Carregando...");
  const [email, setEmail] = useState<string>("Carregando...");

  // Modal para edição
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const actions: React.ReactNode[] = [
    <EditOutlined key="edit" onClick={() => setOpen(!open)} />,
    <LogoutOutlined key="logout" />
  ];

  // Atualiza os estados locais assim que os dados do Redux estiverem disponíveis
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // Função para atualizar os dados do usuário (backend + Redux)
  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      message.error("Nome e email não podem estar vazios.");
      return;
    }

    setConfirmLoading(true);
    try {
      await dispatch(updateUser({ id: user?.id || "", name, email })).unwrap();
      message.success("Dados atualizados com sucesso!");
      api.success({
        message: "Sucesso",
        description: "Os seus dados foram atualizados",
        duration: 5,
      });
      setOpen(false);
    } catch {
      api.error({
        message: "Erro",
        description: "Erro ao atualizar dados.",
        duration: 5,
        showProgress: true,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
      {contextHolder}
      <Flex gap="middle" align="start" vertical>
        <Card loading={!user} actions={actions} style={{ width: "100%" }}>
          <Card.Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
            style={{padding: '10px'}}
            description={
              <>
                <section>
                  <Typography variant="h6">
                    Bem-vindo(a), <span style={{ cursor: "pointer" }}>{name}</span>
                  </Typography>
                </section>
                <section style={{ marginBottom: "10px" }}>
                  <Typography>{email}</Typography>
                </section>
                <section>
                  {user && user.messages && (
                    <Typography>Mensagens criadas: {user?.messages.length}</Typography>
                  )}
                </section>
              </>
            }
          />
        </Card>
      </Flex>
      <Modal
        title="Alterar dados"
        open={open}
        cancelText="Cancelar"
        okText="Salvar"
        onOk={handleSave}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <TextField
          fullWidth
          label="Nome"
          placeholder="Novo nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />
        <TextField
          fullWidth
          label="Email"
          placeholder="Novo email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default UserCard;
