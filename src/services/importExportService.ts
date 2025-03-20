/**
 * Import/Export Service
 * Utilities for importing and exporting customer data in various formats
 */

import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Customer, CustomerSummary } from '../types/customer';
import customerService from './customerService';

// Export customers to CSV
export const exportToCSV = (customers: CustomerSummary[] | Customer[], filename = 'customers.csv') => {
  const csv = Papa.unparse(customers);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
  return true;
};

// Export customers to JSON
export const exportToJSON = (customers: CustomerSummary[] | Customer[], filename = 'customers.json') => {
  const json = JSON.stringify(customers, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  saveAs(blob, filename);
  return true;
};

// Import customers from CSV
export const importFromCSV = async (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        try {
          // Transform the parsed data to match our Customer schema
          // This is a simplification - real implementation would need more robust transformation
          const transformedData = results.data.map((item: any) => {
            // Basic validation and transformation could be done here
            return item as Customer;
          }).filter(Boolean);
          
          const importCount = customerService.importCustomers(transformedData);
          resolve(importCount);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Import customers from JSON
export const importFromJSON = async (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedCustomers = JSON.parse(content) as Customer[];
        const importCount = customerService.importCustomers(importedCustomers);
        resolve(importCount);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsText(file);
  });
};

// Export a single customer as PDF
export const exportToPDF = (customer: Customer, filename = 'customer.pdf'): boolean => {
  try {
    // This is a placeholder - in a real implementation, we would use jsPDF or another PDF library
    console.log('PDF export not yet implemented');
    return true;
  } catch (error) {
    console.error('Failed to export customer to PDF:', error);
    return false;
  }
};

// Export all methods as a single service object
const importExportService = {
  exportToCSV,
  exportToJSON,
  exportToPDF,
  importFromCSV,
  importFromJSON,
};

export default importExportService;