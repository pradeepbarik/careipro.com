'use client'
import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState } from 'react';
import { BiX } from "react-icons/bi";
import classes from './style.module.scss';
const SlideUpModal = ({ children, open, heading = "", headingIcon, onClose, zIndex = 0, className = "px-2", footer, footerHeight }: { children: ReactNode, open: boolean, heading?: string, headingIcon?: ReactNode, onClose: () => void, zIndex?: number, className?: string, footer?: ReactNode, footerHeight?: string }) => {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        setIsBrowser(true);
    }, [])
    return (
        <>
            {isBrowser && createPortal(<>
                <div className={`${classes.modalContainer} relative`} data-open={open} style={{ maxHeight: '90vh', zIndex: 10 + 2 + zIndex }}>
                    <div className='relative flex px-2 items-center' style={{ height: '3rem' }}>
                        {(headingIcon) && headingIcon}
                        <span className='font-semibold fs-18'>{heading}</span>
                        <BiX className='ml-auto text-3xl rounded-full bg-light-grey px-1' onClick={onClose} />
                    </div>
                    <div className={`overflow-auto ${className}`} style={footerHeight ? { marginBottom: footerHeight, maxHeight: `calc(90vh - 3rem - ${footerHeight})` } : { maxHeight: `calc(90vh - 3rem)` }}>
                        {children}
                    </div>
                    {footer &&
                        <div className="absolute bottom-0 left-0 w-full">
                            {footer}
                        </div>
                    }
                </div>
                {open === true && <div className={classes.overlay} style={{ zIndex: 10 + zIndex }}></div>}
            </>, document.body)}
        </>

    )
}
export default SlideUpModal