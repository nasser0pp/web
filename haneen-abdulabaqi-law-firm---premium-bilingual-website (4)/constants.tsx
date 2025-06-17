import React from 'react';
import { PracticeArea, TeamMember, NavLinkItem, StatItem } from './types';

// --- ICON COMPONENTS (Styled for Gold Accent) ---
const createIcon = (pathData: string | JSX.Element) => {
  const IconComponent: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className} text-firm-accent`}>
      {typeof pathData === 'string' ? <path strokeLinecap="round" strokeLinejoin="round" d={pathData} /> : pathData}
    </svg>
  );
  return IconComponent;
};

export const GavelIcon = createIcon("M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 2.25v.01M12 12.75c0 .17-.02.336-.056.5H12a.75.75 0 01.75.75V15a.75.75 0 01-.75.75h-.056A4.502 4.502 0 0112 19.5a4.5 4.5 0 01-4.444-3.75H7.5A.75.75 0 016.75 15v-1.5a.75.75 0 01.75-.75H12c-.036.164-.056.33-.056.5zM4.744 15.75A4.502 4.502 0 017.5 19.5m3.75-16.25c.03-.05.062-.1.096-.147A4.502 4.502 0 0011.25 2.25C10.007 2.25 8.932 2.926 8.356 3.966m2.894-.68L9.75 6l-1.5 2.714m-2.226 1.711-.795.46-.794.46m3.116.892.658-.382.658-.381m5.25-6.31A4.5 4.5 0 0011.25 6H9.75m-4.5 4.5H5.25m2.25 3H5.25m9-5.244l-1.5-1.5m1.5 3l-1.5 1.5");
export const BriefcaseIcon = createIcon("M20.25 14.15v4.05a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 016 4.5h12a2.25 2.25 0 012.25 2.25v3.75m-13.5 6.075l3-3m0 0l3 3m-3-3v6m6-12V6.75A2.25 2.25 0 0016.5 4.5h-9A2.25 2.25 0 005.25 6.75v10.5A2.25 2.25 0 007.5 19.5h3");
export const BuildingOfficeIcon = createIcon("M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 12.75h6m-6 6h6M6.75 6.75h.008v.008H6.75V6.75zm.75 0h.008v.008H7.5V6.75zm2.25.008h.008v.008h-.008v-.008zm.75 0h.008v.008h-.008V6.75z");
export const UsersIcon = createIcon("M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z");
export const ShieldCheckIcon = createIcon("M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z");
export const PhoneIcon = createIcon("M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.018-.991-.053-1.464l-.093-.821a2.25 2.25 0 00-1.086-1.638l-1.02-.727a2.25 2.25 0 00-2.308.019l-.368.258a2.25 2.25 0 01-2.23.015l-1.65-1.099a2.25 2.25 0 00-2.348-.031l-.22.131a2.25 2.25 0 01-1.602.043l-1.006-.429a2.25 2.25 0 00-2.152.128L5.22 8.521a2.25 2.25 0 00-1.42.926l-.224.447a2.25 2.25 0 00-.012 2.016l.012.013l.006.005l.006.004l.002.002a2.25 2.25 0 01-.005 2.074l-.004.007l-.002.002l-.001.001A2.25 2.25 0 012.25 6.75z");
export const EnvelopeIcon = createIcon("M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75");
export const MapPinIcon = createIcon("M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z");
export const PlusIcon = createIcon("M12 4.5v15m7.5-7.5h-15");
export const ChatBubbleLeftRightIcon = createIcon("M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.696-3.696A44.341 44.341 0 0112 15.214a44.339 44.339 0 01-3.054 1.522l-3.696 3.696V17.24a50.009 50.009 0 01-1.02-.072A2.25 2.25 0 013.75 14.894V10.607c0-.97.616-1.813 1.5-2.097m16.5 0c.884.284 1.5 1.128 1.5 2.097v4.286c0 .837-.478 1.562-1.205 1.895-.24.089-.49.164-.75.222V15.214a44.34 44.34 0 00-2.926-1.353l.733-.733a.75.75 0 000-1.06l-1.5-1.5a.75.75 0 00-1.06 0l-.733.733c-.734-.336-1.5-.623-2.303-.868a18.26 18.26 0 00-2.303-.868c-.803-.245-1.57-.482-2.303-.668L9.75 9.485l-1.5-1.5a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 000 1.06l1.5 1.5L8.25 12l5.25-5.25.021-.021-.021.02z");
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.34 3.43 16.81L2.06 22L7.33 20.61C8.75 21.36 10.36 21.78 12.04 21.78C17.5 21.78 21.95 17.33 21.95 11.87C21.95 6.41 17.5 2 12.04 2ZM16.65 15.2C16.42 15.42 15.92 15.68 15.53 15.75C15.14 15.82 14.65 15.93 13.91 15.61C12.89 15.17 11.35 14.48 10.13 13.06C9.28 11.99 8.69 10.74 8.45 10.35C8.22 9.96 7.96 9.77 7.74 9.54C7.52 9.32 7.31 9.13 7.1 8.95C6.88 8.76 6.69 8.57 6.69 8.28C6.69 7.99 6.88 7.81 7.07 7.64C7.25 7.47 7.45 7.37 7.62 7.37C7.79 7.37 7.95 7.37 8.09 7.38C8.24 7.39 8.37 7.39 8.49 7.67C8.61 7.95 8.92 8.75 9 8.92C9.08 9.09 9.17 9.27 9.08 9.44C9 9.61 8.91 9.71 8.74 9.88C8.57 10.05 8.44 10.16 8.33 10.27C8.21 10.38 8.1 10.51 8.21 10.69C8.31 10.87 8.76 11.51 9.49 12.18C10.42 12.99 11.14 13.25 11.4 13.35C11.67 13.44 11.91 13.41 12.09 13.2C12.26 12.99 12.55 12.63 12.77 12.35C12.98 12.07 13.19 12.04 13.43 12.13C13.67 12.22 14.53 12.64 14.76 12.76C14.99 12.88 15.13 12.93 15.19 13.01C15.25 13.1 15.25 13.31 15.19 13.42C15.13 13.53 14.99 13.68 14.76 13.8C14.53 13.92 14.18 14.1 13.97 14.21C13.76 14.31 13.61 14.37 13.61 14.54C13.61 14.71 13.97 14.98 14.28 15.22C14.58 15.45 14.81 15.54 14.97 15.63C15.13 15.72 15.25 15.72 15.36 15.72C15.47 15.72 16.14 15.33 16.37 15.09C16.59 14.85 16.87 14.98 16.87 15.2Z"/>
  </svg>
);
export const ChevronDownIcon = createIcon("M19.5 8.25l-7.5 7.5-7.5-7.5");


// --- FIRM & CONTACT INFORMATION ---
export const COMPANY_NAME_EN = "HANEEN ABDULABAQI LAW FIRM";
export const COMPANY_NAME_AR = "مكتب الأستاذة حنين عبد الباقي للمحاماة";
export const HERO_TAGLINE_EN = "Lawyers .. Consultants .. Arbitrators .. Trusted";
export const HERO_TAGLINE_AR = "محامون .. مستشارون .. محكمون .. موثوقون";

export const CONTACT_PHONE_1_RAW = "+96899889451";
export const CONTACT_PHONE_1_DISPLAY = "+968 9988 9451";
export const CONTACT_PHONE_2_RAW = "+96892333070";
export const CONTACT_PHONE_2_DISPLAY = "+968 9233 3070";
export const CONTACT_EMAIL = "info@haneenabdulbaqi.com"; // Placeholder

export const ADDRESS_EN = "South Al Hail, Lane 3145, Building 4234/1, Office No. 2";
export const ADDRESS_AR = "الحيل الجنوبية ، سكه : ٣١٤٥، رقم المبنى٤٢٣٤/ ١, مكتب رقم(٢)";
export const MAP_IFRAME_SRC_NEW = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1086.6233518050476!2d58.2052763632454!3d23.641935634982616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8dfdf30b6e8201%3A0xb0b0070c37ecd9c!2z2YXZg9iq2Kgg2K3ZhtmK2YYg2LnYqNiv2KfZhNio2KfZgtmKINmE2YTZhdit2KfZhdin2Kkg2YjYp9mE2KfYs9iq2LTYp9ix2KfYqiDYp9mE2YLYp9mG2YjZhtmK2Kk!5e0!3m2!1sen!2som!4v1750108275079!5m2!1sen!2som"; // Existing one

// --- NAVIGATION ---
export const NAVIGATION_LINKS_NEW: NavLinkItem[] = [
  { label: 'Home', labelAr: 'الصفحة الرئيسية', path: '/' },
  { label: 'About', labelAr: 'عن الشركة', path: '/about' },
  { label: 'Services', labelAr: 'الخدمات', path: '/services' },
  { label: 'FAQ', labelAr: 'الأسئلة', path: '/faq' },
  { label: 'Clients', labelAr: 'عملاؤنا', path: '/clients' },
  { label: 'Contact', labelAr: 'تواصل معنا', path: '/contact' },
];

// --- CONTENT STRINGS (BILINGUAL) ---

// Hero Section
export const HERO_CTA_EN = "Contact Us";
export const HERO_CTA_AR = "تواصل معنا";

// About Section (from PDF page 3)
export const ABOUT_SECTION_TITLE_EN = "About The Firm";
export const ABOUT_SECTION_TITLE_AR = "عن الشركة";
export const ABOUT_WHO_WE_ARE_TITLE_EN = "Who We Are";
export const ABOUT_WHO_WE_ARE_TITLE_AR = "من نحن";
export const ABOUT_WHO_WE_ARE_TEXT_EN = "Hanin Abdulbaqi Law and Legal Consultation Office, specialized in providing legal services for commercial entities and individuals, representing clients in various levels of litigation, drafting domestic and international commercial contracts, offering mediation and international arbitration services, and more. The office was established with a commitment with a high-quality standard, maintained by qualified legal experts with extensive legal experience. We recognize the importance of maintaining our clients' trust, that's why we are dedicated to provide all the services and facilities that contribute to building mutual trust between the parties.";
export const ABOUT_WHO_WE_ARE_TEXT_AR = "مكتب حنين عبد الباقي للمحاماة والاستشارات القانونيه متخصصون في تقديم الحلول والاستشارات التجارية والأفراد، والقيام بأعمال التمثيل القانوني أمام المحاكم في درجات التقاضي المختلفه ، وصياغة العقود التجارية المحلية والدولية وتقديم خدمات الوساطة والتحكيم الدولي وغير ذلك ، حيث تم تأسيس جودة ومعايير الخدمة بالمكتب والحفاظ عليها بواسطة خبراء واستشاريين قانونيين مؤهلين ولديهم خبرات قانونيه واسعة نحن ندرك أهمية المحافظة على ثقة عملائنا بنا لذلك نحرص على تسخير كافة الخدمات والتسهيلات التي تساهم في بناء ثقة متبادلة بين الطرفين.";

export const FOUNDER_NAME_EN_NEW = "HANEEN ABDULABAQI";
export const FOUNDER_NAME_AR_NEW = "حنين عبد الباقي";
export const FOUNDER_TITLE_EN_NEW = "Founder & Senior Attorney";
export const FOUNDER_TITLE_AR_NEW = "مؤسسة للمكتب ومحامية مجازة امام محكمة الاستئناف";
export const FOUNDER_IMAGE_URL = "/assets/images/haneen-abdulbaqi.png"; // Placeholder
export const FOUNDER_BIO_EN_NEW = "Certified as an Appeal Court Attorney with over seven years of experience in the legal field. With a solid track record of successfully handling complex cases, she is committed to delivering justice with integrity and expertise. Awarded as the Best Entrepreneur Among Lawyers for 2024. Certified as an Arbitrator in international courts, her qualifications are further enhanced by specialized training from both local and international institutions, including the United Kingdom. Her comprehensive legal knowledge, combined with her commitment to achieving favorable outcomes for her clients.";
export const FOUNDER_BIO_AR_NEW = "بخبرة تزيد عن سبع سنوات في المجال القانوني، حققت سجلاً حافلا من النجاح في التعامل مع القضايا المعقدة التزامها وسعيها لتحقيق العدالة والعمل بنزاهة واحترافية واضح في تعاملها مع كل قضية. تم تكريمها بلقب أفضل رائدة أعمال بين المحامين لعام ٢٠٢٤، وقد حصلت على اعتراف واسع لمساهماتها الاستثنائية في المجال القانوني. معتمدة كـ \"محكمة دولية معتمدة \"، ولديها خبرة واسعة في عدة مجالات منها القانون التجاري، والمدني، والجزائي كما أن مؤهلاتها تعززت بتدريب متخصص من مؤسسات محلية ودولية مرموقة منها المملكة المتحدة. معرفتها القانونية العميقة إلى جانب التزامها الثابت ساهم في تحقيق أفضل النتائج لعملائها مما جعلها محامية موثوقة وبارعة في المجتمع القانوني.";

// Vision, Mission, Principles (from PDF page 4)
export const VISION_TITLE_EN_NEW = "Our Vision";
export const VISION_TITLE_AR_NEW = "رؤيتنا";
export const VISION_TEXT_EN_NEW = "Leadership and excellence in providing innovative legal services in the business sector, in accordance with the highest standards.";
export const VISION_TEXT_AR_NEW = "الريادة والتميز في تقديم الحلول والخدمات القانونية المبتكرة في قطاع الأعمال وفق أرقى المعايير المهنية ، توخي الاحترافية والممارسات المهنية العالية هي مصدر قوتنا والتفاني في العمل هو شعارنا ، وهذا سبب ثقة عملائنا بنا.";

export const MISSION_TITLE_EN_NEW = "Our Mission";
export const MISSION_TITLE_AR_NEW = "رسالتنا";
export const MISSION_TEXT_EN_NEW = "To be the one of the best professional entities in providing legal services to the business sector and commercial companies.";
export const MISSION_TEXT_AR_NEW = "أن نكون المنشأة المهنية الأولى في تقديم الخدمات القانونية لقطاع الأعمال والشركات التجارية.";

export const PRINCIPLES_TITLE_EN_NEW = "Our Principles";
export const PRINCIPLES_TITLE_AR_NEW = "مبادئنا";
export const PRINCIPLES_LIST_NEW = [
  { en: "ACCURACY", ar: "الدقة والموضوعيه" }, // Combined from Ar "الدقة والموضوعيه"
  { en: "Ethical principles (integrity and independence)", ar: "المبادئ الأخلاقية (النزاهة والاستقلالية)" },
  { en: "Non-conflict of interests with relevant parties", ar: "عدم تضارب المصالح مع الجهات ذات العلاقة" },
  { en: "Maintenance of confidentiality", ar: "الحفاظ على سرية المعلومات" },
  { en: "Speed of achievement", ar: "سرعة الإنجاز" } // From Ar "سرعة الإنجاز"
];


// Company Objectives (from PDF page 4)
export const OBJECTIVES_TITLE_EN = "Company Objectives";
export const OBJECTIVES_TITLE_AR = "أهداف الشركة";
export const OBJECTIVES_LIST_EN_NEW = [
  "Achieving the highest benefit for the client by providing the best legal services with the highest quality standards and in the shortest time.",
  "Accomplishing work in a professional manner through skilled work that considers all legal and legitimate aspects.",
  "Building an integrated interactive database that includes assets and documents to serve all relevant parties.",
  "Facilitating the follow-up process through executive work guidelines and periodic reports."
];
export const OBJECTIVES_LIST_AR_NEW = [
  "تحقيق أعلى منفعة للعميل من خلال تقديم أفضل الخدمات القانونية بأعلى معايير الجودة وأقل مدة زمنية.",
  "انجاز العمل بطريقة إحترافية من خلال عمل متمرس يراعي جميع النواحي القانونية والشرعية.",
  "بناء قاعدة معلومات تفاعلية متكاملة تتضمن الأصول و المستندات لتخدم جميع الأطراف ذوي العلاقة.",
  "تسهيل عملية المتابعة من خلال أدلة العمل التنفيذية والتقارير الدورية."
];

// Service Mechanism (from PDF page 4)
export const MECHANISM_TITLE_EN = "The Company's Legal Services Mechanism";
export const MECHANISM_TITLE_AR = "آلية تقديم الخدمات القانونية التي تقدمها الشركة";
export const MECHANISM_TEXT_EN_NEW = [
  "What enhances the reputation of Hanin Abdulbaqi Law firm among the clients by building a personalized relationship by trying to understand the clients needs.",
  "The office will be fully prepared to receive communications from clients, and through them by scheduling meetings.",
  "The office is committed to provide its clients with drafts of memorandum and journals which will be presented to court, as well as any document drafted by the office for the client."
];
export const MECHANISM_TEXT_AR_NEW = [
  "ما يعزز سمعة مكتب حنين عبد الباقي للمحاماة و الإستشارات القانونية لدى عملائها هي آلية التواصل المتقدمة التي ستتم فيما بيننا وتكون على النحو التالي سيكون المكتب على استعداد تام لتلقي اتصالات الموكلين ومن خلالها يتم تحديد مواعيد الاجتماع.",
  "كما أن المكتب يلتزم بتزويد موكليه مسودات المذكرات والصحف التي سيتم تقديمها وأي مستند تتم صياغته من قبل المكتب للموكل وذلك قبل يومين من تاريخ الإيداع أو التقديم ليتم اعتماده بشكل نهائي من قبل الموكل أو العميل."
];

// Legal Services (from PDF page 5)
export const SERVICES_SECTION_TITLE_EN = "Legal Services";
export const SERVICES_SECTION_TITLE_AR = "الخدمات القانونية";
export const LEGAL_SERVICES_DATA_NEW: PracticeArea[] = [
  { 
    id: 'corporate_commercial_civil', 
    nameEn: 'Corporate, Commercial & Civil Cases', nameAr: 'قضايا الشركات والتجارية والمدنية',
    descriptionEn: 'Expert handling of corporate cases, including commercial and civil matters. Judicial representation in litigation before competent courts.', 
    descriptionAr: 'معالجة متخصصة لقضايا الشركات، بما في ذلك المسائل التجارية والمدنية. التمثيل القضائي في الترافع امام المحاكم المختصة بما فيها قضايا الشركات والتي قد تشمل القضايا المدنية والتجارية.',
    icon: BriefcaseIcon,
    image: '/assets/images/service-corporate.jpg' // Placeholder
  },
  { 
    id: 'labor', 
    nameEn: 'Labor Cases', nameAr: 'القضايا العمالية',
    descriptionEn: 'Specialized legal support for all labor-related matters and disputes.', 
    descriptionAr: 'دعم قانوني متخصص لجميع المسائل والمنازعات المتعلقة بالعمل.',
    icon: UsersIcon,
    image: '/assets/images/service-labor.jpg' // Placeholder
  },
  { 
    id: 'criminal', 
    nameEn: 'Criminal Cases', nameAr: 'القضايا الجزائية',
    descriptionEn: 'Dedicated defense and representation in criminal proceedings.', 
    descriptionAr: 'دفاع وتمثيل متخصص في الإجراءات الجنائية.',
    icon: ShieldCheckIcon,
    image: '/assets/images/service-criminal.jpg' // Placeholder
  },
  { 
    id: 'real_estate', 
    nameEn: 'Real Estate Matters', nameAr: 'المسائل العقارية',
    descriptionEn: 'Comprehensive legal services for real estate transactions and disputes.', 
    descriptionAr: 'خدمات قانونية شاملة للمعاملات العقارية والنزاعات.',
    icon: BuildingOfficeIcon,
    image: '/assets/images/service-realestate.jpg' // Placeholder
  },
  { 
    id: 'mediation_arbitration', 
    nameEn: 'Mediation and Arbitration', nameAr: 'الوساطة والتحكيم',
    descriptionEn: 'Resolving disputes efficiently through mediation and arbitration.', 
    descriptionAr: 'حل النزاعات بكفاءة من خلال الوساطة والتحكيم.',
    icon: GavelIcon,
    image: '/assets/images/service-mediation.jpg' // Placeholder
  },
  { 
    id: 'maritime_transport', 
    nameEn: 'Maritime Transport Cases', nameAr: 'قضايا النقل البحري',
    descriptionEn: 'Specialized counsel for maritime law and transport disputes.', 
    descriptionAr: 'استشارات متخصصة في القانون البحري ونزاعات النقل.',
    icon: GavelIcon, // Placeholder, ideally a ship/anchor icon
    image: '/assets/images/service-maritime.jpg' // Placeholder
  },
  { 
    id: 'telecom_network', 
    nameEn: 'Telecommunications & Network Cases', nameAr: 'قضايا الإتصالات والشبكات',
    descriptionEn: 'Legal advice for the telecommunications sector and network-related issues.', 
    descriptionAr: 'استشارات قانونية لقطاع الاتصالات والقضايا المتعلقة بالشبكات.',
    icon: BriefcaseIcon, 
    image: '/assets/images/service-telecom.jpg' // Placeholder
  },
  { 
    id: 'accident_compensation', 
    nameEn: 'Accident Compensation Cases', nameAr: 'قضايا التعويض عن الحوادث',
    descriptionEn: 'Assisting clients in securing fair compensation for accidents.', 
    descriptionAr: 'مساعدة العملاء في تأمين تعويض عادل عن الحوادث.',
    icon: UsersIcon, 
    image: '/assets/images/service-compensation.jpg' // Placeholder
  },
  { 
    id: 'contract_drafting', 
    nameEn: 'Contract Drafting & Review for Joint Projects', nameAr: 'صياغة ومراجعة عقود العمل للمشاريع المشتركة',
    descriptionEn: 'Expert drafting and review of legal contracts for joint ventures and projects.', 
    descriptionAr: 'صياغة ومراجعة متخصصة للعقود القانونية للمشاريع المشتركة.',
    icon: BriefcaseIcon,
    image: '/assets/images/service-contracts.jpg' // Placeholder
  },
  { 
    id: 'legal_consultations', 
    nameEn: 'Legal Consultations', nameAr: 'تقديم الاستشارات القانونيه',
    descriptionEn: 'Offering expert legal consultations across various fields of law.', 
    descriptionAr: 'تقديم استشارات قانونية متخصصة في مختلف مجالات القانون.',
    icon: ChatBubbleLeftRightIcon,
    image: '/assets/images/service-consultations.jpg' // Placeholder
  },
];
export const SERVICE_CARD_MORE_EN = "Learn More";
export const SERVICE_CARD_MORE_AR = "اعرف المزيد";


// FAQs (from PDF page 6)
export const FAQ_SECTION_TITLE_EN = "Frequently Asked Questions";
export const FAQ_SECTION_TITLE_AR = "الأسئلة الشائعة";
export interface FAQItem {
  questionEn: string; questionAr: string;
  answerEn: string; answerAr: string;
}
export const FAQ_DATA: FAQItem[] = [
  {
    questionEn: "What is the expected time period for terminating legal service?",
    questionAr: "ما هي الفترة الزمنية المتوقعة لإنهاء الخدمة القانونية ؟",
    answerEn: "The time period varies depending on the type of service provided by legal consulting units. Drafting, legislation, and regarding to foreign investment work shall not exceed a maximum of ten working days, unless otherwise agreed with the customer. As for litigation services in the business sector and individual services, the period of providing the legal service varies according to the progress of the case until it is decided by court.",
    answerAr: "تختلف الفترة الزمنية تبعاً لنوع الخدمة المقدمة وحدات الاستشارات القانونية والصياغة والتشريعات واعمال الإستثمار الأجنبي لا تزيد مدة تقديم الخدمة عن عشرة أيام عمل كحد أقصى ما لم يتفق مع العميل على خلاف ذلك. أما خدمات وحدات التقاضي في قسمي قطاع الأعمال وخدمات الأفراد فتتراوح مدة تقديم الخدمة القانونية بحسب مجريات الدعوى فيها إلى حين الفصل فيها بحكم نهائي."
  },
  // Add more FAQs here if available
];

// Clients (from PDF page 6)
export const CLIENTS_SECTION_TITLE_EN = "Our Valued Clients";
export const CLIENTS_SECTION_TITLE_AR = "أبرز عملائنا";
export const CLIENT_LOGOS_DATA_NEW = [ 
    { name: "Khimji Ramdas", logoUrl: "/assets/images/client-kr.png" },
    { name: "Al Nasr Marble", logoUrl: "/assets/images/client-alnasr.png" },
    { name: "Chocolake", logoUrl: "/assets/images/client-chocolake.png" },
    { name: "NBO (National Bank of Oman)", logoUrl: "/assets/images/client-nbo.webp" },
    { name: "Maskan Construction", logoUrl: "/assets/images/client-maskan.png" },
    { name: "Taajeer Finance", logoUrl: "/assets/images/client-taajeer.png" },
    { name: "Bahwan International Group Holding", logoUrl: "/assets/images/client-bahwan.png" },
];

// Contact Section
export const CONTACT_SECTION_TITLE_EN = "Get In Touch";
export const CONTACT_SECTION_TITLE_AR = "تواصل معنا";
export const CONTACT_FORM_TITLE_EN = "Send Us a Message";
export const CONTACT_FORM_TITLE_AR = "أرسل لنا رسالة";
export const CONTACT_DETAILS_TITLE_EN = "Contact Details";
export const CONTACT_DETAILS_TITLE_AR = "معلومات الاتصال";
export const OFFICE_HOURS_EN = "Sunday - Thursday: 8:00 AM - 4:00 PM";
export const OFFICE_HOURS_AR = "الأحد - الخميس: ٨:٠٠ صباحًا - ٤:٠٠ مساءً";
export const WEEKEND_HOURS_EN = "Friday - Saturday: Closed";
export const WEEKEND_HOURS_AR = "الجمعة - السبت: مغلق";


// Form Labels
export const FORM_LABEL_NAME_EN = "Full Name";
export const FORM_LABEL_NAME_AR = "الاسم الكامل";
export const FORM_LABEL_EMAIL_EN = "Email Address";
export const FORM_LABEL_EMAIL_AR = "البريد الإلكتروني";
export const FORM_LABEL_PHONE_EN = "Phone Number (Optional)";
export const FORM_LABEL_PHONE_AR = "رقم الهاتف (اختياري)";
export const FORM_LABEL_SUBJECT_EN = "Subject";
export const FORM_LABEL_SUBJECT_AR = "الموضوع";
export const FORM_LABEL_MESSAGE_EN = "Your Message";
export const FORM_LABEL_MESSAGE_AR = "رسالتك";
export const FORM_SUBMIT_BTN_EN = "Send Message";
export const FORM_SUBMIT_BTN_AR = "إرسال الرسالة";
export const FORM_SUCCESS_MSG_EN = "Your message has been sent successfully. We will contact you shortly.";
export const FORM_SUCCESS_MSG_AR = "تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا.";


// Footer
export const FOOTER_TAGLINE_EN = "Excellence in Law, Dedication to Clients.";
export const FOOTER_TAGLINE_AR = "التميز في القانون، التفاني للعملاء.";
export const FOOTER_COPYRIGHT_EN = `© ${new Date().getFullYear()} ${COMPANY_NAME_EN}. All Rights Reserved.`;
export const FOOTER_COPYRIGHT_AR = `© ${new Date().getFullYear()} ${COMPANY_NAME_AR}. جميع الحقوق محفوظة.`;
export const FOOTER_QUICKLINKS_EN = "Quick Links";
export const FOOTER_QUICKLINKS_AR = "روابط سريعة";

// ARIA Labels and misc UI
export const ARIA_LANG_SWITCH_EN = "Switch to Arabic";
export const ARIA_LANG_SWITCH_AR = "التحويل إلى الإنجليزية";
export const ARIA_OPEN_MENU = "Open navigation menu";
export const ARIA_CLOSE_MENU = "Close navigation menu";
export const WHATSAPP_CTA_EN = "Chat on WhatsApp";
export const WHATSAPP_CTA_AR = "تحدث عبر الواتساب";
export const WHATSAPP_MESSAGE = "Hello, I am interested in your legal services."; // Generic message

// Placeholder for other constants if identified later
export const COMPANY_FOUNDER_TAGLINE_EN = "Lawyer, consultants, ARBITATORS"; // From previous context, may not be needed with new hero
export const COMPANY_FOUNDER_TAGLINE_AR = ""; // From previous context


// Stats - Can be used if a stats section is desired
export const FIRM_STATS_DATA_NEW: StatItem[] = [
  { value: 7, labelEn: "Years of Experience", labelAr: "سنوات من الخبرة", suffix: "+" },
  { value: 200, labelEn: "Cases Handled", labelAr: "القضايا المعالجة", suffix: "+" }, // Example
  { value: 98, labelEn: "Client Satisfaction", labelAr: "رضا العملاء", suffix: "%" }, // Example
];

// These constants are from the old setup and may need to be re-evaluated or removed
export const ABOUT_US_INTRO_TITLE_EN = "Choosing The Right Law Firm";
export const ABOUT_US_INTRO_TITLE_AR = "إن اختيار مكتب المحاماة المناسب";
export const ABOUT_US_INTRO_TEXT_EN = "Choosing the right law firm to represent you and understand your interests is the most important decision to. You always need a law firm that understands this world well and understands your needs as well. We are able, God willing, to achieve results that satisfy our clients in a manner that is fully consistent with the requirements and needs of our clients with high international standards. We realize that our success in our tasks depends in large part on the quality of our relationship with our clients and the ability to coordinate with them. Therefore, we always emphasize listening to our clients through direct means of communication (phone, email, messages) and interacting with them to ensure that the task assigned to us is handled in an effective manner and in record time.";
export const ABOUT_US_INTRO_TEXT_AR = "إن اختيار مكتب المحاماة المناسب لتمثيلك يعد قرارًا بالغ الأهمية في تعزيز الموقف القانوني لمصالحك أنت بحاجة دائما إلى مكتب محاماة يتفهم هذا المجال جيدًا ويواكب احتياجاتك على أكمل وجه. نحن في مكتبنا نؤمن بقدرتنا، كما اننا نسعى لتحقيق نتائج ترضي عملائنا وتتماشى تماما مع متطلباتهم وفقًا لأعلى المعايير الدولية. ندرك أن نجاحنا في أداء مهامنا يعتمد بشكل كبير على جودة علاقتنا مع عملائنا وقدرتنا على التنسيق الفعال معهم لذلك نؤكد دائما على أهمية الاستماع لعملائنا والتفاعل معهم من خلال وسائل الاتصال المباشرة (الهاتف، البريد الإلكتروني ، الرسائل النصية ) وذلك لضمان معالجة المهام الموكلة إلينا بكفاءة وفي وقت قياسي.";

// Page Titles
export const PAGE_TITLE_HOME_EN = "Home";
export const PAGE_TITLE_HOME_AR = "الرئيسية";
export const PAGE_TITLE_ABOUT_EN = "About Us";
export const PAGE_TITLE_ABOUT_AR = "عن الشركة";
export const PAGE_TITLE_SERVICES_EN = "Our Services";
export const PAGE_TITLE_SERVICES_AR = "خدماتنا";
export const PAGE_TITLE_FAQ_EN = "FAQ";
export const PAGE_TITLE_FAQ_AR = "الأسئلة الشائعة";
export const PAGE_TITLE_CLIENTS_EN = "Our Clients";
export const PAGE_TITLE_CLIENTS_AR = "عملاؤنا";
export const PAGE_TITLE_CONTACT_EN = "Contact Us";
export const PAGE_TITLE_CONTACT_AR = "اتصل بنا";
export const PAGE_TITLE_NOT_FOUND_EN = "Page Not Found";
export const PAGE_TITLE_NOT_FOUND_AR = "الصفحة غير موجودة";
export const NOT_FOUND_MESSAGE_EN = "Sorry, the page you are looking for does not exist.";
export const NOT_FOUND_MESSAGE_AR = "عذراً، الصفحة التي تبحث عنها غير موجودة.";
export const NOT_FOUND_GO_HOME_EN = "Go to Homepage";
export const NOT_FOUND_GO_HOME_AR = "العودة إلى الرئيسية";
