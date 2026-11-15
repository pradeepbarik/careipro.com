import { userinfo, userSecreateKey } from "@/constants/storage_keys";

/* The signed in visitor's name, for the header. Both cookies have to be there: the secret key is
   what says there is a session, userinfo carries who it belongs to. It is written by the client so
   a malformed value is possible, and a broken cookie must not take the whole layout down. */
export const signedInName = (cookies: Record<string, string>) => {
    if (!cookies[userSecreateKey] || !cookies[userinfo]) return "";
    try {
        const user = JSON.parse(cookies[userinfo]);
        return [user?.fn, user?.ln].filter(Boolean).join(" ").trim();
    } catch {
        return "";
    }
};
