export type ServiceAvailability = 'implemented' | 'preview' | 'coming-soon';
export type RtoVisitStatus = 'online' | 'may-require-visit' | 'required';
export type DocumentRequirementType = 'required' | 'conditional' | 'optional';

export interface DocumentRequirement {
  name: string;
  type: DocumentRequirementType;
  condition?: string;
}

export interface FeeStructure {
  amount: string;
  description?: string;
  calculatedByBackend?: boolean;
}

export interface RegionalAvailability {
  status: 'available' | 'limited' | 'not-available';
  states?: string[];
  rtos?: string[];
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

export interface ServiceDetail {
  id: string;
  name: string;
  shortDescription: string;
  category: string;
  eligibility: string[];
  documentsRequired: DocumentRequirement[];
  fees: FeeStructure;
  estimatedTime: string;
  rtoVisitRequired: RtoVisitStatus;
  regionalAvailability: RegionalAvailability;
  prerequisites: string[];
  processSteps: ProcessStep[];
  availabilityState: ServiceAvailability;
}

export const serviceCategories = [
  'Driving Licence',
  'Vehicle & RC',
  'Tax & Payments',
  'Permits & Commercial',
  'Appointments',
  'Applications & Documents',
  'Other Services',
];

export const serviceCatalog: Record<string, ServiceDetail> = {
  'dl-renewal': {
    id: 'dl-renewal',
    name: 'Renew Driving Licence',
    shortDescription: 'Apply for the renewal of your existing Driving Licence online.',
    category: 'Driving Licence',
    eligibility: [
      'Holder of a valid Indian Driving Licence',
      'Licence is expired or expiring within 1 year',
    ],
    documentsRequired: [
      { name: 'Current Driving Licence', type: 'required' },
      { name: 'Proof of Address', type: 'required' },
      { name: 'Form 1A (Medical Certificate)', type: 'conditional', condition: 'Required if above 40 years of age' },
    ],
    fees: { amount: '₹200', description: 'Base renewal fee (additional late fees may apply)' },
    estimatedTime: 'Approx. 10-15 minutes online',
    rtoVisitRequired: 'online',
    regionalAvailability: {
      status: 'available',
      states: ['All States (Mock: Karnataka enabled)'],
    },
    prerequisites: [
      'Ensure your mobile number is linked to Aadhaar',
      'Keep scanned copies of required documents ready (JPEG/PDF, max 2MB)',
    ],
    processSteps: [
      { id: 1, title: 'Select State', description: 'Choose your state of residence.' },
      { id: 2, title: 'Verify Identity', description: 'Enter your DL number and date of birth.' },
      { id: 3, title: 'Review Details', description: 'Verify your existing licence details.' },
      { id: 4, title: 'Upload Documents', description: 'Upload required documents and Form 1A if applicable.' },
      { id: 5, title: 'Payment', description: 'Pay the renewal fee securely.' },
    ],
    availabilityState: 'implemented',
  },
  'transfer-ownership': {
    id: 'transfer-ownership',
    name: 'Transfer Vehicle Ownership',
    shortDescription: 'Transfer the ownership of a vehicle to another person.',
    category: 'Vehicle & RC',
    eligibility: [
      'Registered owner of the vehicle',
      'Buyer and seller must have valid ID proofs',
    ],
    documentsRequired: [
      { name: 'Form 29 & Form 30', type: 'required' },
      { name: 'Original RC', type: 'required' },
      { name: 'Valid Insurance', type: 'required' },
      { name: 'PUC Certificate', type: 'required' },
      { name: 'Address proof of buyer', type: 'required' },
      { name: 'NOC from financier', type: 'conditional', condition: 'If vehicle is under hypothecation' }
    ],
    fees: { amount: 'Variable', calculatedByBackend: true, description: 'Calculated based on vehicle type and state rules' },
    estimatedTime: 'Approx. 20 minutes online',
    rtoVisitRequired: 'may-require-visit',
    regionalAvailability: {
      status: 'limited',
      states: ['Delhi', 'Haryana', 'Karnataka'],
    },
    prerequisites: [
      'Both buyer and seller require Aadhaar linked mobile numbers for e-Signature',
      'Vehicle must not have pending challans or blacklists',
    ],
    processSteps: [
      { id: 1, title: 'Enter Details', description: 'Provide vehicle registration details.' },
      { id: 2, title: 'Aadhaar Auth', description: 'Authenticate buyer and seller via Aadhaar.' },
      { id: 3, title: 'Upload Forms', description: 'Upload signed Form 29 and 30.' },
      { id: 4, title: 'Payment', description: 'Pay the transfer fee.' },
      { id: 5, title: 'RTO Visit', description: 'Visit RTO for document verification if required.' },
    ],
    availabilityState: 'preview',
  },
  'pay-challan': {
    id: 'pay-challan',
    name: 'Pay Traffic Challan',
    shortDescription: 'Check and pay pending traffic fines against your vehicle or licence.',
    category: 'Tax & Payments',
    eligibility: [
      'Anyone with the Challan Number, Vehicle Number, or DL Number',
    ],
    documentsRequired: [
      { name: 'Challan details or Vehicle Registration details', type: 'required' },
    ],
    fees: { amount: 'As per challan', calculatedByBackend: true },
    estimatedTime: '5 minutes',
    rtoVisitRequired: 'online',
    regionalAvailability: {
      status: 'available',
    },
    prerequisites: [
      'Keep your debit/credit card or UPI app ready for payment',
    ],
    processSteps: [
      { id: 1, title: 'Search Challan', description: 'Enter Challan No / Vehicle No.' },
      { id: 2, title: 'View Details', description: 'Review the violation details.' },
      { id: 3, title: 'Make Payment', description: 'Pay the fine securely online.' },
      { id: 4, title: 'Download Receipt', description: 'Save your payment receipt.' },
    ],
    availabilityState: 'preview',
  },
  'duplicate-rc': {
    id: 'duplicate-rc',
    name: 'Duplicate RC',
    shortDescription: 'Apply for a duplicate Registration Certificate if lost or damaged.',
    category: 'Vehicle & RC',
    eligibility: [
      'Registered owner of the vehicle',
      'RC must be lost, torn, or mutilated',
    ],
    documentsRequired: [
      { name: 'Police FIR', type: 'conditional', condition: 'Required if RC is lost' },
      { name: 'Mutilated RC', type: 'conditional', condition: 'Required if RC is damaged/torn' },
      { name: 'Form 26', type: 'required' },
      { name: 'Valid Insurance & PUC', type: 'required' },
    ],
    fees: { amount: 'Variable', calculatedByBackend: true, description: 'Depends on vehicle class' },
    estimatedTime: 'Approx. 15 minutes online',
    rtoVisitRequired: 'may-require-visit',
    regionalAvailability: {
      status: 'available',
    },
    prerequisites: [
      'File a police report online if the RC is lost before starting this application',
    ],
    processSteps: [
      { id: 1, title: 'Authentication', description: 'Aadhaar based authentication.' },
      { id: 2, title: 'Enter Reason', description: 'Specify reason for duplicate RC.' },
      { id: 3, title: 'Upload Docs', description: 'Upload FIR copy or damaged RC.' },
      { id: 4, title: 'Payment', description: 'Pay the processing fee.' },
    ],
    availabilityState: 'preview',
  },
  'change-address': {
    id: 'change-address',
    name: 'Change of Address in DL/RC',
    shortDescription: 'Update your residential address in your Driving Licence or RC.',
    category: 'Driving Licence',
    eligibility: [
      'Holder of valid DL or RC',
    ],
    documentsRequired: [
      { name: 'New Address Proof', type: 'required' },
      { name: 'Form 33', type: 'conditional', condition: 'Required for RC address change' },
    ],
    fees: { amount: 'Variable', calculatedByBackend: true },
    estimatedTime: 'Approx. 15 minutes',
    rtoVisitRequired: 'online',
    regionalAvailability: {
      status: 'available',
    },
    prerequisites: [
      'Ensure the new address proof matches exactly with your inputted address',
    ],
    processSteps: [
      { id: 1, title: 'Select Document', description: 'Choose DL or RC for update.' },
      { id: 2, title: 'Enter Details', description: 'Provide new address details.' },
      { id: 3, title: 'Upload Proof', description: 'Upload valid address proof.' },
      { id: 4, title: 'Payment', description: 'Pay the update fee.' },
    ],
    availabilityState: 'preview',
  },
};

export function getServicesByCategory(category: string): ServiceDetail[] {
  return Object.values(serviceCatalog).filter(s => s.category === category);
}

export function getAllServices(): ServiceDetail[] {
  return Object.values(serviceCatalog);
}
