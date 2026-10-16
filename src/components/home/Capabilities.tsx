import { Container } from '@/components/Container'
import { SectionHeader } from '@/components/home/SectionHeader'

const capabilities = [
  {
    name: 'AI products and agents',
    detail:
      'Agents that call tools, copilots inside your app, and voice agents that answer the phone.',
  },
  {
    name: 'RAG and search',
    detail:
      'Retrieval over your documents and data, with citations and tests for the answers that matter.',
  },
  {
    name: 'Evals and observability',
    detail:
      'Eval suites in CI, tracing, and cost and latency dashboards, so a model change can’t quietly break things.',
  },
  {
    name: 'Fine-tuning pipelines',
    detail:
      'Data prep, training runs and side-by-side comparisons with the base model, for when prompting runs out.',
  },
  {
    name: 'Full-stack web',
    detail:
      'Next.js and Node apps with the APIs, auth and billing that turn a demo into a product.',
  },
  {
    name: 'Mobile',
    detail: 'React Native and Expo apps for iOS and Android, through to the stores.',
  },
  {
    name: 'Architecture and infrastructure',
    detail:
      'Cloud setup, data models, GraphQL and queues, sized for where you’ll be next year.',
  },
]

export function Capabilities({ industries }: { industries: Array<string> }) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionHeader title="What we build">
        <p>
          AI features rarely ship alone. They need an app around them, data
          under them and someone watching them in production, so we build all
          of it.
        </p>
      </SectionHeader>
      <ul className="mt-12 border-t border-neutral-950">
        {capabilities.map((item) => (
          <li
            key={item.name}
            className="grid grid-cols-1 gap-2 border-b border-neutral-950/15 py-6 sm:grid-cols-12 sm:gap-8"
          >
            <h3 className="font-display text-xl font-semibold text-neutral-950 sm:col-span-5">
              {item.name}
            </h3>
            <p className="text-base text-neutral-600 sm:col-span-7">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>
      {industries.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-8">
          <h3 className="font-condensed text-base font-semibold text-neutral-950 sm:col-span-5">
            Industries so far
          </h3>
          <p className="text-base text-neutral-700 sm:col-span-7">
            {industries.join(', ')}
          </p>
        </div>
      )}
    </Container>
  )
}
