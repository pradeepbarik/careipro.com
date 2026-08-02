'use client'
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { BiChevronRight, BiUser } from 'react-icons/bi';
const MyBookingsModal = dynamic(() => import('./my-bookings-modal'));

const MyBookingsTrigger = ({ user_first_name, user_last_name, doctor_id, doctor_name, book_by }: { user_first_name: string, user_last_name: string, doctor_id: number, doctor_name: string, book_by: string }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className='mx-2 mt-2 px-3 py-3 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-cyan-200 flex items-center justify-center shrink-0'>
                    <BiUser className='text-cyan-600' style={{ fontSize: '1.2rem' }} />
                </div>
                <div className='flex flex-col grow' onClick={() => { setShowModal(true) }}>
                    <span className='font-semibold text-sm text-gray-800'>Hi, {`${user_first_name} ${user_last_name}`}</span>
                    <div>
                        <span className='text-xs text-gray-500 link inline-flex items-center'>
                            Check your Booked appointment & enquirys
                            <BiChevronRight className='text-lg color-primary nudgeRight' />
                        </span>
                    </div>

                </div>
            </div>
            {showModal &&
                <MyBookingsModal open={showModal} onClose={() => { setShowModal(false) }} doctor_id={doctor_id} doctor_name={doctor_name} book_by={book_by} />
            }
        </>
    )
}
export default MyBookingsTrigger;
