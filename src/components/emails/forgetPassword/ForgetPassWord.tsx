// emails/VerificationEmail.tsx
import { Html, Text, Button, Heading, Section } from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  token: string;
}

export default function ForgetPassWord({ username, token }: VerificationEmailProps) {
  return (
    <Html>
      <Section style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Heading style={{marginBottom: '20px'}}>Love<span color='#aa00ff'>Verse</span></Heading>
          <Heading>Olá, {username}!</Heading>
          <Text>Clique no botão abaixo para redefinir sua senha</Text>
          <Button href={`https://loveverse-umber.vercel.app/reset_password?token=${token}`} style={{ background: '#aa00ff', color: '#fff' }}>
            Redefinir senha
          </Button>
          <Text>Se você não solicitou uma alteração, ignore este e-mail.</Text>
      </Section>
    </Html>
  );
}
