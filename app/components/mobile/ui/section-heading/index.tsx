const SectionHeading=({heading,className=""}:{heading:string,className?:string})=>{
    return <h2 className={`fs-17 font-semibold px-2 py-2 ${className}`}>{heading}</h2>
}
export default SectionHeading;