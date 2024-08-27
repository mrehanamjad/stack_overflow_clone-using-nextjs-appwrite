import { NextResponse, NextRequest } from "next/server";
import getOrCreateStorage from "./models/server/storageSetup";
import getOrCreateDB from "./models/server/dbSetup";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  getOrCreateDB();
  getOrCreateStorage();
  return NextResponse.next(); // its is important when we writting middleware manually so that it either moves on to the next middle or keep on doing the regular stuff.
}

// the above function👆 will run everywhere(on every route) except where the mathers matches means
//the about function👆 will not run on the paths,we give in the matcher👇 key of config object
// and run on all other paths
export const config = {
  /*
    match all request paths execpt for the ones that starts with:
    - api
    - _next/statics
    - _next/image
    - favicon.com
    */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
