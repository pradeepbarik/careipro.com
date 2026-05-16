
import classes from "./style.module.scss";
const PlushingLoader=({className}:{className?: string})=>{
    return (
        <div className={`${classes.loader} ${className || ''}`}>

        </div>
    )
}
export default PlushingLoader;