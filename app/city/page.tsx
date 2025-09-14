import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import PageVisitLogger from "../components/client-components/page-visit-logger";
import { userSecreateKey } from '@/constants/storage_keys';
import NeedHelpBtn from '@/app/components/mobile/need-help-btn';
const CityHomeMobile = dynamic(() => import('@/app/components/pages/home/city-home.mobile'));
const LoginToast = dynamic(()=>import("@/app/components/mobile/login-toast"));
const CityHomeDesktop = dynamic(() => import('@/app/components/pages/home/city-home.desktop'));
type TProps = {
  params: { [key: string]: string },
  searchParams: { [key: string]: string }
}
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
  return {
    title: `Doctors,clinics,Hospitals,medicine stores,caretakers,Body massage in ${searchParams.city}`,
    description: `Book Appointment with Doctors,Order medicine from nearby medicine stores,hire caretakers,veterinary doctors for you pets and relaxation by full body massage.Visit careipro.com`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      }
    },
  }
}
const CityHomePage = ({ searchParams }: TProps) => {
  const { device,cookies } = useDeviceInfo();
  if (device.type === "mobile") {
    return (
      <>
        <CityHomeMobile state={searchParams.state} city={searchParams.city} />
        {!cookies[userSecreateKey] && <LoginToast/>}
        <PageVisitLogger data={{
          page_name: "city_home",
          state: searchParams.state,
          city: searchParams.city,
        }} />
        <NeedHelpBtn style={{bottom: '25vh'}}/>
      </>
    )
  } else {
    return (
      <CityHomeDesktop state={searchParams.state} city={searchParams.city} />
    );
  }
}
export default CityHomePage