import Link from 'next/link';
import { IconType } from 'react-icons';
import { BiChevronRight } from "react-icons/bi";
import {
    AiOutlineCarryOut, AiOutlineEdit, AiOutlineTeam, AiOutlineTag,
    AiOutlineNotification, AiOutlineComment, AiOutlinePhone
} from "react-icons/ai";
import { readAccountUser } from './user-info';

const MY_PROFILE_ROUTES = "my-profile";
const BUSINESS_ROUTES = "business";

type TTile = { label: string, description: string, href: string, icon: IconType };

const Tile = ({ tile }: { tile: TTile }) => (
    <Link
        href={tile.href}
        className="group flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4 hover:border-primary hover:shadow-md transition-all"
    >
        <span className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <tile.icon className="text-xl" />
        </span>
        <span className="min-w-0 flex-1">
            <span className="block fs-14 font-semibold text-gray-800 group-hover:text-primary transition-colors">{tile.label}</span>
            <span className="block fs-13 text-gray-500 leading-snug mt-0.5">{tile.description}</span>
        </span>
        <BiChevronRight className="text-xl text-gray-400 shrink-0" />
    </Link>
);

const Section = ({ title, tiles }: { title: string, tiles: TTile[] }) => (
    <section className="mb-5 last:mb-0">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-5 bg-primary rounded-full"></div>
            <h2 className="font-bold text-gray-800">{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
            {tiles.map((tile) => <Tile key={tile.label} tile={tile} />)}
        </div>
    </section>
);

/**
 * The panel the account section opens on. The menu beside it already lists every destination, so
 * this is not a second copy of it: it carries only the handful of things someone lands here to do,
 * each with a line saying what it is for.
 */
const MyProfileDesktop = ({ cookies }: { cookies: Record<string, string> }) => {
    const user = readAccountUser(cookies);

    if (!user.isLoggedIn) {
        return (
            <Section title="Get started" tiles={[
                { label: "Register your Hospital / Clinic", description: "List your practice and start taking appointments on careipro.", href: "/business-listing/hospital-clinic?utm_source=careipro&utm_medium=my-profile&utm_campaign=nav-item", icon: AiOutlineNotification },
                { label: "Contact us", description: "Talk to our team about a booking or a listing.", href: "/contact-us", icon: AiOutlinePhone },
            ]} />
        );
    }

    const accountTiles: TTile[] = [
        { label: "My Appointments", description: "Your booking history and upcoming visits.", href: `/${MY_PROFILE_ROUTES}/appointment-history`, icon: AiOutlineCarryOut },
        { label: "My Profile", description: "Name, contact details and the rest of your account.", href: `/${MY_PROFILE_ROUTES}/profile-detail`, icon: AiOutlineEdit },
    ];

    /* the owner block, and what is in it, follow the business type the same way the menu and the
       mobile page do */
    const businessTiles: TTile[] = [];
    if (user.isOwner && (user.businessType === "RELAXATION" || user.businessType === "CARETAKER")) {
        if (user.businessType === "RELAXATION") {
            businessTiles.push({ label: "Leads", description: "Enquiries from people looking for your service.", href: `/${BUSINESS_ROUTES}/my-leads`, icon: AiOutlineTag });
        }
        if (user.businessType === "CARETAKER") {
            businessTiles.push({ label: "Enquiries", description: "Requests sent to your listing.", href: `/${BUSINESS_ROUTES}/enquiries`, icon: AiOutlineNotification });
        }
        businessTiles.push({ label: "Jobs", description: "Positions you have posted.", href: `/${BUSINESS_ROUTES}/my-jobs`, icon: AiOutlineCarryOut });
        businessTiles.push({ label: "My Staffs", description: "The people working with you.", href: `/${BUSINESS_ROUTES}/my-staffs`, icon: AiOutlineTeam });
    }

    return (
        <>
            <Section title="My account" tiles={accountTiles} />
            {businessTiles.length > 0 && <Section title="My business" tiles={businessTiles} />}
            <Section title="Help us improve" tiles={[
                { label: "Share your Feedback", description: "Tell us what worked and what did not.", href: "/support/share-feedback", icon: AiOutlineComment },
                { label: "Contact us", description: "Talk to our team about a booking or a listing.", href: "/contact-us", icon: AiOutlinePhone },
            ]} />
            <Link href={"/contact-us?utm_source=careipro&utm_medium=my-profile&utm_campaign=nav-item"} className="block mt-6 text-center">
                <img src="/careipro-content-creator.png" />
            </Link>
        </>
    );
};

export default MyProfileDesktop;
