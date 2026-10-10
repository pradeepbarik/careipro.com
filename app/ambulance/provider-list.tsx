"use client"
import { useMemo, useState } from "react";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { BiPhoneCall, BiChevronRight, BiSolidMap, BiTimeFive, BiRupee } from "react-icons/bi";
import { FaAmbulance, FaMapMarkerAlt } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { clinicProfilePic } from "@/lib/image";
import { capitalizeFirstLetter } from "@/lib/helper/format-text";
import { MdVerified, MdSpeed } from "react-icons/md";
import { ambulanceCategories, TAmbulanceCategoryCode } from "./data";
import { TAmbulanceProvider } from "@/lib/hooks/ambulance/useAmbulance";
import { ambulanceProviderDetailUrl } from "@/lib/helper/link";

/* no single vehicle is in play on a listing row, so this asks about the service and names the
   business, the way the detail page's per vehicle message does */
const whatsappMessage = (p: TAmbulanceProvider) =>
    `Hi,\nI found *${p.name}* on careipro.com. I need an ambulance, what is the fare?`;

const detailUrl = (p: TAmbulanceProvider) =>
    ambulanceProviderDetailUrl({ seo_url: p.seo_url, state: p.state, city: p.city, bid: p.bid || '' });

type TFilter = TAmbulanceCategoryCode | "ALL";

const categoryName = (code: string) =>
    ambulanceCategories.find((c) => c.code === code)?.short || code;

/** the long form, shown on hover since the chip only has room for the abbreviation */
const categoryFullName = (code: string) =>
    ambulanceCategories.find((c) => c.code === code)?.name || code;

/** the api returns the provider's own locality, falling back to the wider address */
const providerArea = (provider: TAmbulanceProvider) =>
    [provider.locality, provider.location].filter(Boolean)[0] || provider.city;

/* A provider is listed under every category it runs a vehicle for, so the counts here intentionally
   add up to more than the number of providers. */
const useFilteredProviders = (all: TAmbulanceProvider[]) => {
    const [filter, setFilter] = useState<TFilter>("ALL");
    const providers = useMemo(
        () => filter === "ALL" ? all : all.filter((p) => p.categories.includes(filter)),
        [filter, all]
    );
    const counts = useMemo(() => {
        const result: Record<string, number> = { ALL: all.length };
        ambulanceCategories.forEach((c) => {
            result[c.code] = all.filter((p) => p.categories.includes(c.code)).length;
        });
        return result;
    }, [all]);
    return { filter, setFilter, providers, counts };
}

const RatingChip = ({ rating }: { rating: number }) => (
    <span className="flex items-center gap-0.5 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded font-semibold">
        {rating} <AiFillStar />
    </span>
);

/* The three classes an emergency caller actually chooses between. The filter bar offers only
   these, so the chips stay on one line beside the result count; the full taxonomy is still on
   each provider card and in the type guide above. */
const PRIMARY_FILTER_CODES: TAmbulanceCategoryCode[] = ["BLS", "ALS", "ICU"];

const FilterChips = ({ filter, setFilter, counts, size, codes }: {
    filter: TFilter, setFilter: (f: TFilter) => void, counts: Record<string, number>, size: "sm" | "md",
    /** which classes to offer; defaults to the whole taxonomy */
    codes?: TAmbulanceCategoryCode[]
}) => {
    const shown = codes
        ? ambulanceCategories.filter((c) => codes.includes(c.code))
        : ambulanceCategories;
    const chips: { code: TFilter, label: string }[] = [
        { code: "ALL", label: "All Services" },
        ...shown.map((c) => ({ code: c.code as TFilter, label: c.short })),
    ];
    return (
        <div className={`flex gap-2 overflow-x-auto hide-scroll-bar ${size === "sm" ? "pb-1" : "flex-wrap"}`}>
            {chips.map((chip) => {
                const active = filter === chip.code;
                return (
                    <button
                        key={chip.code}
                        onClick={() => setFilter(chip.code)}
                        className={`whitespace-nowrap rounded-full border transition-colors ${size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} ${active
                            ? "bg-primary text-white border-cyan-600 font-semibold"
                            : "bg-white text-deep border-gray-200 hover:border-cyan-600 hover:text-cyan-700"}`}
                    >
                        {chip.label}
                        <span className={active ? "text-white/80" : "text-muted"}> ({counts[chip.code]})</span>
                    </button>
                );
            })}
        </div>
    );
};

const EmptyState = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
        <FaAmbulance className="text-4xl text-muted mx-auto mb-3" />
        <h3 className="font-semibold text-deep mb-1">No provider listed for this service yet</h3>
        <p className="text-sm text-muted">Try another ambulance type, or call 108 for immediate help.</p>
    </div>
);

/**
 * A provider row on the desktop listing, built to the shape the doctor list uses: who they are on
 * the left, what they run in the middle, and the fare with the actions pinned right so the eye can
 * run down one column when comparing providers.
 */
