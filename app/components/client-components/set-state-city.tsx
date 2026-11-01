'use client'
import { useEffect } from "react";
import moment from "moment";
import {useCookies} from '@/lib/hooks/useCookies';
import { chosen_city } from "@/constants/storage_keys";
const SetStateCityCookie=({state,city}:{state:string,city:string})=>{
    const {setCookie}=useCookies();
    useEffect(()=>{
        let expire=moment().add(2,'years').format('YYYY-MM-DD');
        setCookie("state",state,{expire:expire,httpOnly:true});
        setCookie("city",city,{expire:expire,httpOnly:true});
        /* mirrored where script can read it, as the city chooser does. the cookies are httpOnly, so
           when / is served from cache and skips the middleware, this is all the chooser has to know
           a city was already chosen. visitors who got their city here rather than through the
           chooser never had it, and were asked all over again. */
        try {
            window.localStorage.setItem(chosen_city, JSON.stringify({ state: state.toLowerCase().replace(/ /g, "-"), city: city.toLowerCase().replace(/ /g, "-") }));
        } catch {
            //private browsing can refuse this, the cookies still carry the choice
        }
    },[state,city])
    return <></>
}
export default SetStateCityCookie
