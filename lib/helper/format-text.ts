export const capitalizeFirstLetter=(text:string):string=>{
    return text.replace(/^./, text[0].toUpperCase());
}
export const capitalizeEachWordFirstLetter=(text:string):string=>{
    const finalSentence = text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return finalSentence;
}
export const formatCurrency=(amount:number)=>{
    return `₹${parseInt(amount.toString())}`
}