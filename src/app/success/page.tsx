/* eslint-disable react-refresh/only-export-components */
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import SuccessPage from '@/components/Pages/success-component/Success';
import { LoadPage } from '@/components/LoadPage/LoadPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pagamento Aprovado',
  description: 'Pagamento aprovado na LoveVerse.',
  pathname: '/success',
  index: false,
});

export default function Index() {
  return (
    <LoadPage>
      <Suspense fallback={<div><CircularProgress style={{ margin: 'auto', backgroundColor: '#aa00ff' }} /></div>}>
        <SuccessPage />
      </Suspense>
    </LoadPage>
  );
}
