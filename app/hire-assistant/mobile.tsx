'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BiCheckCircle, BiXCircle, BiBriefcase, BiCrown, BiChevronRight, BiUser, BiPhone } from 'react-icons/bi';
import { RootState } from '@/lib/store';
import Header from '@/app/components/mobile/header';
import { Button, SlideUpModal, TextArea } from '@/app/components/mobile/ui';
import Ratingstars from '@/app/components/mobile/ui/rating-stars';
import Loader from '@/app/components/common/loader';
import Login from '@/app/components/mobile/login';
import SwiperBanner from '@/app/components/mobile/ui/swiper-banner';
import useMembershipUpgrade from '@/lib/hooks/useMembershipUpgrade';
import { fetchPatientEnquiries, closePatientEnquiry, cancelPatientEnquiry, submitPatientEnquiry, TPatientEnquiry } from '@/lib/hooks/useClientSideApiCall';

const jobStatusLabel: Record<TPatientEnquiry['status'], string> = {
    open: 'Awaiting Response',
    resolved: 'Resolved',
    cancelled: 'Cancelled'
};

const jobTypes = ['Book Appointment', 'Need Information', 'Order Medicine', 'Other'];

const jobTypeSuggestions: Record<string, string[]> = {
    'Book Appointment': [
        'I want to book an appointment with Dr. XYZ for Today',
        'I want to book an appointment with Dr. XYZ for tomorrow',
        'I want to book an appointment with Dr. XYZ for next week',],
    'Need Information': [
        'Is Dr. XYZ available today?',
        'Is Dr. XYZ available tomorrow?',
        'I forget how to use medicine ABC, i want to know the dosage and timing',
    ],
    'Order Medicine': [
        'I need to order medicines based on my prescription',
        'Please help me order medicines for home delivery',
        'I need a specific medicine urgently'
    ],
    'Other': [
        'I need help with something else related to my healthcare'
    ]
};

const durationLabel = (duration: number) => {
    if (duration >= 360) return '/year';
    if (duration >= 28) return '/month';
    if (duration === 7) return '/week';
    return `/${duration} day${duration > 1 ? 's' : ''}`;
}

const HeroSlide = ({ bannerImage, heading, subtext, onCtaClick }: {bannerImage: string, heading: string, subtext: string, onCtaClick: () => void }) => (
    <div className='relative'>
        <img src={bannerImage} alt="Personal Assistant" className="w-full h-auto" />
        <div className='absolute inset-0' style={{ background: 'linear-gradient(90deg, rgb(181 194 193 / 72%) 0%, rgba(0, 0, 0, 0.35) 55%, rgba(0, 0, 0, 0) 85%)' }} />
        <div className='absolute top-0 left-0 h-full flex flex-col gap-1 px-5' style={{ maxWidth: '72%' }}>
            <h1 className='font-bold fs-20 mt-4' style={{ lineHeight: 1.25,color:"rgb(18 56 52)" }}>{heading}</h1>
            <p className='fs-13 color-white mt-2' style={{ lineHeight: 1.4, opacity: 0.9 }}>{subtext}</p>
            <button
                type='button'
                onClick={onCtaClick}
                className='flex items-center gap-1 bg-white color-primary font-semibold fs-14 px-4 py-2 rounded-full w-fit shadow-md mt-10'
            >
                Get It Done Now <BiChevronRight />
            </button>
        </div>
    </div>
);

