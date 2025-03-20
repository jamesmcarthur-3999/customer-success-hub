/**
 * Mock Data Service
 * Provides sample data for testing and development
 */

import { v4 as uuidv4 } from 'uuid';
import { Customer, HealthStatus } from '../types/customer';
import customerService from './customerService';

// Sample Data
const MOCK_CUSTOMERS: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Acme Inc',
    currentOwner: 'James McArthur',
    accountDetails: {
      healthStatus: 'Good',
      renewalDate: '2025-06-15',
      renewalQuarter: '2025-Q2',
      currentARR: 120000,
      employees: 350,
      mkCompanyEmployees: 1,
      productsUsed: ['MadKudu for Segment', 'MadKudu for Marketo'],
      primaryUseCase: 'Lead scoring',
      inCoreWorkflow: true,
      customerNotified: true,
    },
    keyStakeholders: [
      {
        name: 'Jane Smith',
        title: 'VP of Marketing',
        role: 'Decision Maker',
        email: 'jane@acme.com',
      },
      {
        name: 'Mike Johnson',
        title: 'Marketing Ops Manager',
        role: 'Day-to-day Contact',
        email: 'mike@acme.com',
      },
    ],
    executiveSummary: 'Acme Inc is a key customer who has been with us for 3 years. They are happy with the product and are considering expanding to additional teams.',
    valueRealization: [
      'Reduced time spent on lead qualification by 65%',
      'Increased conversion rate by 23%',
      'Improved sales and marketing alignment',
    ],
    activeProjects: [
      {
        name: 'Marketo Integration Upgrade',
        description: 'Upgrade to the latest Marketo integration',
        status: 'In Progress',
        startDate: '2025-02-15',
        targetDate: '2025-03-30',
      },
    ],
    risks: [
      {
        description: 'Potential budget constraints in Q3',
        impact: 'Medium',
        mitigation: 'Emphasize ROI in upcoming business review',
        status: 'Active',
      },
    ],
    actionItems: [
      {
        description: 'Schedule quarterly business review',
        owner: 'MadKudu',
        deadline: '2025-04-01',
        status: 'Not Started',
      },
      {
        description: 'Collect success metrics',
        owner: 'Customer',
        deadline: '2025-03-25',
        status: 'In Progress',
      },
    ],
    additionalNotes: 'Acme is interested in our upcoming AI features.',
    communications: [
      {
        type: 'Call',
        date: '2025-03-10',
        summary: 'Discussed upcoming renewal and potential expansion',
        participants: ['James McArthur', 'Jane Smith', 'Mike Johnson'],
      },
    ],
    metadata: {
      dataSources: ['Salesforce', 'Marketo'],
      version: 1,
    },
  },
  {
    name: 'Globex Corporation',
    currentOwner: 'James McArthur',
    accountDetails: {
      healthStatus: 'At Risk',
      renewalDate: '2025-03-28',
      renewalQuarter: '2025-Q1',
      currentARR: 85000,
      employees: 250,
      mkCompanyEmployees: 1,
      productsUsed: ['MadKudu for Salesforce'],
      primaryUseCase: 'Account scoring',
      inCoreWorkflow: true,
      customerNotified: true,
    },
    keyStakeholders: [
      {
        name: 'Robert Chen',
        title: 'CRO',
        role: 'Executive Sponsor',
        email: 'robert@globex.com',
      },
      {
        name: 'Sarah Davis',
        title: 'Revenue Ops Manager',
        role: 'Day-to-day Contact',
        email: 'sarah@globex.com',
      },
    ],
    executiveSummary: 'Globex is at risk due to recent turnover in their marketing department and some unresolved technical issues.',
    valueRealization: [
      'Improved account prioritization',
      'Better visibility into account health',
    ],
    activeProjects: [
      {
        name: 'Technical Issue Resolution',
        description: 'Address sync issues with Salesforce',
        status: 'In Progress',
        startDate: '2025-02-20',
        targetDate: '2025-03-15',
      },
    ],
    risks: [
      {
        description: 'New marketing leadership may re-evaluate vendors',
        impact: 'High',
        mitigation: 'Schedule executive business review to align on value',
        status: 'Active',
      },
      {
        description: 'Ongoing technical issues causing frustration',
        impact: 'High',
        mitigation: 'Prioritize technical resolution, assign dedicated engineer',
        status: 'Active',
      },
    ],
    actionItems: [
      {
        description: 'Escalate technical issues to engineering',
        owner: 'MadKudu',
        status: 'Complete',
      },
      {
        description: 'Meet with new marketing VP',
        owner: 'MadKudu',
        deadline: '2025-03-15',
        status: 'Not Started',
      },
    ],
    additionalNotes: 'Need to move quickly to resolve issues before renewal decision window.',
    communications: [
      {
        type: 'Email',
        date: '2025-03-05',
        summary: 'Follow-up on technical issues',
        participants: ['James McArthur', 'Sarah Davis'],
      },
    ],
    metadata: {
      dataSources: ['Salesforce'],
      version: 1,
    },
  },
  {
    name: 'Initech',
    currentOwner: 'James McArthur',
    accountDetails: {
      healthStatus: 'Attention Needed',
      renewalDate: '2025-08-01',
      renewalQuarter: '2025-Q3',
      currentARR: 50000,
      employees: 180,
      mkCompanyEmployees: 1,
      productsUsed: ['MadKudu for HubSpot'],
      primaryUseCase: 'Lead enrichment',
      inCoreWorkflow: true,
      customerNotified: false,
    },
    keyStakeholders: [
      {
        name: 'Tom Milton',
        title: 'Marketing Director',
        role: 'Decision Maker',
        email: 'tom@initech.com',
      },
    ],
    executiveSummary: 'Initech is a relatively new customer still working through implementation challenges. Usage is below expectations.',
    valueRealization: [
      'Initial improvements in lead enrichment quality',
    ],
    activeProjects: [
      {
        name: 'HubSpot Workflow Optimization',
        description: 'Improve integration with HubSpot workflows',
        status: 'In Progress',
        startDate: '2025-02-10',
        targetDate: '2025-04-01',
      },
    ],
    risks: [
      {
        description: 'Low product adoption',
        impact: 'Medium',
        mitigation: 'Schedule training sessions and provide best practice guides',
        status: 'Active',
      },
    ],
    actionItems: [
      {
        description: 'Set up training session for marketing team',
        owner: 'MadKudu',
        deadline: '2025-03-20',
        status: 'In Progress',
      },
    ],
    additionalNotes: 'Need to focus on driving adoption to ensure renewal.',
    communications: [
      {
        type: 'Call',
        date: '2025-02-28',
        summary: 'Discussed implementation challenges',
        participants: ['James McArthur', 'Tom Milton'],
      },
    ],
    metadata: {
      dataSources: ['HubSpot'],
      version: 1,
    },
  },
];

