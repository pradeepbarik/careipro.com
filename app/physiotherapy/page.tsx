import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const PhysiotherapyMobile = dynamic(()=>import('./mobile/index'));
type TProps = {
    params: { [key: string]: string },
    searchParams: { [key: string]: string }
}
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Find Best Physiotherapists in ${searchParams.city} | Expert Physical Therapy - careipro`,
        description: `Find best physiotherapists in ${searchParams.city}.Browse our list of expert physical therapists offering personalized care for pain relief, rehabilitation, and mobility improvement.`,
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
const Physiotherapy=({ searchParams }: TProps)=>{
     const { device } = useDeviceInfo();
      if (device.type === "mobile") {
        return (
            <PhysiotherapyMobile state={searchParams.state} city={searchParams.city}/>
        )
    }
    return (
        <>
        
        </>
    )
}
export default Physiotherapy;