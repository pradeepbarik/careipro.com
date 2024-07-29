import {capitalizeEachWordFirstLetter} from './format-text';
export const cityPageLink=(state:string,city:string)=>{
    return capitalizeEachWordFirstLetter(`${city}-In-${state}`).replace(" ","-")
}