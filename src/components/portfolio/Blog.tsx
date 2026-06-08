import React, { useState, useMemo, useEffect, useRef } from "react";
import { Calendar, Clock, X, ArrowLeft, Tag } from "lucide-react";
import { marked } from "marked";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  readTime: number;
  topics: string[];
  author: string;
  content: string;
}

const POST_1 = `
# Zero-Downtime Deployments on Kubernetes with ArgoCD

When your service powers thousands of paying customers, *every minute of downtime hurts*. In this post we'll walk through the exact GitOps setup we use to push 30+ deployments per day with **zero customer-facing disruption**.

## Why GitOps?

Traditional CI/CD pushes changes directly. **GitOps inverts the flow** — your cluster pulls the desired state from Git. Benefits include:

- A single source of truth (your repo)
- Built-in audit trail via commits
- Easy rollback by reverting a commit
- Drift detection out of the box

## The Stack

We rely on three pillars:

1. **ArgoCD** — continuous reconciliation
2. **Helm** — templated manifests
3. **GitHub Actions** — image build + manifest update

## Example Argo Application

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: api-prod
spec:
  source:
    repoURL: https://github.com/org/manifests
    path: apps/api/prod
  destination:
    server: https://kubernetes.default.svc
    namespace: api
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
\`\`\`

## Blue-Green in Practice

We label two replica sets — \`color: blue\` and \`color: green\` — and shift traffic via the \`Service\` selector. The cutover is instant and reversible.

> "Deploys should be boring." — every SRE ever

## Results

After 6 months in production:

- **0 customer-impacting outages** during deploys
- **94% reduction** in deploy time
- **38% lower** AWS spend (right-sized + spot)

Production should feel like turning a key, not defusing a bomb.
`.trim();

const POST_2 = `
# Server Components in Next.js 15

Migrating a 50-page production dashboard taught us a lot. Here's what worked, what didn't, and the gotchas nobody mentions.

## The Mental Model Shift

In the **Pages Router** mindset, everything is a client component by default. The App Router *flips that*: pages are server-rendered unless you opt-in to \`"use client"\`.

## When to Stay on the Server

- Data fetching from a DB or internal API
- Reading environment secrets
- Heavy markdown rendering
- SEO-critical pages

## When You Need a Client Component

- \`useState\` / \`useEffect\`
- Browser APIs (\`window\`, \`localStorage\`)
- Event handlers (\`onClick\`, \`onChange\`)

## A Small Example

\`\`\`tsx
// app/dashboard/page.tsx — Server Component
import { db } from "@/lib/db";
import StatsClient from "./stats-client";

export default async function Page() {
  const stats = await db.stats.findMany();
  return <StatsClient initial={stats} />;
}
\`\`\`

## Pitfalls We Hit

1. **Passing functions to client components** — they're not serializable.
2. **\`searchParams\`** is now async in v15.
3. **Streaming + Suspense** completely changes loading UX.

## Verdict

Worth it? **Absolutely.** Bundle size dropped 42%, TTFB by 28%, and dev velocity jumped once the team internalized the model.
`.trim();

const POST_3 = `
# A Cost-Effective Logging Pipeline on AWS

Our CloudWatch bill hit **$4,200 / month** for 1.2TB of logs. After two weekends of work, we got the same thing for **$340**. Here's how.

## The Architecture

\`\`\`
Apps → Promtail → Loki → S3 (chunks)
                        ↘ DynamoDB (index)
\`\`\`

Loki is *log-aware*: it indexes only labels (e.g. \`service=api\`, \`level=error\`) instead of full text. The actual log content lives in cheap **S3 storage**.

## Key Tradeoffs

| Feature           | CloudWatch | Loki + S3 |
|-------------------|-----------:|----------:|
| Cost / GB ingest  |     \\$0.50 |    \\$0.03 |
| Cost / GB storage |     \\$0.03 |    \\$0.02 |
| Full-text search  |        Yes |   Limited |
| Retention         |     1 year | Unlimited |

## What We Lost

Full-text \`grep\` is slower over very large windows. We work around this by being **disciplined about labels** — every service emits structured logs.

## Lessons Learned

- Cardinality is the silent killer. Don't put user IDs in labels.
- S3 lifecycle rules are your retention friend.
- Run Loki HA from day one — single-node is a footgun.

> If you're spending more on logs than CPU, you're holding it wrong.
`.trim();

