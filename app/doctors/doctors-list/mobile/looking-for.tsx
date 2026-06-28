'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { doctorNotFoundFeedbackPostCurl } from '@/lib/services/apicalls';
import { selectAuthSlice } from '@/lib/slices/authSlice';
import { RootState } from '@/lib/store';

const selectUserInfo = createSelector([selectAuthSlice], (authSlice) => ({
    isloggedin: authSlice.is_loggedin,
    mobile: authSlice.user_info?.mobile,
    user_name: authSlice.user_info?.firstname + ' ' + authSlice.user_info?.lastname,
}));

const LookingFor = ({ specialist_id, campaign }: { specialist_id: number, campaign: string }) => {
    const { isloggedin, mobile, user_name } = useSelector((state: RootState) => selectUserInfo(state));

    const [thanked, setThanked] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [sheetVisible, setSheetVisible] = useState(false);

    // Form state
    const [doctorInfo, setDoctorInfo] = useState('');
    const [contactNo, setContactNo] = useState(mobile || '');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (mobile) setContactNo(mobile);
    }, [mobile]);

    function openSheet() {
        setShowModal(true);
        requestAnimationFrame(() => setSheetVisible(true));
    }

    function closeSheet() {
        setSheetVisible(false);
        setTimeout(() => setShowModal(false), 300);
    }

    async function handleSubmit() {
        if (!doctorInfo.trim()) {
            toast.error('Please describe the doctor you are looking for.');
            return;
        }
        if (!isloggedin && !contactNo.trim()) {
            toast.error('Please enter your callback number.');
            return;
        }
        setSubmitting(true);
        doctorNotFoundFeedbackPostCurl({
            rating: 0,
            mobile: isloggedin ? (mobile || '') : contactNo,
            comment: doctorInfo,
            name: user_name || '',
            campaign,
        }).then(() => {
            setSubmitted(true);
            closeSheet();
        }).catch(() => {
            toast.error('Failed to submit. Please try again later.');
        }).finally(() => setSubmitting(false));
    }

    if (thanked) {
        return (
            <div className="mx-3 mb-4 rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-800">Great to hear! Wishing you good health 🌿</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Still need help?{' '}
                        <Link href="/contact-us" className="text-cyan-600 font-semibold underline underline-offset-2">
                            Contact us
                        </Link>{' '}
                        anytime.
                    </p>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="mx-3 mb-4 rounded-2xl border border-cyan-100 bg-cyan-50 px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-800">Request received!</p>
                    <p className="text-xs text-gray-400 mt-0.5">We&apos;ll get back to you shortly.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Simple card */}
            <div className="mx-3 mb-4 rounded-2xl border border-gray-100 bg-white shadow-sm px-5 py-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-gray-700">Did you find the right doctor for you?</p>
                <div className="flex gap-2 flex-shrink-0">
                    <button
                        onClick={() => setThanked(true)}
                        className="px-4 py-1.5 rounded-xl bg-cyan-500 text-white text-sm font-semibold active:scale-95 transition-all"
                    >
                        Yes
                    </button>
                    <button
                        onClick={openSheet}
                        className="px-4 py-1.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold active:scale-95 transition-all"
                    >
                        No
                    </button>
                </div>
            </div>

            {/* Slide-up bottom sheet */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end">
                    {/* Backdrop */}
                    <div
                        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${sheetVisible ? 'opacity-100' : 'opacity-0'}`}
                        onClick={closeSheet}
                    />

                    {/* Sheet */}
                    <div
                        className={`relative bg-white rounded-t-3xl px-5 pt-4 pb-10 flex flex-col gap-4 transition-transform duration-300 ease-out ${sheetVisible ? 'translate-y-0' : 'translate-y-full'}`}
                    >
                        {/* Drag handle */}
                        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-1" />

                        <div>
                            <h3 className="text-base font-bold text-gray-800">Who are you looking for?</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Tell us and we&apos;ll help you find the right doctor</p>
                        </div>

                        {/* Doctor description */}
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Doctor / Specialist you need</label>
                            <textarea
                                rows={3}
                                value={doctorInfo}
                                onChange={e => setDoctorInfo(e.target.value)}
                                placeholder="e.g. Cardiologist near city center, Dr. Sharma..."
                                className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition placeholder:text-gray-400"
                            />
                        </div>

                        {/* Callback number — guests only */}
                        {!isloggedin && (
                            <div>
                                <label className="text-xs font-semibold text-gray-500 mb-1 block">Callback mobile number</label>
                                <input
                                    type="tel"
                                    value={contactNo}
                                    onChange={e => setContactNo(e.target.value)}
                                    placeholder="10-digit mobile number"
                                    className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 transition placeholder:text-gray-400"
                                />
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl active:scale-95 transition-all"
                        >
                            {submitting ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Sending...
                                </>
                            ) : 'Help Me Find Doctor'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default LookingFor;
