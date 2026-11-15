import type { Metadata } from 'next';
import { LAB_API_BASE_URL } from '@/constants/server-apis';
import LabReportView, { TLabPublicStatus } from './view';

/* a patient's results: never indexed, never cached by a crawler */
export const metadata: Metadata = {
    title: 'Lab report status | Careipro',
    robots: { index: false, follow: false }
};
export const dynamic = 'force-dynamic';

const fetchStatus = async (clinic_id: string, token: string): Promise<{ data: TLabPublicStatus | null, error: string }> => {
    try {
        const res = await fetch(
            `${LAB_API_BASE_URL}/lab-public/status?clinic_id=${encodeURIComponent(clinic_id)}&token=${encodeURIComponent(token)}`,
            { cache: 'no-store' }
        );
        const body = await res.json();
        if (res.status !== 200) {
            return { data: null, error: body?.message || 'This link is not valid. Please check with the lab.' };
        }
        return { data: body.data, error: '' };
    } catch {
        return { data: null, error: 'We could not reach the lab right now. Please try again in a little while.' };
    }
};

const LabReportPage = async ({ params }: { params: { clinic_id: string, token: string } }) => {
    const { data, error } = await fetchStatus(params.clinic_id, params.token);
    return <LabReportView data={data} error={error} />;
};
export default LabReportPage;
