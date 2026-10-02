'use client'
import { useState } from "react";
import { BiPlay, BiLinkExternal } from "react-icons/bi";
import { TclinicDetail } from "@/lib/hooks/useClinics";
import { videoSource, youtubeVideoId, youtubeEmbedUrl, youtubeThumbnail, aspectRatioValue } from "@/lib/helper/video";

type TVideo = NonNullable<TclinicDetail["socialMediaVideos"]>[number];

/* matches HeroBanner's fixed height so the two halves of the hero line up */
const HERO_HEIGHT = "15rem";

/**
 * Every video the clinic uploaded, filling the right half of the desktop hero.
 *
 * The cards are laid out by height rather than width: each one is the full height of the hero and
 * its width follows from its own ratio, so a 9:16 short stands narrow next to a 16:9 clip without
 * either being cropped. videoCardWidth is deliberately not used here, it returns a share of a phone
 * screen and two portrait cards at 58% each overflow a desktop column and read as one block.
 *
 * Only the card that is clicked becomes an iframe. Mounting a youtube frame per video beside an
 * autoplaying banner carousel is what makes these pages feel slow, and most visitors never play one.
 */
const HeroVideos = ({ videos }: { videos: TVideo[] }) => {
    const [playing, setPlaying] = useState<number | null>(null);
    if (videos.length === 0) return <></>;

    return (
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-card" style={{ height: HERO_HEIGHT }}>
            <div className="flex gap-2 h-full overflow-x-auto hide-scroll-bar p-2">
                {videos.map((video, i) => {
                    const source = (video.source as string) || videoSource(video.url);
                    const videoId = source === "youtube" ? youtubeVideoId(video.url) : null;
                    const ratio = aspectRatioValue(video.aspect_ratio);
                    return (
                        <div
                            key={`${video.url}-${i}`}
                            className="relative h-full shrink-0 rounded-xl overflow-hidden bg-black"
                            style={{ aspectRatio: ratio }}
                        >
                            {playing === i && videoId ? (
                                <iframe
                                    src={youtubeEmbedUrl(videoId)}
                                    title={video.title || "Clinic video"}
                                    className="absolute inset-0 h-full w-full"
                                    allowFullScreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                />
                            ) : videoId ? (
                                <button
                                    onClick={() => setPlaying(i)}
                                    aria-label={`Play ${video.title || "clinic video"}`}
                                    className="absolute inset-0 h-full w-full text-left group"
                                >
                                    <img src={youtubeThumbnail(videoId)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                                    <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <span className="h-12 w-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <BiPlay className="text-gray-900 ml-[2px]" style={{ fontSize: "1.75rem" }} />
                                        </span>
                                    </span>
                                    {video.title && (
                                        <span className="absolute inset-x-0 bottom-0 px-3 pb-2 fs-13 font-semibold text-white leading-5 line-clamp-2">
                                            {video.title}
                                        </span>
                                    )}
                                </button>
                            ) : (
                                /* not a youtube link, so open it where it lives rather than trying to
                                   embed a platform that needs its own script */
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white hover:bg-white/5 transition-colors"
                                >
                                    <BiLinkExternal style={{ fontSize: "1.5rem" }} />
                                    <span className="fs-13 font-semibold capitalize">Watch on {source}</span>
                                </a>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HeroVideos;
