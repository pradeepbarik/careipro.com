import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        let state = cookies().get("state")?.value;
        let city = cookies().get("city")?.value;
        if (state && city) {
            return NextResponse.rewrite(new URL(`/${city}-In-${state}`, request.url));
        } else {
            return NextResponse.rewrite(new URL(`/Bhadrak-In-Odisha`, request.url));
        }
    }
}
export const config = {
    matcher: [
        "/",
    ]
}
// (.*)-In-(.*)