const POST_4 = `
# Type-Safe Forms with React Hook Form + Zod

Forms are the unglamorous backbone of every SaaS. Get them wrong and your team will hate you.

## The Stack

- **react-hook-form** — uncontrolled, fast, minimal re-renders
- **zod** — schema-first runtime validation
- **@hookform/resolvers/zod** — the glue

## Define Once, Use Everywhere

\`\`\`ts
import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export type ContactInput = z.infer<typeof ContactSchema>;
\`\`\`

The same schema validates the client, the API route, and (if you want) your DB layer.

## Wiring Up the Form

\`\`\`tsx
const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({
  resolver: zodResolver(ContactSchema),
});
\`\`\`

## Why Not Formik?

Formik is great, but its render-prop API and frequent re-renders cause performance issues at 30+ fields. RHF's uncontrolled approach scales much better.

## Bonus: Server Actions

In Next.js 15, you can pass the parsed Zod object straight into a server action and reuse the validation. **One schema, two boundaries.**
`.trim();

const POST_5 = `
# Docker Image Optimization

Our base Node image was \`node:20\` — **1.2 GB** of bash, gcc, and a Python 2 interpreter we definitely don't need. Here's the journey to 80 MB.

## Step 1: Multi-Stage Builds

\`\`\`dockerfile
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/server.js"]
\`\`\`

That alone got us to **310 MB**.

## Step 2: Distroless

Switch the runtime stage to \`gcr.io/distroless/nodejs20\` — no shell, no package manager, no surprises.

## Step 3: Production-Only Dependencies

\`\`\`dockerfile
RUN npm ci --omit=dev
\`\`\`

Cuts another ~80 MB on a typical web app.

## Step 4: BuildKit Cache Mounts

\`\`\`dockerfile
RUN --mount=type=cache,target=/root/.npm npm ci
\`\`\`

CI builds dropped from 4 minutes to 45 seconds.

## Final Size: 80 MB

| Step             | Size   |
|------------------|-------:|
| Naive            | 1200MB |
| Multi-stage      |  310MB |
| Distroless       |  140MB |
| Prod deps only   |   80MB |

**Smaller images = faster pulls, faster scaling, smaller attack surface.**
`.trim();

const POST_6 = `
# Designing REST APIs That Don't Suck in 5 Years

I've shipped APIs I'm proud of and APIs that haunt me. Here are the patterns that aged well.

## 1. URL Versioning, Not Header Voodoo

\`\`\`
/v1/users/42
/v2/users/42
\`\`\`

Cache-friendly, debuggable, obvious in logs. *Header-based versioning* sounds clever until you're fighting CDNs at 3am.

## 2. Cursor Pagination > Offset

\`\`\`json
{
  "data": [...],
  "next_cursor": "eyJpZCI6MTAwfQ=="
}
\`\`\`

Offsets break under writes; cursors don't. Always include a stable sort.

## 3. Error Envelopes

\`\`\`json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Try again in 60s",
    "details": { "retry_after": 60 }
  }
}
\`\`\`

Machine code + human message + structured details. Your future self thanks you.

## 4. Idempotency Keys for Mutations

Required for anything that takes money. Use a header:

\`\`\`
Idempotency-Key: 7c2e1f...
\`\`\`

## 5. Document Like Your Job Depends On It

Because in some companies, **it does**. OpenAPI specs > hand-written prose.

## Closing Thought

> APIs are user interfaces for developers. Treat them with the same care.
`.trim();

