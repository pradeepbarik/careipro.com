import { formatCurrency } from "@/lib/helper/format-text";
import { myFavourites, addToFavourites } from "../services/apicalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setFavouriteDoctors } from '@/lib/slices/pageSlice';
const useLikeShare = (params: { url: string, doctor_name: string, position: string, clinic_name: string, service_charge: string, doctor_id: number, clinic_id: number }) => {
    const dispatch = useDispatch();
    const { favourite_doctors, favourites_fetched } = useSelector((state: RootState) => state.pageSlice);
    const [isLiked, setIsLiked] = useState(false);
    const onLikeClick = (favourite: 1 | 0) => {
        setIsLiked(favourite === 1 ? true : false);
        addToFavourites({ doctor_id: params.doctor_id, clinic_id: params.clinic_id, favourite }).then(response => {
        });
    };

    const onShareClick = async () => {
        const shareData = {
            title: `Dr. ${params.doctor_name} - ${params.position} at ${params.clinic_name}`,
            text: `Book appointment with Dr. ${params.doctor_name} - ${params.position} at ${params.clinic_name}. Consultation Fee : ${formatCurrency(parseInt(params.service_charge))}. Find more doctors at careipro.com`,
            url: params.url,
        };
        try {
            await navigator.share(shareData);
            console.log("shared successfully");
        } catch (err) {
            console.log("shared failed", err);
        }
    };
    useEffect(() => {
        if (favourites_fetched) {
            if (favourite_doctors.indexOf(params.doctor_id) !== -1) {
                // already liked
                setIsLiked(true);
            }
        } else {
            myFavourites().then(response => {
                if (response.code == 200) {
                    dispatch(setFavouriteDoctors(response.data.doctor_ids));
                }
                if (response.data.doctor_ids.indexOf(params.doctor_id) !== -1) {
                    // already liked
                    setIsLiked(true);
                }
            });
        }

    }, [favourites_fetched, params.doctor_id]);
    return { onLikeClick, onShareClick, isLiked };
};
export default useLikeShare;