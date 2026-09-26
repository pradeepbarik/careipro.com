'use client'
import { useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { userlatlng } from '@/constants/storage_keys';
import { distanceInKm, formatDistance, hasCoordinates, TLatLng } from '@/lib/helper/distance';

/* Distance from the visitor to this clinic.

   Location is asked for on tap rather than on page load. A permission prompt that
   appears unprompted is usually dismissed, and a dismissal is sticky per origin, so
   auto asking here would cost the feature everywhere else on the site too.

   Once granted the position is kept in localStorage under the key the app already
   reserves for it, so other clinics resolve straight away without asking again. */
const POSITION_MAX_AGE_MS = 30 * 60 * 1000;
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
const storePosition = (position: TLatLng) => {
    try {
        localStorage.setItem(userlatlng, JSON.stringify({ ...position, at: Date.now() }));
    } catch {
        /* private mode or blocked storage, the distance still shows for this view */
    }
}

const ClinicDistance = ({ lat, lng }: { lat: number, lng: number }) => {
    const [distance, setDistance] = useState<number | null>(null);
    const [status, setStatus] = useState<"idle" | "locating" | "failed" | "unsupported">("idle");
    const clinic = { lat, lng };

    /* Support is decided here rather than during render. Node defines a global
       navigator with no geolocation on it, so testing it while rendering makes the
       server and the browser disagree and breaks hydration. */
    useEffect(() => {
        if (!navigator.geolocation) {
            setStatus("unsupported");
            return;
        }
        const stored = readStoredPosition();
        if (stored) {
            setDistance(distanceInKm(stored, clinic));
        }
    }, [lat, lng]);

    if (!hasCoordinates(clinic)) {
        return <></>
    }
    if (distance !== null) {
        return <span className="text-gray-400">· {formatDistance(distance)}</span>
    }
    const requestLocation = () => {
        setStatus("locating");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const here = { lat: position.coords.latitude, lng: position.coords.longitude };
                storePosition(here);
                setDistance(distanceInKm(here, clinic));
                setStatus("idle");
            },
            () => { setStatus("failed") },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: POSITION_MAX_AGE_MS }
        );
    }
    if (status === "failed" || status === "unsupported") {
        return <></>
    }
    return (
        <button onClick={requestLocation} disabled={status === "locating"}
            className="inline-flex items-center gap-1 text-cyan-700 font-semibold">
            <BiCurrentLocation />{status === "locating" ? "Locating…" : "Show distance"}
        </button>
    )
}
export default ClinicDistance;
