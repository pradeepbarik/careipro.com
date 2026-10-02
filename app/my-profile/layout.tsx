import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import AccountNav from "./account-nav";
import { readAccountUser } from "./user-info";

/**
 * The account section on desktop: the menu down the left, the page itself in the container on the
 * right. It is a layout rather than part of each page so the menu mounts once and stays put while
 * the panel beside it changes, and so every page under my-profile gets the same frame for free.
 *
 * Mobile is untouched. Those pages carry their own full screen chrome and a back button, which is
 * the right shape on a phone and would fight this one.
 */
const MyProfileLayout = ({ children }: { children: React.ReactNode }) => {
    const { device, cookies } = useDeviceInfo();
    if (device.type === "mobile") {
        return <>{children}</>;
    }
    const user = readAccountUser(cookies);

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 mb-5">
                    {user.isLoggedIn ? (
                        <span className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shrink-0 text-2xl font-bold">
                            {(user.firstName || "?").charAt(0).toUpperCase()}
                        </span>
                    ) : (
                        <span className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <BiUserCircle className="text-3xl" />
                        </span>
                    )}
                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                            {user.isLoggedIn ? <>Hi, {user.fullName || "there"}</> : "My Profile"}
                            {user.isOwner && (
                                <span className="fs-12 font-semibold px-2 py-[2px] rounded-full text-white" style={{ background: "#2fc384" }}>Owner</span>
                            )}
                        </h1>
                        <p className="fs-14 text-gray-500 mt-0.5">
                            {user.isLoggedIn
                                ? "Your appointments, profile and preferences"
                                : "Login to see your appointments, profile and saved doctors."}
                        </p>
                    </div>
                    {!user.isLoggedIn && (
                        <Link
                            href="/login"
                            className="ml-auto shrink-0 flex items-center gap-2 rounded-full bg-primary text-white px-6 py-2.5 fs-14 font-semibold hover:opacity-90 transition-opacity"
                        >
                            <BiUserCircle className="text-lg" />Login / Sign up
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-[16rem_1fr] gap-5 items-start">
                    <div className="sticky top-[104px]">
                        <AccountNav user={user} />
                    </div>
                    <div className="min-w-0">{children}</div>
                </div>
            </main>
        </div>
    );
};

export default MyProfileLayout;
