'use client'
import React, { useEffect, useState } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input, Button, TextArea } from '@/app/components/mobile/ui';
import { doctorNotFoundFeedbackPostCurl } from '@/lib/services/apicalls';
import { selectAuthSlice } from '@/lib/slices/authSlice';
import { RootState } from '@/lib/store';
const selectUserInfo = createSelector([selectAuthSlice], (authSlice) => {
    return { isloggedin: authSlice.is_loggedin, mobile: authSlice.user_info?.mobile, user_name: authSlice.user_info?.firstname + ' ' + authSlice.user_info?.lastname };
})
const LookingFor = ({ specialist_id }: { specialist_id: number }) => {
    const { isloggedin, mobile, user_name } = useSelector((state: RootState) => selectUserInfo(state))
    const [doctorInfo, setDoctorInfo] = useState<string>('');
    const [contactNo, setContactNo] = useState<string>(mobile || '');
    const [name, setName] = useState<string>('');
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const handleSubmit = async () => {
        if (!doctorInfo) {
            toast.error('Please provide information about the doctor you are looking for.');
            return;
        }
        if (!contactNo) {
            toast.error('Please enter your contact number.');
            return;
        }
        doctorNotFoundFeedbackPostCurl({
            rating: 0,
            mobile: contactNo,
            comment: doctorInfo,
            name: name,
            campaign: `doctor_list_page/spl-{${specialist_id}}`,
        }).then(() => {
            toast.success('Your request has been submitted successfully. We will get back to you soon.');
            setShowSuccessScreen(true);
        }).catch((err) => {
            toast.error('Failed to submit your request. Please try again later.');
        });
    }
    useEffect(() => {
        if (mobile) {
            setContactNo(mobile);
            setName(user_name || '');
        }
    }, [mobile])
    if (showSuccessScreen) {
        return (
            <div className="px-2 py-2 bg-white mb-4 shadow-md" style={{ background: "linear-gradient(180deg, #cbe0f2, transparent)" }}>
                <h3 className="text-2xl font-bold mb-1 text-center color-primary">Thank you!</h3>
                <p className="text-center mb-6">
                    Your request has been submitted successfully. We will get back to you soon.
                </p>
            </div>
        );
    }
    return (
        <div className="px-2 py-2 bg-white mb-4 shadow-md" style={{ background: "linear-gradient(180deg, #cbe0f2, transparent)" }}>
            <h3 className="text-2xl font-bold mb-1 text-center">Could not find your doctor?</h3>
            <p className="text-center mb-6">
                Let us help you find the right doctor for your needs
            </p>
            <div className='w-full'>
                <TextArea placeholder="About doctor" lable='Doctor Information' value={doctorInfo} className='font-semibold' onChange={(e) => setDoctorInfo(e.target.value)} ></TextArea>
            </div>
            {isloggedin === false &&
                <>
                    <div>
                        <Input placeholder="Your Name" lable='Your Name' className='w-full' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mt-2'>
                        <Input placeholder="Your Contact No" lable='Your Contact No' className='w-full' value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                    </div>
                </>

            }
            <Button className='w-full mt-4' onClick={handleSubmit} >
                Send
            </Button>
        </div>
    );
}
export default LookingFor;