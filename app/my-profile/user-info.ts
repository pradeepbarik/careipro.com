import { userSecreateKey, userinfo } from "@/constants/storage_keys";

export type TAccountUser = {
    isLoggedIn: boolean,
    firstName: string,
    lastName: string,
    fullName: string,
    isOwner: boolean,
    businessType: string,
    userType: string,
};

const SIGNED_OUT: TAccountUser = {
    isLoggedIn: false, firstName: "", lastName: "", fullName: "",
    isOwner: false, businessType: "", userType: ""
};

/**
 * Who is signed in, read off the cookies, for the account pages.
 *
 * The userinfo cookie is written by the client, so a malformed value is possible and must not take a
 * page down: a broken cookie reads as signed out rather than throwing. Both cookies have to be
 * present, the secret key is what says there is a session and userinfo carries who it belongs to.
 */
export const readAccountUser = (cookies: Record<string, string>): TAccountUser => {
    if (!cookies[userSecreateKey] || !cookies[userinfo]) return SIGNED_OUT;
    try {
        const user = JSON.parse(cookies[userinfo]);
        const firstName = user?.fn || "";
        const lastName = user?.ln || "";
        return {
            isLoggedIn: true,
            firstName,
            lastName,
            fullName: [firstName, lastName].filter(Boolean).join(" ").trim(),
            isOwner: user?.ico === "1",
            businessType: user?.bt || "",
            userType: user?.ut || ""
        };
    } catch {
        return SIGNED_OUT;
    }
};
