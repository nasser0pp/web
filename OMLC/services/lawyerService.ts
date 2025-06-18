
import { Lawyer, LawFirm, PracticeArea, Governorate, SearchResultItem, SearchFilters } from '../types';
import { DEFAULT_PROFILE_IMAGE, DEFAULT_FIRM_LOGO, FIRESTORE_COLLECTIONS } from '../constants';
import { getAllLawyerProfiles, getUserProfile } from './profileService'; // Import Firestore profile functions
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';


// Mock firms data - will be replaced or supplemented by Firestore if firms become user-managed
const mockLawFirms: LawFirm[] = [
  {
    id: 'firm1',
    nameAr: 'شركة الزدجالي وشركاه للمحاماة',
    nameEn: 'Al Zadjali & Partners Law Firm',
    logoUrl: `https://picsum.photos/seed/alzadjali/200/100`,
    officePhotosUrls: [`https://picsum.photos/seed/office1/600/400`, `https://picsum.photos/seed/office2/600/400`],
    address: '123 Business Bay, Ruwi, Muscat',
    governorate: Governorate.MUSCAT,
    contact: { phone: '+96824000000', email: 'info@alzadjali.com', whatsapp: '96899001122' },
    websiteUrl: 'https://www.alzadjali-law.om',
    descriptionAr: 'نحن شركة محاماة رائدة في سلطنة عمان، نقدم مجموعة كاملة من الخدمات القانونية للشركات والأفراد. فريقنا من المحامين ذوي الخبرة ملتزمون بتحقيق أفضل النتائج لعملائنا.',
    descriptionEn: 'A leading law firm in Oman, providing a full range of legal services to businesses and individuals. Our experienced team is dedicated to achieving the best outcomes for our clients.',
    specializations: [PracticeArea.CORPORATE_COMMERCIAL, PracticeArea.LITIGATION_DISPUTE_RESOLUTION, PracticeArea.REAL_ESTATE_CONSTRUCTION, PracticeArea.ARBITRATION_MEDIATION],
    // Lawyers associated with firms would ideally be references to UIDs from the 'lawyers' collection
    lawyers: [/* Example: { uid: 'some-lawyer-uid', ... (summary data) } */], 
    isFeatured: true,
    foundedYear: 1995,
  },
  {
    id: 'firm2',
    nameAr: 'مكتب البادي للاستشارات القانونية',
    nameEn: 'Al Badi Legal Consultants',
    logoUrl: DEFAULT_FIRM_LOGO,
    address: 'Sohar Gate, Sohar, Al Batinah North',
    governorate: Governorate.AL_BATINAH_NORTH,
    contact: { phone: '+96826001111', email: 'contact@albadi-legal.om' },
    websiteUrl: 'https://www.albadi-legal.om',
    descriptionAr: 'مكتب متخصص في قانون العمل والملكية الفكرية. نقدم حلولاً قانونية عملية وفعالة.',
    descriptionEn: 'Specialized firm in labor law and intellectual property. We offer practical and effective legal solutions.',
    specializations: [PracticeArea.LABOR_EMPLOYMENT, PracticeArea.INTELLECTUAL_PROPERTY, PracticeArea.TECHNOLOGY_DATA_PRIVACY],
    isFeatured: false,
    foundedYear: 2010,
  }
];

// Get Lawyer by ID (UID from Firestore)
export const getLawyerById = async (id: string): Promise<Lawyer | undefined> => {
  return await getUserProfile(id) || undefined; // ID is UID for lawyers from Firestore
};

export const getLawFirms = async (): Promise<LawFirm[]> => {
  // This would fetch from a 'firms' collection in Firestore if they were user-managed
  return new Promise(resolve => setTimeout(() => resolve(mockLawFirms), 500));
};

export const getLawFirmById = async (id: string): Promise<LawFirm | undefined> => {
  // This would fetch from a 'firms' collection by firm ID
  return new Promise(resolve => setTimeout(() => resolve(mockLawFirms.find(f => f.id === id)), 300));
};

