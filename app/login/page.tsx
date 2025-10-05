import dynamic from 'next/dynamic'
import { Metadata } from 'next';
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const LoginMobile=dynamic(()=>import("./mobile-login"));
const LoginDesktop=dynamic(()=>import("./desktop-login"))
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Login | Careipro`,
        description: `Login/signup now and check your appointment history,offers for you`,
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
const Login=()=>{
    const { device } = useDeviceInfo();
  if (device.type === "mobile") {
    return (
      <LoginMobile />
    )
  } else {
    return (
      <LoginDesktop />
    );
  }
}
export default Login;