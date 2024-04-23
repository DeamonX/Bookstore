// export { auth as default } from "./auth";

import createMiddleware from "next-intl/middleware";
import { auth } from "./auth";
import { apiAuthPrefix, authRoutes, protectedRoutes } from "@/routes";
import { locales } from "./i18n";

const intlMiddelware = createMiddleware({
  locales: locales,
  defaultLocale: "en",
});
// béta verzió miatti függvény visszatérési hiba, a return null értékkel van problémája.
export default auth((req) => {
  const { nextUrl } = req;
  const { pathname } = nextUrl;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isEnglish = pathname.startsWith("/en");
  const isProtected = protectedRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  // Authentikációs hívásokat ellenőrzések nélkül engedjük.
  if (isApiAuthRoute) {
    return;
  }
  const i18Response = intlMiddelware(req);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return i18Response;
  }

  if (!isLoggedIn && isProtected) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(
        `/${isEnglish ? "en" : "hu"}/login?callbackUrl=${encodedCallbackUrl}`,
        nextUrl
      )
    );
  }
  if (isLoggedIn && isProtected) {
    if (pathname.includes("admin")) {
      if (req.auth?.user.role === "ADMIN") {
        return i18Response;
      } else {
        return Response.redirect(
          new URL(`/${isEnglish ? "en" : "hu"}/no-permission`, nextUrl)
        );
      }
    }
  }
  return i18Response;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
