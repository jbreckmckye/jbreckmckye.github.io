import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

function getPostUrl(date: Date | undefined, slug: string): string {
  if (!date) return `/blog/${slug}`;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `/blog/${year}/${month}/${slug}`;
}

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft && !post.data.archived && post.data.date)
    .sort((a, b) => b.data.date!.getTime() - a.data.date!.getTime());

  return rss({
    title: 'Developing Opinions',
    description: 'Insights on software engineering, technology, and culture',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date!,
      link: getPostUrl(post.data.date, post.id),
      categories: post.data.tags,
    })),
  });
}
