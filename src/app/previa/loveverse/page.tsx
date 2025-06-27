'use client';

import { LoadPage } from "@/components/LoadPage/LoadPage";
import PreviewComponent from "@/components/Pages/create-component/preview/PreviewComponent";
import SensorPermissionEx from "@/components/Examples/SensorPermissionEx/SensorPermissionEx";
import Intro from "@/components/MessageComponent/Intro/Intro";

export default function Index() {
    return (
        <LoadPage>
            <SensorPermissionEx>
                <Intro>
                    <PreviewComponent />
                </Intro>
            </SensorPermissionEx>
        </LoadPage>
    );
}