'use client';

import NotFound from "@/components/Pages/NotFound/NotFound";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

export default function NotFoundPage() {
  return (
  <Suspense fallback={<div><CircularProgress style={{margin: 'auto', backgroundColor: '#aa00ff'}}/></div>}>
    <NotFound />
  </Suspense>
  )
};
