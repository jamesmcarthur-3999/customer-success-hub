export type HealthStatus = 'Good' | 'Attention Needed' | 'At Risk'
export type ProjectStatus = 'Not Started' | 'In Progress' | 'Complete' | 'On Hold'
export type ActionOwner = 'MadKudu' | 'Customer' | 'Joint'
export type ActionStatus = 'Not Started' | 'In Progress' | 'Complete'
export type RiskImpact = 'High' | 'Medium' | 'Low'
export type RiskStatus = 'Active' | 'Mitigated' | 'Accepted'
export type CommunicationType = 'Call' | 'Email' | 'Meeting' | 'Slack' | 'Other'

export interface KeyStakeholder {
  name: string
  title: string
  role: string
  email?: string
  phone?: string
  notes?: string
  lastContact?: string // ISO date string
}

export interface ActiveProject {
  name: string
  description: string
  status: ProjectStatus
  startDate?: string // ISO date string
  targetDate?: string // ISO date string
  notes?: string
}

export interface Risk {
  description: string
  impact: RiskImpact
  mitigation: string
  status: RiskStatus
}

export interface ActionItem {
  description: string
  owner: ActionOwner
  deadline?: string // ISO date string
  status: ActionStatus
  notes?: string
}

export interface Communication {
  type: CommunicationType
  date: string // ISO date string
  summary: string
  participants: string[]
  fullContent?: string
  source?: string // e.g., "Gong"
  aiSummary?: string
  tags?: string[]
}

export interface CustomSection {
  title: string
  content: string | any[]
  type: 'text' | 'list' | 'custom'
}

export interface CustomerMetadata {
  lastSummaryGeneration?: string // ISO date string
  dataSources: string[]
  customSections?: CustomSection[]
  tags?: string[]
  dataQuality?: number // 1-10 score
  version: number
}

export interface Customer {
  // Core Identifiers
  id: string
  name: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  
  // Account Management
  currentOwner: string
  proposedNewOwner?: string
  
  // Account Details
  accountDetails: {
    healthStatus: HealthStatus
    renewalDate: string // ISO date string
    renewalQuarter: string // e.g., "2025-Q2"
    currentARR: number
    employees: number
    mkCompanyEmployees: number
    productsUsed: string[]
    primaryUseCase: string
    inCoreWorkflow: boolean
    customerNotified: boolean
    [key: string]: any // Extensible properties
  }
  
  // Key People
  keyStakeholders: KeyStakeholder[]
  
  // Content Sections
  executiveSummary: string
  valueRealization: string[]
  activeProjects: ActiveProject[]
  risks: Risk[]
  actionItems: ActionItem[]
  
  // Notes and Source Data
  additionalNotes: string
  
  // Communication Records
  communications: Communication[]
  
  // Tracking and Metadata
  metadata: CustomerMetadata
}

// Simplified customer type for listing/dashboard views
export interface CustomerSummary {
  id: string
  name: string
  healthStatus: HealthStatus
  renewalDate: string
  currentARR: number
  owner: string
}
