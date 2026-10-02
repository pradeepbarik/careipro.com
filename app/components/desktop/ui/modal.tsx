'use client'
import { useEffect } from "react";
import { BiX } from "react-icons/bi";

/**
 * A centred dialog for desktop. The mobile ui has SlideUpModal, which is a sheet rising from the
 * bottom edge of a phone; on a wide screen that shape reads as a mistake, so this is its counterpart
 * rather than a restyling of it.
 *
 * Escape and a click on the backdrop both close it, and the page behind is locked while it is open
 * so the body does not scroll under the dialog.
 */
const Modal = ({ open, heading, onClose, children, width = "32rem" }: {
    open: boolean,
    heading: string,
    onClose: () => void,
    children: React.ReactNode,
    width?: string
}) => {
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        /* the previous value is restored rather than assuming it was "", so two dialogs or a sheet
           already holding the page still leaves the body locked when this one closes */
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open, onClose]);

    if (!open) return <></>;

    return (
        <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50"
            onClick={onClose}
            role="presentation"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={heading}
                /* the backdrop closes on click, so a click that started inside the dialog must not
                   bubble up to it */
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl w-full max-h-[85vh] flex flex-col"
                style={{ maxWidth: width }}
            >
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 shrink-0">
                    <h2 className="font-bold text-gray-900">{heading}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="ml-auto h-8 w-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    >
                        <BiX className="text-xl" />
                    </button>
                </div>
                <div className="px-5 py-4 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
