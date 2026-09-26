export type TLatLng = { lat: number, lng: number }
const EARTH_RADIUS_KM = 6371;
const toRadians = (degrees: number) => degrees * Math.PI / 180;
/* Great circle distance between two points. Straight line, not road distance, so it
   always reads a little shorter than what a maps app will quote for the drive. */
export const distanceInKm = (from: TLatLng, to: TLatLng) => {
    /* the clinic api sends lat/lng as strings, so coerce rather than rely on
       javascript quietly doing it inside the arithmetic below */
    const fromLat = Number(from.lat), fromLng = Number(from.lng);
    const toLat = Number(to.lat), toLng = Number(to.lng);
    const dLat = toRadians(toLat - fromLat);
    const dLng = toRadians(toLng - fromLng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(fromLat)) * Math.cos(toRadians(toLat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
export const formatDistance = (km: number) => {
    if (km < 1) {
        return `${Math.round(km * 100) * 10} m away`;
    }
    return `${km.toFixed(1)} km away`;
}
/* 0/0 is what the db holds for a clinic whose coordinates were never filled in */
export const hasCoordinates = (point: { lat: number | null, lng: number | null }) => {
    return Boolean(point.lat && point.lng);
}
