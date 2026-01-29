export interface BusinessFundamentals {
  businessType: string;
  industry: string;
  revenueRange: string;
  employeeCount: string;
  yearsInBusiness: number;
  keyPersonDependency: string;
}

export interface OwnershipLeadership {
  ownershipStructure: string;
  intendedSuccessor: string;
  currentAge: number;
  transitionTimeline: string;
  successorIdentified: boolean;
}

export interface PlanningStatus {
  formalPlan: string;
  businessValuation: string;
  estatePlanning: string;
  buySellAgreement: boolean;
  keyPersonInsurance: boolean;
}

export interface AssessmentRequest {
  businessFundamentals: BusinessFundamentals;
  ownershipLeadership: OwnershipLeadership;
  planningStatus: PlanningStatus;
}

export interface ActionItem {
  title: string;
  description: string;
  timeframe?: string;
}

export interface Risk {
  title: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  mitigation: string;
}

export interface NextSteps {
  immediate: string[];
  shortTerm: string[];
  longTerm: string[];
}

export interface AssessmentResponse {
  readinessScore: number;
  summary: string;
  criticalGaps: string[];
  actionItems: {
    critical: ActionItem[];
    highPriority: ActionItem[];
    important: ActionItem[];
    foundational: ActionItem[];
  };
  risks: Risk[];
  nextSteps: NextSteps;
}
