'use client'
import { toast } from "react-toastify";
import { BiShareAlt } from "react-icons/bi";

/* Share this clinic. Uses the native share sheet where the browser has one, and falls
   back to copying the link, which is what desktop browsers and older webviews get.

   The query string is dropped on purpose: the page can be opened with ?design=v2, and
   nobody should receive that in a shared link. */
const ShareButton = ({ name, className = "", iconClassName = "fs-18 text-white", children }: { name: string, className?: string, iconClassName?: string, children?: React.ReactNode }) => {
    const onShare = async () => {
        const url = `${window.location.origin}${window.location.pathname}`;
        if (navigator.share) {
            try {
                await navigator.share({ title: name, text: `${name} on careipro`, url: url });
            } catch {
                /* the user dismissing the share sheet rejects, which is not an error */
            }
            return;
        }
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Link copied!", { autoClose: 1000 });
        } catch {
            toast.error("Could not copy the link");
        }
    }
    return (
        <button onClick={onShare} aria-label={`Share ${name}`} className={className}>
            <BiShareAlt className={iconClassName} />
            {children}
        </button>
    )
}
export default ShareButton;
