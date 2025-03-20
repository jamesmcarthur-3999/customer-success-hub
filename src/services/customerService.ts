/**
 * Customer Service
 * Handles CRUD operations for customer data
 */

import { v4 as uuidv4 } from 'uuid';
import { Customer, CustomerSummary } from '../types/customer';
import localStorageService from './localStorageService';

// Constants
const CUSTOMER_PREFIX = 'customer_';
const CUSTOMER_LIST_KEY = 'customer_list';

// Helper function to generate full storage key for a customer
const getCustomerKey = (id: string) => `${CUSTOMER_PREFIX}${id}`;

// Get all customers
export const getAllCustomers = (): Customer[] => {
  const customerIds = localStorageService.getItem<string[]>(CUSTOMER_LIST_KEY, []);
  return customerIds.map(id => 
    localStorageService.getItem<Customer>(getCustomerKey(id), null)
  ).filter(Boolean);
};

// Get customer summaries for dashboard
export const getCustomerSummaries = (): CustomerSummary[] => {
  return getAllCustomers().map(customer => ({
    id: customer.id,
    name: customer.name,
    healthStatus: customer.accountDetails.healthStatus,
    renewalDate: customer.accountDetails.renewalDate,
    currentARR: customer.accountDetails.currentARR,
    owner: customer.currentOwner
  }));
};

// Get a specific customer by ID
export const getCustomerById = (id: string): Customer | null => {
  return localStorageService.getItem<Customer>(getCustomerKey(id), null);
};

// Create a new customer
export const createCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Customer => {
  const newCustomer: Customer = {
    ...customerData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Save the customer data
  localStorageService.setItem(getCustomerKey(newCustomer.id), newCustomer);
  
  // Update the customer list
  const customerIds = localStorageService.getItem<string[]>(CUSTOMER_LIST_KEY, []);
  customerIds.push(newCustomer.id);
  localStorageService.setItem(CUSTOMER_LIST_KEY, customerIds);
  
  return newCustomer;
};

// Update an existing customer
export const updateCustomer = (customer: Customer): Customer => {
  const updatedCustomer = {
    ...customer,
    updatedAt: new Date().toISOString()
  };
  
  localStorageService.setItem(getCustomerKey(customer.id), updatedCustomer);
  return updatedCustomer;
};

// Delete a customer
export const deleteCustomer = (id: string): boolean => {
  // Remove from storage
  localStorageService.removeItem(getCustomerKey(id));
  
  // Update the customer list
  const customerIds = localStorageService.getItem<string[]>(CUSTOMER_LIST_KEY, []);
  const updatedIds = customerIds.filter(customerId => customerId !== id);
  localStorageService.setItem(CUSTOMER_LIST_KEY, updatedIds);
  
  return true;
};

// Import customers from a JSON array
export const importCustomers = (customers: Customer[]): number => {
  const existingIds = localStorageService.getItem<string[]>(CUSTOMER_LIST_KEY, []);
  const newIds: string[] = [];
  
  // Process each customer
  customers.forEach(customer => {
    const customerKey = getCustomerKey(customer.id);
    
    // Update timestamps
    const updatedCustomer = {
      ...customer,
      updatedAt: new Date().toISOString()
    };
    
    // Save to storage
    localStorageService.setItem(customerKey, updatedCustomer);
    
    // Track new IDs
    if (!existingIds.includes(customer.id)) {
      newIds.push(customer.id);
    }
  });
  
  // Update the customer list
  if (newIds.length > 0) {
    localStorageService.setItem(CUSTOMER_LIST_KEY, [...existingIds, ...newIds]);
  }
  
  return customers.length;
};

// Export all customers as JSON
export const exportCustomers = (): Customer[] => {
  return getAllCustomers();
};

// Clear all customer data
export const clearAllCustomers = (): boolean => {
  const customerIds = localStorageService.getItem<string[]>(CUSTOMER_LIST_KEY, []);
  
  // Remove each customer
  customerIds.forEach(id => {
    localStorageService.removeItem(getCustomerKey(id));
  });
  
  // Clear the list
  localStorageService.removeItem(CUSTOMER_LIST_KEY);
  
  return true;
};

// Get customers with upcoming renewals
export const getUpcomingRenewals = (days: number = 90): CustomerSummary[] => {
  const now = new Date();
  const futureDate = new Date(now.setDate(now.getDate() + days));
  
  return getCustomerSummaries().filter(customer => {
    const renewalDate = new Date(customer.renewalDate);
    return renewalDate <= futureDate && renewalDate >= new Date();
  });
};

// Get customers by health status
export const getCustomersByHealthStatus = (status: string): CustomerSummary[] => {
  return getCustomerSummaries().filter(customer => 
    customer.healthStatus === status
  );
};

// Export the service as a single object
const customerService = {
  getAllCustomers,
  getCustomerSummaries,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  importCustomers,
  exportCustomers,
  clearAllCustomers,
  getUpcomingRenewals,
  getCustomersByHealthStatus
};

export default customerService;