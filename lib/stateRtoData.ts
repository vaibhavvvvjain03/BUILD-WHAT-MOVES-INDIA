export interface StateData {
  id: string;
  name: string;
  isContactlessAvailable: boolean;
  requiresPhysicalVisit: boolean;
  servicesAvailable: string[]; // List of service IDs
}

export const states: Record<string, StateData> = {
  'ka': {
    id: 'ka',
    name: 'Karnataka',
    isContactlessAvailable: true,
    requiresPhysicalVisit: false,
    servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'],
  },
  'dl': {
    id: 'dl',
    name: 'Delhi',
    isContactlessAvailable: true,
    requiresPhysicalVisit: false,
    servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'],
  },
  'mh': {
    id: 'mh',
    name: 'Maharashtra',
    isContactlessAvailable: true,
    requiresPhysicalVisit: false,
    servicesAvailable: ['dl-renewal', 'transfer-ownership', 'pay-challan', 'duplicate-rc', 'change-address'],
  },
  'ts': {
    id: 'ts',
    name: 'Telangana',
    isContactlessAvailable: false,
    requiresPhysicalVisit: true,
    servicesAvailable: ['dl-renewal', 'pay-challan'],
  },
  'up': {
    id: 'up',
    name: 'Uttar Pradesh',
    isContactlessAvailable: false,
    requiresPhysicalVisit: true,
    servicesAvailable: ['dl-renewal', 'transfer-ownership'],
  }
};

export const allStatesList = Object.values(states).sort((a, b) => a.name.localeCompare(b.name));
