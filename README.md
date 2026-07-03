FRONTEND- NEXT.JS, LUCIDE
BACKEND-NEXT.JS, SUPABASE

### Main Routes
- `/` - Home page
- `/about` - About page
- `/blogs` - All blog posts
- `/blog/[slug]` - Individual blog post
- `/blogs/archive` - List of years
- `/blogs/archive/[year]` - Posts from that year
- `/blogs/archive/[year]/[slug]` - Specific post from that year
- `/api/upload-image` - Upload images
- `/api/uploadtodb` - Upload to database
- `/studio/[[...tool]]` - Sanity CMS

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
