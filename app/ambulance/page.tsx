import type { Metadata } from "next";
import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import { fetchAmbulanceHomePageData } from "@/lib/hooks/ambulance/useAmbulance";
const AmbulanceMobile = dynamic(() => import("./mobile"));
const AmbulanceDesktop = dynamic(() => import("./desktop"));

/* /ambulance is also reachable without a city once the rewrites in next.config.mjs are bypassed,
   so the page falls back to the launch city rather than rendering a blank location */
const DEFAULT_STATE = "odisha";
const DEFAULT_CITY = "bhadrak";

type TProps = {
    searchParams: { [key: string]: string }
}

export async function generateMetadata({ searchParams }: TProps): Promise<Metadata> {
    const state = searchParams.state || DEFAULT_STATE;
    const city = searchParams.city || DEFAULT_CITY;
    const cityName = capitalizeEachWordFirstLetter(city);
    return {
        title: `Ambulance Service in ${cityName} - Book BLS, ALS, ICU & Neonatal Ambulance - careipro.com`,
        description: `Find 24x7 ambulance services in ${cityName}. Compare basic and advanced life support, ICU, neonatal, patient transport and mortuary ambulances with equipment and fare. Visit careipro.com`,
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true }
        },
        alternates: {
            canonical: `https://careipro.com/${state}/${city}/ambulance`
        }
    }
}

const AmbulancePage = async ({ searchParams }: TProps) => {
    const { device } = useDeviceInfo();
    const state = searchParams.state || DEFAULT_STATE;
    const city = searchParams.city || DEFAULT_CITY;
    const { providers } = await fetchAmbulanceHomePageData(state, city);
    if (device.type === "mobile") {
        return <AmbulanceMobile state={state} city={city} providers={providers} />;
    }
    return <AmbulanceDesktop state={state} city={city} providers={providers} />;
}
export default AmbulancePage;
