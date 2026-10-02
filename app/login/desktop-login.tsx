import { BiCalendarCheck, BiHistory, BiBell, BiGift } from "react-icons/bi";
import Login from '@/app/components/mobile/login';

/* what an account actually gets the visitor, the same four the page metadata promises */
const benefits = [
    { icon: BiCalendarCheck, title: "Book instantly", note: "Pick a doctor and a slot in a few clicks" },
    { icon: BiHistory, title: "Your appointment history", note: "Every past visit and prescription in one place" },
    { icon: BiBell, title: "Timely reminders", note: "We tell you before your consultation is due" },
    { icon: BiGift, title: "Offers near you", note: "Health offers from clinics in your city" },
];

/**
 * The desktop login page. The flow itself is the shared Login component, the same one the booking
 * form embeds, so the steps and the otp handling stay in one place. useLogin reads redirect_url off
 * the query string on its own, which is why nothing is passed down for it here.
 */
const LoginDesktop = () => {
    return (
        <div className="bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden grid grid-cols-[5fr_4fr]">
                {/* why bother signing in, so the form is not asking for a number with nothing offered */}
                <div className="bg-primary text-white p-8 relative overflow-hidden">
                    <span className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" aria-hidden="true"></span>
                    <span className="absolute -left-12 -bottom-20 h-48 w-48 rounded-full bg-white/10" aria-hidden="true"></span>
                    <h1 className="text-2xl font-bold leading-tight relative">Login or create your free account</h1>
                    <p className="fs-14 text-white/85 mt-2 relative">
                        One number is all it takes. No password to remember.
                    </p>
                    <ul className="mt-7 flex flex-col gap-4 relative">
                        {benefits.map((benefit) => (
                            <li key={benefit.title} className="flex items-start gap-3">
                                <span className="h-9 w-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                                    <benefit.icon className="text-lg" />
                                </span>
                                <span className="min-w-0">
                                    <span className="block font-semibold fs-14">{benefit.title}</span>
                                    <span className="block fs-13 text-white/75 leading-snug">{benefit.note}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-6 flex flex-col justify-center min-w-0">
                    <Login />
                </div>
            </div>
        </div>
    );
};

export default LoginDesktop;
