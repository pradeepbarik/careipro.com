import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        let state = cookies().get("state")?.value;
        let city = cookies().get("city")?.value;
        if (state && city) {
            return NextResponse.rewrite(new URL(`/${state.replace(" ", "-")}/${city.replace(" ", "-")}`, request.url));
        } else {
            return NextResponse.rewrite(new URL(`/Odisha/Bhadrak`, request.url));
        }
    }
    /* the route the layout is wrapping, which a server layout has no other way of knowing. the /tp
       pages are rendered without the site header and footer and this is how it tells. */
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", request.nextUrl.pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
}
export const config = {
    matcher: [
        "/",
        "/tp/:path*",
    ]
}
// (.*)-In-(.*)