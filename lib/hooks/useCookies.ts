import axios from "axios";
export const useCookies=(state:string,city:string)=>{
    const setCookie=(name:string,value:string,extraParams?:{expire?:string,httpOnly?:boolean})=>{
        let api=`/api?action=set_cookie&name=${name}&value=${value}`;
        if(extraParams && extraParams.expire){
            api+=`&expire=${extraParams.expire}`;
        }
        if(extraParams && extraParams.httpOnly){
            api+=`&httpOnly=${extraParams.httpOnly}`;
        }
        axios.get(api);
    }
    const getCookie=(name:string)=>{
    }
    return {
        setCookie,getCookie
    }
}
export default useCookies;