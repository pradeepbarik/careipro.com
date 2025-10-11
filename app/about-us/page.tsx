import React from 'react'
import dynamic from 'next/dynamic';
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import PageVisitLogger from '@/app/components/client-components/page-visit-logger';
import { Metadata } from 'next';
const AboutUsMobile = dynamic(() => import('./about-us-mobile'));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    return {
        title: `About Us - careipro.com`,
        description: `Learn more about careipro.com and our mission to connect patients with healthcare providers.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates:{
        canonical: `/about-us` // Relative path will be combined with metadataBase
        }
    }
}
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