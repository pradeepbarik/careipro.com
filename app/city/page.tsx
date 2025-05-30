import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const CityHomeMobile = dynamic(() => import('@/app/components/pages/home/city-home.mobile'));
const CityHomeDesktop = dynamic(() => import('@/app/components/pages/home/city-home.desktop'));
type TProps = {
  params: { [key: string]: string },
  searchParams: { [key: string]: string }
}
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
  return {
    title: `Doctors,clinics,hospitals,medicine stores,caretakers,Body massage service in ${searchParams.city} - careipro.com`,
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
  const { device } = useDeviceInfo();
  if (device.type === "mobile") {
    return (
      <CityHomeMobile state={searchParams.state} city={searchParams.city} />
    )
  } else {
    return (
      <CityHomeDesktop state={searchParams.state} city={searchParams.city} />
    );
  }
}
export default CityHomePage