"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { BiLogOutCircle, BiUserCircle, BiGridAlt } from "react-icons/bi";
import {
    AiOutlineCarryOut, AiOutlineEdit, AiOutlineTeam, AiOutlineTag,
    AiOutlineNotification, AiOutlineComment, AiOutlinePhone,
    AiOutlineInfoCircle, AiOutlineFileText, AiOutlineSafety
} from "react-icons/ai";
import useLogin from "@/lib/hooks/login/useLogin";
import { TAccountUser } from "./user-info";

const MY_PROFILE_ROUTES = "my-profile";
const BUSINESS_ROUTES = "business";

type TItem = { label: string, href: string, icon: IconType };
type TGroup = { title: string, items: TItem[] };

const BUSINESS_LISTING_HREF = "/business-listing/hospital-clinic?utm_source=careipro&utm_medium=my-profile&utm_campaign=nav-item";

const SUPPORT_GROUP: TGroup = {
    title: "Support & information",
    items: [
        { label: "Share your Feedback", href: "/support/share-feedback", icon: AiOutlineComment },
        { label: "Contact us", href: "/contact-us", icon: AiOutlinePhone },
        { label: "About us", href: "/about-us", icon: AiOutlineInfoCircle },
        { label: "Privacy Policy", href: "/privacy-policy", icon: AiOutlineSafety },
        { label: "Terms & Conditions", href: "/terms-and-conditions", icon: AiOutlineFileText },
    ],
};

/* Which groups appear, and what is inside them, follows the mobile page rather than being invented
   here: the owner block only for ico === '1' and keyed on the business type, and the clinic
   registration link only for an ordinary user, since an owner has already registered one. */
export const navGroups = (user: TAccountUser): TGroup[] => {
    if (!user.isLoggedIn) {
        return [
            {
                title: "Account",
                items: [{ label: "Login / Sign up", href: "/login", icon: BiUserCircle }],
            },
            {
                title: "Partner with careipro",
                items: [{ label: "Register your Hospital / Clinic", href: BUSINESS_LISTING_HREF, icon: AiOutlineNotification }],
            },
            SUPPORT_GROUP,
        ];
    }

    const groups: TGroup[] = [{
        title: "My account",
        items: [
            { label: "Overview", href: `/${MY_PROFILE_ROUTES}`, icon: BiGridAlt },
            { label: "My Appointments", href: `/${MY_PROFILE_ROUTES}/appointment-history`, icon: AiOutlineCarryOut },
            { label: "My Profile", href: `/${MY_PROFILE_ROUTES}/profile-detail`, icon: AiOutlineEdit },
        ],
    }];

    if (user.isOwner && (user.businessType === "RELAXATION" || user.businessType === "CARETAKER")) {
        const items: TItem[] = [];
        if (user.businessType === "RELAXATION") {
            items.push({ label: "Leads", href: `/${BUSINESS_ROUTES}/my-leads`, icon: AiOutlineTag });
        }
        if (user.businessType === "CARETAKER") {
            items.push({ label: "Enquiries", href: `/${BUSINESS_ROUTES}/enquiries`, icon: AiOutlineNotification });
        }
        items.push({ label: "Jobs", href: `/${BUSINESS_ROUTES}/my-jobs`, icon: AiOutlineCarryOut });
        items.push({ label: "My Staffs", href: `/${BUSINESS_ROUTES}/my-staffs`, icon: AiOutlineTeam });
        groups.push({ title: "My business", items });
    }

    if (user.userType === "user") {
        groups.push({
            title: "Partner with careipro",
            items: [{ label: "Register your Hospital / Clinic", href: BUSINESS_LISTING_HREF, icon: AiOutlineNotification }],
        });
    }

    groups.push(SUPPORT_GROUP);
    return groups;
};

/* The overview is the section root, so it matches only itself. Everything else owns its subtree, so
   an appointment detail page still lights up "My Appointments". */
const isActive = (pathname: string, href: string) => {
    const path = href.split("?")[0];
    if (path === `/${MY_PROFILE_ROUTES}`) return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
};

/**
 * The account menu, down the left of every my-profile page on desktop. It lives in the section
 * layout so it mounts once and survives navigation between the pages beside it.
 */
const AccountNav = ({ user }: { user: TAccountUser }) => {
    const pathname = usePathname() || "";
    const { logOut } = useLogin({ allowLoggedInUser: true, redirectUrl: "" });
    const groups = navGroups(user);

    return (
        <nav aria-label="Account" className="bg-white rounded-xl border border-gray-200 p-3">
            {groups.map((group) => (
                <div key={group.title} className="mb-4 last:mb-0">
                    <p className="fs-12 font-bold uppercase tracking-wide text-gray-400 px-2 mb-1.5">{group.title}</p>
                    <ul>
                        {group.items.map((item) => {
                            const active = isActive(pathname, item.href);
                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        aria-current={active ? "page" : undefined}
                                        className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 fs-14 font-semibold transition-colors ${active
                                            ? "bg-primary/10 text-primary"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-primary"}`}
                                    >
                                        <item.icon className="text-lg shrink-0" />
                                        <span className="min-w-0 truncate">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}

            {user.isLoggedIn && (
                <div className="border-t border-gray-100 pt-3 mt-3">
                    <button
                        type="button"
                        onClick={logOut}
                        className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 fs-14 font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <BiLogOutCircle className="text-lg shrink-0" />Log out
                    </button>
                </div>
            )}
        </nav>
    );
};

export default AccountNav;
