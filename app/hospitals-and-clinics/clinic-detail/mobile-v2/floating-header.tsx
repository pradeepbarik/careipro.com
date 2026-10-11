'use client'
import { useEffect, useRef, useState } from "react";
import BackButton from "../mobile/back-button";
import ShareButton from "../mobile/share-button";
import FavouriteButton from "../mobile/favourite-button";

/**
 * The controls riding over the banner on the v2 page.
 *
 * They are pinned, which means that once the banner has scrolled away they sit on top of whatever
 * the reader is looking at. So the bar gets out of the way while scrolling down and comes back the
 * moment the reader scrolls up -- the same behaviour a phone browser's own chrome has, and the
 * reason back and share stay reachable without permanently covering a strip of the page.
 *
 * It is never hidden at the top of the page, so the first thing a visitor sees is the full bar.
 */
//enough movement to be a deliberate scroll rather than a thumb resting on the screen
const DELTA = 4;

const FloatingHeader = ({ clinicId, name }: { clinicId: number, name: string }) => {
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            if (y < 80) {
                /* the banner is still in view, the bar belongs over it */
                setHidden(false);
            } else if (y > lastY.current + DELTA) {
                setHidden(true);
            } else if (y < lastY.current - DELTA) {
                setHidden(false);
            }
            lastY.current = y;
        };
        lastY.current = window.scrollY;
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className={`sticky top-0 z-20 flex items-center gap-2 px-3 py-2 transition-transform duration-200 ${hidden ? "-translate-y-full" : "translate-y-0"}`}
        >
            <BackButton className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center" />
            <div className="ml-auto flex gap-2">
                <FavouriteButton clinicId={clinicId}
                    className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center" />
                <ShareButton name={name}
                    className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center" />
            </div>
        </div>
    );
};
export default FloatingHeader;
