import {fetchJson} from '@/lib/services/http-server';
import {Tcity,Tstate} from '../../lib/types';
export const getServiceAvailableCities=async ()=>{
    const res = await fetchJson<{states:Tstate[],data:Record<string,Tcity[]>}>("/cache/india/service-available-cities.json");
   return res;
}