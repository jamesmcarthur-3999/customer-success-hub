import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PencilIcon } from '@heroicons/react/24/outline'
import { Customer, HealthStatus } from '../types/customer'
import LoadingSpinner from '../components/ui/LoadingSpinner'

// Mock data - will be replaced with actual data fetching
const MOCK_CUSTOMERS: { [key: string]: Customer } = {
  '1': {
    id: '1',
    name: 'Acme Inc',
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
    currentOwner: 'James McArthur',
    accountDetails: {
      healthStatus: 'Good',
      renewalDate: '2025-06-15',
      renewalQuarter: '2025-Q2',
      currentARR: 120000,
      employees: 500,
      mkCompanyEmployees: 450,
      productsUsed: ['Scoring', 'Copilot'],
      primaryUseCase: 'Lead qualification and account-level engagement',
      inCoreWorkflow: true,
      customerNotified: true
    },
    keyStakeholders: [
      {
        name: 'Jane Smith',
        title: 'VP of Marketing',
        role: 'Executive Sponsor',
        email: 'jane.smith@acme.com'
      },
      {
        name: 'John Doe',
        title: 'Marketing Operations Manager',
        role: 'Primary Contact',
        email: 'john.doe@acme.com'
      }
    ],
    executiveSummary: 'Acme Inc has been a customer since 2024 and is using our platform for lead qualification and account-based marketing initiatives. They have shown strong adoption across their marketing team and are seeing positive results with a 25% increase in qualified leads.',
    valueRealization: [
      'Increased lead qualification efficiency by 30%',
      'Improved sales-marketing alignment',
      'Reduced time to qualify leads by 45%',
      'Better targeting for ABM campaigns'
    ],
    activeProjects: [
      {
        name: 'Copilot Rollout',
        description: 'Expanding Copilot usage across the entire marketing team',
        status: 'In Progress',
        targetDate: '2025-04-15'
      },
      {
        name: 'Data Integration Enhancement',
        description: 'Improving data flow from their CRM to enhance scoring accuracy',
        status: 'Not Started',
        targetDate: '2025-05-01'
      }
    ],
    risks: [
      {
        description: 'New marketing leadership may re-evaluate tools',
        impact: 'Medium',
        mitigation: 'Schedule executive briefing with new CMO in Q2',
        status: 'Active'
      }
    ],
    actionItems: [
      {
        description: 'Schedule Q2 business review',
        owner: 'MadKudu',
        deadline: '2025-04-01',
        status: 'Not Started'
      },
      {
        description: 'Provide onboarding for new team members',
        owner: 'Joint',
        deadline: '2025-03-29',
        status: 'In Progress'
      }
    ],
    additionalNotes: 'Acme is considering expanding usage to their APAC region in Q3 2025.',
    communications: [
      {
        type: 'Call',
        date: '2025-03-10T14:00:00Z',
        summary: 'Quarterly business review',
        participants: ['James McArthur', 'Jane Smith', 'John Doe'],
        source: 'Gong'
      }
    ],
    metadata: {
      dataSources: ['CRM', 'CSV Import'],
      tags: ['Enterprise', 'Growth Account'],
      dataQuality: 8,
      version: 1
    }
  }
}

const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API request
    const fetchCustomer = async () => {
      setLoading(true)
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 800))
        
        if (id && MOCK_CUSTOMERS[id]) {
          setCustomer(MOCK_CUSTOMERS[id])
        } else {
          // Handle not found
          console.error('Customer not found')
        }
      } catch (error) {
        console.error('Error fetching customer:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Customer not found</h2>
        <p className="mt-2 text-gray-600">
          The customer you're looking for doesn't exist or you don't have access.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          Back to Dashboard
        </Link>
      </div>
    )
  }

  // Helper function to render health status badge
  const renderHealthStatus = (status: HealthStatus) => {
    const colors = {
      'Good': 'bg-success-100 text-success-800',
      'Attention Needed': 'bg-warning-100 text-warning-800',
      'At Risk': 'bg-danger-100 text-danger-800',
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${colors[status]}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="pb-12">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
            <div className="mt-1 flex items-center">
              {renderHealthStatus(customer.accountDetails.healthStatus)}
              <span className="ml-4 text-sm text-gray-500">
                Renewal: {new Date(customer.accountDetails.renewalDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Link
            to={`/customers/${customer.id}/edit`}
            className="btn btn-secondary flex items-center"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </Link>
        </div>
      </div>

      {/* Customer Summary Card */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Account Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Key information and stats.</p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Owner</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.currentOwner}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">ARR</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0
                }).format(customer.accountDetails.currentARR)}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Products</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.accountDetails.productsUsed.join(', ')}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Primary Use Case</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {customer.accountDetails.primaryUseCase}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Executive Summary</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <p className="text-sm text-gray-500">{customer.executiveSummary}</p>
        </div>
      </div>

      {/* Value Realization */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Value Realization</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
            {customer.valueRealization.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* This is a placeholder for the customer details page.
          In future iterations, we'll implement:
          - Full customer information display
          - Tabs for different sections (Projects, Communications, etc.)
          - Edit functionality
          - AI summary generation
          - etc.
      */}
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Customer Details Page</h3>
        <p className="mt-2 text-sm text-gray-500">
          This is a basic placeholder for the customer details page. <br />
          Full implementation coming in the next development phase.
        </p>
      </div>
    </div>
  )
}

export default CustomerDetails
