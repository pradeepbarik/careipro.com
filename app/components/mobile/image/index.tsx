'use client'
import { createPortal } from 'react-dom';
import { useState } from "react";
import { BiX } from "react-icons/bi";

const ClickableImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <img src={src} alt={alt} className={className} onClick={() => setOpen(true)} />
            {open && createPortal(
                <div className="fixed inset-0 bg-black flex flex-col" style={{ zIndex: 100 }} onClick={() => setOpen(false)}>
                    <div className="flex items-center justify-end px-3 py-2 shrink-0">
                        <BiX className="text-3xl color-white" onClick={() => setOpen(false)} />
                    </div>
                    <div className="grow flex items-center justify-center overflow-hidden px-2">
                        <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
export default ClickableImage;
