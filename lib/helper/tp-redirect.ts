/* Where a third party login sends the visitor once they are signed in.
 *
 * A clinic with its own website has no login of its own: it sends the visitor to /tp/login/{bpkey}
 * with the address to come back to, and we hand the session key over on the way back so the clinic
 * can sign them in.
 *
 * Both the login flow and the "continue as" card for an already signed in visitor go through here,
 * so the two cannot drift apart on the parameter name or on how the key is appended.
 */

/** the clinic's return address, as given on the query string */
export const tpReturnUrl = () => {
    if (typeof window === "undefined") return "";
    const search = new URLSearchParams(window.location.search);
    /* the pages under /tp name it rurl and the tp login page's own signature declares that, but
       redirect_url is what this was first written against, so both are taken. redirect_url wins
       where somebody sends both, which is the order it has always worked in. */
    return search.get("redirect_url") || search.get("rurl") || "";
};

/** the return address with the session key on it, for the clinic's site to pick up */
export const tpReturnUrlWithKey = (returnUrl: string, secreate_key: string) => {
    //a return address may already carry a query of its own, and a second ? would break it
    const joiner = returnUrl.includes("?") ? "&" : "?";
    return `${returnUrl}${joiner}user_key=${encodeURIComponent(secreate_key)}`;
};
