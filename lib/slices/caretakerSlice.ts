import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
type TinitialState = {
    show: boolean,
    clinic_id: number,
    doctor_id: number,
    specialist_id: number,
    page:string,
    section:string,
    businessInfo?:{
        name:string,
        logo:string,
    }
}
const initialState: TinitialState = {
    show: false,
    clinic_id: 0,
    doctor_id: 0,
    specialist_id: 0,
    page:"",
    section:"",
    businessInfo:{
        name:"",
        logo:""
    }
}
const careTakerSlice = createSlice({
    name: "careTaker",
    initialState: initialState,
    reducers: {
        handelBookBtnClick: (state, action: PayloadAction<{ show: boolean,page:string,section:string, data?: { clinic_id?: number, doctor_id?: number, specialist_id?: number,businessInfo?:{name:string,logo:string} } }>) => {
            state.show = action.payload.show;
            state.page=action.payload.page;
            state.section=action.payload.section;
            if (action.payload.data) {
                state.clinic_id = action.payload.data.clinic_id || 0
                state.doctor_id = action.payload.data.doctor_id || 0
                state.specialist_id = action.payload.data.specialist_id || 0;
                if(action.payload.data.businessInfo){
                    state.businessInfo=action.payload.data.businessInfo;
                }
            }
        }
    }
})
export const selectCaretakeSlice = (state: RootState) => state.caretakeSlice;
export const { handelBookBtnClick } = careTakerSlice.actions;
export default careTakerSlice.reducer;
