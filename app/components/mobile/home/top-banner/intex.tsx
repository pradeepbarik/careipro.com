import Link from 'next/link';
import { BiSearch, BiChevronRight } from 'react-icons/bi';
import { TbStethoscope, TbDeviceMobileMessage, TbVaccineBottle } from 'react-icons/tb';
import { searchPageUrl } from '@/lib/helper/link';

const HomepageTopBanner = ({ state, city }: { state: string, city: string }) => {
    const doctorsListHref = `/${state}/${city}/best-doctors`;
    const quickActions = [
        { title: 'Book a Doctor', subtitle: 'Find & book doctors', icon: TbStethoscope, color: 'bg-teal-500', href: doctorsListHref },
        { title: 'Video Consultation', subtitle: 'Consult online with doctors', icon: TbDeviceMobileMessage, color: 'bg-blue-600', href: doctorsListHref },
        { title: 'Order Medicine', subtitle: 'Medicines at your doorstep', icon: TbVaccineBottle, color: 'bg-emerald-500', href: '/medicine' },
    ];
    return (
        <div className="px-2">
            <div
                className="relative rounded-xl overflow-hidden px-4 pt-5 pb-9 bg-cover"
                style={{
                    backgroundImage: 'url(/top-banner2.png)',
                    backgroundPosition: 'right center',
                    backgroundColor: '#0f2942',
                }}
            >
                <h1 className="text-white font-bold" style={{ fontSize: '1.4rem', lineHeight: 1.25 }}>
                    Your Health,<br />
                    <span className="color-primary">Our Care.</span>
                </h1>
                <p className="text-white/80 fs-13 mt-1 mb-4" style={{ maxWidth: '80%' }}>
                    Find trusted healthcare services near you.
                </p>
                <Link
                    href={searchPageUrl(state, city)}
                    className="bg-white rounded-2xl flex items-center gap-2 px-3 py-2.5 shadow-md"
                >
                    <BiSearch className="text-gray-400 text-lg shrink-0" />
                    <span className="text-gray-400 fs-13 truncate">Search doctors, clinics, hospitals...</span>
                </Link>
            </div>
            <div className="-mt-5 relative z-10 flex gap-1">
                {quickActions.map((action) => (
                    <Link key={action.title} href={action.href} className="bg-white border rounded-lg p-2 flex items-center gap-2 shadow-sm flex-1 min-w-0">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${action.color}`}>
                            <action.icon className="text-white text-lg" />
                        </div>
                        <div className="flex flex-col min-w-0 grow">
                            <span className="fs-12 font-semibold leading-tight truncate">{action.title}</span>
                            <span className="fs-10 color-text-light leading-tight truncate">{action.subtitle}</span>
                        </div>
                        <BiChevronRight className="text-gray-400 text-lg shrink-0" />
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default HomepageTopBanner;
