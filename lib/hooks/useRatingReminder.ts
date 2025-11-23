'use client';
import { useEffect, useState } from "react";
import { authenicatedFetchJson, IResponse } from "../services/http-client";
export type TRatingReminder = {
    id: number,
    userid: number,
    user_type: string,
    doctor_id: number,
    servicelocation_id: number,
    clinic_id: number,
    consult_date: string,
    status: string,
    doctor_name: string
}
const useRatingReminder = ({ catid, doctor_id }: { catid: number, doctor_id: number }) => {
    const [reminders, setReminders] = useState<TRatingReminder[]>([]);
    const [removeReminderId, setRemoveReminderId] = useState<number | null>(null);
    const onRatingSubmitted = (reminderId: number) => {
        setRemoveReminderId(reminderId);
        setTimeout(() => {
            setRemoveReminderId(null);
            setReminders((prevReminders) => prevReminders.filter((reminder) => reminder.id !== reminderId));
        }, 1000);
    }
    const removeRatingReminder = (reminderId: number) => {
        setRemoveReminderId(reminderId);
        authenicatedFetchJson(`/user/remove-rating-reminder?reminder_id=${reminderId}`).then(() => {
            setTimeout(() => {
                setRemoveReminderId(null);
                setReminders((prevReminders) => prevReminders.filter((reminder) => reminder.id !== reminderId));
            }, 500);
        });
    }
    useEffect(() => {
        authenicatedFetchJson<IResponse<TRatingReminder[]>>(`/user/rating-reminders?catid=${catid}&doctor_id=${doctor_id}`).then((data) => {
            // Handle the response data
            setReminders(data.data || []);
        }).catch((error) => {
            // Handle any errors
        });
    }, [catid, doctor_id])
    return {
        removeReminderId,
        reminders,
        onRatingSubmitted,
        removeRatingReminder
    }
}
export default useRatingReminder;