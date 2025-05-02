import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCategory } from "@/lib/hooks/massage-service/useMassageService";
type TinitialState={
    openBookingModal:boolean,
    bookCategory:TCategory|null
}
const initialState:TinitialState={
    openBookingModal:false,
    bookCategory:null,

}
const massageService=createSlice({
    name:"massageService",
    initialState:initialState,
    reducers:{
        showBookingModal:(state,action:PayloadAction<TCategory|null>)=>{
            state.openBookingModal=action.payload!==null?true:false;
            state.bookCategory=action.payload
        }
    }
})
export const {showBookingModal}=massageService.actions;
export default massageService.reducer;