const PriceFormat = ({ amount, symbol = false,displayZeroval=true }: { amount: number, symbol?: boolean,displayZeroval?:boolean }) => {
    if(displayZeroval===false && amount===0){
        return <></>
    }
    return (
        <>
            {symbol === true ? <>&#x20B9;{amount}</> : `Rs.${amount}`}
        </>
    )
}
export default PriceFormat;