export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
  propertyUpdates: boolean;
  createdAt: string;
}

export interface PropertyFilter {
  propertyType: string;
  priceRange: string;
  bedrooms: string;
  bathrooms: string;
}
