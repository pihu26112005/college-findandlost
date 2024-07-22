import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import {authMiddleware} from '@clerk/nextjs';
// const isProtectedRoute = createRouteMatcher([
//   '/',
//   '/allFindQuery',
//   '/allLostQuery',
//   'myQuery',
//   '/query(.*)'
// ]);

// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect();
// });

export default authMiddleware({
  publicRoutes:['/','/myQuery']
  authorizedParties: ['https://custom.vercel.app']
});


export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
