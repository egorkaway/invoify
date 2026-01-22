// Standalone type definitions for mobile app
// These mirror the types from the main project but don't depend on external imports

export interface ItemType {
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceSender {
  name: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  customInputs?: Array<{ key: string; value: string }>;
}

export interface InvoiceReceiver {
  name: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  customInputs?: Array<{ key: string; value: string }>;
}

export interface PaymentInformation {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface DiscountDetails {
  amount: number;
  amountType: string;
}

export interface TaxDetails {
  amount: number;
  taxID: string;
  amountType: string;
}

export interface ShippingDetails {
  cost: number;
  costType: string;
}

export interface Signature {
  data: string;
  fontFamily?: string;
}

export interface InvoiceDetails {
  invoiceLogo?: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  purchaseOrderNumber?: string;
  currency: string;
  language: string;
  items: ItemType[];
  paymentInformation?: PaymentInformation;
  taxDetails?: TaxDetails;
  discountDetails?: DiscountDetails;
  shippingDetails?: ShippingDetails;
  subTotal: number;
  totalAmount: number;
  totalAmountInWords: string;
  additionalNotes?: string;
  paymentTerms: string;
  signature?: Signature;
  updatedAt?: string;
  pdfTemplate: number;
}

export interface InvoiceType {
  sender: InvoiceSender;
  receiver: InvoiceReceiver;
  details: InvoiceDetails;
}

export type CurrencyType = {
  [currencyCode: string]: string;
};

export interface CurrencyDetails {
  currency: string;
  decimals: number;
  beforeDecimal: string | null;
  afterDecimal: string | null;
}

export interface SignatureColor {
  name: string;
  label: string;
  color: string;
}

export interface SignatureFont {
  name: string;
  variable: string;
}

export enum SignatureTabs {
  DRAW = "draw",
  TYPE = "type",
  UPLOAD = "upload",
}

export interface WizardStepType {
  id: number;
  label: string;
  isValid?: boolean;
}

export enum ExportTypes {
  JSON = "JSON",
  CSV = "CSV",
  XML = "XML",
  XLSX = "XLSX",
  DOCX = "DOCX",
}
