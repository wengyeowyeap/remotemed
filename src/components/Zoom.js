import React from "react";
import Iframe from "react-iframe";

const Zoom = () => (
  
  ZoomMtg.join({
    signature: response,
    apiKey: meetConfig.apiKey,
    meetingNumber: meetConfig.meetingNumber,
    userName: meetConfig.userName,
    error(res) { 
      console.log(res) 
    }
  })		
);
export default Zoom;