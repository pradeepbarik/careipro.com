'use client';
import { useEffect, useState } from "react";
import { fetchJson } from "../services/http-client";
import { TPopularDoctor } from "../types/home-page";
import { IResponse } from "../services/http-server";
const useMyFavourite = () => {
    const [loading, setLoading] = useState(true);
    const [doctors,setDoctors] = useState<Array<TPopularDoctor>>([]);
    useEffect(() => {
        const getMyFavourites = async () => {
            try {
                const response = await fetchJson<IResponse<{doctors: TPopularDoctor[]}>>('/user/my-favourite',false,{},{passSecreateKey:true});
                // Handle the response as needed
                setDoctors(response.data.doctors);
            } catch (error) {
                console.error("Error fetching my favourites:", error);
            } finally {
                setLoading(false);
            }
        };
        getMyFavourites();
    }, []);
    return {
        loading,doctors
    }
}
export default useMyFavourite;