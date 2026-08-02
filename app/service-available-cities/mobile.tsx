'use client'
import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from "@/app//components/mobile/header";
import { Input } from '@/app/components/mobile/ui';
import DropDown from '@/app/components/mobile/ui/drop-down';
import { WideAd } from '@/app/components/mobile/ads-container';
import { BiSearch, BiMapPin, BiInfoCircle,BiMap } from 'react-icons/bi';
import { Tcity, Tstate } from '@/lib/types';
import { cityPageLink } from '@/lib/helper/link';

const ServiceAvailableCitiesMobile = ({ states, data }: { states: Tstate[], data: Record<string, Tcity[]> }) => {
    const router = useRouter();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [unavailableCity, setUnavailableCity] = useState<Tcity | null>(null);

    const allCities = useMemo(() => Object.values(data).flat(), [data]);
    const serviceableCities = useMemo(() => allCities.filter((city) => city.is_serviceable === 1), [allCities]);

    const suggestions = searchText.trim().length >= 2
        ? allCities.filter((city) => (city.name_ln || city.name).toLowerCase().includes(searchText.trim().toLowerCase())).slice(0, 15)
        : [];

    const onChangeSearch = (value: string) => {
        setSearchText(value);
        setShowSuggestions(true);
        setUnavailableCity(null);
    };

    const onSelectCity = (city: Tcity) => {
        setSearchText(city.name_ln || city.name);
        setShowSuggestions(false);
        if (city.is_serviceable) {
            setUnavailableCity(null);
            router.push(cityPageLink(city.state, city.name));
        } else {
            setUnavailableCity(city);
        }
    };

    return (
        <>
            <Header heading="Our service available cities" template="SUBPAGE" />
            <div className="p-3">
                <div className="relative">
                    <BiSearch className="absolute pointer-events-none" style={{ top: "50%", left: "0.75rem", transform: "translateY(-50%)" }} />
                    <Input
                        ref={searchInputRef}
                        placeholder="Search your city"
                        value={searchText}
                        onChange={(e) => { onChangeSearch(e.target.value) }}
                        onFocus={() => { suggestions.length > 0 && setShowSuggestions(true) }}
                        onBlur={() => { setTimeout(() => { setShowSuggestions(false) }, 150) }}
                        className="h-11 fs-15"
                        style={{ textIndent: "1.7rem" }}
                    />
                    <DropDown targetRef={searchInputRef} show={showSuggestions && suggestions.length > 0} maxHeight={260}>
                        {suggestions.map((city) => (
                            <div key={`${city.state}-${city.name}`} className="flex items-center gap-2 px-3 py-2 border-b" onClick={() => { onSelectCity(city) }}>
                                <BiMap className="text-lg color-primary shrink-0" />
                                <div className="flex flex-col">
                                    <span className="font-semibold capitalize">{city.name_ln || city.name}</span>
                                    <span className="fs-12 color-text-light capitalize">{city.state}</span>
                                </div>
                                {!city.is_serviceable &&
                                    <span className="ml-auto fs-11 color-text-light border rounded-full px-2 py-0.5">Coming soon</span>
                                }
                            </div>
                        ))}
                    </DropDown>
                </div>
                <div className="mt-4 fs-13 font-semibold color-text-light uppercase tracking-wide">
                    Serviceable Cities
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {serviceableCities.map((city) => (
                        <Link href={cityPageLink(city.state, city.name)} key={`${city.state}-${city.name}`}
                            className="flex items-center gap-1 bg-white border rounded-full py-1.5 px-3 fs-14 font-semibold shadow-sm hover:border-color-primary hover:color-primary transition-colors capitalize"
                        >
                            <BiMap className="fs-13 color-primary shrink-0" />
                            {city.name_ln || city.name}
                        </Link>
                    ))}
                </div>
                {unavailableCity && (
                    <div className="mt-3 border border-orange-200 bg-orange-50 rounded-lg p-4 flex flex-col items-center text-center gap-1">
                        <BiInfoCircle className="text-3xl color-secondary" />
                        <div className="font-semibold">
                            We&apos;ll be launching our service soon in <span className="capitalize">{unavailableCity.name_ln || unavailableCity.name}</span>
                        </div>
                        <div className="fs-13 color-text-light">Meanwhile, continue browsing with our serviceable cities below.</div>
                    </div>
                )}
                <WideAd page_type="home" limit={2} ad_selection="random" />
                
            </div>
        </>
    )
}
export default ServiceAvailableCitiesMobile;
