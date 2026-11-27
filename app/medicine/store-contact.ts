/* Shared by the store list card and the store detail page so both open the same chat. */

/** wa.me needs the country code, stores usually save a plain 10 digit number */
/* "prescription" orders for home delivery. "prescription_check" is for a store that does not
   deliver: the person only wants to know the medicines are in stock before going there */
const MESSAGES = {
    order: (storeName: string) => `Hi,\nI found *${storeName}* on careipro.com. I want to order medicines.`,
    prescription: (storeName: string) => `Hi,\nI found *${storeName}* on careipro.com. I want to order the medicines on my prescription, sending a photo of it here.`,
    prescription_check: (storeName: string) => `Hi,\nI found *${storeName}* on careipro.com. I am sending a photo of my prescription, are these medicines available at your store? I will come to pick them up.`,
};

export const storeWhatsappLink = (number: string, storeName: string, purpose: keyof typeof MESSAGES = "order") => {
    const digits = number.replace(/\D/g, "");
    const full = digits.length === 10 ? `91${digits}` : digits;
    const message = MESSAGES[purpose](storeName);
    return `https://wa.me/${full}?text=${encodeURIComponent(message)}`;
};

/* rough box around India. a store saved with coordinates outside it (a typo such as
   12.33, 17.23 lands in Africa) is sent to a maps search by name instead */
const isInIndia = (lat: number, lng: number) => lat >= 6 && lat <= 37.5 && lng >= 68 && lng <= 97.5;

/** Google Maps directions to the store, by its coordinates when they look right, otherwise by
    searching its name and address */
export const storeDirectionsLink = (params: { lat: number | string | null, lng: number | string | null, name: string, address: string }) => {
    const lat = Number(params.lat), lng = Number(params.lng);
    if (Number.isFinite(lat) && Number.isFinite(lng) && isInIndia(lat, lng)) {
        return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${params.name}, ${params.address}`)}`;
};

/** joins address parts, skipping empty and repeated ones ("Kuansh, Kuansh,Bhadrak") */
export const joinAddress = (parts: Array<string | null | undefined>) => {
    const seen = new Set<string>();
    const out: string[] = [];
    /* a single field often holds several pieces itself ("Kuansh,Bhadrak"), so each is split
       on its commas before the repeats are dropped */
    for (const piece of parts.flatMap((part) => (part || "").split(","))) {
        const value = piece.trim();
        if (value && !seen.has(value.toLowerCase())) {
            seen.add(value.toLowerCase());
            out.push(value);
        }
    }
    return out.join(", ");
};
