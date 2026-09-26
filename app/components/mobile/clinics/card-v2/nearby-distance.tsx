'use client'
import { useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { userlatlng } from '@/constants/storage_keys';
import { distanceInKm, formatDistance, hasCoordinates, TLatLng } from '@/lib/helper/distance';

/* Distance on a list, which is a different problem from distance on a detail page.

   A dozen cards must not each grow their own "Show distance" button, and must not each
   ask for permission. So the ask happens once, from a single control above the list,
   and every card listens for the answer. The cards themselves stay server rendered,
   which matters because these listing pages are indexed. */
const POSITION_MAX_AGE_MS = 30 * 60 * 1000;
const POSITION_EVENT = "careipro:position";
type TStoredPosition = TLatLng & { at: number }

const readStoredPosition = (): TLatLng | null => {
    try {
        const raw = localStorage.getItem(userlatlng);
        if (!raw) {
            return null;
        }
        const stored: TStoredPosition = JSON.parse(raw);
        if (!stored.at || Date.now() - stored.at > POSITION_MAX_AGE_MS) {
            return null;
        }
        return { lat: stored.lat, lng: stored.lng };
    } catch {
        return null;
    }
}

/* Shared by every card on the page. Reads what is already stored on mount and then
   waits, so a card shows a distance straight away when the visitor granted location
   earlier somewhere else on the site. */
const usePosition = () => {
    const [position, setPosition] = useState<TLatLng | null>(null);
    useEffect(() => {
        setPosition(readStoredPosition());
        const onPosition = () => setPosition(readStoredPosition());
        window.addEventListener(POSITION_EVENT, onPosition);
        return () => window.removeEventListener(POSITION_EVENT, onPosition);
    }, []);
    return position;
}

/* The single ask, sitting above the list. Hides itself once a position is known,
   since there is then nothing left to ask for. */
export const NearbyToggle = () => {
    const position = usePosition();
    const [status, setStatus] = useState<"idle" | "locating" | "failed" | "unsupported">("idle");

    /* Support is decided in an effect, not during render: node defines a global
       navigator with no geolocation on it, so testing it while rendering makes the
       server and the browser disagree and breaks hydration. */
    useEffect(() => {
        if (!navigator.geolocation) {
            setStatus("unsupported");
        }
    }, []);

    if (position || status === "unsupported" || status === "failed") {
        return <></>
    }
    const requestLocation = () => {
        setStatus("locating");
        navigator.geolocation.getCurrentPosition(
            (result) => {
                const here = { lat: result.coords.latitude, lng: result.coords.longitude };
                try {
                    localStorage.setItem(userlatlng, JSON.stringify({ ...here, at: Date.now() }));
                } catch {
                    /* private mode or blocked storage. the event below still updates this view */
                }
                setStatus("idle");
                window.dispatchEvent(new Event(POSITION_EVENT));
            },
            () => { setStatus("failed") },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: POSITION_MAX_AGE_MS }
        );
    }
    return (
        <button onClick={requestLocation} disabled={status === "locating"}
            className="flex items-center gap-1 fs-13 font-semibold text-cyan-700 px-3 py-2">
            <BiCurrentLocation />{status === "locating" ? "Locating…" : "Show distance from me"}
        </button>
    )
}

/* Renders nothing at all until a position is known, so a card never carries an empty
   slot or a second ask. */
export const ClinicDistance = ({ lat, lng }: { lat: number, lng: number }) => {
    const position = usePosition();
    const clinic = { lat, lng };
    if (!position || !hasCoordinates(clinic)) {
        return <></>
    }
    return <span className="text-gray-400 text-nowrap">· {formatDistance(distanceInKm(position, clinic))}</span>
}
