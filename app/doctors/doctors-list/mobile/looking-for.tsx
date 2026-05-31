'use client'
import React, { useEffect, useState } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { doctorNotFoundFeedbackPostCurl } from '@/lib/services/apicalls';
import { selectAuthSlice } from '@/lib/slices/authSlice';
import { RootState } from '@/lib/store';

const selectUserInfo = createSelector([selectAuthSlice], (authSlice) => {
    return { isloggedin: authSlice.is_loggedin, mobile: authSlice.user_info?.mobile, user_name: authSlice.user_info?.firstname + ' ' + authSlice.user_info?.lastname };
})

const LookingFor = ({ specialist_id, campaign }: { specialist_id: number, campaign: string }) => {
    const { isloggedin, mobile, user_name } = useSelector((state: RootState) => selectUserInfo(state))
    const [doctorInfo, setDoctorInfo] = useState<string>('');
    const [contactNo, setContactNo] = useState<string>(mobile || '');
    const [name, setName] = useState<string>('');
    const [submitting, setSubmitting] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);

    const handleSubmit = async () => {
        if (!doctorInfo.trim()) {
            toast.error('Please describe the doctor you are looking for.');
            return;
        }
        if (!contactNo.trim()) {
            toast.error('Please enter your contact number.');
            return;
        }
        setSubmitting(true);
        doctorNotFoundFeedbackPostCurl({
            rating: 0,
            mobile: contactNo,
            comment: doctorInfo,
            name: name,
            campaign: campaign,
        }).then(() => {
            setShowSuccessScreen(true);
        }).catch(() => {
            toast.error('Failed to submit. Please try again later.');
        }).finally(() => setSubmitting(false));
    }

    useEffect(() => {
        if (mobile) {
            setContactNo(mobile);
            setName(user_name || '');
        }
    }, [mobile])

    if (showSuccessScreen) {
        return (
            <div className="mx-3 mb-4 rounded-2xl overflow-hidden border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white shadow-sm">
                <div className="flex flex-col items-center px-5 py-8 text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center">
                        <svg className="w-7 h-7 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Request Submitted!</h3>
                    <p className="text-sm text-gray-500">We&apos;ve received your request and will get back to you shortly.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-3 mb-4 rounded-2xl overflow-hidden border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white shadow-sm">
            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-cyan-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-800">Can&apos;t find your doctor?</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Tell us who you&apos;re looking for — we&apos;ll help you out</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="px-5 py-4 flex flex-col gap-3">
                {/* Doctor info textarea */}
                <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Doctor / Specialist you need</label>
                    <textarea
                        rows={3}
                        value={doctorInfo}
                        onChange={e => setDoctorInfo(e.target.value)}
                        placeholder="e.g. Cardiologist near city center, Dr. Sharma..."
                        className="w-full text-sm text-gray-800 bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition placeholder:text-gray-400"
                    />
                </div>

                {/* Name & contact — only for guests */}
                {isloggedin === false && (
                    <>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Your Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Full name"
                                className="w-full text-sm text-gray-800 bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition placeholder:text-gray-400"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Contact Number</label>
                            <input
                                type="tel"
                                value={contactNo}
                                onChange={e => setContactNo(e.target.value)}
                                placeholder="10-digit mobile number"
                                className="w-full text-sm text-gray-800 bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition placeholder:text-gray-400"
                            />
                        </div>
                    </>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl active:scale-95 transition-all mt-1"
                >
                    {submitting ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Sending...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10m-6 6h6" />
                            </svg>
                            Submit Request
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default LookingFor;