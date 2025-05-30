'use client'

import { useEffect, useState } from "react";
import {BiTimeFive} from 'react-icons/bi';
import { fetchJson, IResponse } from '@/lib/services/http-client';
const CheckAvailabilityBtn = ({ show, service_loc_id,availablePrefix="Available on :" }: { show: boolean, service_loc_id: number,availablePrefix?:string }) => {
    const [availableOn, setAvailableOn] = useState<string | null>(null);
    const getAvailableTime = (e:any) => {
        console.log('e',e)
        if(e!==null){
            e.stopPropagation();
        }
        fetchJson<IResponse<{ available_date: string, available_on: string }>>(`/get-doctor-available-time?service_loc_id=${service_loc_id}`).then(({ data }) => {
            if (data.available_on) {
                setAvailableOn(data.available_on)
            } else {
                setAvailableOn("No Information")
            }
        })
    }
    useEffect(() => {
        if (show) {
            getAvailableTime(null);
        } else {
            setAvailableOn("");
        }
    }, [])
    if (availableOn === null) {
        return <></>;
    }
    return (
        <>
            {availableOn !== "" ?
                <span className="flex items-center">
                    <BiTimeFive className="color-primary"/>
                    {availablePrefix}&nbsp;
                    <span className="font-semibold color-secondary">{availableOn}</span>
                </span>
                :
                <span>
                    <span onClick={getAvailableTime} className="button rounded-lg inline-block fs-12 py-1" data-variant="outlined">Available time</span>
                </span>
            }
        </>
    )
}
export default CheckAvailabilityBtn;