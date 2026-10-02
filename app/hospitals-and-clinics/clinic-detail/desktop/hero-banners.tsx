'use client'
import { useCallback, useEffect, useState } from "react";
import { BiX, BiChevronLeft, BiChevronRight, BiImages } from "react-icons/bi";
import { clinicBannerImage } from "@/lib/image";

/* matches HeroVideos and HeroBanner's fixed height so both halves of the hero line up */
const HERO_HEIGHT = "15rem";
/* one large tile plus four small ones. anything beyond that goes behind the +N overlay */
const MAX_TILES = 5;

/**
 * The clinic's banners as a mosaic rather than a carousel.
 *
 * A carousel only ever shows one banner at a time, so a clinic that uploaded five gets four of them
 * seen by nobody, and the rotation competes with the video strip beside it. Here every banner is on
 * screen at once and nothing moves.
 *
 * The shape follows the count: one fills the box, two split it, three put a tall tile beside a
 * stacked pair, and four or more use a large tile with a 2x2 grid. Past five the last tile carries
 * a +N that opens the lightbox on the rest.
 */
const HeroBanners = ({ banners, name }: { banners: Array<{ image: string }>, name: string }) => {
    const [lightboxAt, setLightboxAt] = useState<number | null>(null);
    const total = banners.length;

    const close = useCallback(() => setLightboxAt(null), []);
    const step = useCallback((by: number) => {
        setLightboxAt((at) => (at === null ? at : (at + by + total) % total));
    }, [total]);

    useEffect(() => {
        if (lightboxAt === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
        };
        document.addEventListener("keydown", onKey);
        //the page behind must not scroll while the lightbox is up
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [lightboxAt, close, step]);

    if (total === 0) return <></>;

    const visible = banners.slice(0, MAX_TILES);
    const hidden = total - visible.length;

    /* The grid and the first tile's span have to agree on the cell count, or the tiles that do not
       fit spill into an implicit row that the fixed height then clips.
         3  -> 2x2, the first tile runs the full left column:   1 tall + 2 stacked = 3 cells
         4  -> 2x2 with no span, an even quad:                  4 cells
         5+ -> 4x2, the first tile takes a 2x2 block:           4 + 4 singles = 8 cells */
    const gridClass =
        total === 1 ? "grid-cols-1 grid-rows-1"
            : total === 2 ? "grid-cols-2 grid-rows-1"
                : total <= 4 ? "grid-cols-2 grid-rows-2"
                    : "grid-cols-4 grid-rows-2";
    const firstTileClass =
        total === 3 ? "row-span-2"
            : total >= 5 ? "col-span-2 row-span-2"
                : "";

    return (
        <>
            <div className={`grid ${gridClass} gap-1 p-1 bg-white h-full rounded-md mt-3`} style={{ height: HERO_HEIGHT }}>
                {visible.map((banner, i) => {
                    const isLast = i === visible.length - 1;
                    const moreOnThisTile = isLast && hidden > 0;
                    return (
                        <button
                            key={`${banner.image}-${i}`}
                            onClick={() => setLightboxAt(i)}
                            aria-label={moreOnThisTile ? `View all ${total} photos` : `View photo ${i + 1} of ${total}`}
                            /* each tile carries its own corners, square edges butted together read
                               as one cropped image rather than a set of photos */
                            className={`relative overflow-hidden rounded-xl bg-gray-100 group ${i === 0 ? firstTileClass : ""}`}
                        >
                            <img
                                src={clinicBannerImage(banner.image)}
                                alt={name}
                                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {moreOnThisTile && (
                                <span className="absolute inset-0 rounded-xl bg-black/55 flex flex-col items-center justify-center text-white">
                                    <BiImages className="text-xl" />
                                    <span className="fs-14 font-bold">+{hidden}</span>
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {lightboxAt !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${name} photos`}
                >
                    <button onClick={close} aria-label="Close" className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
                        <BiX className="text-2xl" />
                    </button>
                    {total > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); step(-1); }}
                                aria-label="Previous photo"
                                className="absolute left-4 h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <BiChevronLeft className="text-3xl" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); step(1); }}
                                aria-label="Next photo"
                                className="absolute right-4 h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <BiChevronRight className="text-3xl" />
                            </button>
                        </>
                    )}
                    {/* stops a click on the image itself from closing the overlay */}
                    <img
                        src={clinicBannerImage(banners[lightboxAt].image)}
                        alt={name}
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
                    />
                    <span className="absolute bottom-5 fs-13 text-white/80">{lightboxAt + 1} / {total}</span>
                </div>
            )}
        </>
    );
};

export default HeroBanners;
