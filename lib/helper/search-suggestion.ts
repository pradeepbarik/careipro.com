import { doctorsBySpecialistPageUrl, doctorDetailPageUrl } from "@/lib/helper/link";

/* one row from /auto-suggestions */
export type TSearchSuggestion = {
    _id?: string,
    text: string,
    type?: string,
    icon?: string,
    vertical?: string,
    location?: string,
    city?: string,
    resolver_url?: { url: string, target?: string },
    resolver?: any,
    doctor_info?: any
};

/**
 * Where a suggestion goes when it is picked.
 *
 * The api sends a resolver_url for anything it can already address; everything else is built from
 * the resolver fields, which is why the doctor and specialist cases are spelled out. Returning null
 * means the suggestion has nowhere to go and the caller should leave the visitor where they are
 * rather than pushing a half built url.
 */
export const suggestionUrl = (
    suggestion: TSearchSuggestion,
    state: string,
    city: string
): { url: string, newTab: boolean } | null => {
    if (suggestion.resolver_url?.url) {
        return { url: suggestion.resolver_url.url, newTab: suggestion.resolver_url.target === "_blank" };
    }
    const q = encodeURIComponent(suggestion.text);
    const vertical = (suggestion.vertical ?? "").toLowerCase();
    const seoText = suggestion.text.toLowerCase().replace(/ /g, "-");

    /* every url below is city scoped. with no city the builders produce a leading "//", which a
       browser reads as a protocol relative url and sends off site, so the caller is told there is
       nowhere to go and sends the visitor somewhere that works instead. */
    if (!state || !city) {
        return null;
    }

    if (vertical === "doctor") {
        if (suggestion.type === "specialists" || suggestion.type === "disease") {
            return {
                url: doctorsBySpecialistPageUrl(
                    seoText,
                    `CATG${suggestion.resolver?.cat_id}-${suggestion.resolver?.group_cat}`,
                    state, city, { market_name: "" }
                ) + `?q=${q}&frmpg=search_suggestion`,
                newTab: false
            };
        }
        if (suggestion.type === "doctor") {
            return {
                url: doctorDetailPageUrl({
                    doctor_id: suggestion.resolver?.doctor_id,
                    service_loc_id: suggestion.doctor_info?.service_loc_id,
                    clinic_id: suggestion.doctor_info?.clinic_id,
                    seo_url: seoText,
                    state, city,
                    type: "DOCTOR",
                    market_name: ""
                }) + `?q=${q}&frmpg=search_suggestion`,
                newTab: false
            };
        }
    }
    return null;
};
