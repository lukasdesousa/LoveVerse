'use client';

import { Suspense } from "react";
import SuccessPage from "@/components/Pages/success-component/Success";
import { CircularProgress } from "@mui/material";
import { LoadPage } from "@/components/LoadPage/LoadPage";

export default function Index() {
  return (
    <LoadPage>
      <Suspense fallback={<div><CircularProgress style={{margin: 'auto', backgroundColor: '#aa00ff'}}/></div>}>
        <SuccessPage />
      </Suspense>
    </LoadPage>
  );
};