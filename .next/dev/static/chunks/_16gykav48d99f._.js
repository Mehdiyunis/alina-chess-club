(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/books/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BooksPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function BooksPage() {
    _s();
    const [books, setBooks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedLevel, setSelectedLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BooksPage.useEffect": ()=>{
            async function loadBooks() {
                setLoading(true);
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchBooks"])();
                setBooks(data);
                setLoading(false);
            }
            loadBooks();
        }
    }["BooksPage.useEffect"], []);
    const filteredBooks = books.filter((book)=>{
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase()) || book.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = selectedLevel === 'all' || book.level === selectedLevel;
        return matchesSearch && matchesLevel;
    });
    const getLevelLabel = (level)=>{
        switch(level){
            case 'beginner':
                return 'Başlanğıc səviyyə';
            case 'intermediate':
                return 'Orta səviyyə';
            case 'advanced':
                return 'İrəliləmiş səviyyə';
            default:
                return 'Ümumi';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col bg-[#0d0b17] text-[#ecebf5]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                fileName: "[project]/app/books/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 py-14 px-4 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1200px] mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center max-w-2xl mx-auto mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-[clamp(1.85rem,3.5vw,2.5rem)] font-bold text-[#ecebf5] tracking-tight",
                                    children: "Şahmat Kitabları və Dərsliklər"
                                }, void 0, false, {
                                    fileName: "[project]/app/books/page.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-[#9893b8] text-sm sm:text-base leading-relaxed",
                                    children: "Uşaqlar və yeni başlayanlar üçün seçilmiş təlim vəsaitlərini onlayn oxuyun və ya endirin."
                                }, void 0, false, {
                                    fileName: "[project]/app/books/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/books/page.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card-flat p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-full md:w-80",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9893b8]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/books/page.tsx",
                                                lineNumber: 71,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/books/page.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: searchQuery,
                                            onChange: (e)=>setSearchQuery(e.target.value),
                                            placeholder: "Kitab və ya müəllif axtarın...",
                                            className: "w-full pl-9 pr-3.5 py-2 rounded-[8px] bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] placeholder-[#9893b8]/50 focus:outline-hidden focus:border-[#7c5cff] text-xs sm:text-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/app/books/page.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/books/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-1.5 w-full md:w-auto",
                                    children: [
                                        {
                                            id: 'all',
                                            label: 'Hamısı'
                                        },
                                        {
                                            id: 'beginner',
                                            label: 'Başlanğıc'
                                        },
                                        {
                                            id: 'intermediate',
                                            label: 'Orta'
                                        },
                                        {
                                            id: 'advanced',
                                            label: 'İrəliləmiş'
                                        }
                                    ].map((item)=>{
                                        const isActive = selectedLevel === item.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedLevel(item.id),
                                            className: `px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors cursor-pointer ${isActive ? 'bg-[#7c5cff] text-white' : 'bg-[#211c3a] text-[#9893b8] hover:text-[#ecebf5] border border-[#2d2750]'}`,
                                            children: item.label
                                        }, item.id, false, {
                                            fileName: "[project]/app/books/page.tsx",
                                            lineNumber: 92,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/books/page.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/books/page.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-20 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[#9893b8] text-sm",
                                children: "Kitablar yüklənir..."
                            }, void 0, false, {
                                fileName: "[project]/app/books/page.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/books/page.tsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this) : filteredBooks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-16 text-center card-flat p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-bold text-[#ecebf5]",
                                    children: "Axtarışa uyğun kitab tapılmadı"
                                }, void 0, false, {
                                    fileName: "[project]/app/books/page.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[#9893b8] text-xs mt-1",
                                    children: "Axtarış sözünü dəyişdirin və ya filtri sıfırlayın."
                                }, void 0, false, {
                                    fileName: "[project]/app/books/page.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setSearchQuery('');
                                        setSelectedLevel('all');
                                    },
                                    className: "btn-secondary px-3.5 py-1.5 text-xs mt-3 cursor-pointer",
                                    children: "Filtri sıfırla"
                                }, void 0, false, {
                                    fileName: "[project]/app/books/page.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/books/page.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
                            children: filteredBooks.map((book)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card-flat p-5 flex flex-col justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-xs text-[#9893b8] mb-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[#7c5cff] font-medium",
                                                            children: getLevelLabel(book.level)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/books/page.tsx",
                                                            lineNumber: 139,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "aria-hidden": "true",
                                                            children: "·"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/books/page.tsx",
                                                            lineNumber: 140,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "PDF dərslik"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/books/page.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/books/page.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-base font-bold text-[#ecebf5] mb-1 leading-snug",
                                                    children: book.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/books/page.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-[#9893b8] font-medium mb-3",
                                                    children: [
                                                        "Müəllif: ",
                                                        book.author
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/books/page.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-[#9893b8] leading-relaxed line-clamp-3 mb-5",
                                                    children: book.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/books/page.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/books/page.tsx",
                                            lineNumber: 136,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-3 border-t border-[#2d2750] flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: book.file_url,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "btn-primary flex-1 py-2 px-3 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                            className: "w-3.5 h-3.5 mr-1.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/books/page.tsx",
                                                            lineNumber: 164,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Oxu / Bax"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/books/page.tsx",
                                                            lineNumber: 165,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/books/page.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: book.file_url,
                                                    download: book.file_name || 'sahmat_kitabi.pdf',
                                                    className: "btn-secondary py-2 px-3 text-xs",
                                                    title: "PDF kimi yüklə",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/books/page.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/books/page.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/books/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, book.id, true, {
                                    fileName: "[project]/app/books/page.tsx",
                                    lineNumber: 132,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/books/page.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/books/page.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/books/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/app/books/page.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/books/page.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(BooksPage, "QsiAbFO6dhDp5wez+CVy2Mxl104=");
_c = BooksPage;
var _c;
__turbopack_context__.k.register(_c, "BooksPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/siteData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
;
;
;
;
const Footer = ()=>{
    const getSocialIcon = (platform)=>{
        switch(platform.toLowerCase()){
            case 'instagram':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 10,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            case 'facebook':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 12,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            case 'youtube':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 14,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            case 'telegram':
            case 'send':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 17,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-[#090712] text-[#9893b8] pt-14 pb-12 border-t border-[#2d2750]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[1200px] mx-auto px-4 sm:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#2d2750]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-[8px] bg-[#211c3a] border border-[#2d2750] text-[#7c5cff] flex items-center justify-center font-bold text-sm",
                                            children: "♚"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 30,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-base text-[#ecebf5]",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].name
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 33,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-[#9893b8] max-w-sm leading-relaxed",
                                    children: "Uşaqlar və yeni başlayanlar üçün hazırlanmış şahmat tədris portalı."
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold text-[#ecebf5] block mb-2",
                                            children: "Sosial şəbəkələr:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].socialLinks.map((social)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: social.url,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "p-2 bg-[#171428] hover:bg-[#211c3a] text-[#9893b8] hover:text-[#ecebf5] rounded-[8px] transition-colors border border-[#2d2750]",
                                                    title: social.platform,
                                                    children: getSocialIcon(social.platform)
                                                }, social.platform, false, {
                                                    fileName: "[project]/components/Footer.tsx",
                                                    lineNumber: 48,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xs font-bold text-[#ecebf5] uppercase tracking-wider",
                                    children: "Tədris Bölmələri"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1.5 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/#board",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "Şahmat Lövhəsi"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 70,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/#pieces",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "Fiqurlar və Qaydalar"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 75,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/#goals",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "Şah, Mat və Pat"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 80,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/#rules",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "Xüsusi Gedişlər"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 85,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/#tips",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "6 Qızıl Tövsiyə"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 90,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xs font-bold text-[#ecebf5] uppercase tracking-wider",
                                    children: "Akademiya"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1.5 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/#teachers",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "Təlimçilərimiz"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 104,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/books",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "Şahmat Kitabları"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 109,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/#history",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "Azərbaycan Şahmat Tarixi"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 114,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/#faq",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "Suallar və Cavablar"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/#contact",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "Əlaqə"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 123,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xs font-bold text-[#ecebf5] uppercase tracking-wider",
                                    children: "Alətlər"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1.5 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/#setup-board",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "Mövqe Qurucusu (Sandbox)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 138,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/auth",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "Qeydiyyat və Giriş"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 143,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 142,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/admin",
                                                className: "hover:text-[#ecebf5] transition-colors",
                                                children: "İnzibatçı Paneli"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.tsx",
                                                lineNumber: 148,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9893b8]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " Şahmat Məktəbi. Bütün hüquqlar qorunur."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] text-[#9893b8]/80 text-center sm:text-right",
                            children: "Şahmat fiqurları: Cburnett dəsti (Colin M.L. Burnett, CC BY-SA 3.0 / Wikimedia Commons)."
                        }, void 0, false, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/Footer.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/Footer.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const Navbar = ()=>{
    _s();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userMenuOpen, setUserMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            async function loadUser() {
                // Check mock/demo session first
                if ("TURBOPACK compile-time truthy", 1) {
                    try {
                        const demoSession = localStorage.getItem('sb-demo-session');
                        if (demoSession) {
                            const parsed = JSON.parse(demoSession);
                            if (parsed?.profile) {
                                setUser(parsed.profile);
                                return;
                            }
                        }
                    } catch  {}
                }
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
                    return;
                }
                try {
                    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                    const { data: { session } } = await supabase.auth.getSession();
                    if (session?.user) {
                        const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                        setUser({
                            id: session.user.id,
                            full_name: profile?.full_name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'İstifadəçi',
                            role: profile?.role || 'user',
                            created_at: session.user.created_at,
                            email: session.user.email,
                            phone: session.user.phone
                        });
                    }
                } catch (err) {
                    console.warn('Navbar user load error:', err);
                }
            }
            loadUser();
        }
    }["Navbar.useEffect"], [
        pathname
    ]);
    // Close dropdown on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            function handleClickOutside(event) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setUserMenuOpen(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "Navbar.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    const handleLogout = async ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('sb-demo-session');
            document.cookie = 'sb-demo-role=; path=/; max-age=0';
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
            try {
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                await supabase.auth.signOut();
            } catch  {}
        }
        setUser(null);
        setUserMenuOpen(false);
        window.location.href = '/';
    };
    const navLinks = [
        {
            label: 'Təlimçilər',
            href: '/#teachers'
        },
        {
            label: 'Fiqurlar',
            href: '/#pieces'
        },
        {
            label: 'Qaydalar',
            href: '/#rules'
        },
        {
            label: 'Tövsiyələr',
            href: '/#tips'
        },
        {
            label: 'Kitablar',
            href: '/books',
            isRoute: true
        },
        {
            label: 'Lövhə Qurucusu',
            href: '/#setup-board'
        },
        {
            label: 'Əlaqə',
            href: '/#contact'
        }
    ];
    // Clean first name without provider or parenthesis
    const getFirstName = (fullName)=>{
        if (!fullName) return 'İstifadəçi';
        const cleaned = fullName.replace(/\(.*?\)/g, '').trim();
        const firstPart = cleaned.split(' ')[0] || 'İstifadəçi';
        return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
    };
    const firstName = getFirstName(user?.full_name);
    const userInitial = (firstName || 'İ').charAt(0).toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-40 bg-[#0d0b17]/90 backdrop-blur-md border-b border-[#2d2750]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-2.5 text-left focus-visible:outline-hidden group shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-[8px] bg-[#211c3a] border border-[#2d2750] text-[#7c5cff] flex items-center justify-center font-bold text-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-base select-none leading-none",
                                    children: "♚"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-base sm:text-lg text-[#ecebf5] tracking-tight group-hover:text-white transition-colors",
                                children: "Şahmat Məktəbi"
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden lg:flex items-center gap-6 text-sm font-medium text-[#9893b8]",
                        children: navLinks.map((link)=>{
                            const isActive = link.isRoute && pathname === link.href;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: link.href,
                                className: `transition-colors whitespace-nowrap py-1 ${isActive ? 'text-[#ecebf5] font-semibold border-b-2 border-[#7c5cff]' : 'hover:text-[#ecebf5]'}`,
                                children: link.label
                            }, link.label, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                ref: dropdownRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setUserMenuOpen(!userMenuOpen),
                                        className: "flex items-center gap-2 p-1 rounded-full hover:bg-[#211c3a] transition-colors cursor-pointer focus-visible:outline-hidden",
                                        "aria-label": "İstifadəçi menyusu",
                                        "aria-expanded": userMenuOpen,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-9 h-9 rounded-full bg-[#7c5cff] text-white flex items-center justify-center font-bold text-sm shadow-sm select-none",
                                                children: userInitial
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 158,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "w-3.5 h-3.5 text-[#9893b8] hidden sm:block"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 161,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    userMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 mt-2 w-56 card-flat bg-[#171428] border border-[#2d2750] shadow-xl py-2 z-50 animate-in fade-in duration-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2 border-b border-[#2d2750]/70",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-[#ecebf5] truncate",
                                                        children: firstName
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-[#9893b8] mt-0.5",
                                                        children: user.role === 'admin' ? 'İnzibatçı' : 'Tələbə'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 167,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            user.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/admin",
                                                onClick: ()=>setUserMenuOpen(false),
                                                className: "flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#9a82ff] hover:bg-[#211c3a] transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                        className: "w-4 h-4 text-[#7c5cff]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "İnzibatçı Paneli"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 177,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/books",
                                                onClick: ()=>setUserMenuOpen(false),
                                                className: "flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#ecebf5] hover:bg-[#211c3a] transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Kitabxana"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 187,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleLogout,
                                                className: "w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-400 hover:bg-[#211c3a] transition-colors cursor-pointer border-t border-[#2d2750]/50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Çıxış"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 195,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/auth",
                                className: "btn-primary px-4 py-2 text-xs sm:text-sm whitespace-nowrap",
                                children: "Qoşul"
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                                className: "lg:hidden p-2 text-[#9893b8] hover:text-[#ecebf5] cursor-pointer",
                                "aria-label": "Menyunu aç",
                                children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 220,
                                    columnNumber: 31
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 220,
                                    columnNumber: 59
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden bg-[#171428] border-b border-[#2d2750] px-4 py-4 space-y-1",
                children: [
                    navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: link.href,
                            onClick: ()=>setMobileMenuOpen(false),
                            className: "block py-2.5 px-3 text-sm font-medium text-[#ecebf5] hover:bg-[#211c3a] rounded-[8px] transition-colors",
                            children: link.label
                        }, link.label, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-3 border-t border-[#2d2750]",
                        children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-3 py-1.5 text-xs text-[#9893b8]",
                                    children: [
                                        "Giriş edilib: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#ecebf5] font-semibold",
                                            children: firstName
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 243,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " (",
                                        user.role === 'admin' ? 'İnzibatçı' : 'Tələbə',
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 242,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                user.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    className: "block py-2 px-3 text-sm font-semibold text-[#9a82ff] hover:bg-[#211c3a] rounded-[8px]",
                                    children: "İnzibatçı Paneli"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 246,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLogout,
                                    className: "w-full text-left py-2 px-3 text-sm font-medium text-rose-400 hover:bg-[#211c3a] rounded-[8px] cursor-pointer",
                                    children: "Çıxış"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 254,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 241,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/auth",
                            onClick: ()=>setMobileMenuOpen(false),
                            className: "btn-primary w-full py-2.5 text-sm",
                            children: "Bizə qoşul"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 262,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 239,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 227,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Navbar.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Navbar, "OyqFIJnuLwANUqTULQ9ROfGlNVc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/siteData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "beginnerTipsData",
    ()=>beginnerTipsData,
    "faqData",
    ()=>faqData,
    "gameGoalsData",
    ()=>gameGoalsData,
    "historyData",
    ()=>historyData,
    "initialDemoBooks",
    ()=>initialDemoBooks,
    "piecesData",
    ()=>piecesData,
    "siteConfig",
    ()=>siteConfig,
    "specialMovesData",
    ()=>specialMovesData,
    "teachersData",
    ()=>teachersData
]);
const siteConfig = {
    name: 'Şahmat Məktəbi',
    tagline: 'Uşaqlar və yeni başlayanlar üçün aydın və sadə şahmat dərsləri',
    socialLinks: [
        {
            platform: 'Instagram',
            name: '@sahmat.mektebi',
            url: 'https://instagram.com/sahmat.mektebi',
            icon: 'instagram'
        },
        {
            platform: 'Facebook',
            name: 'Şahmat Məktəbi',
            url: 'https://facebook.com/sahmatmektebi',
            icon: 'facebook'
        },
        {
            platform: 'YouTube',
            name: 'Şahmat Dərsləri',
            url: 'https://youtube.com/@sahmatdersleri',
            icon: 'youtube'
        },
        {
            platform: 'TikTok',
            name: '@sahmatdersi',
            url: 'https://tiktok.com/@sahmatdersi',
            icon: 'tiktok'
        },
        {
            platform: 'Telegram',
            name: 't.me/sahmat_mektebi',
            url: 'https://t.me/sahmat_mektebi',
            icon: 'send'
        }
    ]
};
const teachersData = [
    {
        id: 't-1',
        firstName: 'Leyla',
        lastName: 'Əliyeva',
        role: 'Baş Təlimçi',
        bio: 'Beynəlxalq dərəcəli usta. İllərdir uşaqlara şahmatın əsaslarını səbirlə və aydın metodika ilə öyrədir.',
        photoUrl: '/images/teacher_leyla_alieva_1792527781686.jpg'
    },
    {
        id: 't-2',
        firstName: 'Fərid',
        lastName: 'Məmmədov',
        role: 'Qrossmeyster və Məşqçi',
        bio: 'Respublika yarışlarının qalibi. Şagirdlərdə strateji təfəkkür və taktiki analiz bacarığını inkişaf etdirir.',
        photoUrl: '/images/teacher_farid_mammadov_1792527794770.jpg'
    },
    {
        id: 't-3',
        firstName: 'Nigar',
        lastName: 'Quliyeva',
        role: 'İbtidai Qruplar üzrə Müəllim',
        bio: 'Məktəbəqədər və ibtidai sinif şagirdləri üçün anlaşılan, addım-addım tədris proqramı tətbiq edir.',
        photoUrl: '/images/teacher_nigar_guliyeva_1792527795069.jpg'
    },
    {
        id: 't-4',
        firstName: 'Rəşad',
        lastName: 'Həsənov',
        role: 'Taktika Məşqçisi',
        bio: 'Pedaqoji təcrübəyə malik məşqçi. Gənc şahmatçıların turnir hazırlığı ilə məşğuldur.',
        photoUrl: '/images/teacher_rashad_hasanov_1792527796101.jpg'
    }
];
const piecesData = [
    {
        id: 'king',
        name: 'Şah',
        type: 'k',
        value: 'Oyunu təyin edir',
        summary: 'İstənilən istiqamətə yalnız 1 xana hərəkət edir.',
        description: 'Şah lövhənin ən vacib fiqurudur. Əgər şah hücumdan qurtula bilmirsə (mat olursa), oyun başa çatır. Şah istənilən istiqamətə bir addım ata bilər, lakin rəqibin vurduğu xanaya gedə bilməz.',
        demoPosition: {
            pieceSquare: 'e4',
            validMoves: [
                'd5',
                'e5',
                'f5',
                'd4',
                'f4',
                'd3',
                'e3',
                'f3'
            ]
        }
    },
    {
        id: 'queen',
        name: 'Vəzir',
        type: 'q',
        value: '9 xal',
        summary: 'Şaquli, üfüqi və diaqonal istiqamətdə istədiyi qədər boş xana gedir.',
        description: 'Vəzir ən güclü fiqurdur. Həm Top kimi düz xətlərlə, həm də Fil kimi diaqonal xətlərlə istədiyi qədər boş xana irəliləyə bilir.',
        demoPosition: {
            pieceSquare: 'd4',
            validMoves: [
                'd1',
                'd2',
                'd3',
                'd5',
                'd6',
                'd7',
                'd8',
                'a4',
                'b4',
                'c4',
                'e4',
                'f4',
                'g4',
                'h4',
                'a1',
                'b2',
                'c3',
                'e5',
                'f6',
                'g7',
                'h8',
                'a7',
                'b6',
                'c5',
                'e3',
                'f2',
                'g1'
            ]
        }
    },
    {
        id: 'rook',
        name: 'Top',
        type: 'r',
        value: '5 xal',
        summary: 'Yalnız düz xətlərlə (şaquli və üfüqi) hərəkət edir.',
        description: 'Top uzaq məsafəli ağır fiqurdur. Yalnız şaquli və üfüqi düz xətlər boyunca istədiyi qədər boş xanaya irəliləyə bilər. Digər fiqurların üstündən atlaya bilməz.',
        demoPosition: {
            pieceSquare: 'd4',
            validMoves: [
                'd1',
                'd2',
                'd3',
                'd5',
                'd6',
                'd7',
                'd8',
                'a4',
                'b4',
                'c4',
                'e4',
                'f4',
                'g4',
                'h4'
            ]
        }
    },
    {
        id: 'bishop',
        name: 'Fil',
        type: 'b',
        value: '3 xal',
        summary: 'Yalnız diaqonal (çəp) xətlərlə hərəkət edir.',
        description: 'Hər tərəfin iki Fili var: biri ağ xanalarda, digəri qara xanalarda hərəkət edir. Fil öz rəngini heç vaxt dəyişmir və diaqonal boyunca boş xanalarla irəliləyir.',
        demoPosition: {
            pieceSquare: 'd4',
            validMoves: [
                'a1',
                'b2',
                'c3',
                'e5',
                'f6',
                'g7',
                'h8',
                'a7',
                'b6',
                'c5',
                'e3',
                'f2',
                'g1'
            ]
        }
    },
    {
        id: 'knight',
        name: 'At',
        type: 'n',
        value: '3 xal',
        summary: 'Sıçrayan fiqur: L hərfi şəklində hərəkət edir və fiqurların üstündən tullanır.',
        description: 'At lövhədəki yeganə sıçrayan fiqurdur. Başqa fiqurların üstündən atlaya bilir. İki xana bir tərəfə, sonra bir xana yana gedərək "L" forması cızır və hər gedişdə xananın rəngini dəyişir.',
        demoPosition: {
            pieceSquare: 'e4',
            validMoves: [
                'd6',
                'f6',
                'c5',
                'g5',
                'c3',
                'g3',
                'd2',
                'f2'
            ]
        }
    },
    {
        id: 'pawn',
        name: 'Piyada',
        type: 'p',
        value: '1 xal',
        summary: 'Cəsur piyada: yalnız irəli gedir, rəqibi isə 1 xana çəpinə vurur.',
        description: 'Piyada yalnız irəli doğru addımlayır və geriyə qayıda bilməz. İlk gedişində istəsə 2 xana birdən ata bilər. Rəqib fiquru isə bir xana diaqonal üzrə vurur. Əgər qarşı tərəfin sonuncu xəttinə çatarsa, Vəzirə və ya başqa fiqura çevrilir.',
        demoPosition: {
            pieceSquare: 'e2',
            validMoves: [
                'e3',
                'e4'
            ]
        }
    }
];
const gameGoalsData = [
    {
        id: 'shah',
        title: 'Şah (Hücum)',
        simpleExplain: 'Şaha birbaşa hücum edildikdə Şah elan olunur.',
        detail: 'Rəqibin hər hansı fiquru sizin Şahınızı vurmaqla hədələyirsə, bu Şah elanıdır. Şahı dərhal xilas etmək lazımdır: təhlükəsiz xanaya qaçmaq, araya başqa fiqur qoymaq və ya hücum edən fiquru vurmaqla.',
        boardFen: '4k3/8/8/8/8/8/4R3/4K3 b - - 0 1',
        highlightSquare: 'e8',
        attackerSquare: 'e2'
    },
    {
        id: 'mat',
        title: 'Mat (Qələbə)',
        simpleExplain: 'Şaha hücum olunub və onun xilas olmağa heç bir yolu qalmayıb.',
        detail: 'Mat şahmat oyununun əsas məqsədidir. Şaha hücum edilib və o qaça bilmir, araya sipər çəkə bilmir və hücum edən fiquru vura bilmir. Mat edən tərəf qələbə qazanır.',
        boardFen: '6k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1',
        highlightSquare: 'g8',
        attackerSquare: 'b8'
    },
    {
        id: 'pat',
        title: 'Pat (Heç-heçə)',
        simpleExplain: 'Şah hücum altında deyil, lakin oyunçunun heç bir qaydalı gedişi qalmayıb.',
        detail: 'Növbə gələn oyunçunun heç bir qaydalı gedişi yoxdur və Şahı da təhlükədə deyil. Belə vəziyyətdə oyun dərhal heç-heçə hesab olunur.',
        boardFen: 'k7/2Q5/1K6/8/8/8/8/8 b - - 0 1',
        highlightSquare: 'a8',
        attackerSquare: ''
    },
    {
        id: 'draw',
        title: 'Heç-heçə (Bərabərlik)',
        simpleExplain: 'Hər iki tərəf üçün bərabər nəticə (yarım xal).',
        detail: 'Oyunda qalib olmadıqda heç-heçə qeydə alınır: qarşılıqlı razılıq, mat etmək üçün fiqurların çatışmazlığı və ya eyni vəziyyətin üç dəfə təkrarı zamanı.',
        boardFen: '8/8/4k3/8/8/4K3/8/8 w - - 0 1',
        highlightSquare: '',
        attackerSquare: ''
    }
];
const specialMovesData = [
    {
        id: 'castling',
        title: 'Rokirovka',
        subtitle: 'Şah və Topun birgə gedişi',
        description: 'Şahı mərkəzdən küncə qaçırmaq və Topu oyuna qoşmaq üçün edilən xüsusi gedişdir. Şah iki xana sağa (qısa rokirovka) və ya iki xana sola (uzun rokirovka) gedir, Top isə Şahın yanına keçir.',
        rules: [
            'Şah və həmin Top oyunda əvvəl heç bir gediş etməmiş olmalıdır.',
            'Aralarındakı xanalar tamamilə boş olmalıdır.',
            'Şah hücum altında olmamalı və keçdiyi xanalar da vurulmamalıdır.'
        ]
    },
    {
        id: 'promotion',
        title: 'Piyadanın Çevrilməsi',
        subtitle: 'Son xəttə çatan piyadanın dəyişməsi',
        description: 'Piyada rəqibin sonuncu xəttinə (ağ piyada 8-ci, qara piyada 1-ci xəttə) çatdıqda lövhədən götürülür və yerinə Vəzir, Top, Fil və ya At qoyulur.',
        rules: [
            'Piyada son xanaya çatan kimi dərhal çevrilməlidir.',
            'Lövhədə digər vəzirin olub-olmaması fərq etmir.'
        ]
    },
    {
        id: 'enpassant',
        title: 'Keçiddə Götürmə',
        subtitle: 'Piyadanın xüsusi vurma qaydası',
        description: 'Rəqibin piyadası başlanğıc yerindən iki xana irəli gedərək sizin piyadanızın yanına düşdükdə, sizin piyada onu bir xana getmiş kimi çəpinə vura bilər.',
        rules: [
            'Yalnız piyadalar arasında və yalnız iki xana irəliləyən piyadaya qarşı tətbiq olunur.',
            'Gediş dərhal edilməlidir, növbəti gedişdə bu hüquq itirilir.'
        ]
    }
];
const beginnerTipsData = [
    {
        number: '01',
        title: 'Mərkəzə nəzarət edin',
        text: 'Lövhənin mərkəzindəki d4, e4, d5, e5 xanaları əsas mövqelərdir. Mərkəzdə dayanan fiqurlar daha çox xananı nəzarətdə saxlayır.'
    },
    {
        number: '02',
        title: 'Fiqurları tez oyuna çıxarın',
        text: 'Oyuna başlayan kimi yüngül fiqurları (Atları və Filləri) mərkəzə doğru inkişaf etdirin. Bir fiqurla təkrar-təkrar oynamaq yerinə bütün ordunu səfərbər edin.'
    },
    {
        number: '03',
        title: 'Şahın təhlükəsizliyini təmin edin',
        text: 'Açılışda ilk fürsətdə rokirovka edin. Şah mərkəzdə qaldıqda rəqibin sürətli hücumuna məruz qala bilər.'
    },
    {
        number: '04',
        title: 'Fiqurları havayı itirməyin',
        text: 'Hər gedişdən əvvəl yoxlayın: gedəcəyiniz xananı rəqib qoruyurmu? Fiqurunuz müdafiəsiz qalırmı?'
    },
    {
        number: '05',
        title: 'Tələsmədən düşünün',
        text: 'Şahmat diqqət və səbir oyunudur. Əlinizi dərhal fiqura uzatmayın, əvvəlcə rəqibin verə biləcəyi cavabları hesablayın.'
    },
    {
        number: '06',
        title: 'Xanaların adlarını öyrənin',
        text: 'Xanaların adlarını (a1, e4, h8 və s.) bilmək dərslikləri oxumağa və oyunları rahat analiz etməyə imkan verir.'
    }
];
const faqData = [
    {
        question: 'Uşaqlar neçə yaşından şahmat öyrənməyə başlaya bilər?',
        answer: 'Adətən 5-6 yaş şahmat öyrənmək üçün əlverişli dövrdür. Fiqurların hərəkətini və sadə qaydaları bu yaşda rahat mənimsəmək mümkündür.'
    },
    {
        question: 'Dərslərə başlamaq üçün ilkin bilik lazımdırmı?',
        answer: 'Xeyr, heç bir ilkin bilik tələb olunmur. Dərslər lövhənin xanalarından və fiqurların adlarından başlayaraq ən sadə dildə izah edilir.'
    },
    {
        question: 'Şahmat uşağın inkişafına necə kömək edir?',
        answer: 'Şahmat məntiqi təfəkkürü, konsentrasiyanı, səbirlə düşünməyi və qərar qəbul etmə bacarığını gücləndirir.'
    },
    {
        question: 'Dərslərə qeydiyyat necə aparılır?',
        answer: 'Saytın yuxarısındakı "Qoşul" düyməsinə klikləyərək və ya əlaqə formasında nömrənizi qeyd edərək dərslərə yazıla bilərsiniz.'
    },
    {
        question: 'Öyrənmə mərhələsində rəqiblə oynamaq şərtdirmi?',
        answer: 'Xeyr. Başlanğıcda qaydaları, fiqurların hərəkətini və sadə tapmacaları öyrənmək daha vacibdir.'
    }
];
const historyData = {
    title: 'Azərbaycanda Şahmat Ənənəsi',
    lead: 'Azərbaycan zəngin şahmat ənənələrinə və beynəlxalq arenada tanınan məktəbə malikdir.',
    paragraphs: [
        'Şahmat Şərqdə əsrlər boyu zəka oyunu kimi qəbul edilmiş, dahi şair Nizami Gəncəvinin əsərlərində də şahmat terminləri və lövhə fəlsəfəsi yer almışdır.',
        'Müasir dövrdə Azərbaycan şahmat komandaları Avropa Çempionatlarında yüksək nəticələr göstərmiş, ölkəmizdə çoxlu istedadlı qrossmeysterlər yetişmişdir.',
        'Gənc nəslin şahmata marağı hər il artır və məktəbimiz uşaqlara bu möhkəm təməli aşılamağı hədəfləyir.'
    ],
    grandmasters: [
        {
            name: 'Şəhriyar Məmmədyarov',
            title: 'Qrossmeyster, Dünya Çempionatı iddiaçısı, komanda üzrə Avropa Çempionu'
        },
        {
            name: 'Teymur Rəcəbov',
            title: 'Qrossmeyster, FIDE Dünya Kubokunun qalibi'
        },
        {
            name: 'Vüqar Həşimov',
            title: 'Mərhum Qrossmeyster, güclü taktika ustası və komanda çempionu'
        }
    ]
};
const initialDemoBooks = [
    {
        id: 'book-1',
        title: 'Şahmatın İlk Əlifbası',
        author: 'Teymur Qasımov',
        description: 'Uşaqlar və yeni başlayanlar üçün hazırlanmış dərslik. Fiqurların hərəkəti, xanaların adları və ilk oyun qaydaları.',
        level: 'beginner',
        cover_url: null,
        file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        file_name: 'sahmatin_ilk_elifbasi.pdf',
        created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
    },
    {
        id: 'book-2',
        title: 'Gənc Şahmatçının Taktiki Gedişləri',
        author: 'Fərid Məmmədov',
        description: 'Bir və iki gedişlik mat tapmacaları, fiqurların çəngəl və bağlama fəndləri üzrə praktiki məşq vəsaiti.',
        level: 'beginner',
        cover_url: null,
        file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        file_name: 'genc_sahmatcinin_taktikalari.pdf',
        created_at: new Date(Date.now() - 3600000 * 24 * 7).toISOString()
    },
    {
        id: 'book-3',
        title: 'Açılış Qaydaları və İlk Gedişlər',
        author: 'Leyla Əliyeva',
        description: 'Klassik şahmat açılışları, mərkəzə nəzarət və debütdə edilən ümumi səhvlərdən qorunma yolları.',
        level: 'intermediate',
        cover_url: null,
        file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        file_name: 'acilis_qaydalari.pdf',
        created_at: new Date(Date.now() - 3600000 * 24 * 12).toISOString()
    },
    {
        id: 'book-4',
        title: 'Şahmat Strategiyası və Sadə Endşpil',
        author: 'Rəşad Həsənov',
        description: 'Piyada sonluqları, top və fil əməkdaşlığı, mövqe üstünlüyünün qələbəyə çatdırılması qaydaları.',
        level: 'advanced',
        cover_url: null,
        file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        file_name: 'sahmat_strategiyasi.pdf',
        created_at: new Date(Date.now() - 3600000 * 24 * 20).toISOString()
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/actions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBook",
    ()=>createBook,
    "deleteBook",
    ()=>deleteBook,
    "deleteContactRequest",
    ()=>deleteContactRequest,
    "deleteContactRequestItem",
    ()=>deleteContactRequestItem,
    "fetchBooks",
    ()=>fetchBooks,
    "fetchContactRequests",
    ()=>fetchContactRequests,
    "getBooks",
    ()=>getBooks,
    "getContactRequests",
    ()=>getContactRequests,
    "markContactRequestContacted",
    ()=>markContactRequestContacted,
    "submitContactRequest",
    ()=>submitContactRequest,
    "translateSupabaseError",
    ()=>translateSupabaseError,
    "updateContactRequestStatus",
    ()=>updateContactRequestStatus,
    "uploadBookFile",
    ()=>uploadBookFile,
    "uploadStorageFile",
    ()=>uploadStorageFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/siteData.ts [app-client] (ecmascript)");
;
;
const LOCAL_STORAGE_KEY_REQUESTS = 'sahmat_contact_requests_demo';
const LOCAL_STORAGE_KEY_BOOKS = 'sahmat_books_demo';
const initialDemoRequests = [
    {
        id: 'req-1',
        value: '+994 50 123 45 67',
        type: 'phone',
        status: 'new',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
        id: 'req-2',
        value: 'aydan.valiyeva@example.com',
        type: 'email',
        status: 'contacted',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
        id: 'req-3',
        value: '+994 55 987 65 43',
        type: 'phone',
        status: 'new',
        created_at: new Date(Date.now() - 3600000 * 48).toISOString()
    }
];
function translateSupabaseError(error) {
    if (!error) return 'Bilinməyən xəta baş verdi.';
    const msg = typeof error === 'string' ? error : error.message || '';
    if (msg.includes('Invalid login credentials') || msg.includes('invalid_grant')) {
        return 'Daxil edilən məlumatlar və ya şifrə yanlışdır.';
    }
    if (msg.includes('User already registered') || msg.includes('already exists')) {
        return 'Bu email və ya nömrə ilə artıq qeydiyyatdan keçilib.';
    }
    if (msg.includes('Password should be at least')) {
        return 'Şifrə ən azı 6 simvoldan ibarət olmalıdır.';
    }
    if (msg.includes('rate limit')) {
        return 'Çox sayda cəhd edildi. Zəhmət olmasa bir qədər gözləyin.';
    }
    if (msg.includes('Email not confirmed')) {
        return 'Email təsdiqlənməyib. Zəhmət olmasa poçt qutunuzu yoxlayın.';
    }
    if (msg.includes('network') || msg.includes('Failed to fetch')) {
        return 'İnternet bağlantısında və ya serverdə xəta baş verdi.';
    }
    if (msg.includes('Payload too large') || msg.includes('413')) {
        return 'Faylın həcmi icazə verilən həddi aşır.';
    }
    return msg || 'Xəta baş verdi, zəhmət olmasa yenidən cəhd edin.';
}
async function submitContactRequest(value, type) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
        if ("TURBOPACK compile-time truthy", 1) {
            try {
                const stored = localStorage.getItem(LOCAL_STORAGE_KEY_REQUESTS);
                const list = stored ? JSON.parse(stored) : [
                    ...initialDemoRequests
                ];
                list.unshift({
                    id: 'req-' + Date.now(),
                    value,
                    type,
                    status: 'new',
                    created_at: new Date().toISOString()
                });
                localStorage.setItem(LOCAL_STORAGE_KEY_REQUESTS, JSON.stringify(list));
            } catch  {}
        }
        return {
            success: true
        };
    }
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.from('contact_requests').insert([
            {
                value,
                type,
                status: 'new'
            }
        ]);
        if (error) return {
            success: false,
            error: translateSupabaseError(error)
        };
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: translateSupabaseError(err)
        };
    }
}
async function getContactRequests() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
        if ("TURBOPACK compile-time truthy", 1) {
            try {
                const stored = localStorage.getItem(LOCAL_STORAGE_KEY_REQUESTS);
                return {
                    data: stored ? JSON.parse(stored) : [
                        ...initialDemoRequests
                    ]
                };
            } catch  {}
        }
        return {
            data: [
                ...initialDemoRequests
            ]
        };
    }
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('contact_requests').select('*').order('created_at', {
            ascending: false
        });
        if (error) return {
            data: [],
            error: translateSupabaseError(error)
        };
        return {
            data: data || []
        };
    } catch (err) {
        return {
            data: [],
            error: translateSupabaseError(err)
        };
    }
}
async function fetchContactRequests() {
    const res = await getContactRequests();
    return res.data || [];
}
async function markContactRequestContacted(id) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
        if ("TURBOPACK compile-time truthy", 1) {
            try {
                const stored = localStorage.getItem(LOCAL_STORAGE_KEY_REQUESTS);
                let list = stored ? JSON.parse(stored) : [
                    ...initialDemoRequests
                ];
                list = list.map((item)=>item.id === id ? {
                        ...item,
                        status: 'contacted'
                    } : item);
                localStorage.setItem(LOCAL_STORAGE_KEY_REQUESTS, JSON.stringify(list));
            } catch  {}
        }
        return {
            success: true
        };
    }
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.from('contact_requests').update({
            status: 'contacted'
        }).eq('id', id);
        if (error) return {
            success: false,
            error: translateSupabaseError(error)
        };
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: translateSupabaseError(err)
        };
    }
}
async function updateContactRequestStatus(id, status) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
        if ("TURBOPACK compile-time truthy", 1) {
            try {
                const stored = localStorage.getItem(LOCAL_STORAGE_KEY_REQUESTS);
                let list = stored ? JSON.parse(stored) : [
                    ...initialDemoRequests
                ];
                list = list.map((item)=>item.id === id ? {
                        ...item,
                        status
                    } : item);
                localStorage.setItem(LOCAL_STORAGE_KEY_REQUESTS, JSON.stringify(list));
            } catch  {}
        }
        return true;
    }
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.from('contact_requests').update({
            status
        }).eq('id', id);
        return !error;
    } catch  {
        return false;
    }
}
async function deleteContactRequestItem(id) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
        if ("TURBOPACK compile-time truthy", 1) {
            try {
                const stored = localStorage.getItem(LOCAL_STORAGE_KEY_REQUESTS);
                let list = stored ? JSON.parse(stored) : [
                    ...initialDemoRequests
                ];
                list = list.filter((item)=>item.id !== id);
                localStorage.setItem(LOCAL_STORAGE_KEY_REQUESTS, JSON.stringify(list));
            } catch  {}
        }
        return {
            success: true
        };
    }
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.from('contact_requests').delete().eq('id', id);
        if (error) return {
            success: false,
            error: translateSupabaseError(error)
        };
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: translateSupabaseError(err)
        };
    }
}
async function deleteContactRequest(id) {
    const res = await deleteContactRequestItem(id);
    return res.success;
}
async function getBooks() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
        if ("TURBOPACK compile-time truthy", 1) {
            try {
                const stored = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKS);
                return {
                    data: stored ? JSON.parse(stored) : [
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialDemoBooks"]
                    ]
                };
            } catch  {}
        }
        return {
            data: [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialDemoBooks"]
            ]
        };
    }
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('books').select('*').order('created_at', {
            ascending: false
        });
        if (error) {
            if ("TURBOPACK compile-time truthy", 1) {
                const stored = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKS);
                return {
                    data: stored ? JSON.parse(stored) : [
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialDemoBooks"]
                    ]
                };
            }
            //TURBOPACK unreachable
            ;
        }
        return {
            data: data || []
        };
    } catch (err) {
        return {
            data: [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialDemoBooks"]
            ],
            error: translateSupabaseError(err)
        };
    }
}
async function fetchBooks() {
    const res = await getBooks();
    return res.data || [];
}
async function uploadStorageFile(bucket, file, prefix = '') {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
        return {
            url: URL.createObjectURL(file)
        };
    }
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const ext = file.name.split('.').pop() || 'dat';
        const cleanPrefix = prefix ? prefix.replace(/[^a-zA-Z0-9_-]/g, '_') : 'file';
        const filePath = `${cleanPrefix}_${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
        });
        if (uploadError) return {
            error: translateSupabaseError(uploadError)
        };
        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        return {
            url: data.publicUrl
        };
    } catch (err) {
        return {
            error: translateSupabaseError(err)
        };
    }
}
async function uploadBookFile(file, bucket = 'book-files') {
    const res = await uploadStorageFile(bucket, file, 'chess_book');
    if (res.error) {
        return {
            success: false,
            error: res.error
        };
    }
    return {
        success: true,
        url: res.url
    };
}
async function createBook(bookData) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
        if ("TURBOPACK compile-time truthy", 1) {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKS);
            const list = stored ? JSON.parse(stored) : [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialDemoBooks"]
            ];
            const newBook = {
                id: 'book-' + Date.now(),
                ...bookData,
                created_at: new Date().toISOString()
            };
            list.unshift(newBook);
            localStorage.setItem(LOCAL_STORAGE_KEY_BOOKS, JSON.stringify(list));
            return newBook;
        }
    }
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('books').insert([
            bookData
        ]).select().single();
        if (error) return null;
        return data || null;
    } catch  {
        return null;
    }
}
async function deleteBook(bookOrId) {
    const id = typeof bookOrId === 'string' ? bookOrId : bookOrId.id;
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
        if ("TURBOPACK compile-time truthy", 1) {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKS);
            let list = stored ? JSON.parse(stored) : [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialDemoBooks"]
            ];
            list = list.filter((b)=>b.id !== id);
            localStorage.setItem(LOCAL_STORAGE_KEY_BOOKS, JSON.stringify(list));
        }
        return true;
    }
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.from('books').delete().eq('id', id);
        return !error;
    } catch  {
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient,
    "getSupabaseClient",
    ()=>getSupabaseClient,
    "isSupabaseConfigured",
    ()=>isSupabaseConfigured
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
const isSupabaseConfigured = Boolean(("TURBOPACK compile-time value", "") && ("TURBOPACK compile-time value", "") && !("TURBOPACK compile-time value", "").includes('your-project') && !("TURBOPACK compile-time value", "").includes('your-anon-key'));
function createClient() {
    const url = ("TURBOPACK compile-time value", "") || 'https://mock-instance.supabase.co';
    const key = ("TURBOPACK compile-time value", "") || 'mock-anon-key';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(url, key);
}
const getSupabaseClient = createClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=_16gykav48d99f._.js.map