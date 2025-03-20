/**
 * Hooks for import/export operations
 * Uses React Query for state management and mutations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Customer, CustomerSummary } from '../types/customer';
import importExportService from '../services/importExportService';

// Hook for exporting data to CSV
export const useExportToCSV = () => {
  return useMutation({
    mutationFn: ({ 
      data, 
      filename = 'customers.csv' 
    }: { 
      data: CustomerSummary[] | Customer[], 
      filename?: string 
    }) => importExportService.exportToCSV(data, filename),
  });
};

// Hook for exporting data to JSON
export const useExportToJSON = () => {
  return useMutation({
    mutationFn: ({ 
      data, 
      filename = 'customers.json' 
    }: { 
      data: CustomerSummary[] | Customer[], 
      filename?: string 
    }) => importExportService.exportToJSON(data, filename),
  });
};

// Hook for exporting a customer to PDF
export const useExportToPDF = () => {
  return useMutation({
    mutationFn: ({ 
      customer, 
      filename = 'customer.pdf' 
    }: { 
      customer: Customer, 
      filename?: string 
    }) => importExportService.exportToPDF(customer, filename),
  });
};

// Hook for importing data from CSV
export const useImportFromCSV = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (file: File) => importExportService.importFromCSV(file),
    onSuccess: () => {
      // Invalidate queries to refresh data after import
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customerSummaries'] });
    },
  });
};

// Hook for importing data from JSON
export const useImportFromJSON = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (file: File) => importExportService.importFromJSON(file),
    onSuccess: () => {
      // Invalidate queries to refresh data after import
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customerSummaries'] });
    },
  });
};