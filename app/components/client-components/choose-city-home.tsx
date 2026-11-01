'use client'
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { BiChevronRight, BiMap, BiUser, BiX } from "react-icons/bi";
import { verticalIcon } from "@/lib/image";
import { useCookies } from "@/lib/hooks/useCookies";
import { chosen_city } from "@/constants/storage_keys";
import { VERTICAL_TILES } from "@/constants/verticals";

export type TServiceCity = { id: number, name: string, state: string };

/* The front door's working parts, for a visitor who has not told us where they are.
 *
 * Every link on this page needs a city in it, and we do not have one, so the picker opens straight
 * away. Behind it the page still shows what careipro does, so somebody who closes the picker is
 * looking at a real page rather than a blank one, and anything they tap opens it again.
 *
 * Tapping a service remembers which one: pick a city after tapping Doctors and you land on that
 * city's doctors, not just its home page.
 */
const titleCase = (value: string) =>
    value.replace(/(^|[\s-])([a-z])/g, (_, before, letter) => before + letter.toUpperCase());
const citySlug = (value: string) => value.toLowerCase().replace(/ /g, "-");

const ChooseCityHome = ({ cities, isMobile, children }: { cities: TServiceCity[], isMobile: boolean, children?: ReactNode }) => {
    const router = useRouter();
    const { setCookie } = useCookies();
    /* open from the start, which is the whole point of this page. it is a state rather than a
       constant so closing it leaves a usable page behind */
    const [open, setOpen] = useState(true);
    /* the service they tapped before choosing, so the city takes them straight there */
    const [pendingPath, setPendingPath] = useState("");
    /* set while leaving for an already chosen city, so the question is not shown on the way out */
    const [leaving, setLeaving] = useState(false);

    /* Coming back here after a city was chosen, by the back button or by the browser restoring the
       page, this is served from cache and would ask all over again. The cookie the middleware reads
       is httpOnly and invisible to script, so the choice is mirrored in storage and read here.
       pageshow covers the restore, which fires no effects of its own. */
    useEffect(() => {
        const goToChosenCity = () => {
            try {
                const saved = window.localStorage.getItem(chosen_city);
                if (!saved) return;
                const { state, city } = JSON.parse(saved);
                if (!state || !city) return;
                setLeaving(true);
                router.replace(`/${state}/${city}`);
            } catch {
                //unreadable storage is no reason to break the page, the picker still works
            }
        };
        goToChosenCity();
        window.addEventListener("pageshow", goToChosenCity);
        return () => { window.removeEventListener("pageshow", goToChosenCity) };
        // eslint-disable-next-line
    }, []);

    //the page behind must not scroll under the picker
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = "" };
    }, [open]);

    const onPickCity = async (city: TServiceCity) => {
        const base = `/${citySlug(city.state)}/${citySlug(city.name)}`;
        /* written here rather than left to SetStateCity, which only renders on a city's home page.
           choosing Doctors sends them to that city's doctors instead, and without this their choice
           would go unrecorded and / would ask them all over again. */
        const expire = moment().add(2, 'years').format('YYYY-MM-DD');
        try {
            await Promise.all([
                setCookie("state", citySlug(city.state), { expire, httpOnly: true }),
                setCookie("city", citySlug(city.name), { expire, httpOnly: true }),
            ]);
        } catch {
            //a cookie that would not save is no reason to keep them on this page
        }
        /* remembered where script can read it: coming back to this page later, the effect above
           uses it to move on rather than ask again */
        try {
            window.localStorage.setItem(chosen_city, JSON.stringify({ state: citySlug(city.state), city: citySlug(city.name) }));
        } catch {
            //private browsing can refuse this, the cookie above still carries the choice
        }
        setLeaving(true);
        if (!pendingPath) {
            /* the chooser is a gate, not a place: it gives up its slot in history so going back
               from the city never lands on the question */
            router.replace(base);
            return;
        }
        router.push(`${base}/${pendingPath}`);
    };
    const openFor = (path: string) => {
        setPendingPath(path);
        setOpen(true);
    };

    const byState = cities.reduce((acc: Record<string, TServiceCity[]>, city) => {
        acc[city.state] = [...(acc[city.state] || []), city];
        return acc;
    }, {});

    /* on the way to a city, so the question is held back rather than flashed up for the moment the
       navigation takes */
    if (leaving) {
        return <div className="max-w-5xl mx-auto px-4 py-16 text-center text-gray-500 fs-14">Taking you there...</div>;
    }

    return (
        <>
            {/* the same header the city home carries on a phone, where the layout provides none.
                the pill opens the picker rather than going to the cities page: it is already on
                this screen. on desktop the site header has its own city dropdown. */}
            {isMobile &&
                <div className="flex items-center px-2 py-2 bg-white">
                    <img src="/careipro-primary-logo.png" alt="Careipro logo" className="h-8 w-auto" />
                    <div className="ml-auto flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => { openFor("") }}
                            className="px-3 py-1.5 flex items-center gap-1 fs-13 font-semibold capitalize rounded-full"
                            style={{ border: '1px solid var(--border-color)' }}
                        >
                            <HiLocationMarker className="color-primary text-base shrink-0" />
                            Your Location
                            <AiFillCaretDown className="fs-11" />
                        </button>
                        <Link href="/my-profile" title="My Profile"
                            className="flex items-center justify-center rounded-full shrink-0"
                            style={{ width: '2.2rem', height: '2.2rem', background: 'var(--primary-color)' }}>
                            <BiUser className="text-white text-lg" />
                        </Link>
                    </div>
                </div>}

            {children}

            <div className="max-w-5xl mx-auto px-4 py-2">
                <h2 className="text-xl font-bold text-gray-800">Our services</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-5">
                    {VERTICAL_TILES.map((tile) => (
                        <button
                            key={tile.label}
                            type="button"
                            onClick={() => { openFor(tile.path) }}
                            className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col items-center text-center hover:border-cyan-300 hover:shadow-sm transition-all"
                        >
                            <img src={verticalIcon(tile.icon)} alt={tile.label} className="h-20 w-full object-contain" />
                            <span className="font-semibold fs-13 mt-2">{tile.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {open &&
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => { setOpen(false) }} aria-hidden="true" />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Choose your city"
                        /* a sheet from the bottom on a phone, a card in the middle on a wide screen */
                        className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[85vh] flex flex-col"
                    >
                        <div className="flex items-start gap-3 px-5 pt-5 pb-3 border-b border-gray-100">
                            <div className="grow">
                                <h2 className="text-lg font-bold text-gray-800">Choose your city</h2>
                                <p className="fs-13 text-gray-600 mt-1">
                                    So we can show you doctors, clinics and medicine stores near you.
                                </p>
                            </div>
                            <button type="button" aria-label="Close" onClick={() => { setOpen(false) }}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                <BiX className="text-xl text-gray-700" />
                            </button>
                        </div>
                        <div className="overflow-auto">
                            {cities.length === 0 ?
                                /* the list comes from a cache file, an empty one must not look like a bug */
                                <p className="p-6 text-center fs-14 text-gray-500">
                                    We could not load the list of cities just now. Please refresh the page.
                                </p> :
                                Object.keys(byState).map((state) => (
                                    <div key={state}>
                                        <p className="px-5 pt-4 pb-2 fs-12 font-semibold text-gray-400 uppercase tracking-wide">
                                            {titleCase(state)}
                                        </p>
                                        <ul>
                                            {byState[state].map((city) => (
                                                <li key={city.id}>
                                                    <button type="button" onClick={() => { onPickCity(city) }}
                                                        className="w-full flex items-center gap-3 px-5 py-3.5 border-t border-gray-100 hover:bg-cyan-50 transition-colors text-left">
                                                        <span className="w-9 h-9 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                                                            <BiMap className="text-lg" />
                                                        </span>
                                                        <span className="font-semibold text-gray-800 grow">{titleCase(city.name)}</span>
                                                        <BiChevronRight className="text-xl text-gray-400 shrink-0" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                        </div>
                        <p className="px-5 py-3 fs-12 text-gray-500 border-t border-gray-100">
                            Not on the list yet? We are adding cities as we go.
                        </p>
                    </div>
                </div>}
        </>
    );
};
export default ChooseCityHome;
