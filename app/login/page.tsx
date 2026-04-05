import dynamic from 'next/dynamic'
import { Metadata } from 'next';
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const LoginMobile=dynamic(()=>import("./mobile-login"));
const LoginDesktop=dynamic(()=>import("./desktop-login"))
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Login or Sign Up | Book Doctor Appointments Online | Careipro`,
        description: `Login or create your free Careipro account to book doctor appointments instantly, view appointment history, get timely reminders, and access exclusive health offers near you.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates:{
            canonical:`/login` // Relative path will be combined with metadataBase
        }
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