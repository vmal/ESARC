import clsx from 'clsx'

/**
 * Marks content the owner hasn't approved yet. Only rendered on preview and
 * local builds; production code paths hide draft content instead.
 */
export function DraftBadge({
  children = 'Draft',
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-sm border border-dashed border-redline px-1.5 font-condensed text-xs font-semibold leading-5 text-redline',
        className,
      )}
    >
      {children}
    </span>
  )
}
