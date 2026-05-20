import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { JsonLd } from '@/components/JsonLd'
import { MDXComponents } from '@/components/MDXComponents'
import { PageLinks } from '@/components/PageLinks'
import { formatDate } from '@/lib/formatDate'
import { type Article, type MDXEntry, loadArticles } from '@/lib/mdx'

export default async function BlogArticleWrapper({
  article,
  children,
}: {
  article: MDXEntry<Article>
  children: React.ReactNode
}) {
  let allArticles = await loadArticles()
  let moreArticles = allArticles
    .filter(({ metadata }) => metadata !== article)
    .slice(0, 2)

  const datePublished = /^\d{4}-\d{2}$/.test(article.date)
    ? `${article.date}-01`
    : article.date

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: 'https://esarc.dev/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ESARC',
      url: 'https://esarc.dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://esarc.dev/favicon.ico',
      },
    },
    mainEntityOfPage: `https://esarc.dev${article.href}`,
    url: `https://esarc.dev${article.href}`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esarc.dev' },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://esarc.dev/insights' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://esarc.dev${article.href}` },
    ],
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              {article.title}
            </h1>
            <time
              dateTime={article.date}
              className="order-first text-sm text-neutral-950"
            >
              {formatDate(article.date)}
            </time>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              by {article.author.name}, {article.author.role}
            </p>
          </header>
        </FadeIn>

        <FadeIn>
          <MDXComponents.wrapper className="mt-24 sm:mt-32 lg:mt-40">
            {children}
          </MDXComponents.wrapper>
        </FadeIn>
      </Container>

      {moreArticles.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More articles"
          pages={moreArticles}
        />
      )}

      <ContactSection />
    </>
  )
}
