import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        let state = cookies().get("state")?.value;
        let city = cookies().get("city")?.value;
        if (state && city) {
            //a city already chosen, so / shows that city's home page
            return NextResponse.rewrite(new URL(`/${state.replace(/ /g, "-")}/${city.replace(/ /g, "-")}`, request.url));
        }
        /* nobody has chosen one yet, so / falls through to the city chooser rather than guessing.
           it used to land on Bhadrak, which was a whole page of one city's clinics shown to someone
           who may be nowhere near it, with nothing to say it was a guess. */
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