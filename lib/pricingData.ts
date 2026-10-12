export type PlatformType = 'mobile' | 'web' | 'both';

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PlanData {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  threeYearPrice: number;
  threeYearMonthlyPrice: number;
  color: string;
  badge: string | null;
  highlighted: boolean;
  platform: PlatformType;
  platformBadge: 'Mobile Only' | 'Web Only' | 'Mobile + Web';
  description: string;
  iconName: 'Smartphone' | 'Sparkles' | 'Zap' | 'Star' | 'Crown' | 'Building2';
  features: PlanFeature[];
  cta: string;
}

export const PRICING_PLANS: PlanData[] = [
  {
    id: 'saral',
    name: 'Saral',
    tagline: 'Mobile Billing',
    monthlyPrice: 67,
    yearlyPrice: 799,
    threeYearPrice: 1918,
    threeYearMonthlyPrice: 53,
    color: '#0ea5e9',
    badge: null,
    highlighted: false,
    platform: 'mobile',
    platformBadge: 'Mobile Only',
    description: 'Essential billing and Maya voice assistant for small shops',
    iconName: 'Smartphone',
    cta: 'Start free trial',
    features: [
      { text: '2 Businesses Limit', included: true },
      { text: 'Maya AI Voice Billing', included: true },
      { text: 'Core GST Billing & Invoicing', included: true },
      { text: 'CA Sync Portal Access', included: false },
    ],
  },
  {
    id: 'vistaar',
    name: 'Vistaar',
    tagline: 'Expansion Pack',
    monthlyPrice: 83,
    yearlyPrice: 999,
    threeYearPrice: 2398,
    threeYearMonthlyPrice: 67,
    color: '#8b5cf6',
    badge: 'Recommended',
    highlighted: false,
    platform: 'mobile',
    platformBadge: 'Mobile Only',
    description: 'Perfect for growing businesses needing multi-business access',
    iconName: 'Sparkles',
    cta: 'Start free trial',
    features: [
      { text: '6 Businesses Limit', included: true },
      { text: '1 CA Collaboration Access', included: true },
      { text: 'Maya AI Voice Billing', included: true },
      { text: 'Core GST Billing & Invoicing', included: true },
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Essential Billing',
    monthlyPrice: 149,
    yearlyPrice: 1788,
    threeYearPrice: 4291,
    threeYearMonthlyPrice: 119,
    color: '#64748b',
    badge: null,
    highlighted: false,
    platform: 'web',
    platformBadge: 'Web Only',
    description: 'For solo shop owners who just need digital bills',
    iconName: 'Zap',
    cta: 'Get started',
    features: [
      { text: 'Unlimited Sales & Purchase Invoices', included: true },
      { text: 'Customer & Vendor Management', included: true },
      { text: 'Basic Stock Tracking', included: true },
      { text: 'Maya Voice Agent', included: false },
      { text: 'GST Reports', included: false },
      { text: 'CA Sync Portal', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Smart Business',
    monthlyPrice: 249,
    yearlyPrice: 2988,
    threeYearPrice: 7171,
    threeYearMonthlyPrice: 199,
    color: '#F97316',
    badge: null,
    highlighted: false,
    platform: 'web',
    platformBadge: 'Web Only',
    description: 'For growing businesses that want to save time with AI',
    iconName: 'Star',
    cta: 'Start free trial',
    features: [
      { text: 'All Basic features', included: true },
      { text: 'Maya AI Voice Billing', included: true },
      { text: 'AI Expense Tracking', included: true },
      { text: 'Staff Access (Limited)', included: true },
      { text: 'GST Reports', included: false },
      { text: 'CA Sync Portal', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Complete Accounting',
    monthlyPrice: 299,
    yearlyPrice: 3588,
    threeYearPrice: 8611,
    threeYearMonthlyPrice: 239,
    color: '#8b5cf6',
    badge: 'Most Popular',
    highlighted: true,
    platform: 'both',
    platformBadge: 'Mobile + Web',
    description: 'For GST-registered businesses and complete peace of mind',
    iconName: 'Crown',
    cta: 'Start free trial',
    features: [
      { text: 'All Pro features', included: true },
      { text: 'One-Click GST Reports', included: true },
      { text: 'CA Collaboration Portal', included: true },
      { text: 'Profit & Loss Statements', included: true },
      { text: 'Advanced Staff Permissions', included: true },
      { text: 'Rental Business', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Rental & Advanced',
    monthlyPrice: 499,
    yearlyPrice: 5988,
    threeYearPrice: 14371,
    threeYearMonthlyPrice: 399,
    color: '#64748b',
    badge: null,
    highlighted: false,
    platform: 'both',
    platformBadge: 'Mobile + Web',
    description: 'Built specifically for rental businesses',
    iconName: 'Building2',
    cta: 'Start free trial',
    features: [
      { text: 'All Premium features', included: true },
      { text: 'Rental Equipment Scheduling', included: true },
      { text: 'Automated Late Fee Deductions', included: true },
      { text: 'Custom Branding on Invoices', included: true },
      { text: 'Priority Support', included: true },
    ],
  },
];

export const HOMEPAGE_PLAN_IDS = ['basic', 'pro', 'premium', 'enterprise'];

export function getHomepagePlans(): PlanData[] {
  return HOMEPAGE_PLAN_IDS.map(id => PRICING_PLANS.find(p => p.id === id)!).filter(Boolean);
}

export function filterPlansByPlatform(platform: 'desktop' | 'mobile' | 'both'): PlanData[] {
  return PRICING_PLANS.filter(plan => {
    if (platform === 'mobile') return plan.platform === 'mobile' || plan.platform === 'both';
    if (platform === 'desktop') return plan.platform === 'web' || plan.platform === 'both';
    if (platform === 'both') return plan.platform === 'both';
    return true;
  });
}

export const PRICING_FAQS = [
  { q: 'Is there a free trial?', a: 'Yes — all plans include a 14-day free trial. No credit card required. You can explore every feature before committing to a paid plan.' },
  { q: 'What is the billing cycle?', a: 'Udyog offers 1-year and 3-year subscription plans. Choosing a 3-year plan saves you 20% across all plans.' },
  { q: 'Do you offer monthly billing?', a: 'Subscriptions are billed annually or in 3-year terms. The 3-year plan gives you a 20% discount. Annual billing allows us to keep subscription prices as low as possible and continually ship new features.' },
  { q: 'Can I change my plan later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Upgrades take effect immediately. Downgrades take effect at the next billing cycle.' },
  { q: 'Are prices inclusive of GST?', a: 'No — prices shown are exclusive of GST. 18% GST will be applicable on all plans as per Indian tax regulations. Your GST invoice will be provided for every payment.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and all major Indian payment methods including Paytm, PhonePe, and Google Pay.' },
  { q: 'Do you offer refunds?', a: 'We do not offer refunds on subscription payments. However, you can cancel at any time — your plan remains active until the end of the billing period. We strongly recommend using the 14-day free trial before purchasing. See our full Refund Policy for details.' },
]

