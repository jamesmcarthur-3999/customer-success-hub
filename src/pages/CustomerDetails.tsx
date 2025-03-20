import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PencilIcon, ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { HealthStatus } from '../types/customer'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useCustomer, useDeleteCustomer } from '../hooks'
import { toast } from 'react-toastify'

const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // Fetch customer data using React Query
  const { 
    data: customer, 
    isLoading, 
    error 
  } = useCustomer(id || '')
  
  // Delete customer mutation
  const deleteMutation = useDeleteCustomer()

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
  
  // Handle customer deletion
  const handleDelete = () => {
    if (!id) return
    
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success('Customer deleted successfully')
          navigate('/')
        },
        onError: (err) => {
          toast.error('Failed to delete customer')
          console.error('Error deleting customer:', err)
        }
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (error || !customer) {
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

  return (
    <div className="pb-12">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Link to="/" className="text-primary-600 hover:text-primary-800 flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>
        
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
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="btn btn-danger flex items-center"
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? (
                <LoadingSpinner size="small" />
              ) : (
                <TrashIcon className="h-4 w-4 mr-1" />
              )}
              Delete
            </button>
            <Link
              to={`/customers/${customer.id}/edit`}
              className="btn btn-secondary flex items-center"
            >
              <PencilIcon className="h-4 w-4 mr-1" />
              Edit
            </Link>
          </div>
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
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Account Details</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs text-gray-500">Employees</span>
                    <span>{customer.accountDetails.employees.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">MK Employees</span>
                    <span>{customer.accountDetails.mkCompanyEmployees.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">In Core Workflow</span>
                    <span>{customer.accountDetails.inCoreWorkflow ? 'Yes' : 'No'}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Customer Notified</span>
                    <span>{customer.accountDetails.customerNotified ? 'Yes' : 'No'}</span>
                  </div>
                </div>
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
      
      {/* Key Stakeholders */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Key Stakeholders</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {customer.keyStakeholders.map((stakeholder, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{stakeholder.name}</p>
                    <p className="text-sm text-gray-500">{stakeholder.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{stakeholder.role}</p>
                    {stakeholder.email && (
                      <p className="text-sm text-primary-600">{stakeholder.email}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Active Projects */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Active Projects</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {customer.activeProjects.map((project, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900">{project.name}</p>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                  {project.targetDate && (
                    <p className="mt-1 text-xs text-gray-500">
                      Target completion: {new Date(project.targetDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Risks and Action Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Risks */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Risks</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {customer.risks.length > 0 ? (
                customer.risks.map((risk, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6">
                    <div>
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{risk.description}</p>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          risk.impact === 'High' ? 'bg-danger-100 text-danger-800' :
                          risk.impact === 'Medium' ? 'bg-warning-100 text-warning-800' :
                          'bg-success-100 text-success-800'
                        }`}>
                          {risk.impact}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        <span className="font-medium">Mitigation:</span> {risk.mitigation}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Status: {risk.status}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-4 sm:px-6 text-sm text-gray-500">
                  No risks identified.
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Action Items</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {customer.actionItems.length > 0 ? (
                customer.actionItems.map((action, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6">
                    <div>
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{action.description}</p>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {action.status}
                        </span>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <p className="text-sm text-gray-500">
                          Owner: {action.owner}
                        </p>
                        {action.deadline && (
                          <p className="text-xs text-gray-500">
                            Deadline: {new Date(action.deadline).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-4 sm:px-6 text-sm text-gray-500">
                  No action items.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Communications */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Communications</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {customer.communications.length > 0 ? (
              customer.communications.map((comm, index) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                  <div>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{comm.summary}</p>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {comm.type}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(comm.date).toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Participants: {comm.participants.join(', ')}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-4 sm:px-6 text-sm text-gray-500">
                No communications recorded.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Additional Notes */}
      {customer.additionalNotes && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Additional Notes</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <p className="text-sm text-gray-500">{customer.additionalNotes}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerDetails
