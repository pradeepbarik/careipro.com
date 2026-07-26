"use client"
import { useEffect, useState, useRef, cloneElement, ReactElement } from "react";
import { SlideUpModal, Input } from "../ui";
import { getAllCities, TAllcities } from '@/lib/hooks/useClientSideApiCall';

type TCity = TAllcities['data'][''][0];

const CitySelection = ({ children, onSelect }: { children: ReactElement, onSelect: (data: TCity) => void }) => {
    const [showCitySelectionModal, setShowCitySelectionModal] = useState(false);
    const [allCities, setAllCities] = useState<TCity[]>([]);
    const [searchText, setSearchText] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);
    const onSelectCity = (data: TCity) => {
        onSelect(data);
        setShowCitySelectionModal(false);
        setSearchText("");
    }
    useEffect(() => {
        getAllCities().then((data) => {
            setAllCities(Object.values(data.data).flat().sort((a, b) => a.name.localeCompare(b.name)));
        })
    }, [])
    useEffect(() => {
        if (showCitySelectionModal) {
            const timer = setTimeout(() => { searchInputRef.current?.focus() }, 300);
            return () => clearTimeout(timer);
        }
    }, [showCitySelectionModal])
    const filteredCities = (searchText && searchText.length >= 2)
        ? allCities.filter((city) => city.name.toLowerCase().includes(searchText.toLowerCase()) || city.name_ln.includes(searchText))
        : allCities;
    return (
        <>
            {cloneElement(children, { onClick: () => { setShowCitySelectionModal(true) } })}
            <SlideUpModal open={showCitySelectionModal} onClose={() => { setShowCitySelectionModal(false) }} heading="Select Your City">
                <div className="sticky top-0 bg-white z-10 pb-2">
                    <Input placeholder="Search city"
                        ref={searchInputRef}
                        value={searchText}
                        onChange={(e) => { setSearchText(e.target.value) }}
                        className="h-9 fs-15"
                    />
                </div>
                <ul className="overflow-auto" style={{ height: "80vh" }}>
                    {filteredCities.length === 0 &&
                        <li className="flex items-center justify-center h-full color-text-light fs-15">No cities found</li>
                    }
                    {filteredCities.map((city) =>
                        <li key={`${city.state}-${city.name}`} className="py-3 border-b" onClick={() => { onSelectCity(city) }}>
                            <span className="flex flex-col">
                                <span className="fs-15 capitalize">{city.name}</span>
                                <span className="fs-13 color-text-light capitalize">{city.state}</span>
                            </span>
                        </li>
                    )}
                </ul>
            </SlideUpModal>
        </>
    )
}
export default CitySelection;