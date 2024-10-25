'use client'
import { useEffect } from "react";
import moment from "moment";
import {useCookies} from '@/lib/hooks/useCookies';
const SetStateCityCookie=({state,city}:{state:string,city:string})=>{
    const {setCookie}=useCookies(state,city);
    useEffect(()=>{
        let expire=moment().add(2,'years').format('YYYY-MM-DD');
        setCookie("state",state,{expire:expire,httpOnly:true});
        setCookie("city",city,{expire:expire,httpOnly:true});
    },[state,city])
    return <></>
}
export default SetStateCityCookie