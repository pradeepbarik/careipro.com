import React from 'react'
import dynamic from 'next/dynamic';
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const AboutUsMobile = dynamic(()=>import('./about-us-mobile'));
const page = () => {
     const { device } = useDeviceInfo();
     if(device.type==="mobile"){
        return (
            <>
            <AboutUsMobile/>
            </>
        )
     }
  return (
    <div>coming soon.....</div>
  )
}

export default page