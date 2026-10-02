import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";
import { BiBuildingHouse, BiCalendarEvent, BiPhoneCall, BiSearch, BiSolidMap, BiUser } from "react-icons/bi";
import { support_no } from "@/constants/site-config";
import { searchPageUrl, hirePersonalAssistantPageUrl } from "@/lib/helper/link";
import CityDropdown from "./city-dropdown";
import HeaderSearch from "./header-search";

const navLinkClass = "px-2.5 lg:px-3 py-1.5 rounded-md fs-14 font-semibold whitespace-nowrap transition-colors text-deep hover:text-primary hover:bg-gray-50";

//one header on every desktop page, the site carries a single theme rather than a colour per vertical
//userName is set only for a signed in visitor, the layout reads it off the userinfo cookie
const PageHeader = ({ state, city, userName = "" }: { state: string, city: string, userName?: string }) => {
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
                        {userName ? (
                            <Link
                                href="/my-profile"
                                title={`${userName} - my profile`}
                                className="flex items-center gap-2 rounded-full border border-line pl-1.5 pr-4 py-1.5 fs-14 font-semibold text-deep hover:border-primary hover:text-primary transition-colors"
                            >
                                <span className="h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center fs-13 shrink-0">
                                    {userName.charAt(0).toUpperCase()}
                                </span>
                                <span className="max-w-[9rem] truncate">{userName}</span>
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-1.5 rounded-full bg-primary text-white px-5 py-2 fs-14 font-semibold hover:opacity-90 transition-opacity"
                            >
                                <BiUser className="text-lg" />
                                Login
                            </Link>
                        )}
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
