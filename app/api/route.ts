import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { userSecreateKey,userinfo } from '@/constants/storage_keys';
import { fetchJson, IResponse } from "@/lib/services/http-server";
export async function GET(request: NextRequest) {
    let { searchParams, hostname } = new URL(request.url);
    if(process.env.NEXT_PUBLIC_MODE ==="production"){
        hostname = process.env.NEXT_PUBLIC_HOSTNAME || hostname;
    }
    if (searchParams.get('action') === 'set_cookie') {
        let name = searchParams.get('name') || "";
        let value = searchParams.get('value') || "";
        let httpOnly = searchParams.get('httpOnly') === 'true' ? true : false;
        let expiretime = new Date(searchParams.get('expire') || "");
        const response = NextResponse.json({ message: "Welcome!" })
        if (name === userSecreateKey) {
            try {
                let { data } = await fetchJson<IResponse<any>>("/user/secreate-key-info", false, { secreate_key: value });
                cookies().set({
                    name: name,
                    value: value,
                    domain: '.' + hostname,
                    expires: expiretime,
                    httpOnly: httpOnly
                })
                cookies().set({
                    name: userinfo,
                    value:JSON.stringify(data),
                    domain: '.' + hostname,
                    expires: expiretime,
                    httpOnly: httpOnly
                })
            } catch (err: any) {
            }
            return response;
        }
        cookies().set({
            name: name,
            value: value,
            domain: '.' + hostname,
            expires: expiretime,
            httpOnly: httpOnly
        })

        return response;
    } else if (searchParams.get('action') === 'delete_cookie') {
        let name = searchParams.get('name') || "";
        const response = NextResponse.json({ message: "delete cookie!" })
        cookies().delete(name)
        return response;
    }
}