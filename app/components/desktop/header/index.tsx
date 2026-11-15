import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";
import { BiBuildingHouse, BiCalendarEvent, BiPhoneCall, BiSearch, BiSolidMap } from "react-icons/bi";
import { support_no } from "@/constants/site-config";
import { searchPageUrl, hirePersonalAssistantPageUrl } from "@/lib/helper/link";
import CityDropdown from "./city-dropdown";
import HeaderSearch from "./header-search";
import AccountLink from "./account-link";

const navLinkClass = "px-2.5 lg:px-3 py-1.5 rounded-md fs-14 font-semibold whitespace-nowrap transition-colors text-deep hover:text-primary hover:bg-gray-50";

//one header on every desktop page, the site carries a single theme rather than a colour per vertical
//the signed in name comes from AccountLink, which follows the store so it changes on login/logout
const PageHeader = ({ state, city }: { state: string, city: string }) => {
    /* with no city yet these would build "///best-doctors", which a browser treats as a protocol
       relative url and sends somewhere off site. a vertical cannot be browsed without a city
       anyway, so the links ask for one first. */
    const cityPath = (page: string) => {
        if (!state || !city) {
            return "/service-available-cities";
        }
        return `/${state.toLowerCase().replace(" ", "-")}/${city.toLowerCase().replace(" ", "-")}/${page}`;
    };
    //the nav follows the city being browsed, the same links a visitor would reach from the page body
    const navLinks = [
        { label: "Doctors", href: cityPath("best-doctors") },
        { label: "Hospitals & Clinics", href: cityPath("hospitals-and-clinics") },
        { label: "Physiotherapy", href: cityPath("physiotherapy-centers") },
        { label: "Caretakers", href: cityPath("caretakers") },
        { label: "Hire Personal Assistant", href: hirePersonalAssistantPageUrl(state || '', city || '') },
    ];
    return (
        <header className="sticky top-0 z-[95] bg-white border-b border-line-light shadow-card">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-4 h-16">
                    <Link href="/" title="Careipro home" className="shrink-0">
                        <img src="/careipro-primary-logo.png" alt="Careipro" className="h-9 w-auto" />
                    </Link>
                    <CityDropdown state={state} city={city} />
                    <HeaderSearch state={state} city={city} />
                    <div className="ml-auto flex items-center gap-2 shrink-0">
                        <Link
                            href="/my-profile/appointment-history"
                            className="flex items-center gap-1.5 rounded-full px-3 py-2 fs-14 font-semibold text-deep hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                            <BiCalendarEvent className="text-lg" />
                            My Bookings
                        </Link>
                        <AccountLink />
                    </div>
                </div>
                <nav aria-label="Main" className="flex items-center gap-1 h-10 -mx-2">
                    {navLinks.map((link) => (
                        <Link key={link.label} href={link.href} className={navLinkClass}>{link.label}</Link>
                    ))}
                    <div className="ml-auto flex items-center gap-1">
                        <Link
                            href="/business-listing/hospital-clinic"
                            className="flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-md fs-14 font-semibold whitespace-nowrap text-secondary hover:bg-secondary/10 transition-colors"
                        >
                            <BiBuildingHouse className="text-base" />
                            List your clinic
                        </Link>
                        <a
                            href={`tel:+91${support_no}`}
                            title="Call support"
                            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md fs-14 font-semibold whitespace-nowrap text-deep hover:text-primary transition-colors"
                        >
                            <BiPhoneCall className="text-base text-primary" />
                            Help: +91 {support_no}
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}
export default PageHeader;
