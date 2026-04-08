import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '../config/site';

export const alt = `${SITE_CONFIG.brandName} portfolio preview`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(circle at 14% 10%, rgba(125,211,252,0.22), transparent 24%), radial-gradient(circle at 86% 22%, rgba(196,181,253,0.18), transparent 24%), radial-gradient(circle at 50% 100%, rgba(96,165,250,0.12), transparent 30%), linear-gradient(135deg, #071225 0%, #09172F 42%, #112B51 100%)',
          color: '#F8FAFC',
          padding: '56px 64px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#93C5FD',
          }}
        >
          {SITE_CONFIG.seo.ogEyebrow}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.05em',
            }}
          >
            {SITE_CONFIG.brandName}
          </div>

          <div
            style={{
              display: 'flex',
              maxWidth: 960,
              fontSize: 42,
              fontWeight: 700,
              lineHeight: 1.15,
              color: '#F8FAFC',
            }}
          >
            {SITE_CONFIG.seo.ogHeadline}
          </div>

          <div
            style={{
              display: 'flex',
              maxWidth: 920,
              fontSize: 28,
              lineHeight: 1.4,
              color: '#CBD5E1',
            }}
          >
            {SITE_CONFIG.seo.ogSubheadline}
          </div>

          <div
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              marginTop: 6,
            }}
          >
            {SITE_CONFIG.seo.ogHighlights.map((highlight) => (
              <div
                key={highlight}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 18px',
                  borderRadius: 999,
                  background: 'rgba(148, 163, 184, 0.12)',
                  border: '1px solid rgba(186, 230, 253, 0.18)',
                  color: '#DBEAFE',
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 28,
            color: '#E2E8F0',
          }}
        >
          <div style={{ display: 'flex' }}>aleksandracislowski.com</div>
          <div style={{ display: 'flex', color: '#93C5FD' }}>{SITE_CONFIG.professionalTitle}</div>
        </div>
      </div>
    ),
    size,
  );
}
