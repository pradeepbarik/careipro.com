/* Helpers for the social media videos a clinic adds from the branch admin. */
export type TVideoSource = "youtube" | "instagram" | "facebook" | "other";

/* The admin derives source from the url when saving, but rows saved before that was
   added have no source, so work it out here too rather than trusting the field. */
export const videoSource = (url: string): TVideoSource => {
    const link = (url || "").toLowerCase();
    if (link.includes("youtube.com") || link.includes("youtu.be")) {
        return "youtube";
    }
    if (link.includes("instagram.com")) {
        return "instagram";
    }
    if (link.includes("facebook.com") || link.includes("fb.watch")) {
        return "facebook";
    }
    return "other";
}
/* Handles the shapes people actually paste: watch links, share links, shorts and an
   already embedded url. Returns null when none of them match. */
export const youtubeVideoId = (url: string): string | null => {
    if (!url) {
        return null;
    }
    const patterns = [
        /youtube\.com\/watch\?[^#]*\bv=([A-Za-z0-9_-]{6,})/i,
        /youtu\.be\/([A-Za-z0-9_-]{6,})/i,
        /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/i,
        /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/i,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
    }
    return null;
}
export const youtubeEmbedUrl = (videoId: string) => {
    /* nocookie so an unplayed video does not set tracking cookies on the clinic page */
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
}
export const youtubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
/* "9:16" as stored becomes a css ratio. Anything unrecognised falls back to landscape. */
export const aspectRatioValue = (aspectRatio: string) => {
    const allowed: Record<string, string> = { "16:9": "16/9", "9:16": "9/16", "1:1": "1/1", "4:3": "4/3" };
    return allowed[aspectRatio] || "16/9";
}
/* Portrait clips need a narrower card than landscape ones for the same screen height */
export const videoCardWidth = (aspectRatio: string) => {
    if (aspectRatio === "9:16") {
        return "58%";
    }
    if (aspectRatio === "1:1") {
        return "72%";
    }
    return "86%";
}
