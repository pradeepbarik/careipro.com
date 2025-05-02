import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type TAppointment={
    booking_time: string,
    clinic: string,
    consult_date: string,
    consulting_timing_messages: string,
    doctor_name: string,
    id: number,
    doctor_id:number,
    clinic_id:number,
    patient_name: string,
    today_booking_id: string
}
type TinitialState = {
    appointmentsFetched: boolean,
    appoinments: Array<TAppointment>
}
const initialState: TinitialState = {
    appointmentsFetched: false,
    appoinments: []
}
const reminderSlice = createSlice({
    name: "reminder",
    initialState: initialState,
    reducers: {
        setAppointmentReminders: (state, action: PayloadAction<TAppointment[]>) => {
            state.appoinments=action.payload;
            state.appointmentsFetched=true;
        }
    }
})
export const { setAppointmentReminders } = reminderSlice.actions;
export default reminderSlice.reducer;