import { ReactNode, ChangeEvent } from 'react';
type TinputProps = {
    lable: string,
    lableIcon?: ReactNode;
    value: string,
    className?: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextArea = ({ lable, lableIcon, value, onChange, className }: TinputProps) => {
    return (
        <div>
            {lable && <span className="flex font-semibold fs-15 items-center" style={{ marginBottom: "0px 0px 10px" }}>
                {lableIcon && <span className='mr-1'>{lableIcon}</span>}
                {lable}
            </span>}
            <textarea value={value} onChange={onChange}
                className={`w-full outline-none px-2 mt-1 h-16 border rounded-md fs-18 ${className}`}
            ></textarea>
        </div>
    )
}
export default TextArea;