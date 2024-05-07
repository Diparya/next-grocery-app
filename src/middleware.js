import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const authToken = request.cookies.get('authToken')?.value
    const loggedInUserNotAccessPaths=request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup'
    if(request.nextUrl.pathname==='/api/login' || request.nextUrl.pathname==='/api/users'){
        return; 
    }
    if(loggedInUserNotAccessPaths){
        if(authToken){
            return NextResponse.next(); 
        }
    } 
    else {
        if(!authToken){
            if(request.nextUrl.pathname.startsWith('/api')){
                return NextResponse.json({
                    message:'Access Dennied',
                    success:false
                },{
                    status:401,
                })
            }
            return NextResponse.redirect(new URL('/login',request.url))
        }
    }
    
    
}
 
// See "Matching Paths" below to learn more
export const config = {
//   matcher: ['/','/login','/signup','/managerhome','/producthome','/api/:path*'],
    matcher: ['/signup','/userhome','/producthome','/managerhome','/login']
}