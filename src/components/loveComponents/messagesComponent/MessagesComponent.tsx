'use client';

import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card, Pagination } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import Link from 'next/link';
import styled from 'styled-components';
import NoPic from './NoPic';
import { useRouter } from 'next/navigation';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

const { Meta } = Card;

type Message = {
  id: string;
  creatorName: string;
  destinataryName: string;
  spotifyLink: string;
  dateInit?: string;
  theme?: string;
  imageUrl?: string;
  content: string;
  expiresAt: string;
}

type User = {
  user: {
    user: {
      id: string;
      name: string;
      email: string;
      email_verified: string;
      messages: Message[];
    }
  }
}

const MessageComponent: React.FC = () => {
  const user = useSelector((state: User) => state.user.user);
  const router = useRouter();

  const [page, setPage] = useState(1);
  const pageSize = 3; // Número de mensagens por página
  
  if(!user) {
    router.push('/login')
  }

  const abbrContent = (content: string) => {
    if (content.length > 100) {
      return content.substring(0, 60) + '...';
    }
    return content;
  }

  const sortMessagesByDate = (messages: Message[]) => {
    return messages.slice().sort((a, b) => dayjs(b.expiresAt).valueOf() - dayjs(a.expiresAt).valueOf());
  };

  const sortedMessages = sortMessagesByDate(user.messages);

  // Paginação
  const startIndex = (page - 1) * pageSize;
  const paginatedMessages = sortedMessages.slice(startIndex, startIndex + pageSize);

  return (
    <Container>
      <section
       className='container1'
      >
        <section
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '10px',
          }}
        >
          {paginatedMessages.map((message) => {
            const now = dayjs();
            const expiresAt = dayjs(message.expiresAt);
            const isToday = now.isSame(expiresAt, 'day');
            const expiresIn = isToday ? "hoje" : expiresAt.fromNow(true);
            return (
              <section key={message.id}>
                <Link href={`/messages/${message.id}`}>
                  <p>Data de expiração: {expiresIn}</p>
                  <Card
                    key={message.id}
                    className='card'
                    style={{ width: 300 }}
                    cover={message.imageUrl ? <img src={message.imageUrl}></img> : <NoPic />}
                    actions={[
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  >
                    <Meta
                      title={`Para: ${message.destinataryName}`}
                      description={abbrContent(message.content)}
                    />
                  </Card>
                </Link>
              </section>
            );
          })}
        </section>
        {/* Componente de Paginação */}
      </section>
      <div className='pagination'>
        <Pagination
          current={page}
          total={user?.messages?.length || 0}
          pageSize={pageSize}
          onChange={(page) => setPage(page)}
          showSizeChanger={false}
        />
      </div>
    </Container>
  );
};

const Container = styled.section`


.container1 {
  display: flex;
  flex-direction: column;
  align-items: center; /* Corrected to CSS standard */
  overflow-y: auto;
  gap: 20px;
  margin: 10px;
  scrollbar-width: none;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

@media (max-width: 568px) {
  .container1 {
    align-items: flex-start; /* Corrected to CSS standard */
  }
 }

`;

export default MessageComponent;
