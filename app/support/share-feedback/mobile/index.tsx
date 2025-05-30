'use client'
import { useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Header from "@/app/components/mobile/header";
import { Button, Input, TextArea } from "@/app/components/mobile/ui";
import Ratingstars from "@/app/components/mobile/ui/rating-stars";
import { selectAuthSlice } from '@/lib/slices/authSlice';
import { RootState } from "@/lib/store";
import { shareFeedbackPostCurl } from "@/lib/services/apicalls";
const selectUserInfo = createSelector([selectAuthSlice], (state) => {
    return {
        is_loggedin: state.is_loggedin,
        user_mobile: state.user_info?.mobile || ""
    }
})
const ShareFeedbackMobile = () => {
    const { user_mobile } = useSelector((state: RootState) => selectUserInfo(state));
    const [mobile, setMobile] = useState("");
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const onSubmit = () => {
        if (!mobile) {
            toast.error("Please enter mobile number")
            return
        }
        if (mobile.length != 10) {
            toast.error("Please enter 10 digit mobile number")
            return
        }
        if (!comment) {
            toast.error("Please enter your feedback")
            return
        }
        shareFeedbackPostCurl({ mobile, name: name, rating, comment,campaign:"share-feedback-page" }).then(({ code, message }) => {
            if (code === 200) {
                toast.success(message)
                setMobile("")
                setComment("")
                setRating(0)
                setName("")
            } else {
                toast.error(message)
            }
        })
    }
    useEffect(() => {
        if (!mobile) {
            setMobile(user_mobile)
        }
    }, [user_mobile])
    return (
        <>
            <Header template="SUBPAGE" heading="Share Feedback" />
            <h2 className="text-xl font-semibold text-center my-4">Your Feedback Matters</h2>
            <div className="px-2">
                <div className="flex justify-center">
                    <Ratingstars onChange={(v) => { setRating(v) }} given_rating={rating} className="color-primary text-3xl" />
                </div>
                <TextArea lable="Comments" value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="Tell us your thoughts..." className="fs-14 font-semibold" />
                <Input type="name" lable="Your Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                <div className="mt-2">
                    <Input type="mobile" lable="Mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} />
                </div>
                <div className="flex justify-center">
                    <Button className="w-48 mt-6" onClick={onSubmit}>Submit</Button>
                </div>
            </div>
        </>
    )
}
export default ShareFeedbackMobile;