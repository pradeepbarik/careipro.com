'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiUser, BiRightArrowAlt } from "react-icons/bi";
import { RootState } from "@/lib/store";
import { initUserDetail } from "@/lib/slices/authSlice";
import { userinfo, userSecreateKey } from "@/constants/storage_keys";
import useCookies from "@/lib/hooks/useCookies";
import { tpReturnUrl, tpReturnUrlWithKey } from "@/lib/helper/tp-redirect";

/**
 * Shown above the login form when the visitor already has a careipro session.
 *
 * They arrived from a clinic's own website, which has no login of its own, so a signed in visitor
 * has nothing left to prove: they only need to be handed back with their key. Making them type a
 * number and wait for an otp again would be asking for something we already have.
 *
 * Renders nothing when nobody is signed in, and nothing when the clinic gave us no address to
 * return to, since continuing would then have nowhere to go.
 */
const SignedInCard = ({ clinicName }: { clinicName: string }) => {
    const dispatch = useDispatch();
    const { deleteCookie } = useCookies();
    const [continuing, setContinuing] = useState(false);
    /* nothing here can be worked out on the server: the session lives in this browser's storage and
       the return address is on the query string. the card therefore stays absent until mounted, so
       the server and the first client render agree and hydration does not fall over. */
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true) }, []);
    const { is_loggedin, user_info } = useSelector((state: RootState) => state.authSlice);

    if (!mounted) return null;
    if (!is_loggedin || !user_info?.secreate_key) return null;
    const returnUrl = tpReturnUrl();
    if (!returnUrl) return null;

    const name = [user_info.firstname, user_info.lastname].filter(Boolean).join(" ").trim();
    const onContinue = () => {
        setContinuing(true);
        window.location.href = tpReturnUrlWithKey(returnUrl, user_info.secreate_key);
    };
    /* signs this visitor out so the form below is theirs to use. only the two keys that say who is
       signed in are cleared, the guest key stays, it is what page visits are logged against */
    const onUseAnother = async () => {
        window.localStorage.removeItem(userinfo);
        await deleteCookie(userinfo);
        await deleteCookie(userSecreateKey);
        dispatch(initUserDetail({ is_loggedin: false, user_info: {} }));
    };

    return (
        <div className="border border-cyan-200 bg-cyan-50 rounded-xl p-4 mb-4">
            <p className="fs-12 font-semibold text-cyan-800 uppercase tracking-wide">Already signed in</p>
            <div className="flex items-center gap-3 mt-2">
                <div className="w-11 h-11 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    {name ? name.charAt(0).toUpperCase() : <BiUser />}
                </div>
                <div className="flex-1 min-w-0">
                    {name && <p className="font-semibold text-gray-800 truncate">{name}</p>}
                    {user_info.mobile && <p className="fs-13 text-gray-600">{user_info.mobile}</p>}
                </div>
            </div>
            <button
                onClick={onContinue}
                disabled={continuing}
                className="mt-3 w-full flex items-center justify-center gap-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-70 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
                {continuing ? "Taking you back..." : <>Continue to {clinicName} <BiRightArrowAlt className="text-lg" /></>}
            </button>
            <button onClick={onUseAnother} className="mt-2 w-full fs-13 text-gray-600 hover:text-gray-800 underline">
                Not you? Use a different number
            </button>
        </div>
    );
};
export default SignedInCard;
