'use client'
import Link from "next/link";
import { useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
import { RootState } from "@/lib/store";
import { signedInName } from "@/lib/helper/signed-in-name";

/* The header's Login button / signed in name. It reads the store's cookies rather than a prop from
   the layout: the layout is rendered once and kept across client navigations, so after logging in
   it went on showing "Login" until a full reload. The store starts from the same server cookies, so
   the first render matches the server html, and useLogin updates it as soon as the login succeeds. */
const AccountLink = () => {
    const cookies = useSelector((state: RootState) => state.authSlice.cookies);
    const userName = signedInName(cookies);
    if (userName) {
        return (
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
        );
    }
    return (
        <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-full bg-primary text-white px-5 py-2 fs-14 font-semibold hover:opacity-90 transition-opacity"
        >
            <BiUser className="text-lg" />
            Login
        </Link>
    );
};
export default AccountLink;
