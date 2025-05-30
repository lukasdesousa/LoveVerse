'use client';

import { LoadPage } from "@/components/LoadPage/LoadPage";
import PreviewComponent from "@/components/create-component/preview/PreviewComponent";

export default function Index() {
    return (
        <LoadPage>
            <PreviewComponent />
        </LoadPage>
    );
}