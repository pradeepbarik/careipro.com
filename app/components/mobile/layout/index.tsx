import { ReactNode } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mobile-style.scss';

const MobileLayout = ({ children }: { children: ReactNode}) => {
    return <>
        {children}
        <ToastContainer />
    </>
}
export default MobileLayout