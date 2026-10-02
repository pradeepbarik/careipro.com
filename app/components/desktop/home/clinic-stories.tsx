'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { BiPlay, BiPlusCircle, BiX } from "react-icons/bi";

/**
 * A short lived update posted by a clinic, the same shape a story, a youtube short or a plain
 * status would take.
 */
export type TClinicStory = {
    id: string | number;
    //whoever posted it, shown under the tile
    title: string;
    //poster frame for a video, or the image itself for a plain status
    thumbnail: string;
    href: string;
    /* the embeddable form of href, set only when the video can play inside the page. empty means the
       tile behaves as an ordinary link out */
    embed_url?: string;
    media_type?: 'video' | 'image';
    //an update the visitor has not opened yet, drawn with the accent ring
    is_new?: boolean;
};

/**
 * The video playing over the page.
 *
 * It is an overlay rather than a swap inside the tile because a short is a 9:16 video and the tile
 * is a quarter of the rail: played in place it would be the size of a postage stamp.
 */
const StoryPlayer = ({ story, onClose }: { story: TClinicStory, onClose: () => void }) => {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[130] bg-black/80 flex items-center justify-center p-4"
            onClick={onClose}
            role="presentation"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={story.title}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[22rem]"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close video"
                    className="absolute -top-10 right-0 h-9 w-9 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
                >
                    <BiX className="text-2xl" />
                </button>
                <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black">
                    <iframe
                        src={story.embed_url}
                        title={story.title}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                    />
                </div>
                <p className="fs-13 text-white/90 mt-2 text-center">{story.title}</p>
            </div>
        </div>
    );
};

const StoryTile = ({ story, onPlay }: { story: TClinicStory, onPlay: (story: TClinicStory) => void }) => (
    /* the anchor keeps the real video url, so a crawler, a middle click and "open in new tab" all
       still reach it. only an ordinary left click is taken over to play in place. */
    <Link
        href={story.href}
        title={story.title}
        target={story.embed_url ? undefined : "_blank"}
        rel={story.embed_url ? undefined : "noopener noreferrer"}
        onClick={(e) => {
            if (!story.embed_url) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            onPlay(story);
        }}
        className="group block min-w-0"
    >
        <div className={`relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-100 ${story.is_new ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
            <img src={story.thumbnail} alt={story.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
            {/* the gradient is darker at the foot than it was, because the title now sits on the
                image rather than under it and has to stay readable over a bright frame */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" aria-hidden="true"></span>
            {story.media_type !== 'image' && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-11 w-11 rounded-full bg-black/45 text-white flex items-center justify-center group-hover:bg-primary transition-colors">
                        <BiPlay className="text-2xl ml-0.5" />
                    </span>
                </span>
            )}
            {/* Two lines rather than one: the tile is tall and narrow, so a title cut after four or
                five words says nothing.

                The height cap on the wrapper is what actually stops a third line. Current chrome
                normalises any -webkit-box line clamp to display:flow-root and then paints the
                clipped line anyway, so the clamp alone leaves a sliced row of text lying over the
                image. The clamp stays because it is what puts the ellipsis on the second line.
                2.375rem is two lines of leading-tight at fs-12 plus the padding below them. */}
            <div
                className="absolute bottom-0 inset-x-0 px-2 pb-2 overflow-hidden"
                style={{ maxHeight: "2.375rem" }}
            >
                <p
                    className="fs-12 font-medium text-white leading-tight"
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden"
                    }}
                >
                    {story.title}
                </p>
            </div>
        </div>
    </Link>
);

//shown until a clinic posts something, keeps the panel the same height as a filled one
const PlaceholderTile = ({ dimmed }: { dimmed?: boolean }) => (
    <div className={dimmed ? 'opacity-40' : ''}>
        <div className="aspect-[9/16] rounded-xl bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
            <BiPlay className="text-2xl text-gray-400" />
        </div>
    </div>
);

/**
 * The stories rail beside the home banner. Clinics post a short update here, a visitor sees what is
 * happening near them today rather than the same page on every visit.
 */
const ClinicStories = ({ stories = [], city }: { stories?: TClinicStory[], city?: string }) => {
    const [playing, setPlaying] = useState<TClinicStory | null>(null);
    const hasStories = stories.length > 0;
    return (
        <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-100 shadow-card p-3">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-primary rounded-full shrink-0"></div>
                <div className="min-w-0">
                    <h2 className="font-bold text-gray-900 leading-tight">Stories</h2>
                   
                </div>
                {/* <Link
                    href="/business-listing/hospital-clinic"
                    title="Post a status for your clinic"
                    className="ml-auto shrink-0 flex items-center gap-1 fs-12 font-semibold text-primary hover:underline"
                >
                    <BiPlusCircle className="text-base" />
                    Post
                </Link> */}
            </div>
            <div className="grid grid-cols-4 gap-3 flex-1 content-start">
                {hasStories
                    ? stories.slice(0, 4).map((story) => <StoryTile key={story.id} story={story} onPlay={setPlaying} />)
                    : [0, 1, 2, 3].map((i) => <PlaceholderTile key={i} dimmed={i > 0} />)}
            </div>
            {playing && <StoryPlayer story={playing} onClose={() => setPlaying(null)} />}
        </div>
    );
};

export default ClinicStories;
