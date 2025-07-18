import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const MedicineMobile = dynamic(() => import('./mobile'));
const Medicine=()=>{
    const {device}=useDeviceInfo();
    if(device.type==='mobile'){
        return <MedicineMobile/>
    }
    return <>Medicine desktop</>
}
export default Medicine;