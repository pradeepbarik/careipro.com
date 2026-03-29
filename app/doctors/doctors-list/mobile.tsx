import Header from '@/app/components/mobile/header';
import PageHeading from '@/app/components/mobile/ui/page-heading';
import { TfetchDoctorsResponse } from '@/lib/hooks/useDoctors';
import NIsToOneDoctorsSliders from "../../components/mobile/doctors/vertical-slider";
import LookingFor from './mobile/looking-for';
import { capitalizeFirstLetter } from '@/lib/helper/format-text';
import { doctorsBySpecialistPageUrl } from '@/lib/helper/link';
import Link from 'next/link';
import { BiCurrentLocation } from 'react-icons/bi';
import { SectionHeading } from '@/app/components/mobile/ui';
import BreadCrumbs from '@/app/components/mobile/breadcrumb';
const DoctorListMobile = async ({ params, data }: { params: any, data: TfetchDoctorsResponse }) => {
    return (
        <>
            <Header template="SUBPAGE" headingElement='h2' heading={data.specialist_name} />
            <PageHeading heading={data.seo_dt.h1} />
            {data.doctors.length === 0 ?
                <>
                    <div className="px-2 py-4 flex justify-center">
                        <img src='/icon/no-data.png' className='h-32' />
                    </div>
                    <p className='text-center mb-4'>No Doctors found</p>
                </> : <></>
            }
            <NIsToOneDoctorsSliders data={data.doctors.slice(0, 2)} showAvaileTime={true} />
            {data.cityMarkets.length > 0 ?
                <div className="px-2">
                    <div className='bg-gray-100'>
                        <h2 className='font-semibold px-2 py-2 fs-16 rounded-t-md border-l border-r border-t border-t-sky-400 border-l-sky-400 border-r-sky-400'>
                            <BiCurrentLocation className='color-primary inline-block mr-2' />
                            {capitalizeFirstLetter(data.specialist_name)} in other area of {capitalizeFirstLetter(params.city)}
                        </h2>
                        <div className='border border-sky-300 rounded-b-md px-2 py-1 flex flex-wrap gap-2 mb-2'>
                            {data.cityMarkets.map((city) => (
                                <Link
                                    href={doctorsBySpecialistPageUrl(params.seo_url, `CATG${params.cat_id}-${params.group_cat}`, params.state, params.city, { market_name: city.market_name })}
                                    key={city.city}
                                    className='px-2 py-2 border rounded-md bg-white text-center click font-medium'
                                >
                                    {capitalizeFirstLetter(city.market_name)}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div> : <></>
            }
            <NIsToOneDoctorsSliders data={data.doctors.slice(2, 4)} showAvaileTime={true} />
            {data.neabyCities.length > 0 ? <>
                <div className="px-2">
                    <div className='bg-gray-100 flex'>
                        <h2 className='font-semibold px-2 py-2 fs-16 rounded-t-md border-l border-r border-t border-t-sky-400 border-l-sky-400 border-r-sky-400 w-full'>
                            <BiCurrentLocation className='color-primary inline-block mr-2' />
                            {capitalizeFirstLetter(data.specialist_name)} in Nearby cities of {capitalizeFirstLetter(params.city)}
                        </h2>
                    </div>
                    <div className='border border-sky-300 rounded-b-md px-2 py-1 flex flex-wrap gap-2 mb-2'>
                        {data.neabyCities.map((city) => (
                            <Link
                                href={doctorsBySpecialistPageUrl(params.seo_url, `CATG${params.cat_id}-${params.group_cat}`, params.state, city.city)}
                                key={city.city}
                                className='px-2 py-2 border rounded-md bg-white text-center click font-medium'
                            >
                                {capitalizeFirstLetter(city.city)}
                            </Link>
                        ))}
                    </div>
                </div>
            </> : <></>}
            <NIsToOneDoctorsSliders data={data.doctors.slice(4, data.doctors.length)} showAvaileTime={true} />
            <LookingFor specialist_id={params.cat_id} />
            {data.faqs && data.faqs.length > 0 ? <>
                <div className="px-3 mt-6 mb-4">
                    <h2 className='font-bold text-lg text-gray-800 mb-4 flex items-center gap-2'>
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-1">
                        {data.faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="group bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <summary className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-3 pr-2">
                                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <span className="font-medium text-gray-800 text-sm leading-relaxed">
                                            {faq.question}
                                        </span>
                                    </div>
                                </summary>
                                <div className="px-4 pt-0">
                                    <div className="pl-9 border-l-2 border-primary/20 ml-3">
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </> : <></>}
            <BreadCrumbs data={[
                { label: "Home", href: "https://careipro.com" },
                { label: capitalizeFirstLetter(params.city), href: `https://careipro.com/${params.state}/${params.city}` },
                { label: `Doctors in ${capitalizeFirstLetter(params.city)}`, href: `https://careipro.com/${params.state}/${params.city}/best-doctors` },
                { label: data.specialist_name },
            ]} />
        </>
    )
}
export default DoctorListMobile;