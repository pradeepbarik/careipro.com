import Link from 'next/link';
import { THomePageData } from '@/lib/types/home-page';
import { verticalIcon } from '@/lib/image';
const Verticals = ({ data }: { data: THomePageData['verticals'] }) => {
    return <>
        <div className='flex overflow-auto hide-scroll-bar cp-section' style={{ gap: '2%' }}>
            {data.map((vertical) =>
                <div className='flex flex-col flex-shrink-0 bg-white' style={{ width: '25%' }}>
                    <div className='w-full h-24 flex items-center'>
                        <img src={verticalIcon(vertical.icons)} alt={vertical.label} className='mx-3' />
                    </div>
                    <Link href={vertical.url} className='font-semibold text-center mx-2 py-2 overflow-hidden'>{vertical.label}</Link>
                </div>
            )}
        </div>
    </>
}
export default Verticals;