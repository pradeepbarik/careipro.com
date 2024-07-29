import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const CityHomeMobile=dynamic(()=>import('@/app/components/pages/home/city-home.mobile'));
const CityHomeDesktop=dynamic(()=>import('@/app/components/pages/home/city-home.desktop'));
type TProps = {
    params: { [key: string]: string },
    searchParams: { [key: string]: string }
}
const CityHomePage = ({ params, searchParams }: TProps) => {
    console.log('params---->',searchParams)
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