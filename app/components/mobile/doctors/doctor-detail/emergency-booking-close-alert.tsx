'use client'
import { useState } from 'react';
import {BiBell,BiX} from 'react-icons/bi';
const EmergencyBookingCloseAlert = ({ message }: { message: string }) => {
    const [show,setShow]=useState(true);
    if(show===false){
        return <></>
    }
    return (
        <div className="absolute top-2 px-2 left-0 w-full slideDown z-10">
            <div className="bg-amber-300 border px-2 rounded-md w-full flex items-center gap-2 fs-15 py-2">
                <BiBell className='text-xl'/>
                {message}
                <BiX className='bg-amber-600 color-white rounded-full ml-auto' onClick={()=>{setShow(false)}} />
            </div>
            <span className='h-3 w-3 bg-amber-300 absolute rotate-45 -top-1' style={{bottom:"-4px",left:"calc(50% - 2px)"}}></span>
        </div>
    )
}
export default EmergencyBookingCloseAlert;