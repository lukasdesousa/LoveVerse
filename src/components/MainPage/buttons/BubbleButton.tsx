'use client';

import { Button } from "antd";
import { ExportOutlined } from '@ant-design/icons';
import Link from "next/link";

export default function BubbleButton() {
    return (
        <div style={{display: 'flex', gap: '8px'}}><Link href={'/criar'}><Button>Criar agora</Button></Link><Link href={'/tutorial/loveverse'}><Button style={{border: 'none', boxShadow: 'none'}}>Saiba mais <ExportOutlined /></Button></Link></div>
    )
}