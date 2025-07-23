import { createSlice,PayloadAction } from "@reduxjs/toolkit";
type TInitialState={
    showEnquiryForm: boolean,
    page: string,
    section: string,
}
const initialState: TInitialState = {
    showEnquiryForm: false,
    page:"",
    section:"",
}
const pageSlice = createSlice({
    name: "page",
    initialState: initialState,
    reducers: {
       displayEnquiryForm: (state, action: PayloadAction<{show:boolean,section:string,page:string}>) => {
           state.showEnquiryForm = action.payload.show;
           state.section = action.payload.section;
           state.page = action.payload.page;
       }
    }
});
export const { displayEnquiryForm } = pageSlice.actions;
export default pageSlice.reducer;