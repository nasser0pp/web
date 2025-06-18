import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc, collection, getDocs, query, where, limit, orderBy, startAfter, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Lawyer, SearchResultItem, Governorate, PracticeArea } from '../types';
import { FIRESTORE_COLLECTIONS, DEFAULT_PROFILE_IMAGE } from '../constants';

const lawyersCollectionRef = collection(db, FIRESTORE_COLLECTIONS.LAWYERS);

// Create or Update Lawyer Profile
export const createOrUpdateUserProfile = async (uid: string, profileData: Partial<Omit<Lawyer, 'uid' | 'id'>>): Promise<void> => {
  const profileRef = doc(db, FIRESTORE_COLLECTIONS.LAWYERS, uid);
  // Ensure 'id' and 'uid' are consistent if 'id' is part of profileData
  const dataToSet: Partial<Lawyer> = { 
    ...profileData, 
    uid: uid, 
    id: uid // Using UID as the primary ID for lawyers from Firestore
  };
  await setDoc(profileRef, dataToSet, { merge: true }); // Merge true to allow partial updates
};

// Get Lawyer Profile by UID
export const getUserProfile = async (uid: string): Promise<Lawyer | null> => {
  const profileRef = doc(db, FIRESTORE_COLLECTIONS.LAWYERS, uid);
  const docSnap = await getDoc(profileRef);
  if (docSnap.exists()) {
    return { uid: docSnap.id, id: docSnap.id, ...docSnap.data() } as Lawyer;
  }
  return null;
};

// Get all lawyer profiles (can be paginated or limited)
export const getAllLawyerProfiles = async (
    practiceArea?: PracticeArea | '',
    governorate?: Governorate | '',
    searchTerm?: string,
    language?: string,
    minExperience?: number,
    isFeatured?: boolean,
    pageLimit: number = 10,
    lastVisible?: QueryDocumentSnapshot<DocumentData>
): Promise<{profiles: SearchResultItem[], lastDoc: QueryDocumentSnapshot<DocumentData> | null}> => {
  
  let q = query(lawyersCollectionRef, orderBy("nameEn"), limit(pageLimit));

  // Note: Firestore requires composite indexes for complex queries involving multiple range/equality filters on different fields.
  // For simplicity here, some filters might be applied client-side after a broader fetch if not all combinations are indexed.
  // Or, structure data to support common queries (e.g. array of keywords for search).

  if (isFeatured) {
    q = query(q, where("isFeatured", "==", true));
  }
  if (practiceArea) {
    q = query(q, where("specializations", "array-contains", practiceArea));
  }
  if (governorate) {
    q = query(q, where("governorate", "==", governorate));
  }
  if (minExperience && minExperience > 0) {
     q = query(q, where("experienceYears", ">=", minExperience));
  }
  if (language) {
    // Firestore doesn't directly support case-insensitive 'contains' for strings in arrays.
    // This would typically be handled by having a separate field with lowercased languages or using a search service like Algolia.
    // For now, this filter will be less effective or might need client-side refinement.
    // q = query(q, where("languagesSpoken", "array-contains", language)); // This is case-sensitive and exact match
  }
   if (searchTerm) {
    // Firestore doesn't support partial text search natively.
    // This would typically be handled by:
    // 1. Creating an array of keywords in lowercase in each document.
    // 2. Using a third-party search service like Algolia or Typesense.
    // A simplified approach might filter by exact name matches if possible, or fetch more and filter client-side (not scalable).
    // q = query(q, where("nameEn", ">=", searchTerm), where("nameEn", "<=", searchTerm + '\uf8ff')); // Basic prefix search
  }


  if (lastVisible) {
    q = query(q, startAfter(lastVisible));
  }
  
  const querySnapshot = await getDocs(q);
  const profiles: SearchResultItem[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as Lawyer; // Assume data matches Lawyer structure
    profiles.push({
      type: 'lawyer',
      id: doc.id, // UID from Firestore
      nameEn: data.nameEn,
      nameAr: data.nameAr,
      photoUrl: data.photoUrl || DEFAULT_PROFILE_IMAGE,
      summaryEn: data.bioEn?.substring(0, 100) + '...' || '',
      summaryAr: data.bioAr?.substring(0, 100) + '...' || '',
      specializations: data.specializations || [],
      location: data.governorate || data.officeAddress || 'N/A',
      isFeatured: data.isFeatured || false,
      experienceYears: data.experienceYears,
      contact: data.contact,
    });
  });

  // Client-side filtering for searchTerm and language if not effectively handled by Firestore query
  let filteredProfiles = profiles;
  if (searchTerm) {
    const termLower = searchTerm.toLowerCase();
    filteredProfiles = filteredProfiles.filter(p => 
        p.nameEn.toLowerCase().includes(termLower) ||
        p.nameAr.toLowerCase().includes(termLower) || // This might not work well for Arabic without proper tokenization
        p.summaryEn.toLowerCase().includes(termLower) ||
        p.specializations.some(s => s.toLowerCase().includes(termLower))
    );
  }

  if (language) {
      const langLower = language.toLowerCase();
      const lawyerDataPromises = filteredProfiles.map(p => getUserProfile(p.id)); // Fetch full profiles for language check
      const fullLawyerData = (await Promise.all(lawyerDataPromises)).filter(Boolean) as Lawyer[];
      
      filteredProfiles = filteredProfiles.filter(p => {
          const lawyerDetail = fullLawyerData.find(ld => ld.id === p.id);
          return lawyerDetail?.languagesSpoken.some(l => l.toLowerCase().includes(langLower));
      });
  }


  const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { profiles: filteredProfiles, lastDoc: newLastVisible || null };
};
