'use client';

import MessageExample from "@/components/Examples/MessageExample";
import SensorPermissionEx from "@/components/Examples/SensorPermissionEx/SensorPermissionEx";
function Index() {
    return (
        <SensorPermissionEx>
            <MessageExample />
        </SensorPermissionEx>
    );
};

export default Index;