/* what the phone and desktop appointment detail pages share, kept in one place so the two can not
   drift apart on what a status is called or which cancel reasons a patient is offered */
export const OTHER_CANCEL_REASON = "Other reason";
export const CANCEL_REASONS = [
    "My plans have changed",
    "I am not available at the booked time",
    "Feeling better, no longer need to visit",
    "I booked by mistake / duplicate booking",
    "I found another doctor",
    "Clinic is too far from my location",
    "Consultation charges are high",
    OTHER_CANCEL_REASON
];
export const isCancelledStatus = (status: string) => status === "patient_cancelled" || status === "doctor_cancelled";
/* an outlined pill, each status in its own colour so it reads at a glance */
const outlined = "border bg-white";
export const statusBadge = (status: string): { label: string, className: string } => {
    switch (status) {
        case "confirmed":
            return { label: "Confirmed", className: `${outlined} border-primary text-primary` };
        case "waiting":
            return { label: "Waiting", className: `${outlined} border-amber-500 text-amber-600` };
        case "consulting":
            return { label: "Consulting", className: `${outlined} border-blue-500 text-blue-600` };
        case "consulted":
        case "completed":
            return { label: "Consulted", className: `${outlined} border-green-600 text-green-700` };
        case "patient_cancelled":
            return { label: "Cancelled by you", className: `${outlined} border-red-500 text-red-600` };
        case "doctor_cancelled":
            return { label: "Cancelled by clinic", className: `${outlined} border-orange-500 text-orange-600` };
        default:
            return { label: (status || "").replace(/_/g, " "), className: `${outlined} border-gray-400 text-gray-600 capitalize` };
    }
}
/* support_no is stored without the country code, wa.me needs the full international number */
export const supportWhatsappUrl = (support_no: string, params: { case_id: number, booking_id: number, doctor_name: string, consult_date: string }) => {
    const text = `Hi, I need help with my appointment. Case No: ${params.case_id}, Booking ID: ${params.booking_id}, ${params.doctor_name}, ${params.consult_date}`;
    return `https://wa.me/91${support_no}?text=${encodeURIComponent(text)}`;
}
export const directionsUrl =(lat: string, lng: string) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
