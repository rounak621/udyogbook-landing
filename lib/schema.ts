import { PRICING_PLANS } from './pricingData'

export function getPlanOffersSchema() {
  return PRICING_PLANS.map(plan => {
    const isYearlyPrimary = plan.id === 'saral' || plan.id === 'vistaar'
    const priceValue = isYearlyPrimary ? plan.yearlyPrice : plan.monthlyPrice
    const unitText = isYearlyPrimary ? 'YEAR' : 'MONTH'

    return {
      '@type': 'Offer',
      name: `Udyog ${plan.name} (${plan.platformBadge})`,
      description: `${plan.description} — ${plan.platformBadge}`,
      price: String(priceValue),
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(priceValue),
        priceCurrency: 'INR',
        unitText: unitText,
      },
    }
  })
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function getFAQPageSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}
