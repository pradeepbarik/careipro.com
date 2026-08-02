import Link from 'next/link';
import { THomePageData } from '@/lib/types/home-page';
import { verticalIcon } from '@/lib/image';
const Verticals = ({ data }: { data: THomePageData['verticals'] }) => {
    return <>
        <div className='flex overflow-auto hide-scroll-bar cp-section' style={{ gap: '2%' }}>
            {data.map((vertical) =>
                <Link key={vertical.label} href={`/${vertical.url}`} title={`${vertical.label} - careipro`} className='flex flex-col flex-shrink-0 bg-white click shadow-sm rounded-sm' style={{ width: '28%' }}>
                    <div className='w-full h-24 flex items-center'>
                        <img src={verticalIcon(vertical.icons)} alt={vertical.label} className='mx-3' />
                    </div>
                    <span  className='font-semibold text-center mx-2 py-2 overflow-hidden'>{vertical.label}</span>
                </Link>
            )}
        </div>
    </>
}
export default Verticals;