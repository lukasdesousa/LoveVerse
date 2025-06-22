'use client';

import { LoadPage } from "@/components/LoadPage/LoadPage";
import PreviewComponent from "@/components/Pages/create-component/preview/PreviewComponent";
import SensorPermissionEx from "@/components/Examples/SensorPermissionEx/SensorPermissionEx";

export default function Index() {
    return (
        <LoadPage>
            <SensorPermissionEx>
                <PreviewComponent />
            </SensorPermissionEx>
        </LoadPage>
    );
}