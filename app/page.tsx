import dynamic from 'next/dynamic'
import useDeviceInfo from "./hooks/useDeviceInfo";
const HomeDesktop = dynamic(() => import("./components/pages/home/home.desktop"));
const HomeMobile = dynamic(() => import("./components/pages/home"));
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
