import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import PageVisitLogger from "../components/client-components/page-visit-logger";
//import { userSecreateKey } from '@/constants/storage_keys';
//import NeedHelpBtn from '@/app/components/mobile/need-help-btn';
import FooterMenu from '@/app/components/mobile/bottom-menu';
const CityHomeMobile = dynamic(() => import('@/app/components/pages/home/city-home.mobile'));
const LoginToast = dynamic(() => import("@/app/components/mobile/login-toast"));
const CityHomeDesktop = dynamic(() => import('@/app/components/pages/home/city-home.desktop'));
type TProps = {
  params: { [key: string]: string },
  searchParams: { [key: string]: string }
}
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string,town?: string } }): Promise<Metadata> {
  return {
    title: `Doctors, Clinics, Medicine,Caretakers & Home Care Services in ${searchParams.town ? searchParams.town + ", " : ""}${searchParams.city} | Careipro`,
    description: `Find doctors, book appointments, hire caretakers, body massage, pet care & medicine stores in ${searchParams.town ? searchParams.town + ", " : ""}${searchParams.city}. Trusted local healthcare services on Careipro`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      }
    },
     alternates: {
          //canonical: `/${searchParams.city}-In-${searchParams.state}`, // Relative path will be combined with metadataBase
          canonical: `${searchParams.state.toLowerCase()}/${searchParams.city.toLowerCase().replace(" ", "-")}` // Relative path will be combined with metadataBase
    },
  }
}
const CityHomePage = ({ searchParams }: TProps) => {
  const { device, cookies } = useDeviceInfo();
  if (device.type === "mobile" || 1==1) {
    return (
      <>
        <CityHomeMobile state={searchParams.state} city={searchParams.city} town={searchParams.town} cookies={cookies} />
        {/* {!cookies[userSecreateKey] && <LoginToast style={{bottom:"4rem"}}/>} */}
        <PageVisitLogger data={{
          page_name: "city_home",
          state: searchParams.state,
          city: searchParams.city,
        }} />
        <FooterMenu cookies={cookies} searchParams={searchParams} />
        {/* <NeedHelpBtn style={{ bottom: '25vh' }} /> */}
      </>
    )
  } else {
    return (
      <CityHomeDesktop state={searchParams.state} city={searchParams.city} />
    );
  }
}
export default CityHomePage