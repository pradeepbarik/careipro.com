import React from 'react'
import dynamic from 'next/dynamic';
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import PageVisitLogger from '@/app/components/client-components/page-visit-logger';
const AboutUsMobile = dynamic(() => import('./about-us-mobile'));
const Aboutus = () => {
  const { device } = useDeviceInfo();
  if (device.type === "mobile") {
    return (
      <>
        <AboutUsMobile />
        <PageVisitLogger data={{
          page_name: "about_us",
          state: "",
          city: "",
        }} />
      </>
    )
  }
  return (
    <div>coming soon.....</div>
  )
}

export default Aboutus