
export enum PracticeArea {
  CORPORATE_COMMERCIAL = "Corporate & Commercial Law",
  BANKING_FINANCE = "Banking & Finance Law",
  LITIGATION_DISPUTE_RESOLUTION = "Litigation & Dispute Resolution",
  REAL_ESTATE_CONSTRUCTION = "Real Estate & Construction Law",
  LABOR_EMPLOYMENT = "Labor & Employment Law",
  FAMILY_SHARIA = "Family & Sharia Law",
  INTELLECTUAL_PROPERTY = "Intellectual Property Law",
  MARITIME_SHIPPING = "Maritime & Shipping Law",
  ENERGY_RENEWABLES = "Energy & Renewables Law",
  CRIMINAL_LAW = "Criminal Law",
  TECHNOLOGY_DATA_PRIVACY = "Technology & Data Privacy Law",
  ARBITRATION_MEDIATION = "Arbitration & Mediation",
  IMMIGRATION_LAW = "Immigration Law",
  ENVIRONMENTAL_LAW = "Environmental Law",
}

export enum Governorate {
  MUSCAT = "Muscat",
  DHOFAR = "Dhofar",
  MUSANDAM = "Musandam",
  AL_BURAIMI = "Al Buraimi",
  AD_DAKHILIYAH = "Ad Dakhiliyah",
  AL_BATINAH_NORTH = "Al Batinah North",
  AL_BATINAH_SOUTH = "Al Batinah South",
  ASH_SHARQIYAH_SOUTH = "Ash Sharqiyah South",
  ASH_SHARQIYAH_NORTH = "Ash Sharqiyah North",
  AD_DHAHIRAH = "Ad Dhahirah",
  AL_WUSTA = "Al Wusta",
}

export interface ContactDetails {
  phone: string;
  email: string;
  whatsapp?: string; // Optional WhatsApp number
}

export interface Lawyer {
  uid: string; // Firebase User ID, will also be Firestore document ID
  id: string; // Can be same as UID, or a separate public ID if needed. For simplicity, use UID.
  nameAr: string;
  nameEn: string;
  titleEn: string; // e.g., "Senior Partner", "Associate"
  titleAr: string;
  photoUrl?: string;
  experienceYears: number;
  educationAr: string[];
  educationEn: string[];
  barAdmissionOman: boolean;
  bioAr: string;
  bioEn: string;
  languagesSpoken: string[];
  contact: ContactDetails;
  specializations: PracticeArea[];
  firmId?: string; // Optional, if part of a firm listed on the platform
  isFeatured?: boolean; // For premium listings
  officeAddress?: string; // If individual practitioner with own office
  governorate?: Governorate; // If individual practitioner
}

export interface LawFirm {
  id: string; // Unique ID for the firm
  nameAr: string;
  nameEn: string;
  logoUrl?: string;
  officePhotosUrls?: string[];
  address: string;
  governorate: Governorate;
  contact: ContactDetails;
  websiteUrl?: string;
  descriptionAr: string;
  descriptionEn: string;
  specializations: PracticeArea[]; // Aggregated specializations of the firm
  lawyers?: Lawyer[]; // Embedded or IDs, for now embedded for simplicity in mock, consider IDs for Firestore
  isFeatured?: boolean; // For premium listings
  foundedYear?: number;
}

// For search results, we might combine lawyer and firm info
export interface SearchResultItem {
  type: 'lawyer' | 'firm';
  id: string; // UID for lawyers from Firestore, or firm ID
  nameEn: string;
  nameAr: string;
  photoUrl?: string; // firm logo or lawyer photo
  summaryEn: string;
  summaryAr: string;
  specializations: PracticeArea[];
  location: Governorate | string; // Firm's governorate or lawyer's office address
  isFeatured?: boolean;
  experienceYears?: number; // For lawyers
  contact?: ContactDetails; // Added to make contact details accessible
}

export interface SearchFilters {
  searchTerm?: string;
  practiceArea?: PracticeArea | '';
  governorate?: Governorate | '';
  language?: string;
  minExperience?: number;
}

export interface LanguageOption {
  code: string;
  name: string;
}

// For ManageProfilePage form state
export type LawyerProfileFormData = Omit<Lawyer, 'uid' | 'id' | 'isFeatured'> & {
  // isFeatured might be an admin-only field or part of subscription
  // UID and ID are handled by auth/system
  photoFile?: File | null; // For new photo uploads
};
