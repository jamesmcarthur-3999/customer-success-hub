import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Customer, HealthStatus } from '../types/customer'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useCustomer, useCreateCustomer, useUpdateCustomer } from '../hooks'
import { toast } from 'react-toastify'

const CustomerForm = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)
  
  // Fetch customer data if in edit mode
  const { 
    data: existingCustomer, 
    isLoading: isLoadingCustomer 
  } = useCustomer(id || '', {
    enabled: isEditMode
  })
  
  // Form state
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: '',
    currentOwner: '',
    accountDetails: {
      healthStatus: 'Good' as HealthStatus,
      renewalDate: '',
      renewalQuarter: '',
      currentARR: 0,
      employees: 0,
      mkCompanyEmployees: 0,
      productsUsed: [],
      primaryUseCase: '',
      inCoreWorkflow: false,
      customerNotified: false
    },
    executiveSummary: '',
    keyStakeholders: [],
    valueRealization: [],
    activeProjects: [],
    risks: [],
    actionItems: [],
    additionalNotes: '',
    communications: [],
    metadata: {
      dataSources: [],
      version: 1
    }
  })
  
  // Set form data when existing customer is loaded
  useState(() => {
    if (existingCustomer) {
      setFormData(existingCustomer)
    }
  })
  
  // Mutations
  const createMutation = useCreateCustomer()
  const updateMutation = useUpdateCustomer()
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isEditMode && existingCustomer) {
      // Update existing customer
      updateMutation.mutate({
        ...existingCustomer,
        ...formData
      } as Customer, {
        onSuccess: (updatedCustomer) => {
          toast.success('Customer updated successfully')
          navigate(`/customers/${updatedCustomer.id}`)
        },
        onError: (error) => {
          toast.error('Failed to update customer')
          console.error('Error updating customer:', error)
        }
      })
    } else {
      // Create new customer
      createMutation.mutate(formData as Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>, {
        onSuccess: (newCustomer) => {
          toast.success('Customer created successfully')
          navigate(`/customers/${newCustomer.id}`)
        },
        onError: (error) => {
          toast.error('Failed to create customer')
          console.error('Error creating customer:', error)
        }
      })
    }
  }
  
  // Handle form field changes (generic handler)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    // Handle boolean values (checkbox)
    if (type === 'checkbox') {
      const checkboxInput = e.target as HTMLInputElement
      setFormData(prev => ({
        ...prev,
        [name]: checkboxInput.checked
      }))
      return
    }
    
    // Handle nested field names (e.g., accountDetails.healthStatus)
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
      return
    }
    
    // Handle regular fields
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Loading state
  if (isEditMode && isLoadingCustomer) {
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
            {isEditMode ? `Edit ${existingCustomer?.name}` : 'Add New Customer'}
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
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Customer Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>
                
                {/* Customer Owner */}
                <div>
                  <label htmlFor="currentOwner" className="block text-sm font-medium text-gray-700">Customer Owner</label>
                  <input
                    type="text"
                    name="currentOwner"
                    id="currentOwner"
                    value={formData.currentOwner || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Account Details */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Account Details</h4>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Health Status */}
                <div>
                  <label htmlFor="accountDetails.healthStatus" className="block text-sm font-medium text-gray-700">Health Status</label>
                  <select
                    name="accountDetails.healthStatus"
                    id="accountDetails.healthStatus"
                    value={formData.accountDetails?.healthStatus || 'Good'}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="Good">Good</option>
                    <option value="Attention Needed">Attention Needed</option>
                    <option value="At Risk">At Risk</option>
                  </select>
                </div>
                
                {/* Renewal Date */}
                <div>
                  <label htmlFor="accountDetails.renewalDate" className="block text-sm font-medium text-gray-700">Renewal Date</label>
                  <input
                    type="date"
                    name="accountDetails.renewalDate"
                    id="accountDetails.renewalDate"
                    value={formData.accountDetails?.renewalDate?.substring(0, 10) || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>
                
                {/* ARR */}
                <div>
                  <label htmlFor="accountDetails.currentARR" className="block text-sm font-medium text-gray-700">Annual Recurring Revenue</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="accountDetails.currentARR"
                      id="accountDetails.currentARR"
                      value={formData.accountDetails?.currentARR || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                
                {/* Employees */}
                <div>
                  <label htmlFor="accountDetails.employees" className="block text-sm font-medium text-gray-700">Total Employees</label>
                  <input
                    type="number"
                    name="accountDetails.employees"
                    id="accountDetails.employees"
                    value={formData.accountDetails?.employees || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                {/* Primary Use Case */}
                <div className="sm:col-span-2">
                  <label htmlFor="accountDetails.primaryUseCase" className="block text-sm font-medium text-gray-700">Primary Use Case</label>
                  <input
                    type="text"
                    name="accountDetails.primaryUseCase"
                    id="accountDetails.primaryUseCase"
                    value={formData.accountDetails?.primaryUseCase || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                {/* Account Flags */}
                <div className="flex space-x-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="accountDetails.inCoreWorkflow"
                        name="accountDetails.inCoreWorkflow"
                        type="checkbox"
                        checked={formData.accountDetails?.inCoreWorkflow || false}
                        onChange={handleChange}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="accountDetails.inCoreWorkflow" className="font-medium text-gray-700">In Core Workflow</label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="accountDetails.customerNotified"
                        name="accountDetails.customerNotified"
                        type="checkbox"
                        checked={formData.accountDetails?.customerNotified || false}
                        onChange={handleChange}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="accountDetails.customerNotified" className="font-medium text-gray-700">Customer Notified</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Executive Summary */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Executive Summary</h4>
              <div>
                <label htmlFor="executiveSummary" className="sr-only">Executive Summary</label>
                <textarea
                  id="executiveSummary"
                  name="executiveSummary"
                  rows={4}
                  value={formData.executiveSummary || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Provide a summary of the customer relationship, key initiatives, and overall health..."
                />
              </div>
            </div>
            
            {/* Additional Notes */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Additional Notes</h4>
              <div>
                <label htmlFor="additionalNotes" className="sr-only">Additional Notes</label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={3}
                  value={formData.additionalNotes || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Any additional notes or context about this customer..."
                />
              </div>
            </div>

            {/* Form buttons */}
            <div className="pt-5 border-t border-gray-200 flex justify-end space-x-3">
              <Link
                to={id ? `/customers/${id}` : '/'}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={createMutation.isLoading || updateMutation.isLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {(createMutation.isLoading || updateMutation.isLoading) ? (
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
        </form>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Note: This form implements basic customer information. Additional form sections for stakeholders, projects, risks, etc. will be added in the next development phase.
        </p>
      </div>
    </div>
  )
}

export default CustomerForm
