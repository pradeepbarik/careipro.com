'use client'
import { useEffect, useRef, useState } from "react";
import { BiMap, BiChevronDown, BiX, BiPlusCircle } from "react-icons/bi";
import DropDown from "@/app/components/mobile/ui/drop-down";
import { getAllCities, searchArea, TAreaSearchResult } from "@/lib/hooks/useClientSideApiCall";
import { TAllcities } from "@/lib/types";
type TCity = TAllcities['data'][''][0];
export type TAddressV2 = { sub_district: string, area_name: string, district: string, state: string };

const AddressSelectionV2 = ({ city, onSelect  }: {city: string, onSelect: (address: TAddressV2) => void }) => {
    const cityInputRef = useRef<HTMLInputElement>(null);
    const areaInputRef = useRef<HTMLInputElement>(null);
    const areaDebounceRef = useRef<ReturnType<typeof setTimeout>>();

    const [allCities, setAllCities] = useState<TCity[]>([]);
    const [citySearchText, setCitySearchText] = useState(city || "");
    const [showCityResults, setShowCityResults] = useState(false);
    const [selectedCity, setSelectedCity] = useState<TCity | null>(null);

    const [areaSearchText, setAreaSearchText] = useState("");
    const [areaResults, setAreaResults] = useState<TAreaSearchResult[]>([]);
    const [showAreaResults, setShowAreaResults] = useState(false);
    const [areaLoading, setAreaLoading] = useState(false);

    useEffect(() => {
        getAllCities().then((data) => {
            setAllCities(Object.values(data.data).flat());
        });
    }, []);

    const filteredCities = citySearchText.length >= 2
        ? allCities.filter((city) => city.name.toLowerCase().includes(citySearchText.toLowerCase()))
        : [];

    const onChangeCitySearch = (value: string) => {
        setCitySearchText(value);
        setShowCityResults(true);
        if (selectedCity && value !== selectedCity.name) {
            setSelectedCity(null);
            setAreaSearchText("");
            setAreaResults([]);
        }
    };

    const onSelectCity = (city: TCity) => {
        setSelectedCity(city);
        setCitySearchText(city.name);
        setShowCityResults(false);
        setAreaSearchText("");
        setAreaResults([]);
        setTimeout(() => { areaInputRef.current?.focus() }, 100);
    };

    const runAreaSearch = (text: string, cityName: string) => {
        if (text.trim().length < 2) {
            setAreaResults([]);
            return;
        }
        setAreaLoading(true);
        searchArea(text.trim(), cityName).then(({ data }) => {
            setAreaResults(data);
        }).finally(() => { setAreaLoading(false) });
    };

    const onChangeAreaSearch = (value: string) => {
        setAreaSearchText(value);
        setShowAreaResults(true);
        if (areaDebounceRef.current) {
            clearTimeout(areaDebounceRef.current);
        }
        const cityName = (selectedCity?.name || citySearchText).trim();
        if (!cityName) return;
        areaDebounceRef.current = setTimeout(() => { runAreaSearch(value, cityName) }, 300);
    };

    const onSelectArea = (area: TAreaSearchResult) => {
        setAreaSearchText(area.area_name);
        setShowAreaResults(false);
        onSelect({
            sub_district: area.sub_district,
            area_name: area.area_name,
            district: area.district,
            state: area.state
        });
    };

    const clearCity = () => {
        setSelectedCity(null);
        setCitySearchText("");
        setAreaSearchText("");
        setAreaResults([]);
        setShowAreaResults(false);
        setTimeout(() => { cityInputRef.current?.focus() }, 0);
    };

    const clearArea = () => {
        setAreaSearchText("");
        setAreaResults([]);
        setShowAreaResults(false);
        setTimeout(() => { areaInputRef.current?.focus() }, 0);
    };

    const onContinueWithTypedArea = () => {
        const areaName = areaSearchText.trim();
        if (!areaName) return;
        setShowAreaResults(false);
        onSelect({
            sub_district: "",
            area_name: areaName,
            district: selectedCity?.name || citySearchText.trim(),
            state: selectedCity?.state || ""
        });
    };

    const effectiveCity = (selectedCity?.name || citySearchText).trim();

    return (
        <div className="p-2 h-[70vh] overflow-y-auto">
            <div className="relative">
                <div className="flex items-stretch border rounded-xl shadow-sm bg-white">
                    <div className="min-w-0 rounded-l-xl" style={{ flex: "0 0 40%" }}>
                        <div className="flex items-center gap-2 pl-2  py-2.5">
                            <input
                                ref={cityInputRef}
                                className="outline-none border-none w-full font-semibold fs-15 p-0 bg-transparent"
                                placeholder="city"
                                value={citySearchText}
                                onChange={(e) => { onChangeCitySearch(e.target.value) }}
                                onFocus={() => { citySearchText.length >= 2 && setShowCityResults(true) }}
                                onBlur={() => { setTimeout(() => { setShowCityResults(false) }, 150) }}
                            />
                            {citySearchText ? (
                                <BiX className="text-lg shrink-0 rounded-full text-orange-500 border border-orange-400" onClick={clearCity} />
                            ) : (
                                <BiChevronDown className="text-lg color-text-light shrink-0" />
                            )}
                        </div>
                    </div>
                    <div className="w-px self-stretch bg-gray-200 my-2" />
                    <div className="min-w-0" style={{ flex: "0 0 60%" }}>
                        <div className="flex items-center gap-2 px-3 py-2.5">
                            <BiMap className="text-lg color-primary shrink-0" />
                            <input
                                ref={areaInputRef}
                                className="outline-none border-none w-full font-semibold fs-15 p-0 bg-transparent disabled:text-gray-400"
                                placeholder={effectiveCity ? "Search location,Village..." : "Select city first"}
                                value={areaSearchText}
                                disabled={!effectiveCity}
                                onChange={(e) => { onChangeAreaSearch(e.target.value) }}
                                onFocus={() => { areaResults.length > 0 && setShowAreaResults(true) }}
                                onBlur={() => { setTimeout(() => { setShowAreaResults(false) }, 150) }}
                            />
                            {areaSearchText && <BiX className="text-lg shrink-0 text-orange-500 border border-orange-400 rounded-full" onClick={clearArea} />}
                        </div>
                    </div>
                </div>
                <DropDown targetRef={cityInputRef} show={showCityResults && filteredCities.length > 0} maxHeight={200}>
                    {filteredCities.map((city) => (
                        <div key={`${city.state}-${city.name}`} className="px-2 py-2 border-b" onClick={() => { onSelectCity(city) }}>
                            <span className="font-semibold capitalize">{city.name}</span>
                            <span className="fs-13 color-text-light capitalize ml-2">{city.state}</span>
                        </div>
                    ))}
                </DropDown>
                <DropDown targetRef={areaInputRef} show={showAreaResults && areaResults.length > 0} maxHeight={200}>
                    {areaResults.map((area, i) => (
                        <div key={`${area.district}-${area.sub_district}-${area.area_name}-${i}`} className="px-2 py-2 border-b" onClick={() => { onSelectArea(area) }}>
                            <span className="font-semibold capitalize">{area.area_name}</span>
                            <span className="fs-13 color-text-light capitalize block">{[area.sub_district, area.district, area.state].filter(Boolean).join(', ')}</span>
                        </div>
                    ))}
                </DropDown>
            </div>
            {areaLoading && <div className="fs-13 color-text-light mt-2">Searching...</div>}
            {effectiveCity && areaSearchText.trim().length >= 2 && !areaLoading && areaResults.length === 0 && showAreaResults && (
                <div className="flex flex-col items-center justify-center py-4 gap-2">
                    <span className="fs-13 color-text-light">No matching area found</span>
                    <button
                        type="button"
                        className="flex items-center gap-2 border rounded-md px-3 py-2 font-semibold color-primary"
                        onClick={onContinueWithTypedArea}
                    >
                        <BiPlusCircle className="text-xl" />
                        Continue with {'"' + areaSearchText.trim() + '"'}
                    </button>
                </div>
            )}
        </div>
    )
}
export default AddressSelectionV2;
