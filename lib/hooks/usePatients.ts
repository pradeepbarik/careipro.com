'use client'
import { useState } from 'react';
import { httpPost, authenicatedFetchJson, IResponse } from '@/lib/services/http-client';

export type TSavedPatient = {
    id: number,
    patient_code: string,
    patient_name: string,
    patient_mobile: string,
    patient_gender: string,
    patient_dob: string | null,
    patient_address: string,
    city: string | null,
    route_name: string | null,
    market: string | null
};
export type TNewPatient = {
    patient_name: string,
    patient_mobile: string,
    patient_gender: string,
    patient_dob: string,
    patient_address: string,
    city: string
};
const usePatients = () => {
    const [patients, setPatients] = useState<TSavedPatient[]>([]);
    const [loading, setLoading] = useState(false);
    const fetchPatients = async () => {
        setLoading(true);
        try {
            const { data } = await authenicatedFetchJson<IResponse<TSavedPatient[]>>('/user/patients-list');
            setPatients(data);
        } finally {
            setLoading(false);
        }
    }
    const addPatient = async (patient: TNewPatient) => {
        const response = await httpPost<{ id: number, patient_code: string }>('/user/add-patient', patient, { passSecreateKey: true });
        return response.data;
    }
    return { patients, loading, fetchPatients, addPatient };
}
export default usePatients;
