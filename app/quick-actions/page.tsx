import dynamic from "next/dynamic";
import type { Metadata } from "next";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const QuickActionsPageMobile = dynamic(() => import("./mobile"), { ssr: false });
export async function generateMetadata({searchParams}:{searchParams:{city: string, state: string}}): Promise<Metadata> {
    return {
        title: `Quick actions for ${searchParams.city}, ${searchParams.state} | Careipro`,
        description: `Quick action like join with careipro,open jobs,looking for franchise on careipro.com`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
    }
}
const QuickActionsPage = ({searchParams}:{searchParams:{city: string, state: string}}) => {
    const { device,cookies } = useDeviceInfo();
    if (device.type==="mobile") return (
        <>
            <QuickActionsPageMobile cookies={cookies} />
        </>
    );
  return <div>Quick Actions Page</div>;
};

export default QuickActionsPage;
