import { createPortal } from 'react-dom';
import { ReactNode } from 'react';
import { BiX } from "react-icons/bi";
import classes from './style.module.scss';
const SlideUpModal = ({ children, open, heading = "", onClose }: { children: ReactNode, open: boolean, heading?: string, onClose: () => void }) => {
    return (
        <>
            {createPortal(<>
                <div className={`${classes.modalContainer}`} data-open={open} style={{maxHeight:'80vh'}}>
                    <div className='relative flex px-2 items-center' style={{ height: '3rem' }}>
                        <span className='font-semibold fs-18'>{heading}</span>
                        <BiX className='ml-auto text-3xl rounded-full bg-light-grey px-1' onClick={onClose} />
                    </div>
                    <div className='overflow-auto px-2' style={{ maxHeight: "calc(80vh - 3rem)" }}>
                        {children}
                    </div>
                </div>
                {open === true && <div className={classes.overlay}></div>}
            </>, document.body)}
        </>

    )
}
export default SlideUpModal