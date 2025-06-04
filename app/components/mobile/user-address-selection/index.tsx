'use cliend'
import { BiCheck, BiSearch, BiPencil, BiHome, BiSolidBusiness, BiPurchaseTagAlt } from "react-icons/bi";
import { Button, Input, Radio } from '@/app/components/mobile/ui';
import usePatientAddress from '@/lib/hooks/usePatientAddress';
import classes from './style.module.scss';
import { TSelectedAddress } from '@/lib/types';
const SelectAddress = ({ page_source, onSelect, save_address = true, showBreadCum = true,btnText="Save" }: { page_source: string, save_address?: boolean, onSelect: (address: TSelectedAddress) => void, showBreadCum?: boolean,btnText?:string }) => {
    const { foundCities, pincodeResults, selectedPincode, setSelectedPincode, searchText, setSearchText, breadcums, setBreadcums, currentStep, onSelectPincode, onSelectCity, subDistricts, onSelectSubDistrict, villages, onSelectVillage, searchVillageText, setSearchVillageText, addressDetail, setAddressDetail, saveAddress } = usePatientAddress({ onComplete: onSelect, page_source: page_source, save_address: save_address });
    return (
        <div style={{ height: '70vh' }}>
            <div>
                <div className={classes.searchBox}>
                    <div className="relative px-2 mb-2">
                        <BiSearch className="absolute top-4 left-3 text-xl" />
                        <Input placeholder="Search your city or pincode" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} style={{ textIndent: "1.7rem" }} />
                    </div>
                    {pincodeResults.length > 0 &&
                        <div className={`${classes.searchResultContainer} ml-2`}>
                            <ul className={classes.searchResult}>
                                {pincodeResults.map((location) =>
                                    <li key={location.name} onClick={() => { setSelectedPincode(location) }}
                                        className={(selectedPincode && selectedPincode.name === location.name) ? `${classes.active}` : ''}
                                    >
                                        <span>
                                            <span className={`font-semibold fs-17 ${classes.mainlbl}`}>
                                                {location.name}
                                            </span>
                                            <span className={classes.sublbl}>In&nbsp;<b>{location.block}</b>&nbsp;&nbsp;Block of {location.state}</span>
                                        </span>
                                        <span>
                                            <BiCheck className={(selectedPincode && selectedPincode.name === location.name) ? `${classes.selectedCheck} ${classes.active} text-2xl` : classes.selectedCheck} />
                                        </span>
                                    </li>
                                )}
                            </ul>
                            {(selectedPincode && selectedPincode.name) && <div className={classes.actionContainer}>
                                <button className='button py-2 text one-line text-xs rounded-2xl ml-auto' onClick={onSelectPincode}>Done</button>
                            </div>}
                        </div>
                    }
                    {foundCities.length > 0 &&
                        <div className={classes.searchResultContainer}>
                            <ul className={classes.searchResult}>
                                {foundCities.map((city) =>
                                    <li key={city.name} onClick={() => { onSelectCity(city) }} >
                                        <span>
                                            <span className={`font-semibold fs-17 ${classes.mainlbl}`}>
                                                {city.name}
                                            </span>
                                            <span className={classes.sublbl}><b>{city.state}</b>
                                            </span>
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                </div>
            </div>
            {showBreadCum &&
                <div className={`font-semibold ${classes.breadcum}`}>
                    {breadcums.state !== "" &&
                        <div>
                            {breadcums.state}
                        </div>
                    }
                    {breadcums.dist !== "" &&
                        <div>
                            {breadcums.dist}
                        </div>
                    }
                    {breadcums.sub_dist !== "" &&
                        <div>
                            {breadcums.sub_dist}
                        </div>
                    }
                </div>
            }
            {currentStep === 1 ?
                <>
                    <div className='mt-2'>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {foundCities.map((city) =>
                                <span key={city.name} className='inline-flex flex-col border rounded-md px-2 py-1' onClick={() => { onSelectCity(city) }}>
                                    <span className='font-semibold'>{city.name}</span>
                                    <span>{city.state}</span>
                                </span>
                            )}
                        </div>
                    </div>
                    {/* {searchText === "" && false &&
                            <>
                                <div className='flex'>
                                    <div className="overflow-auto border-r shrink-0 relative" style={{ height: '70vh', width: '9rem' }}>
                                        <ul>
                                            {states.map((state) => {
                                                let isActive = false //state.name.toLowerCase() === cities[0].state.toLowerCase();
                                                return (
                                                    <li key={state.name} className={`my-1 px-2 py-1 font-semibold border-l-4 ${!isActive ? 'color-text-light' : ''}`}
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
                                    <div className='overflow-auto px-2 py-2' style={{ height: '70vh' }}>
                                        {states.map((state) =>
                                            <div key={state.name}>
                                                <div className='font-semibold'>Cities of {state.name}</div>
                                                <div className='flex flex-wrap gap-2'>
                                                    {stateData[state.name.toLowerCase()] && stateData[state.name.toLowerCase()].map((city) =>
                                                        <span key={city.id} className='inlline-flex border rounded-md px-2 py-1'>{city.name}</span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
            } */}
                </> : currentStep == 3 ? <>
                    <div className='flex'>
                        <div className="overflow-auto border-r shrink-0 relative" style={{ height: '55vh', width: '9rem' }}>
                            <ul>
                                {subDistricts.map((sdist) => {
                                    let isActive = sdist.sub_district.toLowerCase() === breadcums.sub_dist.toLowerCase();
                                    return (
                                        <li key={sdist.sub_district} className={`my-1 px-2 py-1 font-semibold border-l-4 capitalize ${!isActive ? 'color-text-light' : ''}`}
                                            onClick={() => {
                                                onSelectSubDistrict({
                                                    state: sdist.state,
                                                    city: sdist.district,
                                                    sub_district: sdist.sub_district
                                                })
                                            }}
                                            style={isActive ? {
                                                borderLeftColor: "var(--primary-color)"
                                            } : {}}>
                                            {sdist.sub_district}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className='relative overflow-auto grow' style={{ maxHeight: '55vh' }}>
                            {breadcums.village ?
                                <div className="px-2">
                                    <div className="border px-2 py-2 flex items-center rounded-md bg-gray-100">
                                        <span className="flex flex-wrap font-semibold">
                                            <span className="capitalize">{breadcums.village},&nbsp;</span>
                                            <span className="capitalize">{breadcums.sub_dist},&nbsp;</span>
                                            <span className="capitalize">{breadcums.dist}</span>
                                        </span>
                                        <span className="">
                                            <span className="border border-color-grey color-secondary bg-white px-1 py-1 rounded-md flex items-center" onClick={() => { setBreadcums({ ...breadcums, village: "" }) }}>
                                                <BiPencil />
                                                Change
                                            </span>
                                        </span>
                                    </div>
                                    <div>
                                        <Input lable="Landmark" value={addressDetail.landmark} onChange={(e) => { setAddressDetail({ ...addressDetail, landmark: e.target.value }) }} />
                                    </div>
                                    <div>
                                        <span className="font-semibold fs-16">Save address as *</span>
                                        <div className="flex gap-2 font-semibold">
                                            <span className={`border ${addressDetail.name === 'home' ? 'border-color-primary color-primary' : 'border-color-grey'} px-2 py-1 rounded-md flex items-center gap-1`}
                                                onClick={() => { setAddressDetail({ ...addressDetail, name: "home" }) }}>
                                                <BiHome />
                                                Home
                                            </span>
                                            <span className={`border ${addressDetail.name === 'office' ? 'border-color-primary color-primary' : 'border-color-grey'} px-2 py-1 rounded-md flex items-center gap-1`} onClick={() => { setAddressDetail({ ...addressDetail, name: "office" }) }}>
                                                <BiSolidBusiness />
                                                Office
                                            </span>
                                            <span className={`border ${(addressDetail.name !== 'home' && addressDetail.name !== "office") ? 'border-color-primary color-primary' : 'border-color-grey'} px-2 py-1 rounded-md flex items-center gap-1`} onClick={() => { setAddressDetail({ ...addressDetail, name: "other" }) }}>
                                                <BiPurchaseTagAlt />
                                                Other
                                            </span>
                                        </div>
                                        {(addressDetail.name !== 'home' && addressDetail.name !== "office") && <Input type="text" value={addressDetail.name === "other" ? "" : addressDetail.name} onChange={(e) => { setAddressDetail({ ...addressDetail, name: e.target.value }) }} autofocus={true} />}
                                    </div>
                                    <div className="w-full bg-white py-1 mt-2">
                                        <Button className="w-full" onClick={saveAddress}>Save</Button>
                                    </div>
                                </div> :
                                <>
                                    <div className="bg-white px-1">
                                        <div className="relative">
                                            <BiSearch className="absolute top-4 left-3 text-xl" />
                                            <Input placeholder="Search Village Name" value={searchVillageText} onChange={(e) => { setSearchVillageText(e.target.value) }} style={{ textIndent: '1.6rem' }} />
                                        </div>
                                    </div>
                                    <div className="overflow-auto" style={{ height: "calc(55vh - 6rem)" }}>
                                        <div className="flex bg-pink-20 items-center px-2 font-semibold py-1 mt-1">
                                            <span>
                                                Not found your area?
                                            </span>
                                            <button className="button rounded-md bg-pink ml-auto" data-size="small" onClick={() => { }}>
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap mt-1 overflow-hidden px-1" style={{ columnGap: ".5rem", rowGap: ".5rem" }}>
                                            {(searchVillageText.length >= 2 ? villages.filter((village) => village.name.includes(searchVillageText)) : villages).map((village) =>
                                                <div key={village.name} className="border inline-flex items-center gap-1 px-2 py-2 rounded-md shrink-0 capitalize"
                                                    onClick={() => { onSelectVillage(village.name) }}
                                                    style={{ width: village.name.length > 12 ? '100%' : `calc(50% - .25rem)` }}>
                                                    <Radio selected={breadcums.village === village.name} />
                                                    {village.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </> : currentStep == 4 ? <>
                    <div className="px-2">
                        <div className="border px-2 py-2 flex items-center rounded-md bg-gray-100">
                            <span className="flex flex-wrap font-semibold">
                                <span className="capitalize">{selectedPincode?.name},&nbsp;</span>
                                <span className="capitalize">{selectedPincode?.block},&nbsp;</span>
                                <span className="capitalize">{selectedPincode?.district},&nbsp;</span>
                                <span className="capitalize">{selectedPincode?.state}</span>
                                <span>{selectedPincode?.pincode}</span>
                            </span>
                            {/* <span className="ml-auto">
                                <span className="border border-color-grey color-secondary bg-white px-1 py-1 rounded-md flex items-center" onClick={() => { }}>
                                    <BiPencil />
                                    Change
                                </span>
                            </span> */}
                        </div>
                        <div>
                            <Input lable="Landmark" value={addressDetail.landmark} onChange={(e) => { setAddressDetail({ ...addressDetail, landmark: e.target.value }) }} />
                        </div>
                        <div>
                            <span className="font-semibold fs-16">Save address as *</span>
                            <div className="flex gap-2 font-semibold">
                                <span className={`border ${addressDetail.name === 'home' ? 'border-color-primary color-primary' : 'border-color-grey'} px-2 py-1 rounded-md flex items-center gap-1`}
                                    onClick={() => { setAddressDetail({ ...addressDetail, name: "home" }) }}>
                                    <BiHome />
                                    Home
                                </span>
                                <span className={`border ${addressDetail.name === 'office' ? 'border-color-primary color-primary' : 'border-color-grey'} px-2 py-1 rounded-md flex items-center gap-1`} onClick={() => { setAddressDetail({ ...addressDetail, name: "office" }) }}>
                                    <BiSolidBusiness />
                                    Office
                                </span>
                                <span className={`border ${(addressDetail.name !== 'home' && addressDetail.name !== "office") ? 'border-color-primary color-primary' : 'border-color-grey'} px-2 py-1 rounded-md flex items-center gap-1`} onClick={() => { setAddressDetail({ ...addressDetail, name: "other" }) }}>
                                    <BiPurchaseTagAlt />
                                    Other
                                </span>
                            </div>
                            {(addressDetail.name !== 'home' && addressDetail.name !== "office") && <Input type="text" value={addressDetail.name === "other" ? "" : addressDetail.name} onChange={(e) => { setAddressDetail({ ...addressDetail, name: e.target.value }) }} autofocus={true} />}
                        </div>
                        <div className="w-full bg-white py-1 mt-2">
                            <Button className="w-full" onClick={saveAddress}>{btnText}</Button>
                        </div>
                    </div>
                </> : <>

                </>}

        </div>
    )
}
export default SelectAddress;