'use client'
import { useState } from 'react';
import { SlideUpModal, Button } from '@/app/components/mobile/ui';
import Loader from '@/app/components/common/loader';
import Login from '@/app/components/mobile/login';
import { BiCheckCircle, BiCrown, BiChevronRight } from 'react-icons/bi';
import useMembershipUpgrade from '@/lib/hooks/useMembershipUpgrade';

const durationLabel = (duration: number) => {
    if (duration >= 360) return '/year';
    if (duration >= 28) return '/month';
    if (duration === 7) return '/week';
    return `/${duration} day${duration > 1 ? 's' : ''}`;
}

const PrimeMembershipCard = ({ city, doctor_id, clinic_id }: { city: string, doctor_id: number, clinic_id: number }) => {
    const [showModal, setShowModal] = useState(false);
    const { plans, selectedPlanId, setSelectedPlanId, selectedPlan, cheapestAmount, paying, upgradeNow, membershipStatus, showLoginModal, setShowLoginModal } = useMembershipUpgrade({ city, ref_doctor_id: doctor_id, ref_clinic_id: clinic_id });

    if (membershipStatus?.is_prime_member) {
        return (
            <div
                className="mx-2 mt-2 mb-3 rounded-xl p-4 flex items-center gap-3 shadow-sm"
                style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0891b2 100%)' }}
            >
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <BiCrown className="text-white text-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-white font-bold fs-15">You are a Prime Member of Careipro</div>
                    {membershipStatus.plan_name &&
                        <div className="text-white/85 fs-12 leading-tight mt-0.5">{membershipStatus.plan_name}</div>
                    }
                </div>
            </div>
        )
    }

    if (!plans.length || !selectedPlan) {
        return <></>;
    }

    const benefits = selectedPlan.service_includs.split(',').map((line) => line.trim()).filter(Boolean);

    return (
        <>
            <div
                onClick={() => { setShowModal(true) }}
                className="mx-2 mt-2 mb-3 rounded-xl p-4 flex items-center gap-3 shadow-sm"
                style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0891b2 100%)' }}
            >
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <BiCrown className="text-white text-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-white font-bold fs-15">Upgrade to Prime Membership</div>
                    <div className="text-white/85 fs-12 leading-tight mt-0.5">
                        {plans.length > 1 ? `Plans starting at ₹${cheapestAmount}` : (benefits[0] || "Get a dedicated assistant to book this appointment for you")}
                    </div>
                </div>
                <BiChevronRight className="text-white text-xl shrink-0" />
            </div>
            <SlideUpModal heading="Careipro Prime Membership" open={showModal} onClose={() => { setShowModal(false) }}>
                <div className="p-2">
                    <div className="flex justify-center mb-3">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0891b2 100%)' }}>
                            <BiCrown className="text-white text-3xl" />
                        </div>
                    </div>

                    {plans.length > 1 &&
                        <div className="flex gap-2 mb-4 overflow-x-auto hide-scroll-bar">
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
                                        <div className="fs-11 color-text-light">{durationLabel(p.duration)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    }

                    <div className="mb-4">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-2 mb-3">
                                <BiCheckCircle className="text-xl color-primary shrink-0 mt-0.5" />
                                <span className="fs-14 font-semibold">{benefit}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border rounded-lg p-3 flex items-center justify-between mb-4 bg-gray-50">
                        <span className="fs-14 font-semibold color-text-light">{selectedPlan.plan_name}</span>
                        <span className="fs-18 font-bold color-primary">
                            &#8377;{selectedPlan.amount}<span className="fs-12 font-semibold color-text-light">{durationLabel(selectedPlan.duration)}</span>
                        </span>
                    </div>
                    <Button className="w-full" onClick={upgradeNow} disabled={paying}>{paying ? "Please wait..." : "Upgrade Now"}</Button>
                </div>
            </SlideUpModal>
            <SlideUpModal heading="Login / Signup" open={showLoginModal} zIndex={1} onClose={() => { setShowLoginModal(false) }}>
                <Login allowLoggedInUser={true} onLoginSuccess={() => { setShowLoginModal(false); }} />
            </SlideUpModal>
            {paying && <Loader fullScreen={true} />}
        </>
    )
}
export default PrimeMembershipCard;
