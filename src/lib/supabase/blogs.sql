-- Supabase schema for blog posts based on src/data/blogs.json
-- Run this in the Supabase SQL editor.

create table if not exists public.blogs (
  id bigint primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  author text not null,
  published_at date not null,
  category text not null,
  read_time text not null,
  thumbnail text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blogs_published_at_idx on public.blogs (published_at desc);
create index if not exists blogs_category_idx on public.blogs (category);

create table if not exists public.blog_bodies (
  blog_id bigint primary key references public.blogs (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_bodies_word_limit check (
    cardinality(
      regexp_split_to_array(
        trim(regexp_replace(body, '\\s+', ' ', 'g')),
        ' '
      )
    ) <= 1000
  )
);

create index if not exists blog_bodies_updated_at_idx on public.blog_bodies (updated_at desc);

create or replace function public.set_blog_bodies_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_bodies_set_updated_at on public.blog_bodies;
create trigger blog_bodies_set_updated_at
before update on public.blog_bodies
for each row
execute function public.set_blog_bodies_updated_at();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at
before update on public.blogs
for each row
execute function public.set_updated_at();

insert into public.blogs (
  id,
  title,
  slug,
  excerpt,
  author,
  published_at,
  category,
  read_time,
  thumbnail
)
values
  (1, 'Mastering Tailwind CSS for Modern UI', 'mastering-tailwind-css', 'Learn how Tailwind CSS helps build fast, scalable, and beautiful interfaces.', 'John Carter', '2026-06-12', 'Frontend', '6 min', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'),
  (2, 'Next.js Server Components Explained', 'nextjs-server-components', 'A beginner-friendly guide to understanding server and client components in Next.js.', 'Sarah Lee', '2026-05-20', 'Next.js', '8 min', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'),
  (3, 'JavaScript Closures Made Simple', 'javascript-closures', 'Closures sound scary until they don''t. Here''s the easiest explanation.', 'Alex Morgan', '2026-04-10', 'JavaScript', '5 min', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'),
    (4, 'Building Accessible Web Apps', 'accessible-web-apps', 'Accessibility isn''t optional. Learn practical techniques to improve UX for everyone.', 'Emma Wilson', '2026-03-18', 'Accessibility', '7 min', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4'),
  (5, 'The Power of TypeScript in Large Projects', 'typescript-large-projects', 'Why TypeScript becomes your best friend as your codebase grows.', 'Michael Brown', '2026-02-22', 'TypeScript', '9 min', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd'),
  (6, 'Optimizing React Performance', 'optimizing-react-performance', 'Reduce re-renders and improve performance using practical optimization strategies.', 'Olivia Green', '2026-01-30', 'React', '10 min', 'https://images.unsplash.com/photo-1484417894907-623942c8ee29'),
  (7, 'Understanding APIs for Beginners', 'understanding-apis', 'What APIs are, how they work, and why every developer should understand them.', 'Daniel White', '2025-12-15', 'Backend', '4 min', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'),
  (8, 'CSS Tricks That Feel Illegal', 'css-tricks-illegal', 'A collection of CSS techniques so good they feel like cheating.', 'Sophia Adams', '2025-11-05', 'CSS', '6 min', 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5'),
    (9, 'State Management in React', 'state-management-react', 'Redux, Zustand, Context - when to use what and why.', 'Chris Taylor', '2025-10-28', 'React', '8 min', 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8'),
  (10, 'Deploying Next.js Apps Like a Pro', 'deploying-nextjs-apps', 'Deployment strategies, performance tips, and production best practices.', 'Liam Scott', '2025-09-14', 'Deployment', '7 min', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa')
on conflict (id) do update set
  title = excluded.title,
  slug = excluded.slug,
  excerpt = excluded.excerpt,
  author = excluded.author,
  published_at = excluded.published_at,
  category = excluded.category,
  read_time = excluded.read_time,
  thumbnail = excluded.thumbnail,
  updated_at = now();

insert into public.blog_bodies (blog_id, body)
values
  (1, $$Tailwind CSS is powerful because it changes how you think about styling. Instead of writing large custom stylesheets and jumping between files, you compose the interface directly in markup using small utility classes. That shift makes the design process faster, more visual, and easier to maintain. For modern teams, the biggest advantage is consistency. Spacing, color, typography, shadows, and layout rules all come from the same system, which reduces drift across components and pages.

When building with Tailwind, start by defining the visual language of the product. Choose a spacing scale, a small set of colors, and a typographic hierarchy. Then use those tokens everywhere. This avoids the common problem of every page looking slightly different. Tailwind also works well with component-based frameworks because each component can own its style without depending on global CSS side effects. That makes refactoring safer and collaboration smoother.

Another strength is responsiveness. Tailwind makes it simple to apply breakpoints inline, so layouts can evolve naturally from mobile to desktop. You can also use hover, focus, and group states to create interactive patterns without custom CSS. The best results usually come from restraint. Use utilities to build a clear system, then reuse patterns instead of inventing new ones for each screen.

In practice, Tailwind shines when teams want speed without losing control. It is not about writing less code in the file, but about writing more predictable code in the product. Once the team learns the naming patterns and design boundaries, Tailwind becomes a reliable foundation for scalable UI work.$$),
  (2, $$Server Components are one of the biggest architectural changes in modern Next.js applications. They let you render parts of the UI on the server by default, which means less client-side JavaScript, faster initial loads, and a clearer split between data fetching and interactivity. The main idea is simple: use server rendering for anything that can be prepared before it reaches the browser, and reserve client components for user interaction, browser APIs, and local state.

The practical benefit is that you can fetch data directly inside a server component without building an extra API layer for every page. That reduces boilerplate and keeps logic close to the view that needs it. It also helps performance because the browser receives ready-to-display content sooner. For content-heavy pages, dashboards, and blog views, this pattern is especially useful.

There are important limits to remember. Server components cannot use hooks like useState or browser-only features. That is not a weakness, it is a design boundary. When you need a button, modal, form, or animation that depends on the browser, isolate that part into a client component and keep the rest on the server. This split often produces cleaner code than trying to make everything interactive.

The best way to think about Server Components is as a default rendering strategy. They are not a replacement for client-side React, but a better starting point for most UI. If you use them well, you get simpler data flow, better performance, and smaller bundles without sacrificing flexibility.$$),
  (3, $$Closures are one of the most important ideas in JavaScript because they explain how functions remember values from the scope where they were created. A closure happens when an inner function keeps access to variables from an outer function even after the outer function has finished running. That sounds abstract, but it shows up everywhere in real applications, from event handlers to timers to custom hooks.

Imagine a function that returns another function. The inner function can still read and update variables defined in the outer function. That is the core of a closure. The outer function has already returned, but its local variables are not lost because the inner function still needs them. This is why closures are often used for encapsulation. They let you create private state without classes or global variables.

Closures also power many common patterns. Debouncing and throttling functions rely on them to store timing data. Factory functions use them to return specialized behavior. In React, closures explain why handlers sometimes capture stale values if dependencies are not managed correctly. Once you understand that a function keeps the values it closed over at creation time, many confusing bugs start to make sense.

The easiest way to learn closures is to write small examples and inspect the values step by step. Try creating a counter that returns increment and read functions. Then call those functions later and observe how they still share the same internal state. That simple experiment reveals why closures are one of JavaScript most powerful tools.$$),
  (4, $$Accessibility is not a feature you add at the end. It is part of the foundation of a web app, and the earlier you design for it, the better the experience becomes for everyone. Accessible interfaces help people who use screen readers, keyboard navigation, voice input, reduced motion settings, or high contrast modes. They also improve clarity for users who simply want a more predictable product.

A good place to start is semantic HTML. Use the correct element for the job: buttons for actions, links for navigation, headings for structure, and labels for inputs. This gives assistive technology meaningful information without extra work. From there, make sure interactive elements are reachable and usable with the keyboard. If a component cannot be operated without a mouse, it is not fully accessible.

Color and contrast matter too. Text should remain readable against its background, and state changes should not depend on color alone. Pair visual indicators with icons, labels, or patterns that remain clear to more users. Focus states are another important detail. If keyboard users cannot see where they are on the page, navigation becomes frustrating very quickly.

Accessible design also benefits teams internally. Clear semantics make code easier to maintain. Better structure improves testing. Strong focus on accessibility often leads to better UX decisions overall because it forces you to think about real interaction paths instead of only visual polish. In the end, accessibility is not extra work. It is disciplined product design that makes the application stronger.$$),
  (5, $$TypeScript becomes especially valuable when a codebase grows beyond a small prototype. At that point, the main challenge is not writing code, it is keeping the code understandable as more people contribute. TypeScript helps by adding a layer of structure that catches mistakes early and makes intent more visible. When types are clear, functions are easier to reuse, refactor, and test.

One of the biggest benefits is refactoring confidence. If you rename a property, change a return shape, or alter a function signature, TypeScript can highlight every affected location. That turns risky changes into manageable work. It also improves collaboration because interfaces and types become shared documentation. New developers can inspect a type definition and learn how data is expected to flow through the system.

In large projects, TypeScript also helps with API boundaries. Components, services, hooks, and utility functions can each define the exact inputs and outputs they expect. That reduces guesswork and makes bugs easier to isolate. The trick is to keep the types practical. Overly complex type gymnastics can slow development, while simple and expressive types improve it.

Good TypeScript usage is less about making everything strict and more about making important contracts explicit. The more stable a boundary is, the more value a type provides. Used that way, TypeScript becomes a guide for scaling both code quality and team velocity.$$),
  (6, $$React performance is usually not about one magical optimization. It is about reducing unnecessary work so the application spends time only where it matters. In most apps, the first rule is to measure before changing anything. Many performance issues are caused by avoidable re-renders, large component trees, or repeated expensive calculations. Once you know where the slowdown comes from, the fix is much easier to choose.

Start with component boundaries. If a component receives changing props that are not actually needed, split it into smaller pieces. Memoization can help, but it should support a clean design rather than replace it. Avoid passing unstable objects and inline callbacks everywhere if they cause downstream updates. Sometimes moving state closer to where it is used is the simplest performance improvement available.

Data handling matters too. If you are rendering large lists, use virtualization so the browser only paints what is visible. If a calculation is expensive, cache it only when the cost justifies the complexity. React is fast by default in many cases, so the goal is not to optimize everything, but to identify the hot paths that users actually feel.

The most effective performance work tends to be boring and structural. Simplify state, reduce duplication, avoid unnecessary network requests, and keep interactions responsive. When those fundamentals are in place, advanced techniques become optional rather than necessary. That is the real path to a smoother React application.$$),
  (7, $$APIs are the connective tissue of modern software. They let separate systems exchange data without needing to know each other internals. For beginners, the key idea is that an API is simply a contract. One side sends a request, the other side returns a response, and both agree on the shape of the exchange. That makes it possible for web apps, mobile apps, services, and third-party tools to work together.

The most common web API style is REST, where resources are exposed through URLs and manipulated with methods like GET, POST, PUT, PATCH, and DELETE. A request usually includes headers, maybe a body, and sometimes authentication information. The response typically contains JSON, which is easy for JavaScript applications to consume. Once you understand these parts, a lot of frontend and backend work becomes easier to reason about.

APIs are also useful because they separate concerns. The client does not need to know how data is stored. The server does not need to know what UI the client is rendering. Each side can evolve independently as long as the contract stays stable. That is why good API design matters so much. Clear naming, predictable error handling, and consistent response formats save time for everyone.

For a beginner, the best way to learn APIs is to make small requests and inspect the responses. Read the status codes, watch how query parameters change results, and practice sending your own data back to a server. After a few examples, APIs stop feeling abstract and start feeling like a simple conversation between systems.$$),
  (8, $$CSS has a reputation for being difficult, but many of its best techniques are surprisingly simple once you understand the underlying rules. The most useful tricks are usually not hacks at all. They are elegant combinations of layout, positioning, transforms, and modern selectors that let you create polished interfaces with less code than you might expect.

One powerful pattern is using pseudo elements for decorative work. Instead of adding extra markup for borders, overlays, or background accents, you can create them with before and after. That keeps the HTML clean and the visual intent clear. Another valuable technique is using flexbox and grid together. Flexbox is excellent for alignment within a row or column, while grid is ideal for broader page structure and spacing control.

Responsive design also becomes easier when you rely on intrinsic sizing. Let content help determine its own space whenever possible. Use minmax, clamp, and aspect-ratio to make layouts adapt more naturally. That usually leads to fewer breakpoints and a smoother experience across devices.

Modern CSS also includes practical features like :has, container queries, and custom properties. These tools allow styles to respond to component context instead of only viewport size. That is a major step toward more reusable design systems. The best CSS often feels invisible because it supports the interface without forcing the developer to fight it. Once you think in layout relationships instead of isolated rules, CSS becomes much more expressive and much less mysterious.$$),
  (9, $$State management in React is really about deciding where data should live and how changes should flow through the app. The question is not which library is best in theory. The real question is how much complexity your project needs. Some state is local to one component. Some state needs to be shared across a section of the app. Some state comes from the server and should be cached or synchronized. Treating all of these the same usually creates confusion.

Local state is the easiest starting point. If only one component needs the value, keep it there. As soon as multiple components need the same information, lift it to the nearest shared parent or use a context-based solution. Context is fine for moderately shared values like theme, user session, or UI preferences. For more complex application state, a dedicated store can make updates easier to track.

Redux, Zustand, and similar tools solve different versions of the same problem. Redux offers strong structure and predictable state transitions. Zustand gives a lighter and more flexible experience. Neither is automatically better than the other. The choice depends on the scale of the app, the number of state transitions, and the team preference for ceremony versus simplicity.

The best state management strategy is the one that minimizes repetition and makes data flow obvious. If a value is derived, compute it instead of storing it. If a value can be local, keep it local. If a value must be shared, choose the smallest shared scope that still keeps the code easy to follow. That discipline prevents state from becoming a hidden source of bugs.$$),
  (10, $$Deploying a Next.js app well is about more than pushing code to production. You need to think about build output, runtime environment, caching, image handling, environment variables, and how your hosting platform serves the app. A successful deployment is one where the application loads quickly, remains stable under traffic, and can be updated without surprising regressions.

Start by separating development assumptions from production requirements. Local APIs, hardcoded values, and browser-only behavior can all break once the app is deployed. Review data fetching paths, environment variables, and any code that expects a specific machine setup. Then make sure the production build passes cleanly so you know the app can be compiled in a real deployment environment.

Performance is another major concern. Use image optimization, avoid oversized client bundles, and take advantage of static generation or caching where appropriate. Next.js gives you a lot of flexibility, but the best deployments usually choose the simplest rendering mode that still meets the user need. If a page does not need to change per request, serving it statically can improve speed and reduce cost.

Finally, treat deployment as a repeatable process, not a one-time event. Use previews, check logs, monitor errors, and verify that rollback is possible if needed. When deployment is disciplined, you can ship faster because the release path is predictable. The goal is not just to get online, but to stay online confidently.$$)
on conflict (blog_id) do update set
  body = excluded.body,
  updated_at = now();
