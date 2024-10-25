import React from 'react';
import Link from 'next/link';
import { getServiceAvailableCities } from '@/lib/hooks/index';
import {capitalizeFirstLetter,capitalizeEachWordFirstLetter} from '@/lib/helper/format-text';
import {cityPageLink} from '@/lib/helper/link';
const ServiceAvailbeCities = async () => {
    const data = await getServiceAvailableCities();
    return <>
     <h2 className='font-semibold fs-16 py-2 px-2'>Service Available Cities
     </h2>
        {data.states.map((state) =>
            <div key={state.name} className='bg-white px-2 py-2'>
                 <h3 className='font-medium fs-16'>Cities In {state.name}
                 </h3>
                 <div className='flex flex-wrap gap-2'>
                        {data.data[state.name.toLowerCase()] && data.data[state.name.toLowerCase()].map((district) =>
                            <React.Fragment key={district.id}>
                                <Link href={cityPageLink(state.name,district.name)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md' >{capitalizeFirstLetter(district.name_ln || district.name)}</Link>
                            </React.Fragment>
                        )}
                    </div>
                {/* <details>
                    <summary>
                        <h3 className='font-semibold fs-16 py-2'>Service available cities of {state.name}
                        </h3>
                    </summary>
                    <div className='flex flex-wrap gap-2 py-2'>
                        {data.data[state.name.toLowerCase()] && data.data[state.name.toLowerCase()].map((district) =>
                            <React.Fragment key={district.id}>
                                <Link href={capitalizeEachWordFirstLetter(`${district.name}-In-${state.name}`)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-sm' >{capitalizeFirstLetter(district.name_ln || district.name)}</Link>
                            </React.Fragment>
                        )}
                    </div>
                </details> */}
            </div>
        )}
    </>
}
export default ServiceAvailbeCities;