const DesktopCard = ({ provider }: { provider: TAmbulanceProvider }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-cyan-300 transition-all">
        <div className="flex gap-4">
            <Link href={detailUrl(provider)} title={provider.name} className="shrink-0">
                {provider.logo
                    ? <img src={clinicProfilePic(provider.logo)} alt={`Logo of ${provider.name}`}
                        className="w-24 h-24 rounded-lg object-cover border border-gray-100" />
                    : <span className="w-24 h-24 rounded-lg border border-gray-100 bg-cyan-50 flex items-center justify-center">
                        <FaAmbulance className="text-cyan-600" style={{ fontSize: "2.25rem" }} />
                    </span>}
                <span className="mt-1.5 block fs-12 font-semibold text-red-700 border border-red-200 rounded-full px-2 py-0.5 text-center leading-tight">
                    {provider.fleet_size} Ambulance{provider.fleet_size === 1 ? '' : 's'}
                </span>
            </Link>

            <div className="flex-1 min-w-0">
                <Link href={detailUrl(provider)} title={`${provider.name}, ${provider.city}`} className="group inline-flex items-center gap-1">
                    <h3 className="font-bold text-gray-900 fs-17 group-hover:text-cyan-700 transition-colors">{provider.name}</h3>
                    {provider.verified === 1 && <MdVerified className="text-blue-500 shrink-0" />}
                </Link>

                {/* where the provider is reads as part of its name, a caller checks it first */}
                <p className="flex items-center gap-1.5 fs-13 text-gray-500 mt-0.5">
                    <BiSolidMap className="text-cyan-600 shrink-0" />
                    <span className="truncate">{providerArea(provider)}, {capitalizeFirstLetter(provider.city)}</span>
                </p>

                <div className="flex items-center gap-2 mt-1.5">
                    {Number(provider.review_cnt) > 0 && <RatingChip rating={provider.rating} />}
                    {provider.review_cnt ? <span className="fs-12 text-gray-500">{provider.review_cnt} reviews</span> : null}
                    {provider.available_24x7 === 1 && (
                        <span className="inline-flex items-center gap-1 fs-12 font-bold text-green-700 bg-green-50 border border-green-200 rounded-md px-1.5 py-0.5">
                            <BiTimeFive className="shrink-0" />24×7
                        </span>
                    )}
                    {provider.categories.map((code) => (
                        <span key={code} title={categoryFullName(code)}
                            className="inline-flex items-center gap-1 fs-12 font-semibold px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100">
                            <FaAmbulance className="text-cyan-500 shrink-0" />{categoryName(code)}
                        </span>
                    ))}
                </div>
                {provider.facilities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {provider.facilities.slice(0, 4).map((f) => (
                            <span key={f} className="fs-12 px-2 py-0.5 rounded bg-gray-100 text-gray-600">{f}</span>
                        ))}
                        {provider.facilities.length > 4 && (
                            <span className="fs-12 text-gray-400">+{provider.facilities.length - 4} more</span>
                        )}
                    </div>
                )}
            </div>

            {/* the fare and the actions, pinned right so the eye can run down one column */}
            <div className="w-52 shrink-0 border-l border-gray-100 pl-4 flex flex-col">
                {provider.base_fare > 0 && (
                    /* the fare is what a caller compares providers on, so it carries the weight
                       here rather than sitting as another grey line */
                    <div>
                        <span className="fs-12 text-gray-500 block">Starting from</span>
                        <span className="flex items-center fs-20 font-bold text-gray-900 leading-tight">
                            <BiRupee className="shrink-0" />{provider.base_fare}
                        </span>
                    </div>
                )}
                <a href={`tel:${provider.mobile}`}
                    className="mt-auto flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold fs-14 rounded-lg py-2 hover:opacity-90 transition-opacity">
                    <BiPhoneCall className="text-base" />Call Now
                </a>
                <Link href={detailUrl(provider)}
                    className="mt-2 block w-full text-center border border-cyan-600 text-cyan-700 font-semibold fs-14 rounded-lg py-2 hover:bg-cyan-50 transition-colors">
                    View Details
                </Link>
            </div>
        </div>
    </div>
);

export const AmbulanceProviderListDesktop = ({ allProviders }: { allProviders: TAmbulanceProvider[] }) => {
    const { filter, setFilter, providers, counts } = useFilteredProviders(allProviders);
    return (
        /* no card around the section: each provider row is its own white card against the page,
           the way the doctor list reads. only the filter bar gets a surface, and it sticks. */
        <div id="providers">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                <h2 className="text-xl font-bold text-deep">Ambulance Service Providers</h2>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 mb-4 sticky top-[104px] z-30 px-3 py-2.5 flex items-center gap-3">
                <FilterChips filter={filter} setFilter={setFilter} counts={counts} size="md" codes={PRIMARY_FILTER_CODES} />
                <p className="ml-auto fs-14 text-gray-500 shrink-0">
                    <b className="text-gray-800">{providers.length}</b> {providers.length === 1 ? 'provider' : 'providers'}
                </p>
            </div>
            {/* one provider per row: the cards sit in the 70% column beside the ad rail, where two
                across leaves each too narrow for the fare, equipment and route detail */}
            {providers.length === 0 ? <EmptyState /> : (
                <div className="flex flex-col gap-4">
                    {providers.map((p) => <DesktopCard key={p.id} provider={p} />)}
                </div>
            )}
        </div>
    );
};

