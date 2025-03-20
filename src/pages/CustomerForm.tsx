import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Customer } from '../types/customer'
import LoadingSpinner from '../components/ui/LoadingSpinner'

// Mock data - same as in CustomerDetails
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

const CustomerForm = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const isEditMode = Boolean(id)

  useEffect(() => {
    // Simulate API request
    const fetchCustomer = async () => {
      setLoading(true)
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 800))
        
        if (id && MOCK_CUSTOMERS[id]) {
          setCustomer(MOCK_CUSTOMERS[id])
        } else if (id) {
          // Handle not found
          console.error('Customer not found')
        } else {
          // Create mode - initialize empty customer
          // This would be replaced with a proper initialization function
          setCustomer(null)
        }
      } catch (error) {
        console.error('Error fetching customer:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate back to customer details or list
      if (id) {
        navigate(`/customers/${id}`)
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Error saving customer:', error)
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center">
          <Link to={id ? `/customers/${id}` : '/'} className="mr-4">
            <ArrowLeftIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? `Edit ${customer?.name}` : 'Add New Customer'}
          </h1>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {isEditMode ? 'Update customer details' : 'Enter customer details'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-900">Customer Form</h3>
              <p className="mt-2 text-sm text-gray-500">
                This is a placeholder for the customer form. <br />
                Full implementation coming in the next development phase.
              </p>

              {/* Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <Link
                  to={id ? `/customers/${id}` : '/'}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <LoadingSpinner size="small" color="white" className="mr-2" />
                      Saving...
                    </>
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerForm
