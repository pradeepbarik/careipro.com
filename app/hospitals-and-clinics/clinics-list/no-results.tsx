'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { BiSearchAlt, BiPlusCircle } from "react-icons/bi";
import { RootState } from "@/lib/store";
import { selectAuthSlice } from "@/lib/slices/authSlice";
import useEnquiry from "@/lib/hooks/useEnquiry";
import { SlideUpModal, Input } from "@/app/components/mobile/ui";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";

/* Shown when a category has no clinics in this city yet.

   An empty listing is a dead end, and the visitor who hit it is the best possible source
   of the missing business: they were looking for one. So the page says plainly that there
   is nothing yet, and offers to take a suggestion. The suggestion rides the same enquiry
   pipeline everything else on the site uses, tagged with this category so it can be acted on. */
const selectUserInfo = createSelector([selectAuthSlice], (state) => {
    return {
        isloggedIn: state.is_loggedin,
        name: (state.user_info?.firstname + " " + state.user_info?.lastname).trim(),
        mobile: state.user_info?.mobile
    }
})

const NoResults = ({ specialistName, state, city, catId, groupCategory }: {
    specialistName: string, state: string, city: string, catId: number, groupCategory: string
}) => {
    const { isloggedIn, name, mobile } = useSelector((rootState: RootState) => selectUserInfo(rootState));
    const { sendEnquiry } = useEnquiry({ state: state, city: city, vaertical: groupCategory || "CLINIC" });
    const [show, setShow] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: "", mobile: "" });
    const [message, setMessage] = useState("");
    const cityName = capitalizeEachWordFirstLetter(city || "");
    /* category names are data, so the article has to be chosen at render time or the copy
       reads "a Oncologist". the vowel test is wrong for a handful of words such as "hour",
       none of which appear in this list */
    const article = /^[aeiou]/i.test(specialistName.trim()) ? "an" : "a";

    useEffect(() => {
        if (isloggedIn && mobile) {
            setUserInfo({ name: name, mobile: mobile });
        }
    }, [isloggedIn, mobile, name])

    const onSendEnquiry = () => {
        sendEnquiry({
            name: userInfo.name,
            mobile: userInfo.mobile,
            message: message,
            clinic_id: 0,
            doctor_id: 0,
            specialist_id: catId || 0,
            page: "clinics_list",
            section: "no_results"
        }, () => {
            setMessage("");
            setShow(false);
        });
    }

    return (
        <div className="mx-3 mt-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-6 flex flex-col items-center text-center">
                <span className="h-14 w-14 rounded-full bg-cyan-50 flex items-center justify-center">
                    <BiSearchAlt className="text-cyan-700" style={{ fontSize: "1.75rem" }} />
                </span>
                <h2 className="fs-16 font-bold text-gray-900 mt-3">
                    No {specialistName} found in {cityName} right now
                </h2>
                <p className="fs-13 text-gray-500 leading-5 mt-2">
                    We are working hard to add every service provider in {cityName}. This list will
                    fill up as we verify and onboard them.
                </p>
                <div className="w-full border-t border-gray-100 mt-4 pt-4">
                    <p className="fs-13 font-semibold text-gray-800">
                        Know {article} {specialistName.toLowerCase()} in {cityName}?
                    </p>
                    <p className="fs-12 text-gray-500 mt-1">
                        Tell us and we will get them listed.
                    </p>
                    {/* inline background: .button in globals.scss is defined below @tailwind
                        utilities and would override a tailwind bg class here */}
                    <button onClick={() => { setShow(true) }}
                        className="flex items-center justify-center gap-1 mt-3 w-full py-2 rounded-lg fs-13 font-semibold text-white"
                        style={{ backgroundColor: "rgb(8,145,178)" }}>
                        <BiPlusCircle />Suggest a service provider
                    </button>
                </div>
            </div>

            <SlideUpModal open={show} onClose={() => { setShow(false) }} heading="Suggest a service provider">
                <>
                    <div>
                        <Input type="text" lable="Your name" className="border p-2 rounded-md"
                            value={userInfo.name}
                            onChange={(e) => { setUserInfo({ ...userInfo, name: e.target.value }) }} />
                        <Input type="mobile" lable="Contact no" className="border p-2 rounded-md"
                            value={userInfo.mobile}
                            onChange={(e) => { setUserInfo({ ...userInfo, mobile: e.target.value }) }} />
                    </div>
                    <div className="mt-3">
                        <textarea className="w-full outline-none border border-color-grey h-20 rounded-md px-2 py-2 fs-14"
                            placeholder={`Name and area of the ${specialistName.toLowerCase()} you know in ${cityName}…`}
                            value={message}
                            onChange={(e) => { setMessage(e.target.value) }}>
                        </textarea>
                    </div>
                    <div className="flex py-3">
                        <button className="button grow" onClick={onSendEnquiry}>Send</button>
                    </div>
                </>
            </SlideUpModal>
        </div>
    )
}
export default NoResults;
