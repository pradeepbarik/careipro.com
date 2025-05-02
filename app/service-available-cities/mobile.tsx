'use client'
import { useState } from 'react';
import Link from 'next/link';
import Header from "@/app//components/mobile/header";
import { Input } from '@/app/components/mobile/ui';
import { Tcity, Tstate } from '@/lib/types';
import { cityPageLink } from '@/lib/helper/link';
const ServiceAvailableCitiesMobile = ({ states, data }: { states: Tstate[], data: Record<string, Tcity[]> }) => {
    const [searchText, setSearchText] = useState("");
    const [searchStateText, setSearchStateText] = useState("");
    return (
        <>
            <Header heading="Our service available cities" template="SUBPAGE" />
            {/* <div className="flex border-b shadow-sm">
                <span className="font-semibold fs-15" style={{ width: '9rem' }}>All States</span>
                <span className="grow font-semibold fs-15"></span>
            </div> */}
            <div className="flex mt-1" style={{height:"calc(100vh - 4rem)"}}>
                <div className="overflow-auto border-r shrink-0 relative bg-white" style={{width: '9rem' }}>
                    <div className="sticky top-0 mb-2 z-10 px-2">
                        <Input placeholder="Seach State"
                            value={searchStateText}
                            onChange={(e) => { setSearchStateText(e.target.value) }}
                            className="h-8 fs-15"
                        />
                    </div>
                    <ul>
                        {((searchStateText && searchStateText.length >= 2) ? states.filter((state) => state.name.toLowerCase().includes(searchStateText.toLowerCase())) : states).map((state) => {
                            let isActive = false;
                            return (
                                <li key={state.name} className={`my-1 px-2 py-1 font-semibold border-l-4 ${!isActive ? 'color-text-light' : ''}`}
                                    onClick={() => { }}
                                    style={isActive ? {
                                        borderLeftColor: "var(--primary-color)"
                                    } : {}}>
                                    {state.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="overflow-auto px-2 relative bg-white grow">
                    <div className="sticky top-0 mb-2 z-10">
                        <Input placeholder="Seach City Name"
                            value={searchText}
                            onChange={(e) => { setSearchText(e.target.value) }}
                            className="h-8 fs-15"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {states.map((state) =>
                            <div className='flex flex-wrap gap-2'>
                                {data[state.name.toLowerCase()].map((city) =>
                                    <Link href={cityPageLink(city.state,city.name)} key={city.name} className="relative border rounded-md py-1 px-2">
                                        {city.name_ln || city.name}
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ServiceAvailableCitiesMobile;