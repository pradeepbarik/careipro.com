import { FC } from "react";
import Link from "next/link";
import { getHomePageData } from "../hooks/home/useHomePage";
const CityHomePage:FC<{params:{city:string}}>=async ({params})=>{
    console.log('params',params)
    await getHomePageData();
    return (
        <div>
            {params.city}
            <br/>
            <Link href={'/'} >back to home</Link>
        </div>
    )
}
export default CityHomePage;