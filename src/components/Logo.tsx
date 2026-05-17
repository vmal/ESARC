import clsx from 'clsx'

export function Logomark({
  invert = false,
  filled = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
}) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <g className={invert ? 'fill-white' : 'fill-neutral-950'}>
        <rect x="2" y="4" width="4" height="24" />
        <rect x="2" y="4" width="20" height="4" />
        <rect x="2" y="14" width="14" height="4" />
        <rect x="2" y="24" width="20" height="4" />
      </g>
      <rect
        x="24"
        y="20"
        width="6"
        height="6"
        className={clsx(
          'transition-opacity duration-300',
          filled ? 'opacity-100' : 'opacity-100 group-hover/logo:opacity-100',
          'fill-accent',
        )}
      />
    </svg>
  )
}

export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
  fillOnHover?: boolean
}) {
  return (
    <svg
      viewBox="0 0 200 32"
      aria-label="ESARC"
      role="img"
      className={clsx(fillOnHover && 'group/logo', className)}
      {...props}
    >
      <text
        x="0"
        y="25"
        fontFamily="Mona Sans, ui-sans-serif, system-ui, sans-serif"
        fontWeight={800}
        fontSize="28"
        letterSpacing="-0.5"
        style={{ fontVariationSettings: '"wdth" 125' }}
        className={invert ? 'fill-white' : 'fill-neutral-950'}
      >
        ESARC
      </text>
      <rect x="158" y="20" width="6" height="6" className="fill-accent" />
    </svg>
  )
}
