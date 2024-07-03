import { headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'
const useDeviceInfo = () => {
    const { get } = headers()
    const ua = get('user-agent')
    const device = new UAParser(ua || '').getDevice();
    return {device}
}
export default useDeviceInfo;