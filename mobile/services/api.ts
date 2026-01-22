import axios from 'axios';
import { InvoiceType } from '@/shared/types';

// Configure your API base URL
// For development, use your local Next.js server
// For production, use your deployed Next.js API
const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://your-production-url.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds for PDF generation
});

export interface GeneratePdfResponse {
  success: boolean;
  pdf?: string; // Base64 encoded PDF
  error?: string;
}

export interface ExportInvoiceResponse {
  success: boolean;
  data?: string; // Base64 encoded file
  error?: string;
}

export interface SendEmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const invoiceApi = {
  /**
   * Generate PDF from invoice data
   */
  async generatePdf(invoice: InvoiceType): Promise<GeneratePdfResponse> {
    try {
      const response = await apiClient.post<GeneratePdfResponse>(
        '/invoice/generate',
        invoice
      );
      return response.data;
    } catch (error: any) {
      console.error('Error generating PDF:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to generate PDF',
      };
    }
  },

  /**
   * Export invoice in various formats (JSON, CSV, XML, XLSX)
   */
  async exportInvoice(
    invoice: InvoiceType,
    format: 'JSON' | 'CSV' | 'XML' | 'XLSX'
  ): Promise<ExportInvoiceResponse> {
    try {
      const response = await apiClient.post<ExportInvoiceResponse>(
        '/invoice/export',
        { invoice, format }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error exporting invoice:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to export invoice',
      };
    }
  },

  /**
   * Send PDF via email
   */
  async sendPdfToEmail(
    invoice: InvoiceType,
    recipientEmail: string
  ): Promise<SendEmailResponse> {
    try {
      const response = await apiClient.post<SendEmailResponse>(
        '/invoice/send',
        { invoice, recipientEmail }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to send email',
      };
    }
  },
};
