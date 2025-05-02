"use client"
import { ReactNode, useEffect, useState, cloneElement, ReactElement } from "react";
import { SlideUpModal, Radio, Button, Input } from "../ui";
import { getAllCities, TAllcities } from '@/lib/hooks/useClientSideApiCall';

const CitySelection = ({ children, onSelect }: { children: ReactElement, onSelect: (data: TAllcities['data'][''][0]) => void }) => {
    const [showCitySelectionModal, setShowCitySelectionModal] = useState(false);
    const [allCitiesData, setAllCitiesData] = useState<TAllcities>({ states: [], data: {} });
    const [cities, setCities] = useState<TAllcities['data']['']>([]);
    const [seletedCity, setSelectedCity] = useState<TAllcities['data'][''][0] | null>(null);
    const [searchText, setSearchText] = useState("");
    const [searchStateText, setSearchStateText] = useState("");
    const onSelectState = (state: string) => {
        let st = state.toLowerCase();
        if (st !== cities[0].state.toLowerCase()) {
            setCities(allCitiesData.data[st]);
            setSelectedCity(null);
            setSearchText("");
        }
    }
    const onSelectCity = (data: TAllcities['data'][''][0]) => {
        setSelectedCity(data);
    }
    const onFinalOk=()=>{
        if(seletedCity!==null){
            onSelect(seletedCity);
            setShowCitySelectionModal(false);
        }
    }
    useEffect(() => {
        getAllCities().then((data) => {
            setAllCitiesData(data)
            setCities(data.data[data.states[0].name.toLowerCase()]);
        })
    }, [])
    return (
        <>
            {cloneElement(children, { onClick: () => { setShowCitySelectionModal(true) } })}
            <SlideUpModal open={showCitySelectionModal} onClose={() => { setShowCitySelectionModal(false) }} heading="Select Your City">
                <div className="flex border-b shadow-sm">
                    <span className="font-semibold fs-15" style={{ width: '9rem' }}>All States</span>
                    <span className="grow font-semibold fs-15">{cities.length && `Cities of ${cities[0].state}`}</span>
                </div>
                <div className="flex mt-1" style={{ maxHeight: "70vh" }}>
                    <div className="overflow-auto border-r shrink-0 relative" style={{ height: '70vh', width: '9rem' }}>
                        <div className="sticky top-0 bg-white mb-2 z-10 pr-2">
                            <Input placeholder="Seach State"
                                value={searchStateText}
                                onChange={(e) => { setSearchStateText(e.target.value) }}
                                className="h-8 fs-15"
                            />
                        </div>
                        <ul>
                            {((searchStateText && searchStateText.length>=2)?allCitiesData.states.filter((state)=>state.name.toLowerCase().includes(searchStateText.toLowerCase())) : allCitiesData.states).map((state) => {
                                let isActive = state.name.toLowerCase() === cities[0].state.toLowerCase();
                                return (
                                    <li key={state.name} className={`my-1 px-2 py-1 font-semibold border-l-4 ${!isActive?'color-text-light':''}`}
                                        onClick={() => { onSelectState(state.name) }}
                                        style={isActive ? {
                                            borderLeftColor: "var(--primary-color)"
                                        } : {}}>
                                        {state.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="overflow-auto px-2 relative" style={{ height: '70vh' }}>
                        <div className="sticky top-0 bg-white mb-2 z-10">
                            <Input placeholder="Seach City Name"
                                value={searchText}
                                onChange={(e) => { setSearchText(e.target.value) }}
                                className="h-8 fs-15"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 ">
                            {((searchText && searchText.length >= 2) ? cities.filter((cit) => cit.name.toLowerCase().includes(searchText.toLowerCase()) || cit.name_ln.includes(searchText)) : cities).map((city) =>
                                <span key={city.name} className="relative border rounded-md py-2 px-2" onClick={() => { onSelectCity(city) }}>
                                    <span className="absolute -right-1 -top-1">
                                        {(seletedCity !== null && seletedCity.name === city.name) &&
                                            <Radio selected={true} />
                                        }
                                    </span>
                                    {city.name}
                                </span>
                            )}
                        </div>
                        <Button className="w-full sticky bottom-0 mt-1" onClick={onFinalOk}>Done</Button>
                    </div>
                </div>
            </SlideUpModal>
        </>
    )
}
export default CitySelection;