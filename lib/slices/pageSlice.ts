import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TInitialState = {
    showEnquiryForm: boolean,
    page: string,
    section: string,
    favourites_fetched: boolean,
    favourite_doctors: number[],
}
const initialState: TInitialState = {
    showEnquiryForm: false,
    page: "",
    section: "",
    favourites_fetched: false,
    favourite_doctors: [],
}
const pageSlice = createSlice({
    name: "page",
    initialState: initialState,
    reducers: {
        displayEnquiryForm: (state, action: PayloadAction<{ show: boolean, section: string, page: string }>) => {
            state.showEnquiryForm = action.payload.show;
            state.section = action.payload.section;
            state.page = action.payload.page;
        },
        setFavouriteDoctors: (state, action: PayloadAction<number[]>) => {
            state.favourite_doctors = action.payload;
            state.favourites_fetched = true;
        }
    }
});
export const { displayEnquiryForm, setFavouriteDoctors } = pageSlice.actions;
export default pageSlice.reducer;