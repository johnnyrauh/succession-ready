export interface Question {
  id: string
  label: string
  type: 'select' | 'number' | 'boolean'
  options?: { value: string; label: string }[]
  min?: number
  max?: number
}

export interface Section {
  id: string
  title: string
  description: string
  questions: Question[]
}

export const sections: Section[] = [
  {
    id: 'businessFundamentals',
    title: 'Business Fundamentals',
    description: 'Tell us about your business basics',
    questions: [
      {
        id: 'businessType',
        label: 'Business Entity Type',
        type: 'select',
        options: [
          { value: 'sole-proprietorship', label: 'Sole Proprietorship' },
          { value: 'llc', label: 'LLC' },
          { value: 's-corp', label: 'S Corporation' },
          { value: 'c-corp', label: 'C Corporation' },
          { value: 'partnership', label: 'Partnership' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        id: 'industry',
        label: 'Industry',
        type: 'select',
        options: [
          { value: 'manufacturing', label: 'Manufacturing' },
          { value: 'retail', label: 'Retail' },
          { value: 'professional-services', label: 'Professional Services' },
          { value: 'healthcare', label: 'Healthcare' },
          { value: 'construction', label: 'Construction' },
          { value: 'technology', label: 'Technology' },
          { value: 'hospitality', label: 'Hospitality' },
          { value: 'real-estate', label: 'Real Estate' },
          { value: 'agriculture', label: 'Agriculture' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        id: 'revenueRange',
        label: 'Annual Revenue',
        type: 'select',
        options: [
          { value: 'under-500k', label: 'Under $500K' },
          { value: '500k-1m', label: '$500K - $1M' },
          { value: '1m-5m', label: '$1M - $5M' },
          { value: '5m-10m', label: '$5M - $10M' },
          { value: '10m-25m', label: '$10M - $25M' },
          { value: '25m-50m', label: '$25M - $50M' },
          { value: 'over-50m', label: 'Over $50M' },
        ],
      },
      {
        id: 'employeeCount',
        label: 'Number of Employees',
        type: 'select',
        options: [
          { value: '1-10', label: '1-10' },
          { value: '11-50', label: '11-50' },
          { value: '51-200', label: '51-200' },
          { value: '201-500', label: '201-500' },
          { value: 'over-500', label: 'Over 500' },
        ],
      },
      {
        id: 'yearsInBusiness',
        label: 'Years in Business',
        type: 'number',
        min: 0,
        max: 200,
      },
      {
        id: 'keyPersonDependency',
        label: 'Is the business heavily dependent on you (the owner) for daily operations?',
        type: 'select',
        options: [
          { value: 'yes', label: 'Yes, I am essential to daily operations' },
          { value: 'somewhat', label: 'Somewhat, but I have some key managers' },
          { value: 'no', label: 'No, the business can run without me' },
        ],
      },
    ],
  },
  {
    id: 'ownershipLeadership',
    title: 'Ownership & Leadership',
    description: 'Tell us about ownership and succession plans',
    questions: [
      {
        id: 'ownershipStructure',
        label: 'Current Ownership Structure',
        type: 'select',
        options: [
          { value: '100-owner', label: '100% sole owner' },
          { value: 'majority-owner', label: 'Majority owner with partners' },
          { value: 'equal-partners', label: 'Equal partnership' },
          { value: 'family-owned', label: 'Family-owned (multiple family members)' },
          { value: 'esop', label: 'ESOP or employee-owned' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        id: 'intendedSuccessor',
        label: 'Who is your intended successor?',
        type: 'select',
        options: [
          { value: 'family-member', label: 'Family member' },
          { value: 'key-employee', label: 'Key employee(s)' },
          { value: 'external-sale', label: 'External buyer (sell the business)' },
          { value: 'esop', label: 'ESOP transition' },
          { value: 'undecided', label: 'Undecided / Haven\'t thought about it' },
        ],
      },
      {
        id: 'currentAge',
        label: 'Your Current Age',
        type: 'number',
        min: 18,
        max: 100,
      },
      {
        id: 'transitionTimeline',
        label: 'When do you plan to transition out of the business?',
        type: 'select',
        options: [
          { value: 'under-2-years', label: 'Within 2 years' },
          { value: '2-5-years', label: '2-5 years' },
          { value: '5-10-years', label: '5-10 years' },
          { value: 'over-10-years', label: 'More than 10 years' },
          { value: 'no-plans', label: 'No plans to transition' },
        ],
      },
      {
        id: 'successorIdentified',
        label: 'Have you identified and communicated with a specific successor?',
        type: 'boolean',
      },
    ],
  },
  {
    id: 'planningStatus',
    title: 'Planning Status',
    description: 'What planning have you already done?',
    questions: [
      {
        id: 'formalPlan',
        label: 'Do you have a formal succession plan?',
        type: 'select',
        options: [
          { value: 'comprehensive', label: 'Yes, comprehensive written plan' },
          { value: 'basic', label: 'Yes, basic written plan' },
          { value: 'informal', label: 'Informal plan (not documented)' },
          { value: 'none', label: 'No plan at all' },
        ],
      },
      {
        id: 'businessValuation',
        label: 'When was your last business valuation?',
        type: 'select',
        options: [
          { value: 'recent', label: 'Within the last year' },
          { value: 'recent-2-3', label: '1-3 years ago' },
          { value: 'older', label: 'More than 3 years ago' },
          { value: 'never', label: 'Never had a formal valuation' },
        ],
      },
      {
        id: 'estatePlanning',
        label: 'Current estate planning status',
        type: 'select',
        options: [
          { value: 'comprehensive', label: 'Comprehensive (trusts, wills, POA, etc.)' },
          { value: 'basic-will-trust', label: 'Basic will and trust' },
          { value: 'basic-will', label: 'Basic will only' },
          { value: 'none', label: 'No estate planning documents' },
        ],
      },
      {
        id: 'buySellAgreement',
        label: 'Do you have a buy-sell agreement in place?',
        type: 'boolean',
      },
      {
        id: 'keyPersonInsurance',
        label: 'Do you have key person insurance?',
        type: 'boolean',
      },
    ],
  },
]

export const demoData = {
  businessFundamentals: {
    businessType: 'llc',
    industry: 'manufacturing',
    revenueRange: '5m-10m',
    employeeCount: '51-200',
    yearsInBusiness: 15,
    keyPersonDependency: 'somewhat',
  },
  ownershipLeadership: {
    ownershipStructure: '100-owner',
    intendedSuccessor: 'family-member',
    currentAge: 58,
    transitionTimeline: '5-10-years',
    successorIdentified: true,
  },
  planningStatus: {
    formalPlan: 'informal',
    businessValuation: 'older',
    estatePlanning: 'basic-will',
    buySellAgreement: false,
    keyPersonInsurance: false,
  },
}
