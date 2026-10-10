import Link from "next/link";
import { BiPhoneCall, BiChevronRight } from "react-icons/bi";
import { FaAmbulance, FaHeartbeat, FaBaby, FaPlane, FaWheelchair } from "react-icons/fa";
import { MdLocalHospital, MdAcUnit } from "react-icons/md";
import { AmbulanceProviderListDesktop } from "./provider-list";
import { ambulanceCategories, NATIONAL_EMERGENCY_NUMBER, TAmbulanceCategoryCode } from "./data";
import { TAmbulanceProvider } from "@/lib/hooks/ambulance/useAmbulance";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import { PortraitAd, WideAd, LandscapeAd } from "@/app/components/mobile/ads-container";
import { cityPageLink } from "@/lib/helper/link";

/* the theme's primary/secondary tokens are comma separated rgb, which Chrome drops inside a
   linear-gradient, so the hero carries the primary colour as a literal gradient the way
   app/care-taker/desktop.tsx already does */
const HERO_GRADIENT = "linear-gradient(135deg, #0e7490 0%, #0891b2 50%, #22b8cf 100%)";

const categoryIcon: Record<TAmbulanceCategoryCode, React.ReactNode> = {
    BLS: <FaAmbulance className="text-2xl" />,
    ALS: <FaHeartbeat className="text-2xl" />,
    ICU: <MdLocalHospital className="text-2xl" />,
    PTV: <FaWheelchair className="text-2xl" />,
    NEONATAL: <FaBaby className="text-2xl" />,
    MORTUARY: <MdAcUnit className="text-2xl" />,
    AIR: <FaPlane className="text-2xl" />,
};

const SectionHeading = ({ heading, subText }: { heading: string, subText?: string }) => (
    <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h2 className="text-xl font-bold text-deep">{heading}</h2>
            {subText && <span className="text-sm text-muted">{subText}</span>}
        </div>
    </div>
);

const HeroSection = ({ city }: { city: string }) => {
    return (
        <div className="mb-8">
            <div className="bg-white rounded-2xl border border-line overflow-hidden">
                <div className="px-8 py-8" style={{ background: HERO_GRADIENT }}>
                    <div className="flex items-center justify-between gap-6">
                        <div className="max-w-xl">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-3">
                                <FaAmbulance /> Emergency Ambulance Network
                            </span>
                            <h1 className="text-4xl font-bold text-white mb-3">
                                Ambulance Service in {capitalizeEachWordFirstLetter(city)}
                            </h1>
                            <p className="text-white/90 text-lg mb-6">
                                Basic and advanced life support, ICU, neonatal and patient transport ambulances —
                                with fleet size, equipment and starting fare shown upfront.
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href={`tel:${NATIONAL_EMERGENCY_NUMBER}`}
                                    className="px-6 py-3 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                    <BiPhoneCall className="text-xl" /> Call {NATIONAL_EMERGENCY_NUMBER} — Free
                                </a>
                                <Link
                                    href="#providers"
                                    className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-colors border border-white/30"
                                >
                                    Browse Providers
                                </Link>
                            </div>
                        </div>
                        {/* the counts that used to sit here only described the page back to the
                            reader; this space is worth more as the way an operator joins */}
                        <div className="hidden lg:block bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-xs">
                            <div className="text-white mb-3 flex"><FaAmbulance className="text-3xl" /></div>
                            <h2 className="text-xl font-bold text-white leading-snug mb-2">
                                Are you providing ambulance service?
                            </h2>
                            {/* the button carries "free", so the pitch no longer repeats it */}
                            <p className="text-white/80 text-sm mb-4">
                                List your fleet on Careipro and reach patients searching for an ambulance in
                                {" "}{capitalizeEachWordFirstLetter(city)}.
                            </p>
                            <Link href="/business-listing"
                                className="inline-block px-5 py-2.5 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-colors">
                                Get Listed — Free
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CategoriesSection = () => (
    <div className="bg-white rounded-xl border border-line p-6 mb-8">
        <SectionHeading heading="Types of Ambulance" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ambulanceCategories.map((category) => (
                <div
                    key={category.code}
                    className="flex flex-col items-center text-center p-4 rounded-xl border border-transparent hover:border-primary/40 hover:shadow-card transition-all"
                >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                        {categoryIcon[category.code]}
                    </div>
                    <span className="text-sm font-semibold text-deep leading-tight">{category.short}</span>
                    <span className="text-xs text-muted mt-1 leading-snug">{category.desc}</span>
                </div>
            ))}
        </div>
    </div>
);

const ListYourServiceSection = () => (
    <div className="bg-white rounded-xl border border-line p-6 mb-8">
        <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <FaAmbulance className="text-2xl" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-deep mb-1">Run an ambulance service?</h3>
                    <p className="text-sm text-muted max-w-xl">
                        List your fleet on Careipro and reach patients searching for an ambulance in your city.
                        Onboarding is free.
                    </p>
                </div>
            </div>
            <Link
                href="/business-listing"
                className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
                List Your Service
            </Link>
        </div>
    </div>
);

const AmbulanceDesktop = ({ state, city, providers }: { state: string, city: string, providers: TAmbulanceProvider[] }) => (
    <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 py-6">
            <HeroSection city={city} />
            {/* the listing takes the bulk of the width, the rail beside it carries the ads, the
                same split the doctor and clinic lists use */}
            <div className="grid grid-cols-[7fr_3fr] gap-5 items-start mb-4">
                <div className="min-w-0">
                    <AmbulanceProviderListDesktop allProviders={providers} />
                </div>
            </div>

            <ListYourServiceSection />

            <nav aria-label="Breadcrumb" className="flex items-center gap-1 fs-13 text-gray-500 mt-5">
                <Link href="/" className="hover:text-primary">Careipro</Link>
                <BiChevronRight className="shrink-0" />
                <Link href={cityPageLink(state, city)} className="hover:text-primary">{capitalizeEachWordFirstLetter(city)}</Link>
                <BiChevronRight className="shrink-0" />
                <span className="text-gray-700 font-medium">Ambulance Services</span>
            </nav>
        </main>
    </div>
);

export default AmbulanceDesktop;
