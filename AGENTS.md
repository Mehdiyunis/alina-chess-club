
# Repository notes

- Always reply in Azerbaijani using the Latin alphabet only.
Never use Cyrillic characters or Russian words. If unsure of a word, use English instead.
- Public chess-learning site built with Next.js App Router; UI copy is Azerbaijani. Keep user-facing text and translations consistent across `messages/{az,en,ru}.json` when changing localized UI.
- Main entry points are `app/page.tsx`, `app/books/page.tsx`, and `app/auth/page.tsx`; shared UI lives in `components/`, Supabase clients in `lib/supabase/`.
- Admin UI is a separate project (`şahmat-məktəbi-admin-paneli`); staff authorization is based on `public.admin_profiles`, not `public.profiles`.
- Book PDFs are stored in the private Supabase Storage bucket `book-files`; the site serves access through `app/api/books/download/route.ts`. Do not replace its signed-URL flow with `getPublicUrl()` or expose service-role credentials.
- `supabase-online-play.sql` is executable Supabase setup/RLS SQL for online play, not merely documentation. Coordinate changes with admin-panel RPC names, policies, and bucket expectations; inspect the whole script before re-running it against a populated project.
- Local environment values belong in `.env.local`; never read, print, commit, or expose its secrets. Required public Supabase variables are `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Use `npm.cmd install` to install dependencies on Windows; `npm.cmd run dev` starts port 3000, `npm.cmd run build` builds, and `npm.cmd run lint` runs `tsc --noEmit` (there is no separate ESLint script).
- `package-lock.json` is the canonical lockfile; use `npm.cmd` on Windows. `bun.lock` was removed.
