'use client';

import Failure from "@/components/Pages/failure-component/Failure";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { LoadPage } from "@/components/LoadPage/LoadPage";

function Index() {
  return (
    <LoadPage>
      <Suspense fallback={<div><CircularProgress style={{margin: 'auto', backgroundColor: '#aa00ff'}}/></div>}>
        <Failure />
      </Suspense>
    </LoadPage>
  );
};

export default Index;
