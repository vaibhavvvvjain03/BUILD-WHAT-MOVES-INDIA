export interface StateData {
  id: string;
  name: string;
  isContactlessAvailable: boolean;
  requiresPhysicalVisit: boolean;
  servicesAvailable: string[]; // List of service IDs
}

export const states: Record<string, StateData> = {
  'ap': { id: 'ap', name: 'Andhra Pradesh', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'ar': { id: 'ar', name: 'Arunachal Pradesh', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'as': { id: 'as', name: 'Assam', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'br': { id: 'br', name: 'Bihar', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'cg': { id: 'cg', name: 'Chhattisgarh', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'ga': { id: 'ga', name: 'Goa', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'gj': { id: 'gj', name: 'Gujarat', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'hr': { id: 'hr', name: 'Haryana', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'hp': { id: 'hp', name: 'Himachal Pradesh', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'jh': { id: 'jh', name: 'Jharkhand', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'ka': { id: 'ka', name: 'Karnataka', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'kl': { id: 'kl', name: 'Kerala', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'mp': { id: 'mp', name: 'Madhya Pradesh', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'mh': { id: 'mh', name: 'Maharashtra', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'mn': { id: 'mn', name: 'Manipur', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'ml': { id: 'ml', name: 'Meghalaya', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'mz': { id: 'mz', name: 'Mizoram', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'nl': { id: 'nl', name: 'Nagaland', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'or': { id: 'or', name: 'Odisha', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'pb': { id: 'pb', name: 'Punjab', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'rj': { id: 'rj', name: 'Rajasthan', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'sk': { id: 'sk', name: 'Sikkim', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'tn': { id: 'tn', name: 'Tamil Nadu', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'ts': { id: 'ts', name: 'Telangana', isContactlessAvailable: false, requiresPhysicalVisit: true, servicesAvailable: ['dl-renewal', 'pay-challan'] },
  'tr': { id: 'tr', name: 'Tripura', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'up': { id: 'up', name: 'Uttar Pradesh', isContactlessAvailable: false, requiresPhysicalVisit: true, servicesAvailable: ['dl-renewal', 'transfer-ownership'] },
  'uk': { id: 'uk', name: 'Uttarakhand', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'wb': { id: 'wb', name: 'West Bengal', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'dl': { id: 'dl', name: 'Delhi', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'ch': { id: 'ch', name: 'Chandigarh', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'dn': { id: 'dn', name: 'Dadra and Nagar Haveli and Daman and Diu', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'jk': { id: 'jk', name: 'Jammu and Kashmir', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'la': { id: 'la', name: 'Ladakh', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] },
  'py': { id: 'py', name: 'Puducherry', isContactlessAvailable: true, requiresPhysicalVisit: false, servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'] }
};

export const allStatesList = Object.values(states).sort((a, b) => a.name.localeCompare(b.name));
