/* eslint-disable react-refresh/only-export-components */
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import Failure from '@/components/Pages/failure-component/Failure';
import { LoadPage } from '@/components/LoadPage/LoadPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pagamento Não Concluído',
  description: 'Pagamento não concluído na LoveVerse.',
  pathname: '/failure',
  index: false,
});

function Index() {
  return (
    <LoadPage>
      <Suspense fallback={<div><CircularProgress style={{ margin: 'auto', backgroundColor: '#aa00ff' }} /></div>}>
        <Failure />
      </Suspense>
    </LoadPage>
  );
}

export default Index;
