'use client';

import { Suspense } from "react";
import SuccessPage from "@/components/success-component/Success";
import { CircularProgress } from "@mui/material";

export default function Index() {
  return (
    <Suspense fallback={<div><CircularProgress style={{margin: 'auto', backgroundColor: '#aa00ff'}}/></div>}>
      <SuccessPage />
    </Suspense>
  );
};