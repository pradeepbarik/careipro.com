'use client'
import { useState } from "react";
import { BiPlay, BiLinkExternal } from "react-icons/bi";
import { TclinicDetail } from "@/lib/hooks/useClinics";
import { videoSource, youtubeVideoId, youtubeEmbedUrl, youtubeThumbnail, aspectRatioValue, videoCardWidth } from "@/lib/helper/video";

type TVideo = NonNullable<TclinicDetail["socialMediaVideos"]>[number];

/* Videos the clinic added from the branch admin.

   Only the card that is tapped becomes an iframe. Rendering every player up front would
   pull in a YouTube frame per video on a page that already carries a banner carousel,
   which is the kind of thing that makes a clinic page crawl on a mid range phone. */
const ClinicVideos = ({ videos }: { videos: TVideo[] }) => {
    const [playing, setPlaying] = useState<number | null>(null);

    if (videos.length === 0) {
        return <></>
    }
    return (
        <section className="bg-white rounded-xl mx-3 mt-3 p-4 shadow-sm border border-gray-100">
            <h2 className="fs-16 font-bold text-gray-900 mb-3">Videos</h2>
            <div className="flex gap-3 overflow-auto hide-scroll-bar">
                {videos.map((video, i) => {
                    const source = (video.source as string) || videoSource(video.url);
                    const videoId = source === "youtube" ? youtubeVideoId(video.url) : null;
                    const ratio = aspectRatioValue(video.aspect_ratio);
                    const width = videoCardWidth(video.aspect_ratio);
                    return (
                        <div key={`${video.url}-${i}`} className="shrink-0" style={{ width: width }}>
                            {/* the title sits inside the media box, so every card is the same
                                height whether or not it has one and nothing shifts on play */}
                            <div className="relative rounded-xl overflow-hidden bg-gray-900 shadow-sm" style={{ aspectRatio: ratio }}>
                                {playing === i && videoId ?
                                    <iframe src={youtubeEmbedUrl(videoId)} title={video.title || "Clinic video"}
                                        className="absolute inset-0 h-full w-full" allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                                    : videoId ?
                                        <button onClick={() => { setPlaying(i) }} aria-label={`Play ${video.title || "clinic video"}`}
                                            className="absolute inset-0 h-full w-full text-left">
                                            <img src={youtubeThumbnail(videoId)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                                            <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                                            <span className="absolute inset-0 flex items-center justify-center">
                                                <span className="h-14 w-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                                                    <BiPlay className="text-gray-900 ml-[3px]" style={{ fontSize: "2rem" }} />
                                                </span>
                                            </span>
                                            {video.title &&
                                                <span className="absolute inset-x-0 bottom-0 px-3 pb-3 fs-13 font-semibold text-white leading-5 line-clamp-2">
                                                    {video.title}
                                                </span>
                                            }
                                        </button>
                                        :
                                        /* not a youtube link, so open it where it lives rather than
                                           trying to embed a platform that needs its own script */
                                        <a href={video.url} target="_blank" rel="noopener noreferrer"
                                            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white">
                                            <BiLinkExternal style={{ fontSize: "1.6rem" }} />
                                            <span className="fs-13 font-semibold capitalize">Watch on {source}</span>
                                            {video.title &&
                                                <span className="absolute inset-x-0 bottom-0 px-3 pb-3 fs-13 font-semibold text-white leading-5 line-clamp-2">
                                                    {video.title}
                                                </span>
                                            }
                                        </a>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
export default ClinicVideos;
