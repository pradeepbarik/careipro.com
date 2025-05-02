import axios from "axios";
export const useCookies = () => {
    const setCookie = (name: string, value: string, extraParams?: { expire?: string, httpOnly?: boolean }) => {
        let api = `/api?action=set_cookie&name=${name}&value=${encodeURIComponent(value)}`;
        if (extraParams && extraParams.expire) {
            api += `&expire=${extraParams.expire}`;
        }
        if (extraParams && extraParams.httpOnly) {
            api += `&httpOnly=${extraParams.httpOnly}`;
        }
        axios.get(api);
    }
    const getCookie = (name: string) => {
        // return cookies().get(name);
    }
    const deleteCookie = async (name: string) => {
        let api = `/api?action=delete_cookie&name=${name}`;
        await axios.get(api);
    }
    return {
        setCookie, getCookie, deleteCookie
    }
}
export default useCookies;