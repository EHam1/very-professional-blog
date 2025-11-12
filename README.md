# Very Professional Blog

A modern, performant technical blog built with Next.js, MDX, and Supabase. Features include A/B testing, custom analytics tracking, and beautiful syntax highlighting for code snippets.

## Features

- **MDX Support**: Write blog posts in Markdown with embedded React components
- **A/B Testing**: Built-in A/B testing framework with automatic variant assignment
- **Analytics Tracking**: Custom event tracking powered by Supabase
- **Syntax Highlighting**: Beautiful code blocks with Prism
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS
- **Type Safe**: Built with TypeScript
- **Fast**: Static site generation with Next.js

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Content**: MDX (Markdown + React)
- **Styling**: Tailwind CSS + Typography plugin
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Language**: TypeScript

## Installation

1. Clone the repository:
```bash
git clone git@github.com:EHam1/very-professional-blog.git
cd very-professional-blog
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions):
   - Create a Supabase project
   - Run the SQL migration from `supabase-setup.sql`
   - Copy your credentials

4. Configure environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog!

## Writing Posts

1. Create a new `.mdx` file in the `posts/` directory
2. Add frontmatter with metadata:
```yaml
---
title: "Your Post Title"
date: "2024-11-08"
excerpt: "A brief description"
author: "Your Name"
---
```

3. Write your content using Markdown and React components:
```mdx
# Your Post Content

Regular markdown works great!

<Callout type="info">
You can use custom components too!
</Callout>

\`\`\`python
# Code blocks with syntax highlighting
def hello():
    print("Hello, world!")
\`\`\`
```

## A/B Testing

Use the `ABTest` component to test different content variants:

```mdx
<ABTest experiment="my-test">
  <ABTest.Variant name="A">
    <p>Version A content</p>
  </ABTest.Variant>
  <ABTest.Variant name="B">
    <p>Version B content</p>
  </ABTest.Variant>
</ABTest>
```

## Analytics

Events are automatically tracked and stored in Supabase:
- Page views
- A/B test assignments
- Custom events (via `trackEvent()`)

Query your data:
```sql
SELECT * FROM events ORDER BY timestamp DESC LIMIT 100;
```

Analyze with Python:
```python
from supabase import create_client
import pandas as pd

supabase = create_client(url, key)
response = supabase.table("events").select("*").execute()
df = pd.DataFrame(response.data)
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

Vercel will automatically deploy on every push to your main branch.

### Manual Deployment

```bash
npm run build
npm run start
```

## Project Structure

```
very-professional-blog/
├── components/           # React components
│   ├── Layout.tsx       # Site layout with header/footer
│   ├── ABTest.tsx       # A/B testing component
│   └── Callout.tsx      # Info/warning callout boxes
├── lib/                 # Utility functions
│   ├── posts.ts         # Blog post utilities
│   ├── supabase.ts      # Supabase client
│   └── tracking.ts      # Analytics tracking
├── pages/               # Next.js pages
│   ├── index.tsx        # Blog homepage
│   ├── posts/[slug].tsx # Dynamic blog post pages
│   └── api/log.ts       # Analytics API endpoint
├── posts/               # MDX blog posts
├── public/              # Static assets
│   └── images/          # Blog post images
├── styles/              # Global styles
└── middleware.ts        # Next.js middleware
```

## Available Components

### Callout

```mdx
<Callout type="info">
Information message
</Callout>

<Callout type="warning">
Warning message
</Callout>

<Callout type="success">
Success message
</Callout>

<Callout type="error">
Error message
</Callout>
```

### ABTest

See A/B Testing section above.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

This is a personal blog, but feel free to fork it and make it your own!

## License

MIT

## Links

- [Live Site](https://your-blog.vercel.app) (update after deployment)
- [GitHub](https://github.com/EHam1/very-professional-blog)
- [Supabase](https://supabase.com)
- [Next.js](https://nextjs.org)
- [Vercel](https://vercel.com)

---

Built with ❤️ by [EHam1](https://github.com/EHam1)
