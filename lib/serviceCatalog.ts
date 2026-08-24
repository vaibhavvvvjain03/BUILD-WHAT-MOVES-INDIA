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
  'Driving Licence Services',
  'Vehicle & RC Services',
  'Tax & Payments',
  'Permits & Fitness',
  'Other Services',
];

const generatePreview = (id: string, name: string, category: string, shortDescription: string): ServiceDetail => ({
  id,
  name,
  shortDescription,
  category,
  eligibility: ['Standard eligibility rules apply'],
  documentsRequired: [{ name: 'Standard Documents', type: 'required' }],
  fees: { amount: 'Variable', description: 'Subject to specific service rules' },
  estimatedTime: 'Approx. 10-15 minutes',
  rtoVisitRequired: 'may-require-visit',
  regionalAvailability: { status: 'available' },
  prerequisites: ['Ensure your mobile number is linked to Aadhaar'],
  processSteps: [
    { id: 1, title: 'Authentication', description: 'Authenticate via Aadhaar.' },
    { id: 2, title: 'Fill Form', description: 'Provide necessary details.' },
    { id: 3, title: 'Upload Docs', description: 'Upload required documents.' },
    { id: 4, title: 'Payment', description: 'Pay the processing fee.' },
  ],
  availabilityState: 'preview',
});

export const serviceCatalog: Record<string, ServiceDetail> = {
  'dl-renewal': {
    id: 'dl-renewal',
    name: 'Renew Driving Licence',
    shortDescription: 'Apply for the renewal of your existing Driving Licence online.',
    category: 'Driving Licence Services',
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
    name: 'Transfer of Ownership',
    shortDescription: 'Transfer the ownership of a vehicle to another person.',
    category: 'Vehicle & RC Services',
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
    name: 'Pay Traffic Challan (e-Challan)',
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
    category: 'Vehicle & RC Services',
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
  'change-address-dl': {
    id: 'change-address-dl',
    name: 'Change of Address (DL)',
    shortDescription: 'Update your residential address in your Driving Licence.',
    category: 'Driving Licence Services',
    eligibility: [
      'Holder of valid DL',
    ],
    documentsRequired: [
      { name: 'New Address Proof', type: 'required' },
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
      { id: 1, title: 'Select Document', description: 'Choose DL for update.' },
      { id: 2, title: 'Enter Details', description: 'Provide new address details.' },
      { id: 3, title: 'Upload Proof', description: 'Upload valid address proof.' },
      { id: 4, title: 'Payment', description: 'Pay the update fee.' },
    ],
    availabilityState: 'preview',
  },
  
  // Driving Licence Services (Generated Previews)
  'learners-licence': generatePreview('learners-licence', 'Apply for Learner\'s Licence', 'Driving Licence Services', 'Start your driving journey by applying for a new Learner\'s Licence.'),
  'driving-licence': generatePreview('driving-licence', 'Apply for Driving Licence', 'Driving Licence Services', 'Apply for a permanent Driving Licence after completing your learning period.'),
  'duplicate-dl': generatePreview('duplicate-dl', 'Duplicate Driving Licence', 'Driving Licence Services', 'Apply for a duplicate Driving Licence if yours is lost or damaged.'),
  'add-class-of-vehicle': generatePreview('add-class-of-vehicle', 'Add Vehicle Class to Licence', 'Driving Licence Services', 'Endorse a new class of vehicle on your existing Driving Licence.'),
  'international-driving-permit': generatePreview('international-driving-permit', 'International Driving Permit', 'Driving Licence Services', 'Apply for a permit to drive vehicles in foreign countries.'),
  'dl-extract': generatePreview('dl-extract', 'Driving Licence Status/Extract', 'Driving Licence Services', 'View or download an extract of your Driving Licence details.'),
  'driving-school-licence': generatePreview('driving-school-licence', 'Driving School Licence Application', 'Driving Licence Services', 'Apply for or renew a licence to operate a motor driving school.'),

  // Vehicle & RC Services (Generated Previews)
  'new-vehicle-registration': generatePreview('new-vehicle-registration', 'New Vehicle Registration', 'Vehicle & RC Services', 'Register a newly purchased vehicle with the RTO.'),
  'rc-renewal': generatePreview('rc-renewal', 'RC Renewal', 'Vehicle & RC Services', 'Renew your vehicle\'s Registration Certificate after 15 years.'),
  'change-address-rc': generatePreview('change-address-rc', 'Change of Address (RC)', 'Vehicle & RC Services', 'Update the address on your vehicle\'s Registration Certificate.'),
  'hypothecation': generatePreview('hypothecation', 'Hypothecation Addition/Termination', 'Vehicle & RC Services', 'Add or remove a loan lien (hypothecation) on your vehicle.'),
  'noc': generatePreview('noc', 'NOC (No Objection Certificate)', 'Vehicle & RC Services', 'Apply for an NOC to move your vehicle to another state.'),
  'hsrp': generatePreview('hsrp', 'HSRP Number Plate Application', 'Vehicle & RC Services', 'Apply for a High Security Registration Plate for your vehicle.'),
  'vehicle-details': generatePreview('vehicle-details', 'Vehicle/Owner Details Lookup', 'Vehicle & RC Services', 'Search and view details of a registered vehicle and its owner.'),

  // Tax & Payments (Generated Previews)
  'road-tax': generatePreview('road-tax', 'Road Tax Payment', 'Tax & Payments', 'Pay your vehicle\'s road tax online.'),
  'challan-status': generatePreview('challan-status', 'Check Challan Status', 'Tax & Payments', 'Check the status of your traffic violation challans.'),
  'fee-reference': generatePreview('fee-reference', 'Fee & User Charges Reference', 'Tax & Payments', 'View the official fee structure for various RTO services.'),

  // Permits & Fitness (Generated Previews)
  'national-permit': generatePreview('national-permit', 'National Permit', 'Permits & Fitness', 'Apply for a permit to operate commercial vehicles across India.'),
  'state-permit': generatePreview('state-permit', 'State Permit', 'Permits & Fitness', 'Apply for a permit to operate commercial vehicles within a state.'),
  'permit-renewal': generatePreview('permit-renewal', 'Permit Renewal', 'Permits & Fitness', 'Renew your existing commercial vehicle permits.'),
  'fitness-certificate': generatePreview('fitness-certificate', 'Vehicle Fitness Certificate', 'Permits & Fitness', 'Apply for or renew a fitness certificate for your vehicle.'),
  'fitness-inspection': generatePreview('fitness-inspection', 'Fitness Inspection Scheduling', 'Permits & Fitness', 'Schedule an appointment for your vehicle\'s fitness inspection.'),

  // Other Services (Generated Previews)
  'fancy-number': generatePreview('fancy-number', 'Fancy Number Allocation/Booking', 'Other Services', 'Participate in auction or book a fancy registration number.'),
  'pucc': generatePreview('pucc', 'PUCC (Pollution Under Control Certificate)', 'Other Services', 'Check and download your vehicle\'s pollution certificate details.'),
  'rto-appointment': generatePreview('rto-appointment', 'RTO Appointment Booking', 'Other Services', 'Book an appointment to visit your local RTO office.'),
  'digital-document': generatePreview('digital-document', 'Digital Document Access', 'Other Services', 'Link and access your documents via DigiLocker or mParivahan.'),
};


export function getServicesByCategory(category: string): ServiceDetail[] {
  return Object.values(serviceCatalog).filter(s => s.category === category);
}

export function getAllServices(): ServiceDetail[] {
  return Object.values(serviceCatalog);
}
