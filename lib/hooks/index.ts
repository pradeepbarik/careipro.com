import { fetchJson } from '@/lib/services/http-server';
import { Tcity, Tstate } from '../../lib/types';
import { IResponse } from '../services/http-client';
export const getServiceAvailableCities = async () => {
    let result={ states: [] as Tstate[], data: {} as Record<string, Tcity[]> };
    try{
       result = await fetchJson<{ states: Tstate[], data: Record<string, Tcity[]> }>("/cache/india/service-available-cities.json");
    }catch(err:any){
         const response = await fetchJson<IResponse<{ states: Tstate[], data: Record<string, Tcity[]> }>>("/init-cache/service-available-cities");
         result=response.data;
    }
    return result;
}
export interface TkeyInfo {
    clinic_id: number;
    city: string;
    state: string;
    business_id: string;
}
export const getKeyInfo = async (public_key: string) => {
    try{
       const res = await fetchJson<IResponse<TkeyInfo>>("/decode-business-public-key?business_public_key="+public_key);
       if(!res){
        throw new Error("Invalid business public key");
       }
       return res.data;
    }catch(err){
        throw new Error("Invalid business public key");
    }
}