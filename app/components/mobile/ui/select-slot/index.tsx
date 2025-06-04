'use client'
import moment from "@/lib/helper/date-time"
type TslotData = Record<string, Array<{
    label: string,
    value: string
}>>
const SelectSlot = ({ data, selectedDate,selectedTime, onSelectDate,onSelectTime }: { data: TslotData, selectedDate: string,selectedTime:string, onSelectDate: (date: string) => void,onSelectTime:(time:string)=>void }) => {
    let dates = Object.keys(data)
    return (
        <div className="border border-color-grey rounded-md">
            <div className="flex rounded-md py-1" style={{ backgroundColor: "var(--border-color-light)" }}>
                {dates.map((date) =>
                    <div key={date} className="grow text-center" onClick={() => { onSelectDate(date) }}>
                        <span className={`inline-flex flex-col px-3 py-1 rounded-md cursor-pointer ${date === selectedDate ? 'border border-color-primary bg-primary-10' : ''}`}>
                            <span className="fs-15 color-text-light font-semibold leading-5">{moment(date).format("ddd")}</span>
                            <span className="text-lg font-semibold leading-5">{moment(date).format('D MMM')}</span>
                        </span>
                    </div>)}
            </div>
            {data[selectedDate] &&
                <div className="flex flex-wrap px-2 mt-2">
                    {data[selectedDate].map((slot) =>
                        <span key={slot.value} className={`w-1/4 shrink-0 py-1 font-semibold color-text-light`} onClick={()=>{onSelectTime(slot.value)}}>
                            <span className={`inline-flex border px-2 py-1 rounded-md ${selectedTime===slot.value?"bg-primary color-white":""}`}>
                                {slot.label}
                            </span>
                        </span>
                    )}
                </div>
            }
        </div>
    )
}
export default SelectSlot;