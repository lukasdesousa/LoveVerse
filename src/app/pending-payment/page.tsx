/* eslint-disable react-refresh/only-export-components */
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import PendingPaymentPage from '@/components/PendingPayment/PendingPaymentPage';
import { LoadPage } from '@/components/LoadPage/LoadPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pagamento Pendente',
  description: 'Pagamento pendente na LoveVerse.',
  pathname: '/pending-payment',
  index: false,
});

export default function Index() {
  return (
    <LoadPage>
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress style={{ color: '#aa00ff' }} />
          </div>
        }
      >
        <PendingPaymentPage />
      </Suspense>
    </LoadPage>
  );
}
