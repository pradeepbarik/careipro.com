export const httpGet=async <R>(url:string):Promise<R>=>{
   return (await fetch(url)).json()
}