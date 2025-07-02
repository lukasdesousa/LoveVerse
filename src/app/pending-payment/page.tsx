'use client';

import { Suspense } from "react";
import PendingPaymentPage from "@/components/PendingPayment/PendingPaymentPage";
import { CircularProgress } from "@mui/material";
import { LoadPage } from "@/components/LoadPage/LoadPage";

export default function Index() {
  return (
    <LoadPage>
      <Suspense fallback={<div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <CircularProgress style={{ color: '#aa00ff' }} />
      </div>}>
        <PendingPaymentPage />
      </Suspense>
    </LoadPage>
  );
};