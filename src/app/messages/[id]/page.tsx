'use client';

import Intro from "@/components/MessageComponent/Intro/Intro";
import MessagesComponent from "@/components/MessageComponent/MessageComponent";
import SensorPermissionGate from "@/components/SensorPermition/SensorPermition";

function Index() {
  return (
    <SensorPermissionGate>
        <Intro>
          <MessagesComponent />
        </Intro>
    </SensorPermissionGate>
  );

};

export default Index;
