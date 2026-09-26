'use client'
import { BiArrowBack } from "react-icons/bi";

/* Same behaviour as the shared mobile header's back control: step back when there is
   history, otherwise fall through to the homepage rather than leaving the user stuck
   on a page opened straight from a search result or a shared link. */
const BackButton = ({ className = "" }: { className?: string }) => {
    const onBack = () => {
        if (window.history.length > 1) {
            window.history.go(-1);
            return;
        }
        window.location.href = "/";
    }
    return (
        <button onClick={onBack} aria-label="Go back" className={className}>
            <BiArrowBack className="fs-18 text-white" />
        </button>
    )
}
export default BackButton;