const HirePersonalAssistantPageMobile = ({ city, state }: { city: string, state: string }) => {
    const { plans, selectedPlanId, setSelectedPlanId, selectedPlan, paying, upgradeNow, membershipStatus, showLoginModal, setShowLoginModal } = useMembershipUpgrade({ city, plan_for: 'user_pa' });
    const isLoggedIn = useSelector((state: RootState) => state.authSlice.is_loggedin);

    const [activeTab, setActiveTab] = useState<'assign' | 'history'>('assign');
    const [jobs, setJobs] = useState<TPatientEnquiry[]>([]);
    const [jobsLoaded, setJobsLoaded] = useState(false);
    const [resolvingJob, setResolvingJob] = useState<TPatientEnquiry | null>(null);
    const [resolveRating, setResolveRating] = useState(0);
    const [resolving, setResolving] = useState(false);
    const [cancellingJob, setCancellingJob] = useState<TPatientEnquiry | null>(null);
    const [cancelling, setCancelling] = useState(false);
    const [jobQuery, setJobQuery] = useState('');
    const [submittingJob, setSubmittingJob] = useState(false);
    const [selectedJobType, setSelectedJobType] = useState(jobTypes[0]);

    const scrollToJobForm = () => {
        setActiveTab('assign');
        document.getElementById('assign-job-form')?.scrollIntoView({ behavior: 'smooth' });
    };
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    useEffect(() => {
        if (activeTab === 'history' && !jobsLoaded && isLoggedIn) {
            fetchPatientEnquiries().then(({ data }) => {
                setJobs(data.filter((job) => !job.doctor_id));
                setJobsLoaded(true);
            });
        }
    }, [activeTab, jobsLoaded, isLoggedIn]);

    const onConfirmResolveJob = () => {
        if (!resolvingJob) { return; }
        setResolving(true);
        closePatientEnquiry({ id: resolvingJob.id, rating: resolveRating, rating_feedback: '' })
            .then(() => {
                setJobs((prev) => prev.map((job) => job.id === resolvingJob.id ? { ...job, status: 'resolved', rating: resolveRating } : job));
                toast.success('Job marked as resolved');
                setResolvingJob(null);
            })
            .catch((err: any) => {
                toast.error(err.message || 'Could not mark this job as resolved');
            })
            .finally(() => {
                setResolving(false);
            });
    };

    const onConfirmCancelJob = () => {
        if (!cancellingJob) { return; }
        setCancelling(true);
        cancelPatientEnquiry({ id: cancellingJob.id })
            .then(() => {
                setJobs((prev) => prev.map((job) => job.id === cancellingJob.id ? { ...job, status: 'cancelled' } : job));
                toast.success('Job cancelled');
                setCancellingJob(null);
            })
            .catch((err: any) => {
                toast.error(err.message || 'Could not cancel this job');
            })
            .finally(() => {
                setCancelling(false);
            });
    };

    const onSubmitJob = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }
        if (!membershipStatus?.is_prime_member) {
            setShowUpgradeModal(true);
            return;
        }
        if (!jobQuery.trim()) {
            toast.error('Please write your job details');
            return;
        }
        if (/dr\.?\s*xyz/i.test(jobQuery)) {
            toast.error('Please replace "Dr. XYZ" with the actual doctor\'s name');
            return;
        }
        setSubmittingJob(true);
        submitPatientEnquiry({ doctor_id: 0, clinic_id: 0, servicelocation_id: 0, doctor_name: 'Personal Assistant', clinic_name: '', city, query: jobQuery.trim() })
            .then(() => {
                toast.success('Job submitted successfully');
                setJobQuery('');
                setJobsLoaded(false);
            })
            .catch((err: any) => {
                toast.error(err.message || 'Could not submit your job');
            })
            .finally(() => {
                setSubmittingJob(false);
            });
    };

    return (
        <>
            <Header heading="Hire Personal Assistant" template="SUBPAGE" state={state} city={city} showSearch={true} showProfile={true} />
            <div>
               
            </div>
            {/* Hero section */}
            <SwiperBanner banners={[
                <HeroSlide
                key="hero-slide-1"
                    bannerImage="/careipro-personal-assistant-banner.png"
                    heading={`Looking for a Personal Assistant?`}
                    subtext="Book appointments, get information & order medicine — without stepping out."
                    onCtaClick={scrollToJobForm}
                />,
                <HeroSlide
                key={"hero-slide-2"}
                    bannerImage="/careipro-personal-assitant-banner2.png"
                    heading={`Don't Want to Travel for small work?`}
                    subtext={`Get any type of work done by our personal assistant in ${city}`}
                    onCtaClick={scrollToJobForm}
                />,
            ]} />
            <div className='flex border-b mx-2 mt-2 shadow-md'>
                <button
                    type='button'
                    onClick={() => { setActiveTab('history') }}
                    className={`flex-1 py-2 text-center font-semibold fs-15 border-b-2 transition-colors ${activeTab === 'history' ? 'color-primary' : 'color-text-light border-transparent'}`}
                    style={activeTab === 'history' ? { borderColor: 'var(--primary-color)' } : {}}
                >
                    Job History
                </button>
                <button
                    type='button'
                    onClick={() => { setActiveTab('assign') }}
                    className={`flex-1 py-2 text-center font-semibold fs-15 border-b-2 transition-colors ${activeTab === 'assign' ? 'color-primary' : 'color-text-light border-transparent'}`}
                    style={activeTab === 'assign' ? { borderColor: 'var(--primary-color)' } : {}}
                >
                     New Job
                </button>
                
            </div>
            {activeTab === 'assign' ? (
                <div className="" id='assign-job-form'>
                    <div className="px-2 mt-3 pb-24">
                        {!isLoggedIn ? (
                            <div
                                onClick={() => { setShowLoginModal(true) }}
                                className="rounded-xl p-3 mb-3 flex items-center gap-3 shadow-sm"
                                style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0891b2 100%)' }}
                            >
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                    <BiUser className="text-white text-xl" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-white font-bold fs-14">Login to Assign a Job</div>
                                    <div className="text-white/85 fs-12 leading-tight mt-0.5">Please login first to hire our personal assistant</div>
                                </div>
                                <BiChevronRight className="text-white text-xl shrink-0" />
                            </div>
                        ) : !membershipStatus?.is_prime_member &&
                            <div
                                onClick={() => { setShowUpgradeModal(true) }}
                                className="rounded-xl p-3 mb-3 flex items-center gap-3 shadow-sm bg-orange-100 border border-orange-400"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                    <BiCrown className="bg-orange-600 text-white rounded-full p-1.5 text-3xl" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold fs-14">Upgrade to Prime Membership</div>
                                    <div className="fs-12 leading-tight mt-0.5">We will assign a dedicated personal assistant to you</div>
                                </div>
                                <BiChevronRight className="text-xl shrink-0" />
                            </div>
                        }
                        <TextArea
                            lable="Write your requirements"
                            value={jobQuery}
                            onChange={(e) => { setJobQuery(e.target.value) }}
                            placeholder="E.g., Book an appointment with a cardiologist tomorrow evening"
                            className='h-24'
                        />
                        <div className='flex gap-2 overflow-x-auto hide-scroll-bar mb-2'>
                            {jobTypes.map((t) => (
                                <span
                                    key={t}
                                    onClick={() => { setSelectedJobType(t) }}
                                    className={`text-nowrap border rounded-full px-3 py-1 fs-13 font-semibold shrink-0 ${selectedJobType === t ? 'bg-primary color-white' : 'color-text-light'}`}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <span>Examples :</span>
                        <div className='flex flex-col gap-2 mt-2'>
                            {(jobTypeSuggestions[selectedJobType] || []).map((suggestion, i) => (
                                <button
                                    key={i}
                                    type='button'
                                    onClick={() => { setJobQuery(suggestion) }}
                                    className='text-left fs-13 color-text-light border rounded-md px-2 py-2'
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gradient-to-t from-white via-white to-transparent fixed bottom-0 left-0 right-0 w-full px-3 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-200">
                        <div className="flex gap-2">
                            <Button className="flex-1" onClick={onSubmitJob} disabled={submittingJob}>{submittingJob ? 'Submitting...' : 'Submit Job'}</Button>
                            <Link href="/contact-us" className="button flex items-center justify-center gap-1 shrink-0" data-variant="outlined">
                                <BiPhone />Need Help?
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="px-2 mt-3 max-h-[400px] overflow-y-auto">
                    {!isLoggedIn ? (
                        <div className='flex flex-col items-center text-center py-8 gap-2'>
                            <BiUser className='text-4xl color-text-light' />
                            <div className='fs-14 color-text-light'>Please login to view your job history.</div>
                            <Button className="px-6" onClick={() => { setShowLoginModal(true) }}>Login / Signup</Button>
                        </div>
                    ) : <>
                        {jobs.length === 0 &&
                            <div className='flex flex-col items-center text-center py-8 gap-1'>
                                <BiBriefcase className='text-4xl color-text-light' />
                                <div className='fs-14 color-text-light'>You haven&apos;t assigned any job yet.</div>
                            </div>
                        }
                        {jobs.map((job) =>
                        <div key={job.id} className='border rounded-xl mb-3 bg-white p-3'>
                            <div className='flex items-start justify-between gap-2'>
                                <p className='fs-14 color-text-deep grow'>{job.query}</p>
                                <span className={`text-nowrap fs-12 font-semibold px-2 py-1 rounded-md ${job.status === 'open' ? 'bg-orange-50 text-orange-600' : job.status === 'resolved' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                    {jobStatusLabel[job.status]}
                                </span>
                            </div>
                            {job.resolution_note ? <p className='fs-13 color-text-light mt-1'>{job.resolution_note}</p> : <></>}
                            {job.status === 'resolved' && job.rating > 0 &&
                                <div className='flex items-center gap-1 mt-1'>
                                    <span className='fs-12 color-text-light'>Your rating:</span>
                                    <Ratingstars given_rating={job.rating} disable={true} className='text-base color-primary' />
                                </div>
                            }
                            <div className='flex items-center justify-between mt-1'>
                                <p className='fs-12 color-text-light'>{new Date(job.create_time).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                <div className='flex items-center gap-2'>
                                    {job.status === 'open' &&
                                        <button
                                            type='button'
                                            className='fs-12 font-semibold color-text-light border rounded-md px-2 py-1 inline-flex items-center gap-1'
                                            onClick={() => { setCancellingJob(job) }}
                                        >
                                            <BiXCircle className='text-sm' />
                                            Cancel
                                        </button>
                                    }
                                    {job.status === 'open' &&
                                        <button
                                            type='button'
                                            className='fs-12 font-semibold color-primary border border-color-primary rounded-md px-2 py-1 inline-flex items-center gap-1'
                                            onClick={() => { setResolvingJob(job); setResolveRating(0) }}
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
            )}
            <SlideUpModal heading="Upgrade to Prime Membership" open={showUpgradeModal} onClose={() => { setShowUpgradeModal(false) }}>
                <div>
                    {plans.length > 0 && selectedPlan ? (
                        <>
                            <div className="border rounded-xl p-3 bg-white">
                                {plans.length > 1 &&
                                    <div className="flex gap-2 mb-3 overflow-x-auto hide-scroll-bar">
                                        {plans.map((p) => {
                                            const isSelected = p.id === selectedPlanId;
                                            return (
                                                <div
                                                    key={p.id}
                                                    onClick={() => { setSelectedPlanId(p.id) }}
                                                    className={`shrink-0 border-2 rounded-lg px-3 py-2 text-center ${isSelected ? 'border-color-primary bg-primary-20' : 'border-gray-200'}`}
                                                    style={{ minWidth: '7rem' }}
                                                >
                                                    <div className={`fs-16 font-bold ${isSelected ? 'color-primary' : ''}`}>&#8377;{p.amount}</div>
                                                    <div className="fs-11 color-text-light">{p.plan_name}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                }
                                <div className="mb-3">
                                    {selectedPlan.service_includs.split(',').map((line) => line.trim()).filter(Boolean).map((benefit, i) => (
                                        <div key={i} className="flex items-start gap-2 mb-2">
                                            <BiCheckCircle className="text-lg color-primary shrink-0 mt-0.5" />
                                            <span className="fs-13 font-semibold">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border rounded-lg p-3 flex items-center justify-between mb-3 bg-gray-50">
                                    <span className="fs-14 font-semibold color-text-light">{selectedPlan.plan_name}</span>
                                    <span className="fs-18 font-bold color-primary">
                                        &#8377;{selectedPlan.amount}<span className="fs-12 font-semibold color-text-light">{durationLabel(selectedPlan.duration)}</span>
                                    </span>
                                </div>
                                <Button className="w-full" onClick={upgradeNow} disabled={paying}>{paying ? 'Please wait...' : 'Upgrade Now'}</Button>
                            </div>
                        </>
                    ) : <></>}
                </div>
            </SlideUpModal>
            <SlideUpModal heading="Login / Signup" open={showLoginModal} zIndex={1} onClose={() => { setShowLoginModal(false) }}>
                <Login allowLoggedInUser={true} onLoginSuccess={() => { setShowLoginModal(false); }} />
            </SlideUpModal>
            <SlideUpModal heading="Mark as Resolved" open={!!resolvingJob} zIndex={1} onClose={() => { setResolvingJob(null) }}>
                <div>
                    <p className='fs-14 color-text-light mb-3'>How was your experience with this job? Rate our assistant to mark it as resolved.</p>
                    <div className='flex justify-center'>
                        <Ratingstars given_rating={resolveRating} onChange={(r) => { setResolveRating(r) }} className='color-primary text-3xl' />
                    </div>
                    <button className='button w-full mt-3 mb-3' onClick={onConfirmResolveJob} disabled={resolving}>{resolving ? 'Saving...' : 'Mark as Resolved'}</button>
                </div>
            </SlideUpModal>
            <SlideUpModal heading="Cancel Job" open={!!cancellingJob} zIndex={1} onClose={() => { setCancellingJob(null) }}>
                <div>
                    <p className='fs-14 color-text-light mb-3'>Are you sure you want to cancel this job? This cannot be undone.</p>
                    <div className='flex gap-2 mt-3 mb-3'>
                        <button className='button w-full' style={{ background: 'transparent', color: 'var(--primary-color)' }} onClick={() => { setCancellingJob(null) }}>Keep Job</button>
                        <button className='button w-full' onClick={onConfirmCancelJob} disabled={cancelling}>{cancelling ? 'Cancelling...' : 'Yes, Cancel'}</button>
                    </div>
                </div>
            </SlideUpModal>

            {paying && <Loader fullScreen={true} />}
        </>
    )
}
export default HirePersonalAssistantPageMobile;