// Initialize mock data
export const initializeMockData = (): number => {
  const existingCustomers = customerService.getAllCustomers();
  
  // Only initialize if no data exists
  if (existingCustomers.length === 0) {
    // Create customers
    MOCK_CUSTOMERS.forEach(customer => {
      customerService.createCustomer(customer);
    });
    
    return MOCK_CUSTOMERS.length;
  }
  
  return 0;
};

// Generate a random customer for testing
export const generateRandomCustomer = (): Omit<Customer, 'id' | 'createdAt' | 'updatedAt'> => {
  const companies = ['Stark Industries', 'Wayne Enterprises', 'Oscorp', 'Umbrella Corp', 'Cyberdyne Systems'];
  const healthStatuses: HealthStatus[] = ['Good', 'Attention Needed', 'At Risk'];
  const products = ['MadKudu for Segment', 'MadKudu for Marketo', 'MadKudu for HubSpot', 'MadKudu for Salesforce'];
  
  const companyName = companies[Math.floor(Math.random() * companies.length)];
  const healthStatus = healthStatuses[Math.floor(Math.random() * healthStatuses.length)];
  const arr = Math.round(Math.random() * 200000) + 30000;
  
  // Generate future date for renewal
  const renewalDate = new Date();
  renewalDate.setMonth(renewalDate.getMonth() + Math.floor(Math.random() * 12) + 1);
  
  // Calculate renewal quarter
  const quarter = Math.floor(renewalDate.getMonth() / 3) + 1;
  const renewalQuarter = `${renewalDate.getFullYear()}-Q${quarter}`;
  
  return {
    name: companyName,
    currentOwner: 'James McArthur',
    accountDetails: {
      healthStatus,
      renewalDate: renewalDate.toISOString().split('T')[0],
      renewalQuarter,
      currentARR: arr,
      employees: Math.floor(Math.random() * 1000) + 50,
      mkCompanyEmployees: 1,
      productsUsed: [products[Math.floor(Math.random() * products.length)]],
      primaryUseCase: 'Lead scoring',
      inCoreWorkflow: Math.random() > 0.3,
      customerNotified: Math.random() > 0.5,
    },
    keyStakeholders: [
      {
        name: 'John Doe',
        title: 'VP of Marketing',
        role: 'Decision Maker',
        email: `john@${companyName.toLowerCase().replace(' ', '')}.com`,
      },
    ],
    executiveSummary: `${companyName} is using our product for their ${products[0]} integration.`,
    valueRealization: [
      'Improved lead qualification',
      'Increased marketing efficiency',
    ],
    activeProjects: [],
    risks: [],
    actionItems: [],
    additionalNotes: '',
    communications: [],
    metadata: {
      dataSources: ['CRM'],
      version: 1,
    },
  };
};

// Create a specified number of random customers
export const createRandomCustomers = (count: number): number => {
  for (let i = 0; i < count; i++) {
    const customerData = generateRandomCustomer();
    customerService.createCustomer(customerData);
  }
  
  return count;
};

// Export the service
const mockDataService = {
  initializeMockData,
  generateRandomCustomer,
  createRandomCustomers,
};

export default mockDataService;