import { ImageResponse } from 'next/server'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const ACCENT = '#2C39FF'
const INK = '#0A0A0A'

export function renderOgImage({
  eyebrow,
  title,
  footer = 'esarc.dev',
}: {
  eyebrow?: string
  title: string
  footer?: string
}): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: ACCENT,
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: 24,
              height: 24,
              background: '#FFFFFF',
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            ESARC
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {eyebrow ? (
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: '1000px',
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            color: 'rgba(255,255,255,0.85)',
            borderTop: '2px solid rgba(255,255,255,0.3)',
            paddingTop: '24px',
          }}
        >
          <span>{footer}</span>
          <span style={{ fontWeight: 600 }}>
            AI engineering consultancy
          </span>
        </div>

        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at 85% 15%, rgba(255,255,255,0.18), transparent 50%)` }} />
        <span style={{ display: 'none', color: INK }}>{INK}</span>
      </div>
    ),
    { ...ogSize },
  )
}
