'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { BiChevronRight, BiRotateLeft, BiUser, BiCheckCircle, BiXCircle, BiCalendar, BiBuildings } from 'react-icons/bi';
import { SlideUpModal } from '@/app/components/mobile/ui';
import Ratingstars from '@/app/components/mobile/ui/rating-stars';
import ReviewTags from '@/app/components/mobile/review-tags';
import useAppointment from '@/lib/hooks/user-profile/useAppointment';
import useSubmitRatingReview from '@/lib/hooks/user-profile/useSubmitRatingReview';
import { fetchPatientEnquiries, closePatientEnquiry, cancelPatientEnquiry, TPatientEnquiry } from '@/lib/hooks/useClientSideApiCall';

const enquiryStatusLabel: Record<TPatientEnquiry['status'], string> = {
    open: 'Awaiting Response',
    resolved: 'Resolved',
    cancelled: 'Cancelled'
};

const MyBookingsModal = ({ open, onClose, doctor_id, doctor_name, book_by }: { open: boolean, onClose: () => void, doctor_id: number, doctor_name: string, book_by: string }) => {
    const [activeTab, setActiveTab] = useState<'appointments' | 'enquiries'>(book_by=='app' ? 'appointments' : 'enquiries');
    const { appointments, appointment, setAppointment } = useAppointment({ init: open, page: 'history', doctor_id });
    const { reviewTags, showReviewModal, setShowReviewModal, setSelectedRating, SelectedRating, selectedReviewTagsArr, setSelectedReviewTagsArr, setSelectedReviewTags, onSelectReviewTag, reviewText, setReviewText, submitRatingReview } = useSubmitRatingReview({});
    const [enquiries, setEnquiries] = useState<TPatientEnquiry[]>([]);
    const [enquiriesLoaded, setEnquiriesLoaded] = useState(false);
    const [resolvingEnquiry, setResolvingEnquiry] = useState<TPatientEnquiry | null>(null);
    const [resolveRating, setResolveRating] = useState(0);
    const [resolving, setResolving] = useState(false);
    const [cancellingEnquiry, setCancellingEnquiry] = useState<TPatientEnquiry | null>(null);
    const [cancelling, setCancelling] = useState(false);

    const onConfirmResolveEnquiry = () => {
        if (!resolvingEnquiry) { return; }
        setResolving(true);
        closePatientEnquiry({ id: resolvingEnquiry.id, rating: resolveRating, rating_feedback: '' })
            .then(() => {
                setEnquiries((prev) => prev.map((e) => e.id === resolvingEnquiry.id ? { ...e, status: 'resolved', rating: resolveRating } : e));
                toast.success('Enquiry marked as resolved');
                setResolvingEnquiry(null);
            })
            .catch((err: any) => {
                toast.error(err.message || 'Could not mark this enquiry as resolved');
            })
            .finally(() => {
                setResolving(false);
            });
    };

    const onConfirmCancelEnquiry = () => {
        if (!cancellingEnquiry) { return; }
        setCancelling(true);
        cancelPatientEnquiry({ id: cancellingEnquiry.id })
            .then(() => {
                setEnquiries((prev) => prev.map((e) => e.id === cancellingEnquiry.id ? { ...e, status: 'cancelled' } : e));
                toast.success('Enquiry cancelled');
                setCancellingEnquiry(null);
            })
            .catch((err: any) => {
                toast.error(err.message || 'Could not cancel this enquiry');
            })
            .finally(() => {
                setCancelling(false);
            });
    };

    useEffect(() => {
        if (open && activeTab === 'enquiries' && !enquiriesLoaded) {
            fetchPatientEnquiries(doctor_id).then(({ data }) => {
                setEnquiries(data);
                setEnquiriesLoaded(true);
            });
        }
    }, [open, activeTab, enquiriesLoaded, doctor_id]);

    return (
        <>
            <SlideUpModal heading={`${book_by === 'app' ? 'Appointments history :' : 'Appointments & Enquiries :'}`} open={open} onClose={onClose}>
                {book_by !=="app"?
                <div className='flex border-b mb-3'>
                    <button
                        type='button'
                        onClick={() => { setActiveTab('appointments') }}
                        className={`flex-1 py-2 text-center font-semibold fs-15 border-b-2 transition-colors ${activeTab === 'appointments' ? 'color-primary' : 'color-text-light border-transparent'}`}
                        style={activeTab === 'appointments' ? { borderColor: 'var(--primary-color)' } : {}}
                    >
                        Appointments
                    </button>
                    <button
                        type='button'
                        onClick={() => { setActiveTab('enquiries') }}
                        className={`flex-1 py-2 text-center font-semibold fs-15 border-b-2 transition-colors ${activeTab === 'enquiries' ? 'color-primary' : 'color-text-light border-transparent'}`}
                        style={activeTab === 'enquiries' ? { borderColor: 'var(--primary-color)' } : {}}
                    >
                        Enquiries
                    </button>
                </div>:<></>}
                <div className='h-[50vh] overflow-y-auto'>
                    {activeTab === 'appointments' ? <>
                        {appointments.length === 0 &&
                            <div className='flex flex-col items-center text-center py-8 gap-1'>
                                <BiUser className='text-4xl color-text-light' />
                                <div className='fs-14 color-text-light'>No appointments with this doctor yet.</div>
                            </div>
                        }
                        {appointments.map((appointment) =>
                            <div key={appointment.booking_id} className='border rounded-xl mb-3 bg-white overflow-hidden'>
                                <div className='flex items-center justify-between px-3 py-2 bg-gray-50 border-b'>
                                    <span className='flex items-center gap-1 fs-13 font-semibold color-text-deep'>
                                        <BiCalendar className='color-primary' style={{ fontSize: '1rem' }} />
                                        {appointment.consult_date}
                                    </span>
                                    <span className='fs-12 font-semibold bg-cyan-50 text-cyan-700 rounded-full px-2 py-0.5'>
                                        Sl No {appointment.today_booking_id}
                                    </span>
                                </div>
                                <div className='px-3 py-2'>
                                    <p className='fs-14 font-semibold color-text-deep'>{appointment.patient_name}</p>
                                    <p className='flex items-center gap-1 fs-13 color-text-light mt-1'>
                                        <BiBuildings style={{ fontSize: '0.9rem' }} />
                                        {appointment.clinic_name}
                                    </p>
                                </div>
                                <div className='flex items-center justify-between px-3 py-2 border-t'>
                                    <Ratingstars given_rating={appointment.rating || 0} className='text-xl color-primary' onChange={(r) => {
                                        setSelectedRating(r)
                                        setSelectedReviewTagsArr(appointment.review_tags_arr || [])
                                        setSelectedReviewTags(appointment.review_tags || [])
                                        setReviewText(appointment.experience || '')
                                        setAppointment(appointment);
                                        setShowReviewModal(true);
                                    }} />
                                    <div className='flex items-center gap-2'>
                                        {appointment.active === 1 &&
                                            <Link href={appointment.seo_url} className='flex items-center gap-1 fs-12 font-semibold color-secondary border rounded-full px-2 py-1'>
                                                <BiRotateLeft />
                                                Re-Book
                                            </Link>
                                        }
                                        <Link href={`/my-profile/appointment-detail?case_id=${appointment.case_id}&appointment_id=${appointment.booking_id}`} className='flex items-center fs-12 font-semibold color-primary'>
                                            Details
                                            <BiChevronRight className='text-lg' />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </> : <>
                        {enquiries.length === 0 &&
                            <div className='flex flex-col items-center text-center py-8 gap-1'>
                                <BiUser className='text-4xl color-text-light' />
                                <div className='fs-14 color-text-light'>You haven&apos;t raised any enquiry for this doctor yet.</div>
                            </div>
                        }
                        {enquiries.map((enquiry) =>
                            <div key={enquiry.id} className='shadow-md mb-2 py-2 px-2 bg-white rounded-md'>
                                <div className='flex items-start justify-between gap-2'>
                                    <p className='fs-14 color-text-deep grow'>{enquiry.query}</p>
                                    <span className={`text-nowrap fs-12 font-semibold px-2 py-1 rounded-md ${enquiry.status === 'open' ? 'bg-orange-50 text-orange-600' : enquiry.status === 'resolved' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                        {enquiryStatusLabel[enquiry.status]}
                                    </span>
                                </div>
                                {enquiry.resolution_note ? <p className='fs-13 color-text-light mt-1'>{enquiry.resolution_note}</p> : <></>}
                                <div className='flex items-center justify-between mt-1'>
                                    <p className='fs-12 color-text-light'>{new Date(enquiry.create_time).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    <div className='flex items-center gap-2'>
                                        {enquiry.status === 'open' &&
                                            <button
                                                type='button'
                                                className='fs-12 font-semibold color-text-light border rounded-md px-2 py-1 inline-flex items-center gap-1'
                                                onClick={() => { setCancellingEnquiry(enquiry) }}
                                            >
                                                <BiXCircle className='text-sm' />
                                                Cancel
                                            </button>
                                        }
                                        {enquiry.status === 'open' &&
                                            <button
                                                type='button'
                                                className='fs-12 font-semibold color-primary border border-color-primary rounded-md px-2 py-1 inline-flex items-center gap-1'
                                                onClick={() => { setResolvingEnquiry(enquiry); setResolveRating(0) }}
                                            >
                                                <BiCheckCircle className='text-sm' />
                                                Mark Resolved
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </>}
                </div>
            </SlideUpModal>
            <SlideUpModal heading='Share you Review' open={showReviewModal} zIndex={1} onClose={() => { setShowReviewModal(false) }}>
                <div>
                    {reviewTags.map((topic, i) => <div key={`topic-${i}`}>
                        <div className='font-semibold my-2'>{topic.topic}</div>
                        <div className='flex flex-wrap gap-2'>
                            {topic.sub_topics.map((sub_topic) =>
                                <ReviewTags key={sub_topic.sub_topic} data={sub_topic} topic={topic.topic} selectedTags={selectedReviewTagsArr} onClick={(data) => { onSelectReviewTag(data) }} />
                            )}
                        </div>
                    </div>)}
                    <div className='font-semibold my-2'>Overall Experience</div>
                    <div className='flex justify-center'>
                        <Ratingstars given_rating={SelectedRating} onChange={(r) => { setSelectedRating(r) }} className='color-primary text-3xl' />
                    </div>
                    <div className='mt-2'>
                        <textarea className='w-full h-24 border textarea' placeholder='Write anything else (Optional)' value={reviewText} onChange={(e) => { setReviewText(e.target.value) }}></textarea>
                    </div>
                    <button className='button w-full' onClick={() => {
                        if (appointment) {
                            submitRatingReview({
                                rev_id: appointment.review_id || 0,
                                appointment_id: appointment.booking_id,
                                clinic_id: appointment.clinic_id,
                                doctor_id: appointment.doctor_id,
                                service_loc_id: appointment.servicelocation_id,
                                consultation_date: appointment.consult_date,
                                patient_name: appointment.patient_name
                            }, () => { })
                        }
                    }}>Submit Review</button>
                </div>
            </SlideUpModal>
            <SlideUpModal heading='Mark as Resolved' open={!!resolvingEnquiry} zIndex={1} onClose={() => { setResolvingEnquiry(null) }}>
                <div>
                    <p className='fs-14 color-text-light mb-3'>How was your experience with this enquiry? Rate our support to mark it as resolved.</p>
                    <div className='flex justify-center'>
                        <Ratingstars given_rating={resolveRating} onChange={(r) => { setResolveRating(r) }} className='color-primary text-3xl' />
                    </div>
                    <button className='button w-full mt-3 mb-3' onClick={onConfirmResolveEnquiry} disabled={resolving}>{resolving ? 'Saving...' : 'Mark as Resolved'}</button>
                </div>
            </SlideUpModal>
            <SlideUpModal heading='Cancel Enquiry' open={!!cancellingEnquiry} zIndex={1} onClose={() => { setCancellingEnquiry(null) }}>
                <div>
                    <p className='fs-14 color-text-light mb-3'>Are you sure you want to cancel this enquiry? This cannot be undone.</p>
                    <div className='flex gap-2 mt-3 mb-3'>
                        <button className='button w-full' style={{ background: 'transparent', color: 'var(--primary-color)' }} onClick={() => { setCancellingEnquiry(null) }}>Keep Enquiry</button>
                        <button className='button w-full' onClick={onConfirmCancelEnquiry} disabled={cancelling}>{cancelling ? 'Cancelling...' : 'Yes, Cancel'}</button>
                    </div>
                </div>
            </SlideUpModal>
        </>
    )
}
export default MyBookingsModal;
