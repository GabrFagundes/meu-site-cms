import rss from '@astrojs/rss';

export async function GET(context) {
  const postImportResult = import.meta.glob('./blog/*.md', { eager: true });
  const posts = Object.values(postImportResult);
  
  return rss({
    title: 'AstroCMS Blog Feed',
    description: 'Atualizações automáticas do meu novo site gerenciado por CMS.',
    site: context.site || 'https://vercel.app', // Substituiremos depois pelo seu link real
    items: posts.map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.pubDate),
      description: post.frontmatter.description,
      link: post.url,
    })),
  });
}
