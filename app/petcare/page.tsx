import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const PetcareMobile = dynamic(() => import('./mobile'));
const PetcareDesktop = dynamic(() => import('./desktop'));
const PetcarePage = () => {
  const { device } = useDeviceInfo();
  if (device.type === "mobile") {
    return <>
      <PetcareMobile />
    </>;
  }
  return <PetcareDesktop state="Odisha" city="Bhadrak"  />;
}
export default PetcarePage;