const posts: Post[] = [
  // {
  //   id: 1,
  //   title: 'Zero-Downtime Deployments on Kubernetes with ArgoCD',
  //   excerpt:
  //     'A deep dive into GitOps workflows, blue-green strategies, and how we cut deploy time from 22 minutes to 4.',
  //   cover:
  //     'https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777611014900_46913c55.jpg',
  //   date: 'Apr 22, 2026',
  //   readTime: 9,
  //   topics: ['DevOps', 'AWS'],
  //   author: 'khim.chhetri',
  //   content: POST_1,
  // },
  {
    id: 2,
    title: "Server Components in Next.js 15: A Practical Migration Guide",
    excerpt:
      "Refactoring a real-world dashboard from the Pages Router to the App Router with React Server Components.",
    cover:
      "https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777611076287_88eebe14.jpg",
    date: "Apr 14, 2026",
    readTime: 12,
    topics: ["React", "Tutorials"],
    author: "khim.chhetri",
    content: POST_2,
  },
  // {
  //   id: 3,
  //   title: "Building a Cost-Effective Logging Pipeline on AWS",
  //   excerpt:
  //     "How we replaced a $4K/month CloudWatch bill with a self-hosted Loki + S3 setup — without sacrificing reliability.",
  //   cover:
  //     "https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777611101905_e6946b2a.png",
  //   date: "Apr 02, 2026",
  //   readTime: 8,
  //   topics: ["AWS", "DevOps"],
  //   author: "khim.chhetri",
  //   content: POST_3,
  // },
  {
    id: 4,
    title: "Type-Safe Forms with React Hook Form + Zod",
    excerpt:
      "A pattern for end-to-end type safety in forms that scales from 3 fields to 30 — with field-level validation built in.",
    cover:
      "https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777611058503_5c92e519.png",
    date: "Mar 25, 2026",
    readTime: 6,
    topics: ["React", "Tutorials"],
    author: "khim.chhetri",
    content: POST_4,
  },
  {
    id: 5,
    title: "Docker Image Optimization: From 1.2GB to 80MB",
    excerpt:
      "Multi-stage builds, distroless bases, and the BuildKit tricks we used to shrink our Node.js images by 93%.",
    cover:
      "https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777611244397_47becc39.png",
    date: "Mar 12, 2026",
    readTime: 7,
    topics: ["DevOps", "Tutorials"],
    author: "khim.chhetri",
    content: POST_5,
  },
  {
    id: 6,
    title: "Designing REST APIs That Don't Suck in 5 Years",
    excerpt:
      "Versioning, pagination, error envelopes — the boring decisions that compound into elegant or hostile APIs.",
    cover:
      "https://d64gsuwffb70l.cloudfront.net/69f42ec4345e093cafb5d5ce_1777611218285_a3fb1da5.png",
    date: "Feb 28, 2026",
    readTime: 11,
    topics: ["Tutorials"],
    author: "khim.chhetri",
    content: POST_6,
  },
];

const allTopics = ["All", "DevOps", "React", "AWS", "Tutorials"] as const;

const Blog: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Post | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (filter === "All") return posts;
    return posts.filter((p) => p.topics.includes(filter));
  }, [filter]);

  useEffect(() => {
    if (selected && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [selected]);
  // Lock body scroll when modal open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const renderedHTML = useMemo(() => {
    if (!selected) return "";
    return marked.parse(selected.content) as string;
  }, [selected]);

  return (
    <section id="blog" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 font-medium mb-4">
            WRITING
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Articles
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Long-form notes on shipping software, scaling infrastructure, and
            the messy reality between them.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTopics.map((t) => {
            const active = filter === t;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                  active
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 border-transparent text-white shadow-lg shadow-indigo-500/30"
                    : "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                }`}
              >
                {t}
                {active && filter !== "All" && (
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">
                    {filtered.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No articles in this topic yet — check back soon.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <article
                key={p.id}
                onClick={() => setSelected(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(p);
                  }
                }}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm overflow-hidden cursor-pointer hover:border-white/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {p.topics.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {p.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {p.readTime} min read
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-4 flex-1">
                    {p.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-[10px] font-bold text-white">
                        KC
                      </div>
                      <span className="text-xs text-gray-400">{p.author}</span>
                    </div>
                    <span className="text-xs text-cyan-400 font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Read →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selected && (
        <div
          // ref={modalRef}
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-6 "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B0F19] mt-24 "
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
            {/* Cover */}
            <div className="relative ">
              <img
                src={selected.cover}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selected.topics.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 backdrop-blur-md text-cyan-300 border border-cyan-500/40"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {t}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                  {selected.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white">
                      DS
                    </div>
                    <span className="text-white font-medium">
                      {selected.author}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selected.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selected.readTime} min read
                  </span>
                </div>
              </div>
            </div>

            {/* Markdown content */}
            <div className="p-6 md:p-10">
              <article
                className="blog-article max-w-none"
                dangerouslySetInnerHTML={{ __html: renderedHTML }}
              />

              {/* Footer actions */}
              <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                <button
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to articles
                </button>
                <div className="flex flex-wrap gap-1.5">
                  {selected.topics.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setFilter(t);
                        setSelected(null);
                        setTimeout(() => {
                          document
                            .getElementById("blog")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }, 50);
                      }}
                      className="px-3 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-500/40 hover:text-white transition-colors"
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
