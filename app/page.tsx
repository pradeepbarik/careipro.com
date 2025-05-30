// radha ramana mere eeee banki bihari sri
// radha balhava laaaaal - 2 times
// jugalkisori ju madanmohan ju
// pyre gopinath - 2 times
//
import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const HomeDesktop = dynamic(() => import("./components/pages/home/home.desktop"));
const HomeMobile = dynamic(() => import("./components/pages/home"));
export const metadata:Metadata={
  title:"Find Best Nearby Clinics,Hospitals,Doctors,Medicine Store,Caretaker - careipro",
  description:"Careipro, a Platform where you can find best doctors,clinic,hospital,medicine store,caretakers,masage service providers for your relaxation.All Things need for human health care and pet care like hospital,doctor,medicine,health tips,diet plans,disease awarness.peoples trusted platform careipro.com",
  robots:{
    index:true,
    follow:true,
    googleBot:{
      index:true,
      follow:true
    }
  }
}
export default function Home() {
  const { device } = useDeviceInfo();
  if (device.type === "mobile") {
    return (
      <HomeMobile />
    )
  } else {
    return (
      <HomeDesktop />
    );
  }
}