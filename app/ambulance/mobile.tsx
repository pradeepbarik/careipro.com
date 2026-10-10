import Link from "next/link";
import { BiPhoneCall, BiTime } from "react-icons/bi";
import { FaAmbulance, FaHeartbeat, FaBaby, FaPlane, FaWheelchair } from "react-icons/fa";
import { MdLocalHospital, MdVerified, MdAcUnit } from "react-icons/md";
import Header from "@/app/components/mobile/header";
import { AmbulanceProviderListMobile } from "./provider-list";
import { ambulanceCategories, NATIONAL_EMERGENCY_NUMBER, TAmbulanceCategoryCode } from "./data";
import { TAmbulanceProvider } from "@/lib/hooks/ambulance/useAmbulance";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";

/* see the note in ./desktop.tsx -- the theme gradient tokens do not render, so the colours are
   written out here too */
const HERO_GRADIENT = "linear-gradient(135deg, #0e7490 0%, #0891b2 50%, #22b8cf 100%)";

const categoryIcon: Record<TAmbulanceCategoryCode, React.ReactNode> = {
    BLS: <FaAmbulance className="text-xl" />,
    ALS: <FaHeartbeat className="text-xl" />,
    ICU: <MdLocalHospital className="text-xl" />,
    PTV: <FaWheelchair className="text-xl" />,
    NEONATAL: <FaBaby className="text-xl" />,
    MORTUARY: <MdAcUnit className="text-xl" />,
    AIR: <FaPlane className="text-xl" />,
};

const MobileSectionHeading = ({ heading }: { heading: string }) => (
    <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5 bg-primary rounded-full"></div>
        <h2 className="text-lg font-bold text-deep">{heading}</h2>
    </div>
);

const MobileHeroSection = ({ city, providers }: { city: string, providers: TAmbulanceProvider[] }) => {
    const verified = providers.filter((p) => p.verified === 1).length;
    const roundTheClock = providers.filter((p) => p.available_24x7 === 1).length;
    return (
        <div className="px-4 pt-4 pb-5" style={{ background: HERO_GRADIENT }}>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-3">
                <FaAmbulance className="text-xs" /> Emergency Ambulance Network
            </span>
            <h1 className="text-2xl font-bold text-white mb-2">
                Ambulance Service in {capitalizeEachWordFirstLetter(city)}
            </h1>
            <p className="text-white/90 text-sm mb-4">
                Life support, ICU, neonatal and patient transport ambulances with equipment and fare shown upfront.
            </p>

            <a
                href={`tel:${NATIONAL_EMERGENCY_NUMBER}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-white text-primary font-bold rounded-xl mb-4"
            >
                <BiPhoneCall className="text-lg" /> Call {NATIONAL_EMERGENCY_NUMBER} — Free Govt. Ambulance
            </a>
        </div>
    );
};

const MobileCategoriesSection = () => (
    <div className="px-4 py-5 bg-white">
        <MobileSectionHeading heading="Types of Ambulance" />
        <div className="grid grid-cols-4 gap-3">
            {ambulanceCategories.map((category) => (
                <div key={category.code} className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                        {categoryIcon[category.code]}
                    </div>
                    <span className="text-xs font-medium text-deep leading-tight">{category.short}</span>
                </div>
            ))}
        </div>
    </div>
);

const MobileListYourServiceSection = () => (
    <div className="px-4 py-5 bg-white">
        <div className="rounded-xl border border-line p-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <FaAmbulance className="text-xl" />
            </div>
            <h3 className="font-bold text-deep mb-1">Run an ambulance service?</h3>
            <p className="text-xs text-muted mb-3">
                List your fleet on Careipro and reach patients in your city. Onboarding is free.
            </p>
            <Link href="/business-listing" className="button w-full" data-size="small">
                List Your Service
            </Link>
        </div>
    </div>
);

const AmbulanceMobile = ({ city, providers }: { state: string, city: string, providers: TAmbulanceProvider[] }) => (
    <div className="min-h-screen bg-gray-100">
        <Header template="SUBPAGE" heading="Ambulance Service" />
        <MobileHeroSection city={city} providers={providers} />
        {/* <MobileCategoriesSection /> */}
        <AmbulanceProviderListMobile allProviders={providers} />
        <MobileListYourServiceSection />
    </div>
);

export default AmbulanceMobile;