export const searchProfessionals = async (
    filters: SearchFilters, 
    pageLimit: number = 10, 
    lastVisible?: QueryDocumentSnapshot<DocumentData>
): Promise<{results: SearchResultItem[], lastDoc: QueryDocumentSnapshot<DocumentData> | null}> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate some base delay

  let lawyerResults: SearchResultItem[] = [];
  let firmResults: SearchResultItem[] = [];
  let newLastVisibleLawyerDoc: QueryDocumentSnapshot<DocumentData> | null = null;

  // Fetch lawyers from Firestore
  const { profiles: firestoreLawyerProfiles, lastDoc } = await getAllLawyerProfiles(
      filters.practiceArea === '' ? undefined : filters.practiceArea,
      filters.governorate === '' ? undefined : filters.governorate,
      filters.searchTerm,
      filters.language,
      filters.minExperience,
      false, // Not filtering by 'featured' at this specific call, as it's part of sorting
      pageLimit,
      lastVisible
  );
  lawyerResults = firestoreLawyerProfiles;
  newLastVisibleLawyerDoc = lastDoc;


  // Filter and add firms (still from mock data)
  let currentMockFirms = [...mockLawFirms];
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    currentMockFirms = currentMockFirms.filter(firm =>
      firm.nameEn.toLowerCase().includes(term) ||
      firm.nameAr.toLowerCase().includes(term) || // Arabic search needs improvement
      firm.descriptionEn.toLowerCase().includes(term) ||
      firm.descriptionAr.toLowerCase().includes(term)
    );
  }
  if (filters.practiceArea) {
    currentMockFirms = currentMockFirms.filter(firm => firm.specializations.includes(filters.practiceArea!));
  }
  if (filters.governorate) {
    currentMockFirms = currentMockFirms.filter(firm => firm.governorate === filters.governorate);
  }
  // Language and MinExperience filters primarily apply to lawyers from Firestore

  firmResults = currentMockFirms.map(firm => ({
    type: 'firm',
    id: firm.id,
    nameEn: firm.nameEn,
    nameAr: firm.nameAr,
    photoUrl: firm.logoUrl || DEFAULT_FIRM_LOGO,
    summaryEn: firm.descriptionEn.substring(0, 100) + '...',
    summaryAr: firm.descriptionAr.substring(0, 100) + '...',
    specializations: firm.specializations,
    location: firm.governorate,
    isFeatured: firm.isFeatured,
    contact: firm.contact,
  }));
  
  // Combine and sort
  // For now, if searchTerm or specific lawyer filters are active, prioritize lawyer results.
  // A more sophisticated search would interleave results based on relevance.
  let combinedResults = [...lawyerResults, ...firmResults];

  // Sort by featured status first, then by name
  combinedResults.sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return a.nameEn.localeCompare(b.nameEn);
  });
  
  // Simple pagination logic: If we only fetched lawyers, the lastDoc is for lawyers.
  // If we fetched firms too, pagination becomes more complex if not handled by a unified backend search.
  // For now, assuming pagination is primarily driven by lawyer results from Firestore.
  return { results: combinedResults.slice(0, pageLimit), lastDoc: newLastVisibleLawyerDoc };
};


export const getFeaturedProfessionals = async (limit: number = 4): Promise<SearchResultItem[]> => {
  // Fetch featured lawyers from Firestore
  const { profiles: featuredLawyers } = await getAllLawyerProfiles(undefined, undefined, undefined, undefined, undefined, true, limit);
  
  // Get featured firms (mock)
  const featuredFirmsMock = mockLawFirms.filter(f => f.isFeatured).map(firm => ({
    type: 'firm' as 'firm',
    id: firm.id,
    nameEn: firm.nameEn,
    nameAr: firm.nameAr,
    photoUrl: firm.logoUrl || DEFAULT_FIRM_LOGO,
    summaryEn: firm.descriptionEn.substring(0, 100) + '...',
    summaryAr: firm.descriptionAr.substring(0, 100) + '...',
    specializations: firm.specializations,
    location: firm.governorate,
    isFeatured: firm.isFeatured,
    contact: firm.contact,
  }));

  const combined = [...featuredLawyers, ...featuredFirmsMock];
  combined.sort((a, b) => a.nameEn.localeCompare(b.nameEn)); // Simple sort
  return combined.slice(0, limit);
};
