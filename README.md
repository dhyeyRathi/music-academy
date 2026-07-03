FRONTEND- NEXT.JS, LUCIDE

BACKEND-NEXT.JS, SUPABASE

### Main Routes
- `/` - Home page
- `/about` - About page
- `/blogs` - All blog posts
- `/blog/[slug]` - Individual blog post - it produces this route because each blog has different slug, so dyanmic routes help to creating the routes manually for each blog.
- `/blogs/archive` - List of years - it is a simple nested route
- `/blogs/archive/[year]` - Posts from that year - it passes the year dynamically to sort blogs year wise.
- `/blogs/archive/[year]/[slug]` - Specific post from that year - post from the specific year, nested dynamic
- `/api/upload-image` - Upload images - api to uplaod image on sanity
- `/api/uploadtodb` - Upload to database - api to upload data to db
- `/studio/[[...tool]]` - Sanity CMS - to store and fetch images as cdn so fetching is faster than local sotrage.

### Why This Structure?

**Route Groups `(blogs)`**
- Organizes blog routes together
- Keeps URLs clean
- Shares layout across blog pages

**Dynamic Routes `[slug]` & `[year]`**
- Show different content based on URL parameter
- `/blogs/[slug]` shows post by name
- `/blogs/archive/[year]/[slug]` filters by year first, then post

**Nested Routes**
- `/blogs/archive` is inside `/blogs` folder
- Makes sense for user flow: Home → Blogs → Archive → Year → Post

**Error & Loading**
- `error.tsx` files show error messages if something breaks
- `loading.tsx` files show skeleton while data loads
