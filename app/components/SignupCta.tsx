import React from 'react'

export type SignupCtaVariant = 'inline' | 'bar' | 'code'
export type SignupCtaMedium = 'blog' | 'finder'
export type SignupCtaContent = 'top' | 'bottom' | 'bar' | 'code'

export interface SignupCtaProps {
  variant: SignupCtaVariant
  medium: SignupCtaMedium
  campaign: string
  content?: SignupCtaContent
}

export function buildAppSignupUrl(
  medium: SignupCtaMedium,
  campaign: string,
  content: SignupCtaContent
): string {
  const params = new URLSearchParams({
    utm_source: 'udyogbook-landing',
    utm_medium: medium,
    utm_campaign: campaign,
    utm_content: content,
  })
  return `https://app.udyogbook.in/sign-up?${params.toString()}`
}

export function buildPlayStoreUrl(
  medium: SignupCtaMedium,
  campaign: string
): string {
  const referrerParams = new URLSearchParams({
    utm_source: 'udyogbook-landing',
    utm_medium: medium,
    utm_campaign: campaign,
  })
  return `https://play.google.com/store/apps/details?id=com.udyog.udyogmobile&referrer=${encodeURIComponent(
    referrerParams.toString()
  )}`
}

export default function SignupCta({
  variant,
  medium,
  campaign,
  content,
}: SignupCtaProps) {
  const resolvedContent: SignupCtaContent =
    content || (variant === 'bar' ? 'bar' : variant === 'code' ? 'code' : 'top')

  const appUrl = buildAppSignupUrl(medium, campaign, resolvedContent)
  const playUrl = buildPlayStoreUrl(medium, campaign)

  if (variant === 'bar') {
    return (
      <>
        <style suppressHydrationWarning>{`
          .signup-cta-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 150;
            background: #0F172A;
            border-top: 1px solid #334155;
            padding: 10px 16px;
          }
          .signup-cta-bar-inner {
            max-width: 760px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }
          @media (max-width: 767px) {
            body {
              padding-bottom: 72px !important;
            }
          }
          @media (min-width: 768px) {
            .signup-cta-bar,
            .md\\:hidden {
              display: none !important;
            }
          }
        `}</style>
        <aside
          className="signup-cta-bar md:hidden"
          aria-label="Download Udyog mobile app"
        >
          <div className="signup-cta-bar-inner">
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: 1.35,
                margin: 0,
                fontFamily: 'var(--font-body)',
              }}
            >
              Make GST bills on your phone. 14-day free trial.
            </p>
            <a
              href={playUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#F97316',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 700,
                padding: '10px 16px',
                minHeight: 44,
                borderRadius: 8,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
            >
              Get the app
            </a>
          </div>
        </aside>
      </>
    )
  }

  if (variant === 'code') {
    return (
      <aside
        aria-label="Use this code on your bills"
        style={{
          background: '#F8FAFC',
          border: '1px solid #CBD5E1',
          borderLeft: '4px solid #F97316',
          borderRadius: 12,
          padding: '20px 22px',
          margin: '0 0 32px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ flex: '1 1 260px' }}>
          <p
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: '#0F172A',
              margin: '0 0 4px 0',
              lineHeight: 1.35,
              fontFamily: 'var(--font-body)',
            }}
          >
            Use this code on your bills
          </p>
          <p
            style={{
              fontSize: 14,
              color: '#334155',
              margin: 0,
              lineHeight: 1.55,
              fontFamily: 'var(--font-body)',
            }}
          >
            Save HSN and SAC codes to your items in Udyog and make GST bills in seconds. 14-day free trial.
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 14,
          }}
        >
          <a
            href={appUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F97316',
              color: '#FFFFFF',
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              fontWeight: 700,
              padding: '11px 22px',
              minHeight: 44,
              borderRadius: 8,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxSizing: 'border-box',
            }}
          >
            Make a bill with Udyog
          </a>
          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#0F172A',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 600,
              padding: '8px 4px',
              minHeight: 44,
              textDecoration: 'underline',
              whiteSpace: 'nowrap',
              boxSizing: 'border-box',
            }}
          >
            Get it on Google Play →
          </a>
        </div>
      </aside>
    )
  }

  // Default: "inline" variant
  return (
    <aside
      aria-label="Start 14-day free trial with Udyog"
      style={{
        background: '#F8FAFC',
        border: '1px solid #CBD5E1',
        borderLeft: '4px solid #F97316',
        borderRadius: 12,
        padding: '22px 24px',
        margin: '28px 0',
        boxSizing: 'border-box',
      }}
    >
      <p
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#0F172A',
          margin: '0 0 6px 0',
          lineHeight: 1.35,
          fontFamily: 'var(--font-body)',
        }}
      >
        Make GST bills on mobile or web with Udyog
      </p>
      <p
        style={{
          fontSize: 15,
          color: '#334155',
          margin: '0 0 16px 0',
          lineHeight: 1.6,
          fontFamily: 'var(--font-body)',
        }}
      >
        Keep your customers, items, HSN codes and GST invoices in one place. 14-day free trial.
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <a
          href={appUrl}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F97316',
            color: '#FFFFFF',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 700,
            padding: '11px 22px',
            minHeight: 44,
            borderRadius: 8,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
          }}
        >
          Start 14-day free trial
        </a>
        <a
          href={playUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFFFF',
            color: '#0F172A',
            border: '1.5px solid #0F172A',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 600,
            padding: '10px 20px',
            minHeight: 44,
            borderRadius: 8,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
          }}
        >
          Get it on Google Play
        </a>
      </div>
    </aside>
  )
}
