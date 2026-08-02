'use client'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
// @ts-ignore
import { load } from '@cashfreepayments/cashfree-js';
import { httpPost } from '@/lib/services/http-client';
import { RootState } from '@/lib/store';
import { fetchMembershipPlans, fetchMembershipStatus, TMembershipPlan, TMembershipStatus } from '@/lib/hooks/useClientSideApiCall';

const useMembershipUpgrade = ({ city, plan_for = 'user', ref_clinic_id, ref_doctor_id }: { city: string, plan_for?: string, ref_doctor_id?: number, ref_clinic_id?: number }) => {
    const router = useRouter();
    const isLoggedIn = useSelector((state: RootState) => state.authSlice.is_loggedin);
    const [plans, setPlans] = useState<TMembershipPlan[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
    const [paying, setPaying] = useState(false);
    const [membershipStatus, setMembershipStatus] = useState<TMembershipStatus | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingUpgrade, setPendingUpgrade] = useState(false);

    const refreshMembershipStatus = () => {
        fetchMembershipStatus().then(({ data }) => {
            setMembershipStatus(data);
        });
    };

    useEffect(() => {
        fetchMembershipPlans(plan_for, city).then(({ data }) => {
            setPlans(data);
            if (data.length) {
                setSelectedPlanId(data[0].id);
            }
        });
        refreshMembershipStatus();
    }, [city, plan_for]);

    const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[0] || null;
    const cheapestAmount = plans.length ? plans.reduce((min, p) => Math.min(min, p.amount), plans[0].amount) : 0;

    const doUpgradeNow = async () => {
        if (!selectedPlanId || paying) return;
        setPaying(true);
        try {
            const cashfreeInstance = load({
                mode: process.env.NODE_ENV === "development" ? 'sandbox' : 'production',
            });
            const { data } = await httpPost<{ txnid: string, payment_session_id: string }>(
                "/pg/generate-prime-membership-payment-link",
                { plan_id: selectedPlanId, ref_clinic_id, ref_doctor_id },
                { passSecreateKey: true }
            );
            const cf = await cashfreeInstance;
            const returnUrl = (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://careipro.com") + window.location.pathname + "?member_ship_txnid=" + data.txnid;
            cf.checkout({
                paymentSessionId: data.payment_session_id,
                redirectTarget: "_self",
                returnUrl: returnUrl,
            });
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
            setPaying(false);
        }
    };

    const upgradeNow = () => {
        console.log("upgradeNow called, isLoggedIn:", isLoggedIn, "pendingUpgrade:", pendingUpgrade);
        if (!isLoggedIn) {
            setPendingUpgrade(true);
            setShowLoginModal(true);
            return;
        }
        doUpgradeNow();
    };

    useEffect(() => {
        if (isLoggedIn && pendingUpgrade) {
            setPendingUpgrade(false);
            doUpgradeNow();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const txnid = queryParams.get("member_ship_txnid");
        if (txnid) {
            setPaying(true);
            toast.info("Please wait while we are verifying your payment");
            httpPost<{ payment_status: string, order_amount: number }>(
                "/pg/validate-prime-membership-payment",
                { txnid },
                { passSecreateKey: true }
            ).then(({ data }) => {
                if (data.payment_status === "PAID") {
                    toast.success("You are now a Prime Member!");
                    refreshMembershipStatus();
                } else {
                    toast.error("Payment was not successful. Please try again.");
                }
            }).catch((err: any) => {
                toast.error(err.message || "Could not verify your payment");
            }).finally(() => {
                setPaying(false);
                router.replace(window.location.pathname);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        plans, selectedPlanId, setSelectedPlanId, selectedPlan, cheapestAmount, paying, upgradeNow, membershipStatus, showLoginModal, setShowLoginModal
    };
};
export default useMembershipUpgrade;
