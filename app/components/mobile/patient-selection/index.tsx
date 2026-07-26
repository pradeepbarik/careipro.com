"use client"
import { useState, cloneElement, ReactElement } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { BiPlus, BiUser, BiPhone, BiHome, BiChevronRight, BiMapPin } from "react-icons/bi";
import { SlideUpModal, Input, Button, RadioButton, TextArea } from "../ui";
import usePatients, { TSavedPatient } from "@/lib/hooks/usePatients";
import CitySelection from "@/app/components/mobile/city-selection";

const newPatientInitState = { patient_name: "", patient_mobile: "", patient_gender: "", patient_age: "", patient_address: "", city: "" };

const PatientSelection = ({ children, onSelect }: { children: ReactElement, onSelect: (data: TSavedPatient) => void }) => {
    const [showModal, setShowModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [newPatient, setNewPatient] = useState(newPatientInitState);
    const { patients, loading, fetchPatients, addPatient } = usePatients();
    const openModal = () => {
        setShowModal(true);
        setShowAddForm(false);
        fetchPatients();
    }
    const closeModal = () => {
        setShowModal(false);
        setShowAddForm(false);
        setNewPatient(newPatientInitState);
    }
    const onSelectPatient = (patient: TSavedPatient) => {
        onSelect(patient);
        closeModal();
    }
    const onSaveNewPatient = async () => {
        if (!newPatient.patient_name) {
            toast.error("Please enter patient name");
            return;
        }
        if (!newPatient.patient_mobile || newPatient.patient_mobile.length !== 10) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
        }
        if (!newPatient.patient_address) {
            toast.error("Please enter patient address");
            return;
        }
        setSaving(true);
        try {
            const patient_dob = newPatient.patient_age ? moment().subtract(newPatient.patient_age, 'years').format('YYYY-MM-DD') : "";
            const saved = await addPatient({
                patient_name: newPatient.patient_name,
                patient_mobile: newPatient.patient_mobile,
                patient_gender: newPatient.patient_gender,
                patient_dob,
                patient_address: newPatient.patient_address,
                city: newPatient.city
            });
            toast.success("Patient added successfully");
            onSelectPatient({
                id: saved.id,
                patient_code: saved.patient_code,
                patient_name: newPatient.patient_name,
                patient_mobile: newPatient.patient_mobile,
                patient_gender: newPatient.patient_gender,
                patient_dob,
                patient_address: newPatient.patient_address,
                city: newPatient.city,
                route_name: null,
                market: null
            });
        } catch (err: any) {
            toast.error(err.message || "Could not add patient");
        } finally {
            setSaving(false);
        }
    }
    return (
        <>
            {cloneElement(children, { onClick: openModal })}
            <SlideUpModal open={showModal} onClose={closeModal} heading={showAddForm ? "Add New Patient" : "Select Patient"}>
                {showAddForm ? <>
                    <div className="p-2">
                        <Input lable="Patient Name" lableIcon={<BiUser className="fs-17" />} value={newPatient.patient_name} onChange={(e) => { setNewPatient({ ...newPatient, patient_name: e.target.value }) }} required />
                        <div className="mt-3">
                            <Input type="mobile" lable="Mobile Number" lableIcon={<BiPhone className="fs-17" />} value={newPatient.patient_mobile} onChange={(e) => { setNewPatient({ ...newPatient, patient_mobile: e.target.value }) }} required />
                        </div>
                        <div className="mt-3 flex gap-3">
                            <Input lable="Patient Age" value={newPatient.patient_age} onChange={(e) => { setNewPatient({ ...newPatient, patient_age: e.target.value }) }} />
                            <RadioButton label="Gender" name="new-patient-gender" value={newPatient.patient_gender} data={[
                                { label: "Male", value: "male" },
                                { label: "Female", value: "female" },
                            ]} onChange={(v) => { setNewPatient({ ...newPatient, patient_gender: v.toString() }) }} className="mt-4" />
                        </div>
                        <CitySelection onSelect={(selectedCity) => { setNewPatient({ ...newPatient, city: selectedCity.name }) }}>
                            <div className="mt-3">
                                <Input lable="City" lableIcon={<BiMapPin className="fs-17" />} value={newPatient.city} autoComplete="do-not-autofill" />
                            </div>
                        </CitySelection>
                        <div className="mt-3">
                            <Input lable="Patient Address" value={newPatient.patient_address} onChange={(e) => { setNewPatient({ ...newPatient, patient_address: e.target.value }) }} />
                        </div>
                        
                        <Button className="w-full mt-4" onClick={onSaveNewPatient} disabled={saving}>{saving ? "Saving..." : "Save & Select"}</Button>
                    </div>
                </> : <>
                    <div className="flex items-center gap-2 py-3 px-2 border-b font-semibold color-primary" onClick={() => { setShowAddForm(true) }}>
                        <BiPlus className="fs-18" />
                        Add New Patient
                    </div>
                    <ul className="overflow-auto" style={{ maxHeight: "60vh" }}>
                        {!loading && patients.length === 0 &&
                            <li className="flex items-center justify-center py-8 color-text-light fs-15">No saved patients yet</li>
                        }
                        {patients.map((patient) =>
                            <li key={patient.id} className="flex items-center gap-2 py-3 px-2 border-b" onClick={() => { onSelectPatient(patient) }}>
                                <div className="flex flex-col grow">
                                    <div className="flex gap-2 fs-15">
                                        <span className="dot font-semibold">{patient.patient_name}</span>
                                        <span className="dot font-semibold">{patient.patient_mobile}</span>
                                    </div>
                                    {(patient.patient_address || patient.city) &&
                                        <div className="font-semibold color-text-light flex items-center gap-1 fs-13">
                                            <BiHome />
                                            {[patient.patient_address, patient.city].filter(Boolean).join(', ')}
                                        </div>
                                    }
                                </div>
                                <BiChevronRight className="text-xl shrink-0" />
                            </li>
                        )}
                    </ul>
                </>}
            </SlideUpModal>
        </>
    )
}
export default PatientSelection;
