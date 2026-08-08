import Link from 'next/link';
import { BiSearch, BiUser, BiVideo, BiCapsule, BiChevronRight } from 'react-icons/bi';
import { searchPageUrl } from '@/lib/helper/link';
import SwiperBanner from '@/app/components/mobile/ui/swiper-banner';
const HomepageTopBanner = ({ state, city }: { state: string, city: string }) => {
    const hirePersonalAssistant = `/${state}/${city}/hire-personal-assistant?utm_source=careipro&utm_medium=home-top-banner&utm_campaign=hire-personal-assistant`;
    const doctorsListHref = `/${state}/${city}/best-doctors?utm_source=careipro&utm_medium=home-top-banner&utm_campaign=doctors-vertical-homepage`;
    const quickActions = [
        
        { title: 'Hire Personal Assistant', subtitle: 'We will handle everything', icon: BiUser, color: 'bg-teal-500', href: hirePersonalAssistant },
        { title: 'Book Appointment', subtitle: 'Find & Book Doctors', icon: BiUser, color: 'bg-cyan-600', href: doctorsListHref },
       // { title: 'Order Medicine', subtitle: 'From Local Medicines stores', icon: BiCapsule, color: 'bg-orange-400', href: '/medicine' },
        // { title: 'Video Consultation', subtitle: 'Consult online with doctors', icon: BiVideo, color: 'bg-blue-600', href: doctorsListHref },
    ];
    return (
        <div className="px-2 relative">
            <SwiperBanner banners={[
                <div className="relative rounded-md overflow-hidden">
                    <img src="/banners/top-banner2.png" alt="Your Health, Our Care" className="w-full h-auto block rounded-md" />
                    <div className="absolute bottom-4 flex flex-col justify-center gap-2 pl-2 py-3" style={{ maxWidth: '68%' }}>
                        <Link
                            href={searchPageUrl(state, city)}
                            className="bg-white rounded-full flex items-center gap-2 px-3 py-2 shadow-md mt-1"
                            style={{ maxWidth: '92%' }}
                        >
                            <BiSearch className="text-gray-400 text-lg shrink-0" />
                            <span className="text-gray-400 fs-13 truncate">Search doctors, clinics, hospitals...</span>
                        </Link>
                    </div>
                </div>,
                <div className="relative rounded-md overflow-hidden">
                    <Link href={`/business-listing/hospital-clinic?utm_source=careipro&utm_medium=home-top-banner&utm_campaign=register-clinic-banner`}>
                    <img src="/banners/register-clinic-banner.png" alt="Your Health, Our Care" className="w-full h-auto block rounded-md" />
                    </Link>
                </div>,
                <div className="relative rounded-md overflow-hidden">
                    <Link href={`/business-listing/hospital-clinic?utm_source=careipro&utm_medium=home-top-banner&utm_campaign=personalised-website-banner`}>
                    <img src="/banners/personalised-website.png" alt="Your Health, Our Care" className="w-full h-auto block rounded-md" />
                    </Link>
                </div>
            ]} />

            <div className="-mt-3 relative z-10 px-2">
                <div className="flex overflow-x-auto gap-2 hide-scroll-bar rounded-md">
                    {quickActions.map((action) => (
                        <Link key={action.title} href={action.href} className="bg-white border rounded-lg p-2 flex items-center gap-2 shadow-sm shrink-0" style={{ width: '75%' }}>
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${action.color}`}>
                                <action.icon className="text-white text-lg" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="fs-14 font-semibold text-cyan-900">{action.title}</span>
                                <span className="fs-10 color-text-light">{action.subtitle}</span>
                            </div>
                            <div className='ml-auto'>
                                <BiChevronRight className="text-gray-400 text-lg shrink-0 ml-auto" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default HomepageTopBanner;
