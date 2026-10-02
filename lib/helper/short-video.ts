import { TClinicStory } from "@/app/components/desktop/home/clinic-stories";

/* a short video as the cache files carry it, written by the admin against one vertical page */
export type TShortVideo = {
    id: number,
    title: string,
    video_link: string,
    /* empty when the admin set none, in which case the poster frame comes from the link */
    thumbnail: string,
    display_order: number,
    /* "YYYY-MM-DD HH:MM:SS", or null for a video with no end date */
    expire_at: string | null
};

/* youtube ids out of a shorts, watch, embed or youtu.be link */
export const youtubeId = (link: string): string => {
    const match = (link || "").match(/(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    return match ? match[1] : "";
};

/* the form that plays inside the page. youtube-nocookie keeps a visitor who never opens a video out
   of youtube's logs, and playsinline stops ios from throwing it into the fullscreen player. */
export const youtubeEmbedUrl = (link: string): string => {
    const id = youtubeId(link);
    return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1` : "";
};

export const shortVideoThumbnail = (video: TShortVideo): string => {
    if (video.thumbnail) {
        return video.thumbnail;
    }
    const id = youtubeId(video.video_link);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};

/**
 * The videos still running, checked against the clock now rather than against the clock the cache
 * file was written by.
 *
 * The api already drops expired ones, but these pages are served from json that can be a day old, so
 * without this a video that ran out at three o'clock would keep showing until the cache was next
 * rebuilt. The stored time has no zone on it, so it is read as local, which is the zone the admin
 * typed it in.
 */
export const liveShortVideos = (videos: TShortVideo[] | undefined, now: Date = new Date()): TShortVideo[] => {
    return (videos || []).filter((video) => {
        if (!video.expire_at) return true;
        const match = String(video.expire_at).match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/);
        if (!match) return true;
        const [, y, m, d, hh, mm] = match;
        return new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm)).getTime() > now.getTime();
    });
};

/* the shape the stories rail takes. a video with no readable thumbnail is dropped rather than drawn
   as a broken tile */
export const shortVideosAsStories = (videos: TShortVideo[] | undefined): TClinicStory[] => {
    return liveShortVideos(videos)
        .map((video) => ({
            id: video.id,
            title: video.title,
            thumbnail: shortVideoThumbnail(video),
            href: video.video_link,
            /* set only for a link the player can embed. without it the tile stays an ordinary link
               out, which is the right behaviour for a video careipro cannot host in place */
            embed_url: youtubeEmbedUrl(video.video_link),
            media_type: "video" as const
        }))
        .filter((story) => story.thumbnail !== "");
};
