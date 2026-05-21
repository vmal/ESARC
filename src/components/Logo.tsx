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
      viewBox="0 0 96 32"
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
    </svg>
  )
}
