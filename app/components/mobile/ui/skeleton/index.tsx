import { FC, ReactNode } from "react";
import classes from './style.module.scss';
type TRectangleProps = {
    height?: string,
    width?: string,
    topGap?: string,
    bottomGap?: string
}
type TCilcleProps = {
    radius?: string,
    topGap?: string,
    bottomGap?: string,
    position?:'left'|'center'|'right',
    shape?:'circle'|'squarebox'
}
export const SklCircle: FC<TCilcleProps> = ({ radius='4rem', topGap, bottomGap,position,shape='circle' }) => {
    return (
        <div className={classes.rectangleSkeleton} style={{
            height: radius,
            width: radius,
            marginTop: topGap,
            marginBottom: bottomGap,
            borderRadius: shape==='circle'?'50%':'.7rem',
            marginLeft: (position==='right' || position==='center')?'auto':'unset',
            marginRight: (position==='left' || position==='center')?'auto':'unset'
        }}>
        </div>

    )
}
export const SklRectangle: FC<TRectangleProps> = ({ height = '1rem', width = '100%', topGap = '0.4rem', bottomGap = '0.4rem' }) => {
    return (
        <div className={classes.rectangleSkeleton} style={{
            height: height,
            width: width,
            marginTop: topGap,
            marginBottom: bottomGap
        }}>
        </div>
    )
}
export const Skeleton: FC<{
    children: ReactNode
}> = ({ children }) => {
    return (
        <div style={{background:"var(--white-primary)",borderRadius:"var(--sm-border-radius)",padding:'1rem'}}>
            {children}
        </div>
    )
}
export default SklRectangle;