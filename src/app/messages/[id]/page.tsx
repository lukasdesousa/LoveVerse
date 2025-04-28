"use client";

import MessagesComponent from "@/components/MessageComponent/MessageComponent";
import SensorPermissionGate from "@/components/SensorPermition/SensorPermition";

function Index() {
  return (
    <SensorPermissionGate>
      <MessagesComponent />
    </SensorPermissionGate>
  );

};

export default Index;
