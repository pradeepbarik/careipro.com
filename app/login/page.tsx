import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const LoginMobile=dynamic(()=>import("./mobile-login"));
const LoginDesktop=dynamic(()=>import("./desktop-login"))
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