import { PracticeArea, Governorate, LanguageOption } from './types';

export const PRACTICE_AREAS_OPTIONS: PracticeArea[] = Object.values(PracticeArea);
export const GOVERNORATES_OPTIONS: Governorate[] = Object.values(Governorate);

export const LANGUAGES_SPOKEN_OPTIONS: LanguageOption[] = [
  { code: 'ar', name: 'Arabic (العربية)' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'ur', name: 'Urdu (اردو)' },
  { code: 'fr', name: 'French (Français)' },
  // Add more as needed
];

export const EXPERIENCE_YEARS_OPTIONS: number[] = [0, 1, 2, 3, 5, 7, 10, 15, 20]; // Added 0 for new profiles

export const APP_NAME_LOCALIZED = {
  en: "Oman Legal Connect",
  ar: "اتصال عُمان القانوني"
};
export const DEFAULT_PROFILE_IMAGE = "https://picsum.photos/seed/profile/200/200";
export const DEFAULT_FIRM_LOGO = "https://picsum.photos/seed/logo/200/100";
export const DEFAULT_OFFICE_PHOTO = "https://picsum.photos/seed/office/600/400";

export const WHATSAPP_BASE_URL = "https://wa.me/";

// Simple UI Texts
export const UI_TEXTS = {
  home: { en: "Home", ar: "الرئيسية" },
  findLegalHelp: { en: "Find Legal Help", ar: "ابحث عن مساعدة قانونية" },
  lawyerLoginRegister: { en: "Lawyer Login/Register", ar: "دخول / تسجيل المحامين" },
  login: { en: "Login", ar: "تسجيل الدخول" },
  register: { en: "Register", ar: "تسجيل" },
  loginWithGoogle: { en: "Login with Google", ar: "تسجيل الدخول باستخدام جوجل" },
  logout: { en: "Logout", ar: "تسجيل الخروج" },
  manageProfile: { en: "Manage Profile", ar: "إدارة الملف الشخصي" },
  search: { en: "Search", ar: "بحث" },
  searchPlaceholder: { en: "Search lawyers, firms, expertise...", ar: "ابحث عن محامين، شركات، خبرات..." },
  viewProfile: { en: "View Profile", ar: "عرض الملف الشخصي" },
  featured: { en: "Featured", ar: "متميز" },
  filterResults: { en: "Filter Results", ar: "تصفية النتائج" },
  keywords: { en: "Keywords", ar: "كلمات مفتاحية" },
  practiceArea: { en: "Practice Area", ar: "مجال العمل" },
  allPracticeAreas: { en: "All Practice Areas", ar: "جميع مجالات العمل" },
  governorate: { en: "Governorate", ar: "المحافظة" },
  allGovernorates: { en: "All Governorates", ar: "جميع المحافظات" },
  language: { en: "Language Spoken", ar: "اللغة" },
  anyLanguage: { en: "Any Language", ar: "أي لغة" },
  minExperience: { en: "Minimum Experience (Lawyers)", ar: "أقل خبرة (للمحامين)" },
  anyExperience: { en: "Any Experience", ar: "أي خبرة" },
  applyFilters: { en: "Apply Filters", ar: "تطبيق الفلاتر" },
  clearFilters: { en: "Clear Filters", ar: "مسح الفلاتر" },
  showFilters: { en: "Show Filters", ar: "إظهار الفلاتر" },
  hideFilters: { en: "Hide Filters", ar: "إخفاء الفلاتر" },
  noResultsFound: { en: "No Results Found", ar: "لم يتم العثور على نتائج" },
  tryAdjustingFilters: { en: "Try adjusting your search terms or filters.", ar: "حاول تعديل معايير البحث أو الفلاتر." },
  backToHome: { en: "Back to Home", ar: "العودة للرئيسية" },
  professionalBio: { en: "Professional Bio", ar: "السيرة المهنية" },
  firmOverview: { en: "Firm Overview", ar: "نظرة عامة على المكتب" },
  readInArabic: { en: "Read in Arabic", ar: "اقرأ باللغة العربية" },
  legalSpecializations: { en: "Legal Specializations", ar: "التخصصات القانونية" },
  qualificationsExperience: { en: "Qualifications & Experience", ar: "المؤهلات والخبرة" },
  yearsOfExperience: { en: "Years of Experience", ar: "سنوات الخبرة" },
  education: { en: "Education", ar: "التعليم" },
  omaniBarAdmission: { en: "Omani Bar Admission", ar: "عضوية نقابة المحامين العمانية" },
  yes: { en: "Yes", ar: "نعم" },
  no: { en: "No", ar: "لا" },
  languagesSpoken: { en: "Languages Spoken", ar: "اللغات المتحدث بها" },
  contactInformation: { en: "Contact Information", ar: "معلومات الاتصال" },
  address: { en: "Address", ar: "العنوان" },
  phone: { en: "Phone", ar: "الهاتف" },
  email: { en: "Email", ar: "البريد الإلكتروني" },
  website: { en: "Website", ar: "الموقع الإلكتروني" },
  whatsapp: { en: "WhatsApp", ar: "واتساب" },
  requestConsultation: { en: "Request Consultation / Send Inquiry", ar: "طلب استشارة / إرسال استفسار" },
  chatOnWhatsApp: { en: "Chat on WhatsApp", ar: "تحدث عبر واتساب" },
  inquiryFormTitle: { en: "Send an Inquiry to", ar: "إرسال استفسار إلى" }, // Parameterized in component
  yourName: { en: "Your Name", ar: "اسمك" },
  yourEmail: { en: "Your Email", ar: "بريدك الإلكتروني" },
  yourPhoneOptional: { en: "Your Phone (Optional)", ar: "هاتفك (اختياري)" },
  yourMessage: { en: "Your Message", ar: "رسالتك" },
  sendInquiry: { en: "Send Inquiry", ar: "إرسال الاستفسار" },
  sending: { en: "Sending...", ar: "جار الإرسال..." },
  inquirySent: { en: "Inquiry Sent!", ar: "تم إرسال الاستفسار!" },
  // Footer related
  footerTagline: { en: "Connecting you with trusted legal professionals across Oman.", ar: "نوصلك بمحترفين قانونيين موثوقين في جميع أنحاء عمان." },
  quickLinks: { en: "Quick Links", ar: "روابط سريعة" },
  forLawyersJoinUs: { en: "For Lawyers (Join Us)", ar: "للمحامين (انضم إلينا)" },
  legal: { en: "Legal", ar: "قانوني" },
  termsOfService: { en: "Terms of Service", ar: "شروط الخدمة" },
  privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  disclaimer: { en: "Disclaimer", ar: "إخلاء المسؤولية" },
  footerDisclaimerText: { en: "This platform is a directory and does not provide legal advice. Always consult with a qualified lawyer for your legal needs.", ar: "هذه المنصة هي دليل ولا تقدم استشارات قانونية. استشر دائمًا محاميًا مؤهلاً لتلبية احتياجاتك القانونية." },
  // Auth Page
  authPageTitle: { en: "Lawyer Portal Access", ar: "بوابة دخول المحامين" },
  loginPrompt: { en: "Already have an account?", ar: "هل لديك حساب بالفعل؟" },
  registerPrompt: { en: "Don't have an account?", ar: "ليس لديك حساب؟" },
  password: { en: "Password", ar: "كلمة المرور" },
  confirmPassword: { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
  passwordsDoNotMatch: { en: "Passwords do not match.", ar: "كلمات المرور غير متطابقة." },
  // Manage Profile Page
  createProfileTitle: { en: "Create Your Lawyer Profile", ar: "أنشئ ملفك الشخصي كمحامٍ" },
  editProfileTitle: { en: "Edit Your Lawyer Profile", ar: "عدّل ملفك الشخصي كمحامٍ" },
  profileInfoIntro: { en: "Complete your profile to be visible to clients seeking legal services.", ar: "أكمل ملفك الشخصي لتكون مرئيًا للعملاء الباحثين عن خدمات قانونية." },
  saveProfile: { en: "Save Profile", ar: "حفظ الملف الشخصي" },
  savingProfile: { en: "Saving...", ar: "جاري الحفظ..." },
  profileSavedSuccess: { en: "Profile saved successfully!", ar: "تم حفظ الملف الشخصي بنجاح!" },
  profileSaveError: { en: "Failed to save profile. Please try again.", ar: "فشل حفظ الملف الشخصي. يرجى المحاولة مرة أخرى." },
  nameEn: { en: "Full Name (English)", ar: "الاسم الكامل (الإنجليزية)" },
  nameAr: { en: "Full Name (Arabic)", ar: "الاسم الكامل (العربية)" },
  titleEn: { en: "Professional Title (English)", ar: "المسمى الوظيفي (الإنجليزية)" },
  titleAr: { en: "Professional Title (Arabic)", ar: "المسمى الوظيفي (العربية)" },
  profilePhoto: { en: "Profile Photo", ar: "الصورة الشخصية" },
  uploadPhoto: { en: "Upload Photo", ar: "رفع صورة" },
  photoRequirements: { en: "Square image, max 2MB. JPG, PNG.", ar: "صورة مربعة، حد أقصى 2 ميجابايت. JPG, PNG." },
  educationEnField: { en: "Education (English, one per line)", ar: "التعليم (الإنجليزية، كل مؤهل في سطر)" },
  educationArField: { en: "Education (Arabic, one per line)", ar: "التعليم (العربية، كل مؤهل في سطر)" },
  bioEnField: { en: "Biography (English)", ar: "السيرة الذاتية (الإنجليزية)" },
  bioArField: { en: "Biography (Arabic)", ar: "السيرة الذاتية (العربية)" },
  languagesSpokenField: { en: "Languages Spoken (select multiple)", ar: "اللغات المتحدث بها (اختر متعدد)" },
  officeAddress: { en: "Office Address (if applicable)", ar: "عنوان المكتب (إن وجد)" },
  selectSpecializations: { en: "Select Your Specializations", ar: "اختر تخصصاتك" },
  selectGovernorate: { en: "Select Your Governorate", ar: "اختر محافظتك" },
  requiredField: { en: "This field is required.", ar: "هذا الحقل مطلوب." },
  phonePattern: { en: "Please enter a valid Omani phone number (e.g., 9xxxxxxx or 7xxxxxxx).", ar: "يرجى إدخال رقم هاتف عماني صحيح (مثال: 9xxxxxxx أو 7xxxxxxx)." },
  whatsappPattern: { en: "Please enter a valid Omani WhatsApp number (e.g., 9xxxxxxx or 7xxxxxxx).", ar: "يرجى إدخال رقم واتساب عماني صحيح (مثال: 9xxxxxxx أو 7xxxxxxx)." },
};

export const OMANI_PHONE_REGEX = /^(9[1-9]\d{6}|7[129]\d{6}|2[2-6]\d{6})$/; // Basic Omani mobile/landline structure
export const OMANI_WHATSAPP_REGEX = /^(9[1-9]\d{6}|7[129]\d{6})$/; // Usually mobile numbers for WhatsApp

// Firestore collection names
export const FIRESTORE_COLLECTIONS = {
  LAWYERS: 'lawyers',
  LAW_FIRMS: 'law_firms', // If firms become user-managed entities later
};

// Storage paths (if using Firebase Storage for images)
export const STORAGE_PATHS = {
  PROFILE_PHOTOS: 'profile_photos',
};
