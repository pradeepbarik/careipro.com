import { fetchJson } from '@/lib/services/http-client';

const useSiteVisiterLogger = () => {
    const logPageVisit = (data: any) => {
        const params = new URLSearchParams(data);
        fetchJson(`/log-page-visit?${params.toString()}`, false, {}, { passGuserSecreateKey: true, passSecreateKey: true });
    }
    return {
        logPageVisit
    }
}
export default useSiteVisiterLogger;