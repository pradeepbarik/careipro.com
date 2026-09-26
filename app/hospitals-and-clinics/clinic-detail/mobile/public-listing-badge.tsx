'use client'
import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { SlideUpModal } from '@/app/components/mobile/ui';

/* The badge for a business careipro has not partnered with. Tapping it explains what
   that means, so the page does not have to carry a note for every non partner. */
const PublicListingBadge = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => { setOpen(true) }}
                className="flex items-center gap-1 fs-12 font-semibold px-2 py-[2px] rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                <BiInfoCircle />Public Listing
            </button>
            <SlideUpModal heading="Public listing" open={open} onClose={() => { setOpen(false) }}>
                <div className="pb-4">
                    <p className="fs-14 text-gray-700 leading-6">
                        This information is collected from publicly available sources.
                    </p>
                </div>
            </SlideUpModal>
        </>
    )
}
export default PublicListingBadge;
