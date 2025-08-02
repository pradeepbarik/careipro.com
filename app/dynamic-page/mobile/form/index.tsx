'use client'
import { BiCheck } from "react-icons/bi";
import { Section } from '@/lib/hooks/useDpage';
import Input from '@/app/components/mobile/ui/input';
import useDform from '@/lib/hooks/userDform';
const Form = ({ data, state, city, page_id }: { data: Section, state: string, city: string, page_id: number }) => {
    const { showSuccess,onSubmit, formData, setFormData } = useDform({ data })
    if (showSuccess) {
        return (
            <div className="mt-12">
                <div className='flex justify-center'>
                    <div className='h-40 w-44 bg-no-repeat bg-contain flex items-center justify-center relative'>
                        <BiCheck className='bg-primary w-16 h-16 rounded-full color-white' />
                        <img src="/icon/booking-success.png" className='absolute top-0 left-0 w-full h-full zoomOut delay-2' />
                    </div>
                </div>
                <div className="font-semibold mt-4 text-center text-cyan-500
                ">Submitted Successfully</div>
            </div>
        )
    }
    return (
        <div className='bg-white px-2 py-4'>
            {data.inputFields.map((inputField, i) =>
                <div key={`inputfield-${i}`} className='my-2'>
                    {inputField.element === "input" ? <>
                        <Input lable={inputField.label} required={inputField.required} placeholder={inputField.placeHolder} type={inputField.type} value={formData[inputField.key]} onChange={(e) => { setFormData({ ...formData, [inputField.key]: e.target.value }) }} />
                    </> : inputField.element === "dropdown" ? <>
                        {inputField.label && <span className="flex font-semibold fs-15 items-center" style={{ marginBottom: "0px 0px 10px" }}>
                            {inputField.label}
                            {inputField.required && <span className='color-secondary'>&nbsp;*</span>}
                        </span>}
                        <select className='select' value={formData[inputField.key]} onChange={(e) => { setFormData({ ...formData, [inputField.key]: e.target.value }) }}>
                            {inputField.options.map((option) =>
                                <option value={option.value} key={option.value}>{option.label}</option>
                            )}
                        </select>
                    </> : <></>}
                </div>
            )}
            <button className='button w-full mt-4' style={{ ...data.button.style }} onClick={() => { onSubmit({ state: state, city: city, page_id: page_id }) }}>{data.button.label}</button>
        </div>
    )
}
export default Form;