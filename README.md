# MarkVerde

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Serwist / PWA service worker
- React Markdown + remark-gfm
- Lucide React icons
- Vercel Analytics
- ESLint 9
- Prettier

## What The App Is For

MarkVerde is a modern web app for writing markdown notes. It is built for users who want a fast, clean, and focused editor where they can write in markdown and instantly see the rendered result.

The app supports:

- writing and editing multiple notes
- live split-view editing: markdown editor on the left, preview on the right
- automatic browser-based saving with `localStorage`
- note search by title
- importing `.md`, `.markdown`, and `.txt` files
- exporting individual notes as `.md` files
- basic toolbar actions for text formatting
- synchronized scrolling between the editor and preview panels
- dark/light theme support
- a blog section with posts about programming and software craftsmanship
- PWA support through the manifest and service worker

## Running The Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Start the production build:

```bash
npm start
```

Run lint checks:

```bash
npm run lint
```

## Structure

- `app/` - Next.js App Router pages, layout, blog routes, and service worker entry
- `components/` - UI, layout, landing, blog, and editor components
- `hooks/` - custom React hook for note management
- `constants/` - configuration data for features and footer content
- `data/` - local blog posts
- `lib/` - helper functions
- `public/` - static assets, PWA icons, and manifest
- `types/` - TypeScript types for blog posts and notes
