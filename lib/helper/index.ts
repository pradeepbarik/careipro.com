export const array_chunk:<T>(arr:T[],c:number,result:Array<Array<T>>)=>Array<Array<T>>=(arr,chunk,result=[])=>{
    let chunk_arr = arr.splice(0,chunk);
    result.push(chunk_arr);
    if(arr.length===0){
     return result;
    }
    return array_chunk(arr,chunk,result);
 }