const MobileCard = ({ provider }: { provider: TAmbulanceProvider }) => (
    <div className="relative bg-white rounded-xl border border-gray-200 p-4 active:bg-gray-50 transition-colors">
        {/* the whole card opens the provider. an anchor cannot nest in an anchor, so rather than
            wrapping the card this one is stretched over it and the action buttons are lifted
            above it, which keeps them tappable */}
        <Link href={detailUrl(provider)} aria-label={provider.name} className="absolute inset-0 z-0 rounded-xl" />
        <div className="flex gap-3">
            {/* the provider's own logo, falling back to the generic tile when none is uploaded */}
            {provider.logo
                ? <img src={clinicProfilePic(provider.logo)} alt={`Logo of ${provider.name}`}
                    className="w-14 h-14 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                : <div className="w-14 h-14 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
                    <FaAmbulance className="text-cyan-600 text-xl" />
                </div>}
            <div className="flex-1 min-w-0">
                <div className="flex items-start gap-1">
                    <h3 className="font-semibold text-deep text-sm leading-tight flex-1">{provider.name}</h3>
                    {provider.verified === 1 && <MdVerified className="text-blue-500 flex-shrink-0 mt-0.5" />}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted mt-1">
                    <FaMapMarkerAlt className="text-cyan-600 flex-shrink-0 text-[10px]" />
                    <span className="truncate">{providerArea(provider)}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    {Number(provider.review_cnt) > 0 && <RatingChip rating={provider.rating} />}
                    {provider.review_cnt ? <span className="text-xs text-muted">({provider.review_cnt})</span> : null}
                    {provider.available_24x7 === 1 && (
                        <span className="text-[10px] font-medium text-green-700 bg-green-50 border border-green-200 px-1 py-0.5 rounded">
                            24×7
                        </span>
                    )}
                    {provider.categories.map((code) => (
                        <span key={code} className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100 text-[10px] font-semibold">
                            {categoryName(code)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
        {/* the fare and the fleet, the two numbers the desktop card puts in its right column */}
        <div className="flex items-end justify-between gap-2 mt-3 pt-3 border-t border-gray-100">
            {provider.base_fare > 0 ? (
                <div>
                    <span className="text-[10px] text-gray-500 block">Starting from</span>
                    <span className="flex items-center fs-17 font-bold text-gray-900 leading-tight">
                        <BiRupee className="shrink-0" />{provider.base_fare}
                    </span>
                </div>
            ) : <span />}
            <span className="fs-12 font-semibold text-red-700 border border-red-200 rounded-full px-2 py-0.5">
                {provider.fleet_size} Ambulance{provider.fleet_size === 1 ? '' : 's'}
            </span>
        </div>

        {/* z-10 lifts these clear of the stretched link above. whatsapp takes the second slot
            because the card itself already opens the detail page; without a number there is
            nothing to open, so that one falls back to Details */}
        <div className="relative z-10 flex gap-2 mt-3">
            <a href={`tel:${provider.mobile}`} className="button grow gap-1" data-size="small">
                <BiPhoneCall /> Call Now
            </a>
            {provider.whatsapp_number ? (
                <a href={`https://wa.me/${provider.whatsapp_number}?text=${encodeURIComponent(whatsappMessage(provider))}`}
                    target="_blank" rel="noopener noreferrer"
                    className="grow flex items-center justify-center gap-1.5 rounded-[.3rem] border font-semibold py-[.3rem] px-2 fs-14"
                    style={{ color: "#15803d", borderColor: "#15803d" }}>
                    <BsWhatsapp /> WhatsApp
                </a>
            ) : (
                <Link href={detailUrl(provider)} className="button grow gap-1" data-variant="outlined" data-size="small">
                    Details <BiChevronRight />
                </Link>
            )}
        </div>
    </div>
);

export const AmbulanceProviderListMobile = ({ allProviders }: { allProviders: TAmbulanceProvider[] }) => {
    const { filter, setFilter, providers, counts } = useFilteredProviders(allProviders);
    return (
        <div id="providers" className="px-4 py-5 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded-full"></div>
                    <h2 className="text-lg font-bold text-deep">Ambulance Providers</h2>
                </div>
                <span className="text-xs text-muted">{providers.length} listed</span>
            </div>
            <div className="mb-4 -mx-4 px-4">
                <FilterChips filter={filter} setFilter={setFilter} counts={counts} size="sm" codes={PRIMARY_FILTER_CODES} />
            </div>
            {providers.length === 0 ? <EmptyState /> : (
                <div className="space-y-3">
                    {providers.map((p) => <MobileCard key={p.id} provider={p} />)}
                </div>
            )}
        </div>
    );
};
