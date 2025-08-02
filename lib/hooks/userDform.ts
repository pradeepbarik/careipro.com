'use client'
import { useEffect, useState } from 'react';
import { Section } from '@/lib/hooks/useDpage';
import { httpPost } from '@/lib/services/http-client';
import { toast } from 'react-toastify';
const initFormData = (data: Array<{ key: string }>) => {
    let formdata: Record<string, string> = {}
    for (let inf of data) {
        formdata[inf.key] = "";
    }
    return formdata;
}
const useDform = ({ data }: { data: Section }) => {
    const [formData, setFormData] = useState(initFormData(data.inputFields))
    const [showSuccess,setShowSuccess]=useState(false);
    const onSubmit = ({ page_id, state, city }: { page_id: number, state: string, city: string }) => {
        for(let inf of data.inputFields){
            if(inf.required && !formData[inf.key]){
                toast.error(inf.label+" must be filled")
                return
            }
        }
        httpPost(`/submit-dform`, { ...formData, state: state, city: city, page_id: page_id, section_name: data.section_name }, { passSecreateKey: true, passGuserSecreateKey: true }).then(({ data, message, code }) => {
            if (code === 200) {
                toast.success(message)
                setShowSuccess(true)
            }else{
                toast.error(message)
            }
        }).catch((err) => {
            toast.error(err.message)
        })
    }
    return { onSubmit, formData, setFormData,showSuccess }
}
export default useDform;