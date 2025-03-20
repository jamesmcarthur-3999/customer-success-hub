/**
 * Hooks for customer data operations
 * Uses React Query for data fetching, caching, and state management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Customer, CustomerSummary } from '../types/customer';
import customerService from '../services/customerService';

// Hook for fetching all customers
export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => customerService.getAllCustomers(),
  });
};

// Hook for fetching customer summaries (for dashboard)
export const useCustomerSummaries = () => {
  return useQuery({
    queryKey: ['customerSummaries'],
    queryFn: () => customerService.getCustomerSummaries(),
  });
};

// Hook for fetching a single customer by ID
export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => customerService.getCustomerById(id),
    enabled: !!id, // Only run the query if ID is provided
  });
};

// Hook for creating a new customer
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => 
      customerService.createCustomer(customerData),
    onSuccess: () => {
      // Invalidate the customers and summaries queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customerSummaries'] });
    },
  });
};

// Hook for updating an existing customer
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (customer: Customer) => customerService.updateCustomer(customer),
    onSuccess: (updatedCustomer) => {
      // Update the cache for this specific customer
      queryClient.setQueryData(['customer', updatedCustomer.id], updatedCustomer);
      // Invalidate the customers and summaries queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customerSummaries'] });
    },
  });
};

// Hook for deleting a customer
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => customerService.deleteCustomer(id),
    onSuccess: (_, id) => {
      // Remove deleted customer from cache
      queryClient.removeQueries({ queryKey: ['customer', id] });
      // Invalidate the customers and summaries queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customerSummaries'] });
    },
  });
};

// Hook for getting upcoming renewals
export const useUpcomingRenewals = (days: number = 90) => {
  return useQuery({
    queryKey: ['upcomingRenewals', days],
    queryFn: () => customerService.getUpcomingRenewals(days),
  });
};

// Hook for getting customers by health status
export const useCustomersByHealthStatus = (status: string) => {
  return useQuery({
    queryKey: ['customersByHealthStatus', status],
    queryFn: () => customerService.getCustomersByHealthStatus(status),
    enabled: !!status, // Only run if status is provided
  });
};