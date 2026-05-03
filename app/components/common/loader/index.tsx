import classes from "./style.module.scss";
const Loader = ({fullScreen}:{fullScreen?: boolean}) => {
    if(fullScreen){
        return (
            <div className={classes.fullScreen}>
                <div className="bg-white rounded-md p-4 shadow-md">
                   <div className={classes.loader}></div>
                </div>
            </div>
        )
    }
    return (
        <div className={classes.loader}></div>
    );
}
export default Loader;