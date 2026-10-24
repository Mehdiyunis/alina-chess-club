(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__1852once_vrae._.js",
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[project]/lib/supabase/config.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Supabase configuration helpers.
 * Reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from environment.
 * Ensures the project URL is normalized (stripping /rest/v1 or trailing slashes)
 * so OAuth and Auth endpoints point directly to /auth/v1/authorize.
 */ __turbopack_context__.s([
    "getSupabaseConfig",
    ()=>getSupabaseConfig,
    "normalizeSupabaseUrl",
    ()=>normalizeSupabaseUrl
]);
function normalizeSupabaseUrl(rawUrl) {
    if (!rawUrl) return '';
    let url = rawUrl.trim();
    url = url.replace(/\/+$/, '');
    url = url.replace(/\/rest\/v1\/?$/, '');
    url = url.replace(/\/auth\/v1\/?$/, '');
    return url;
}
function getSupabaseConfig() {
    const rawUrl = ("TURBOPACK compile-time value", "https://axdhrsxyzpeykojsjzzw.supabase.co") || '';
    const rawKey = ("TURBOPACK compile-time value", "sb_publishable_GizycZ7G0GfRO7-fJytUwA_xLoDiUiD") || '';
    const url = normalizeSupabaseUrl(rawUrl);
    const anonKey = rawKey.trim();
    const isConfigured = Boolean(url && anonKey && !url.includes('your-project') && !anonKey.includes('your-anon-key'));
    return {
        url,
        anonKey,
        isConfigured
    };
}
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/config.ts [middleware-edge] (ecmascript)");
;
;
;
async function middleware(request) {
    let supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request
    });
    const rawUrl = ("TURBOPACK compile-time value", "https://axdhrsxyzpeykojsjzzw.supabase.co");
    const rawKey = ("TURBOPACK compile-time value", "sb_publishable_GizycZ7G0GfRO7-fJytUwA_xLoDiUiD");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeSupabaseUrl"])(rawUrl);
    const key = rawKey.trim();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createServerClient"])(url, key, {
        cookies: {
            getAll () {
                return request.cookies.getAll();
            },
            setAll (cookiesToSet) {
                cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request
                });
                cookiesToSet.forEach(({ name, value, options })=>supabaseResponse.cookies.set(name, value, options));
            }
        }
    });
    // Refresh auth session
    try {
        await supabase.auth.getUser();
    } catch  {
    // Ignore session refresh errors
    }
    return supabaseResponse;
}
const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|images/|pieces/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1852once_vrae._.js.map