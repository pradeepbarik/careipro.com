import {NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
    const { searchParams,hostname } = new URL(request.url);
    if (searchParams.get('action') === 'set_cookie') {
        let name = searchParams.get('name')||"";
        let value = searchParams.get('value')||"";
        let httpOnly =  searchParams.get('httpOnly')==='true'?true:false;
        let expiretime = new Date(searchParams.get('expire') || "");
        const response = NextResponse.json({message: "Welcome!"})
        cookies().set({
            name:name,
            value:value,
            domain:'.'+hostname,
            expires:expiretime,
            httpOnly:httpOnly
        })
        return response;
    }
}