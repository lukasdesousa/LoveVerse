'use client';

import Failure from "@/components/Pages/failure-component/Failure";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

function Index() {
  return (
    <Suspense fallback={<div><CircularProgress style={{margin: 'auto', backgroundColor: '#aa00ff'}}/></div>}>
      <Failure />
    </Suspense>
  );
};

export default Index;
