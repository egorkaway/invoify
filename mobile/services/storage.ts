import AsyncStorage from '@react-native-async-storage/async-storage';
import { InvoiceType } from '@/shared/types';

const INVOICES_KEY = 'invoices';

export const storageService = {
  /**
   * Save an invoice to local storage
   */
  async saveInvoice(invoice: InvoiceType): Promise<boolean> {
    try {
      const invoices = await this.getAllInvoices();
      invoices.push(invoice);
      await AsyncStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
      return true;
    } catch (error) {
      console.error('Error saving invoice:', error);
      return false;
    }
  },

  /**
   * Get all saved invoices
   */
  async getAllInvoices(): Promise<InvoiceType[]> {
    try {
      const data = await AsyncStorage.getItem(INVOICES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading invoices:', error);
      return [];
    }
  },

  /**
   * Get a specific invoice by invoice number
   */
  async getInvoiceByNumber(invoiceNumber: string): Promise<InvoiceType | null> {
    try {
      const invoices = await this.getAllInvoices();
      return invoices.find(inv => inv.details.invoiceNumber === invoiceNumber) || null;
    } catch (error) {
      console.error('Error getting invoice:', error);
      return null;
    }
  },

  /**
   * Delete an invoice
   */
  async deleteInvoice(invoiceNumber: string): Promise<boolean> {
    try {
      const invoices = await this.getAllInvoices();
      const filtered = invoices.filter(inv => inv.details.invoiceNumber !== invoiceNumber);
      await AsyncStorage.setItem(INVOICES_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting invoice:', error);
      return false;
    }
  },

  /**
   * Clear all invoices
   */
  async clearAllInvoices(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(INVOICES_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing invoices:', error);
      return false;
    }
  },
};
