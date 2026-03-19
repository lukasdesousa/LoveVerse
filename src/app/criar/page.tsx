'use client';

import SelectTheme from "@/components/Pages/create-component/SelectTheme";
import { LoadPage } from "@/components/LoadPage/LoadPage";

function Index() {
  return (
    <LoadPage>
      <SelectTheme />
    </LoadPage>
  )
};

export default Index;