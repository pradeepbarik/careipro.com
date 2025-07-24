import { headers, cookies } from 'next/headers'
import { UAParser } from 'ua-parser-js';
import { arrayToObj } from '../helper';
const useDeviceInfo = () => {
    const { get } = headers()
    const ua = get('user-agent')
    const device = new UAParser(ua || '').getDevice();
    const allCookies = cookies().getAll();
    const deleteCookie = async (name: string) => {
        (await cookies()).delete(name)
    }
    return { device, deleteCookie, cookies: arrayToObj<string>(allCookies, { key: "name", value: "value" }) }
}
export default useDeviceInfo;