/**
 * What the caretaker page sells, as data.
 *
 * The page settings document decides which of these sections appear and in what order, but the
 * services and the prices inside each one are careipro's own and are not configurable, so they live
 * here rather than in the cache. Pulling them out of the markup means the phone and the desktop
 * pages quote the same prices: they were written out by hand in the mobile page, and a second copy
 * in the desktop one is how two screens end up advertising different rates.
 */

export type TPriceTile = { label: string, price: string, note?: string, highlight?: boolean };
export type TServiceTile = { icon: string, name: string, description: string, price: string, enquiry: string };
export type TBestValue = { badge: string, title: string, subtitle: string, price: string };

/* hospital attendant, the block the page opens its sections with */
export const PATIENT_CARE_POINTS = [
    "Staying with patient behalf of family member",
    "Help in bathing, toileting & feeding",
    "Mobility assistance with wheelchair",
];
export const PATIENT_CARE_PRICES: TPriceTile[] = [
    { label: "1 hour", price: "₹99" },
    { label: "6 hours", price: "₹399" },
    { label: "10 hours", price: "₹599", highlight: true },
    { label: "24 hours", price: "₹999" },
];
export const PATIENT_CARE_ENQUIRY = "Hi, I need a caretaker for patient in hospital";

export const HOUSE_HELP_SERVICES: TServiceTile[] = [
    { icon: "🚽", name: "Bathroom Cleaning", description: "Deep cleaning service", price: "₹149 / visit", enquiry: "Hi, I need a caretaker for bathroom cleaning" },
    { icon: "🍳", name: "Kitchen & Utensils", description: "Complete kitchen care", price: "₹199 / visit", enquiry: "Hi, I need a caretaker for kitchen and utensils" },
    { icon: "👕", name: "Washing Clothes", description: "Laundry service", price: "₹129 / visit", enquiry: "Hi, I need a caretaker for washing clothes" },
    { icon: "🧹", name: "Sweeping & Mopping", description: "Floor cleaning", price: "₹159 / visit", enquiry: "Hi, I need a caretaker for sweeping and mopping" },
    { icon: "🎉", name: "Pre Party Cleaning", description: "Get ready for guests", price: "₹299 / visit", enquiry: "Hi, I need a caretaker for pre party cleaning" },
    { icon: "✨", name: "Post Party Cleaning", description: "Quick cleanup service", price: "₹349 / visit", enquiry: "Hi, I need a caretaker for post party cleaning" },
];

export const COOKING_SLOTS = [
    { icon: "🌅", name: "Breakfast", time: "7-10 AM" },
    { icon: "☀️", name: "Lunch", time: "12-2 PM" },
    { icon: "🌙", name: "Dinner", time: "7-9 PM" },
];

export const BABY_CARE_PRICES: TPriceTile[] = [
    { label: "1 hour", price: "₹150" },
    { label: "2 hours", price: "₹250" },
    { label: "8 hours", price: "₹600" },
];
export const SENIOR_CARE_PRICES: TPriceTile[] = [
    { label: "1 hour", price: "₹200" },
    { label: "2 hours", price: "₹300" },
    { label: "9 hours", price: "₹700" },
];
export const MASSAGE_PRICES: TPriceTile[] = [
    { label: "15 Days", price: "₹5000", note: "30 - 45 Min" },
    { label: "7 Week", price: "₹2500", note: "30 - 45 Min" },
    { label: "3 Days", price: "₹1500", note: "30 - 45 Min" },
];

export const MONTHLY_CARE: TBestValue = {
    badge: "30d", title: "8 - 9 Hours/Day", subtitle: "For 1 Month", price: "₹13,000 - ₹15,000"
};
export const MONTHLY_MASSAGE: TBestValue = {
    badge: "30d", title: "30 - 45 Min every day", subtitle: "For 1 Month", price: "₹8500"
};

export const whatsappEnquiry = (supportNumber: string | number, message: string) =>
    `https://wa.me/${supportNumber}?text=${encodeURIComponent(message)}`;
