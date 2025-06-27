'use client';

import Create from "@/components/Pages/create-component/Create";
import { LoadPage } from "@/components/LoadPage/LoadPage";

function Index() {
  return (
    <LoadPage>
      <Create />
    </LoadPage>
  )
};

export default Index;