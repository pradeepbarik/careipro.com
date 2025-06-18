'use client'
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { handelBookBtnClick } from '@/lib/slices/caretakerSlice';
import { TCareTakerClinic } from '@/lib/hooks/caretaker/useCaretaker';
import { clinicProfilePic } from '@/lib/image';
export const BookCaretakerButton = () => {
    const dispatch = useDispatch();
    return (
        <button className='button py-2 one-line ripple' onClick={() => { dispatch(handelBookBtnClick({ show: true, page: "caretaker_home", section: "nedd_help" })) }}>Book Now</button>
    )
}
export const BookNowService = ({ service_id, service_name, logo }: { service_id: number, service_name: string, logo: string }) => {
    const dispatch = useDispatch();
    const handelClick = () => {
        dispatch(handelBookBtnClick({ show: true, page: "caretaker_home", section: "category", data: { specialist_id: service_id, businessInfo: { name: service_name, logo: logo } } }))
    }
    return (
        <button className='flex justify-center border border-color-primary py-1 px-2 rounded-md grow font-semibold bg-white' onClick={handelClick}>Book Now</button>
    )
}
export const SendEnquiryBtn = ({ section }: { section: string }) => {
    const dispatch = useDispatch();
    const handelClick = () => {
        dispatch(handelBookBtnClick({ show: true, page: "caretaker_home", section: section, data: {} }))
    }
    return (
        <div className='border border-color-primary py-2 rounded-md grow text-center font-semibold bg-white' onClick={handelClick}>Send Enquiry</div>
    )
}
export const CaretakerBookClinicButton = ({ data }: { data: TCareTakerClinic }) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const clickhandler = (e: any) => {
            e.stopPropagation();
            dispatch(handelBookBtnClick({ show: true, page: "caretaker_home", section: "listing", data: { clinic_id: data.id, businessInfo: { name: data.name, logo: clinicProfilePic(data.logo) } } }))
        }
        if (ref.current) {
            ref.current.addEventListener("click", clickhandler)
        }
        return () => {
            if (ref.current) {
                ref.current.removeEventListener("click", clickhandler)
            }
        }
    }, [])
    return (
        <button className='button grow ripple' ref={ref}>Book Now</button>
    )
}
// export const CaretakerBookClinicButton = ({ data }: { data: TCareTakerClinic }) => {
//     return (
//         <button className='button grow ripple' onClick={(e)=>{alert("click on button");e.stopPropagation()}}>Book Now</button>
//     )
// }