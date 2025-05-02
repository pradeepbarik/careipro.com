'use client'
import { useState, useEffect } from 'react';
import { getServiceAvailableCities } from "@/lib/hooks/index";
import { Tcity, Tstate } from '@/lib/types';

const ServicableCities = () => {
    const [showCitySelectionModal, setShowCitySelectionModal] = useState(false);
    const [allCitiesData, setAllCitiesData] = useState<{ states: Tstate[], data: Record<string, Tcity[]> }>({ states: [], data: {} });
    const [cities, setCities] = useState<Tcity[]>([]);
    const [seletedCity, setSelectedCity] = useState<Tcity | null>(null);
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
    useEffect(() => {
        getServiceAvailableCities().then((data) => {
            setAllCitiesData(data)
            setCities(data.data[data.states[0].name.toLowerCase()]);
        })
    }, [])
    return (
        <>
            <div className="flex border-b shadow-sm">
                <span className="font-semibold fs-15" style={{ width: '9rem' }}>All States</span>
                <span className="grow font-semibold fs-15">{cities.length && `Cities of ${cities[0].state}`}</span>
            </div>
        </>
    )
}
export default ServicableCities;