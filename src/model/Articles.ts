export type Article = {
  author: string | null;
  content: string | null;
  description: string | null;
  publishedAt: string | null;
  source: { id: string; name: string } | null;
  title: string | null;
  url: string | null;
  urlToImage: string | null;
  showDescription?: boolean;
};

export type Articles = Article[] | null;

export const defaultArticles: Articles = null;
