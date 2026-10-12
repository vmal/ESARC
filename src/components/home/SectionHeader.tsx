import clsx from 'clsx'

/**
 * Section opening used across the homepage: a wide display title with an
 * optional lead paragraph. Deliberately no eyebrow label.
 */
export function SectionHeader({
  id,
  title,
  children,
  invert = false,
  className,
}: {
  id?: string
  title: string
  children?: React.ReactNode
  invert?: boolean
  className?: string
}) {
  return (
    <div className={clsx('max-w-3xl', className)}>
      <h2
        id={id}
        className={clsx(
          'font-display text-4xl font-medium tracking-tight [text-wrap:balance] sm:text-5xl',
          invert ? 'text-white' : 'text-neutral-950',
        )}
      >
        {title}
      </h2>
      {children && (
        <div
          className={clsx(
            'mt-6 max-w-2xl text-lg',
            invert ? 'text-neutral-300' : 'text-neutral-600',
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
