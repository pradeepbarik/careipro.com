import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { TAllcities, getAllCities, getSubDistricts, TSubDistrict, TPincodeData, searchLoaction, getVillageList, TVillage, saveAddressPostCurl } from '@/lib/hooks/useClientSideApiCall';
import { TSelectedAddress } from '@/lib/types';
const usePatiendAddress = ({ page_source, onComplete,save_address=true }: { page_source: string,save_address?:boolean, onComplete: (address: TSelectedAddress) => void }) => {
    const { user_info } = useSelector((state: RootState) => {
        return {
            is_loggedin: state.authSlice.is_loggedin,
            user_info: state.authSlice.user_info
        }
    })
    const [searchText, setSearchText] = useState("");
    const [searchVillageText, setSearchVillageText] = useState("");
    const [states, setStates] = useState<TAllcities['states']>([]);
    const [stateData, setData] = useState<TAllcities['data']>({});
    const [subDistricts, setSubDistricts] = useState<TSubDistrict[]>([]);
    const [villages, setVillages] = useState<TVillage[]>([]);
    const [foundCities, setFoundCities] = useState<TAllcities['data']['']>([]);
    const [pincodeResults, setPincodeResults] = useState<TPincodeData[]>([]);
    const [selectedPincode, setSelectedPincode] = useState<TPincodeData | null>(null);
    const [breadcums, setBreadcums] = useState({ state: "", dist: "", sub_dist: "", village: "" });
    const [addressDetail, setAddressDetail] = useState<{ landmark: string, name: string }>({ landmark: "", name: "" })
    const [currentStep, setCurrentStep] = useState(1);
    const [addressSelectionMode, setAddressSelectionMode] = useState<"manual" | "pincode" | "map" | "">("");
    const moveToStep = (step: number) => {
        if (step === 1) {
            setBreadcums({ ...breadcums, dist: "", sub_dist: "", village: "" });
            //setSelectedCities(null);
        } else if (step === 2) {
            setBreadcums({ ...breadcums, sub_dist: "", village: "" });
        }
        setCurrentStep(step);
    }
    const onSelectCity = (city: TAllcities['data'][''][0]) => {
        setFoundCities([])
        if (city.name == breadcums.dist) {
            return;
        }
        setBreadcums({ ...breadcums, state: city.state, dist: city.name, sub_dist: "", village: "" });
        setCurrentStep(3);
        getSubDistricts(city.state, city.name).then(({ data }) => {
            setSearchText("");
            setSubDistricts(data);
            onSelectSubDistrict({ state: data[0].state, city: data[0].district, sub_district: data[0].sub_district })
        })
    }
    const onSelectPincode = () => {
        if (selectedPincode) {
            setSearchText("");
            setPincodeResults([]);
            setAddressSelectionMode("pincode")
            setCurrentStep(4)
            setBreadcums({...breadcums,state:selectedPincode.state,dist:selectedPincode.district,sub_dist:selectedPincode.block,village:selectedPincode?.name});
        }
    }
    const onSelectSubDistrict = (params: { state: string, city: string, sub_district: string }) => {
        if (breadcums.sub_dist === params.sub_district) {
            return;
        }
        setBreadcums({ ...breadcums, state: params.state, dist: params.city, sub_dist: params.sub_district, village: "" });
        if (searchVillageText) {
            setSearchVillageText("");
        }
        getVillageList(params.state, params.city, params.sub_district).then(({ data }) => {
            setVillages(data.villages);
        });
    }
    const onSelectVillage = (village_name: string) => {
        setBreadcums({ ...breadcums, village: village_name });
        setAddressSelectionMode("manual")
    }
    const saveAddress = () => {
        console.log('breadcums', breadcums)
        onComplete({ source: "manual", state: breadcums.state, city: breadcums.dist, sub_dist: breadcums.sub_dist, area: breadcums.village,landmark:addressDetail.landmark })
        if(save_address===true){
            if (addressSelectionMode === "pincode" && selectedPincode?.pincode) {
                saveAddressPostCurl({
                    state: selectedPincode.state.toLowerCase(),
                    city: selectedPincode.district.toLowerCase(),
                    sub_dist: selectedPincode.block.toLowerCase(),
                    area: selectedPincode.name.toLowerCase(),
                    landmark: addressDetail.landmark.toLowerCase(),
                    bookmark_name: addressDetail.name.toLowerCase(),
                    page_source: page_source,
                    hasdata: "unknown",
                    pincode: selectedPincode.pincode,
                    full_address: `${selectedPincode.name} ${selectedPincode.block} ${selectedPincode.district},${selectedPincode.state} ${selectedPincode.pincode}`,
                    address_selection_mode: addressSelectionMode
                })
            } else {
                saveAddressPostCurl({
                    state: breadcums.state.toLowerCase(),
                    city: breadcums.dist.toLowerCase(),
                    sub_dist: breadcums.sub_dist.toLowerCase(),
                    area: breadcums.village.toLowerCase(),
                    landmark: addressDetail.landmark.toLowerCase(),
                    bookmark_name: addressDetail.name.toLowerCase(),
                    page_source: page_source,
                    hasdata: "unknown",
                    pincode: '',
                    full_address: `${breadcums.village} ${breadcums.sub_dist} ${breadcums.dist},${breadcums.state}`,
                    address_selection_mode: addressSelectionMode
                })
            }
        }
    }
    useEffect(() => {
        let len = searchText.length;
        if (len > 2) {
            if (parseInt(searchText)) {
                if (len == 6) {
                    searchLoaction(searchText).then(({ data }) => {
                        setPincodeResults(data);
                    });
                    return;
                } else if (pincodeResults.length > 0) {
                    setPincodeResults([]);
                }
                return;
            }
            let foundCities: TAllcities['data'][''] = [];
            for (const state in stateData) {
                const cities = stateData[state].filter(city => city.name.toLowerCase().includes(searchText.toLowerCase()));
                foundCities = [...foundCities, ...cities];
            }
            setFoundCities(foundCities)
        } else if (len >= 1 && len <= 2) {
            setFoundCities([])
        }
    }, [searchText])
    useEffect(() => {
        getAllCities().then((data) => {
            setStates(data.states);
            setData(data.data);
        })
    }, [])
    return {
        searchText, setSearchText,
        states, stateData, subDistricts, foundCities, pincodeResults, selectedPincode,
        setSelectedPincode,
        breadcums,
        setBreadcums,
        currentStep,
        moveToStep,
        onSelectPincode,
        onSelectCity,
        onSelectSubDistrict,
        villages,
        onSelectVillage,
        searchVillageText,
        setSearchVillageText,
        addressDetail, setAddressDetail, saveAddress
    }
}
export default usePatiendAddress;