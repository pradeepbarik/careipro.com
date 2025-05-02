import {forwardRef,Ref, ChangeEvent, CSSProperties, FocusEvent, ReactNode } from 'react';
import classes from './style.module.scss';
interface InputFieldProps {
    id?:string,
    type?: string;
    lable?: string;
    placeholder?: string;
    value?: string | number | any;
    required?: boolean;
    error?: string;
    name?: string;
    className?: string;
    disabled?: boolean;
    lableIcon?:ReactNode;
    autoComplete?:"off"|"on"|''|"do-not-autofill"
    style?: CSSProperties;
    autofocus?:boolean;
    ref?:Ref<HTMLInputElement>,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}
const Input = ({ lable = "",lableIcon,style={},id="", type = 'text', value = "",autoComplete='', onChange, onFocus, onBlur, error, disabled,placeholder="",className="",autofocus,required }: InputFieldProps,ref:Ref<HTMLInputElement>) => {
    return (
        <div>
            {lable && <span className="flex font-semibold fs-15 items-center" style={{marginBottom:"0px 0px 10px"}}>
                {lableIcon && <span className='mr-1'>{lableIcon}</span>}
                {lable}
                {required && <span className='color-secondary'>&nbsp;*</span>}
            </span>}
            {type === "mobile" ?
                <>
                    <div className='relative mt-1'>
                        <span className='absolute flex items-center px-2 font-semibold fs-18 rounded-l-md' style={{ background: "var(--border-color-light)", height: "calc(100% - 2px)", top: "1px", left: "1px" }}>+91 </span>
                        <input type={'number'} value={value} className={`w-full outline-none px-2 pl-14 h-11 border rounded-md font-semibold fs-18 ${classes.input} ${className}`} onChange={onChange}
                           ref={ref}
                           onFocus={onFocus}
                            onBlur={onBlur}
                            data-error={error && error.length > 0}
                            disabled={disabled}
                            autoFocus={autofocus} id={id} />
                    </div>
                </> :
                <input type={type} value={value} 
                className={`w-full outline-none px-2 mt-1 h-11 border rounded-md font-semibold fs-18 ${classes.input} ${className}`} onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onFocus={onFocus}
                onBlur={onBlur}
                data-error={error && error.length > 0}
                disabled={disabled}
                autoFocus={autofocus}
                style={{...style}}
                ref={ref}
                />
            }
        </div>
    )
}
export default forwardRef(Input);