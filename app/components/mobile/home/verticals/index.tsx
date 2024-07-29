import { THomePageData } from '@/lib/types/home-page';
import { verticalIcon } from '@/lib/image';
const Verticals = ({ data }: { data: THomePageData['verticals'] }) => {
    return <>
        <div className='flex overflow-auto cp-section' style={{ gap: '2%' }}>
            {data.map((vertical) =>
                <div className='flex flex-col flex-shrink-0 bg-white' style={{ width: '23%' }}>
                    <img src={verticalIcon(vertical.icons)} alt={vertical.label} className='mx-3' />
                    <span className='font-semibold text-center mx-2 py-2 mt-1 overflow-hidden'>{vertical.label}</span>
                </div>
            )}
        </div>
    </>
}
export default Verticals;