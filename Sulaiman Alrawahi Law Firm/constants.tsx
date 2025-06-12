
import React from 'react';
import { PracticeArea, TeamMember, NavLinkItem, StatItem } from './types';

// SVG Icon Components
export const GavelIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 2.25v.01M12 12.75c0 .17-.02.336-.056.5H12a.75.75 0 01.75.75V15a.75.75 0 01-.75.75h-.056A4.502 4.502 0 0112 19.5a4.5 4.5 0 01-4.444-3.75H7.5A.75.75 0 016.75 15v-1.5a.75.75 0 01.75-.75H12c-.036.164-.056.33-.056.5zM4.744 15.75A4.502 4.502 0 017.5 19.5" />
    <path d="M11.25 3.286_9.75 6l-1.5 2.714" />
    <path d="m6.024 10.425-.795.46-.794.46m3.116.892.658-.382.658-.381" />
    <path d="M12.39 3.868c.03-.05.062-.1.096-.147A4.502 4.502 0 0011.25 2.25C10.007 2.25 8.932 2.926 8.356 3.966" />
    <path d="M14.25 7.756A4.5 4.5 0 0011.25 6H9.75M7.5 10.5H5.25m2.25 3H5.25" />
    <path d="M14.25 7.756a4.5 4.5 0 10-5.25 6.31M15.75 9.75l-1.5-1.5m1.5 3l-1.5 1.5"/> {/* Simplified Gavel */}
  </svg>
);

export const BriefcaseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.05a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 016 4.5h12a2.25 2.25 0 012.25 2.25v3.75m-13.5 6.075l3-3m0 0l3 3m-3-3v6m6-12V6.75A2.25 2.25 0 0016.5 4.5h-9A2.25 2.25 0 005.25 6.75v10.5A2.25 2.25 0 007.5 19.5h3" />
  </svg>
);

export const BuildingOfficeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 12.75h6m-6 6h6M6.75 6.75h.008v.008H6.75V6.75zm.75 0h.008v.008H7.5V6.75zm2.25.008h.008v.008h-.008v-.008zm.75 0h.008v.008h-.008V6.75z" />
  </svg>
);

export const UsersIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.247-4.017c.22-.22.22-.605 0-.825L12 2.25l-1.006 1.006a.406.406 0 01-.52.028l-1.005-1.005L7.5 3.281m10.5 4.219c.22-.22.22-.605 0-.825L12 2.25l-1.006 1.006a.406.406 0 01-.52.028l-1.005-1.005L7.5 3.281m10.5 4.219L16.5 6l-1.508 1.508a.406.406 0 00-.028.52l1.005 1.005L18 9.75m-1.5-1.5L15 6.75l-1.5 1.5m1.5-1.5V5.25m1.5 1.5V5.25m-15 13.5A9.094 9.094 0 015.259 6.75m1.5 9.75a7.489 7.489 0 003.742 1.024m3-1.024a7.489 7.489 0 003.741-1.024m-9.75 0a9.094 9.094 0 00-3.742-1.024M6.75 19.5A9.094 9.094 0 013 13.253V6.75a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6.75v6.495c0 1.952-.741 3.766-2.004 5.204a9.088 9.088 0 01-4.244 2.298 9.088 9.088 0 01-1.252.098H6.75z" />
  </svg>
);

export const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

export const GlobeAltIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121.75 12c0 .248-.007.495-.021.738m-1.929 0a11.985 11.985 0 00-2.073 3.018M3.271 12.738A11.985 11.985 0 005.344 15.756m13.312-3.018A11.953 11.953 0 0112 13.5c-2.998 0-5.74 1.1-7.843 2.918m15.686 0A8.959 8.959 0 012.25 12c0-.248.007.495.021-.738m1.929 0a11.985 11.985 0 012.073-3.018M20.729 9.262A11.985 11.985 0 0018.656 6.244" />
  </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.018-.991-.053-1.464l-.093-.821a2.25 2.25 0 00-1.086-1.638l-1.02-.727a2.25 2.25 0 00-2.308.019l-.368.258a2.25 2.25 0 01-2.23.015l-1.65-1.099a2.25 2.25 0 00-2.348-.031l-.22.131a2.25 2.25 0 01-1.602.043l-1.006-.429a2.25 2.25 0 00-2.152.128L5.22 8.521a2.25 2.25 0 00-1.42.926l-.224.447a2.25 2.25 0 00-.012 2.016l.012.013l.006.005l.006.004l.002.002a2.25 2.25 0 01-.005 2.074l-.004.007l-.002.002l-.001.001A2.25 2.25 0 012.25 6.75z" />
  </svg>
);

export const EnvelopeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const MapPinIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string; language?: string }> = ({ className = "w-4 h-4", language = 'en' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={2} 
    stroke="currentColor" 
    className={`${className} ${language === 'ar' ? 'transform scale-x-[-1]' : ''}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.34 3.43 16.81L2.06 22L7.33 20.61C8.75 21.36 10.36 21.78 12.04 21.78C17.5 21.78 21.95 17.33 21.95 11.87C21.95 6.41 17.5 2 12.04 2ZM16.65 15.2C16.42 15.42 15.92 15.68 15.53 15.75C15.14 15.82 14.65 15.93 13.91 15.61C12.89 15.17 11.35 14.48 10.13 13.06C9.28 11.99 8.69 10.74 8.45 10.35C8.22 9.96 7.96 9.77 7.74 9.54C7.52 9.32 7.31 9.13 7.1 8.95C6.88 8.76 6.69 8.57 6.69 8.28C6.69 7.99 6.88 7.81 7.07 7.64C7.25 7.47 7.45 7.37 7.62 7.37C7.79 7.37 7.95 7.37 8.09 7.38C8.24 7.39 8.37 7.39 8.49 7.67C8.61 7.95 8.92 8.75 9 8.92C9.08 9.09 9.17 9.27 9.08 9.44C9 9.61 8.91 9.71 8.74 9.88C8.57 10.05 8.44 10.16 8.33 10.27C8.21 10.38 8.1 10.51 8.21 10.69C8.31 10.87 8.76 11.51 9.49 12.18C10.42 12.99 11.14 13.25 11.4 13.35C11.67 13.44 11.91 13.41 12.09 13.2C12.26 12.99 12.55 12.63 12.77 12.35C12.98 12.07 13.19 12.04 13.43 12.13C13.67 12.22 14.53 12.64 14.76 12.76C14.99 12.88 15.13 12.93 15.19 13.01C15.25 13.1 15.25 13.31 15.19 13.42C15.13 13.53 14.99 13.68 14.76 13.8C14.53 13.92 14.18 14.1 13.97 14.21C13.76 14.31 13.61 14.37 13.61 14.54C13.61 14.71 13.97 14.98 14.28 15.22C14.58 15.45 14.81 15.54 14.97 15.63C15.13 15.72 15.25 15.72 15.36 15.72C15.47 15.72 16.14 15.33 16.37 15.09C16.59 14.85 16.87 14.98 16.87 15.2Z"/>
  </svg>
);

// FIRM SPECIFIC INFORMATION
export const COMPANY_BRAND_EN = "Sulaiman Alrawahi Law Firm";
export const COMPANY_BRAND_AR = "مكتب سليمان الرواحي للمحاماة";
export const COMPANY_TAGLINE_EN = ""; 
export const COMPANY_TAGLINE_AR = ""; 

export const FIRM_ADDRESS_EN = "Dawood Business Center, Al Khoudh St., Wilayat Al Seeb, Sultanate of Oman";
export const FIRM_ADDRESS_AR = "مركز داود للأعمال، شارع الخوض، ولاية السيب، سلطنة عُمان";
export const FIRM_PHONE_NUMBER_RAW = "+96899222615"; 
export const FIRM_PHONE_NUMBER_DISPLAY = "+968 9922 2615"; 
export const FIRM_EMAIL = "contact@salawfirm.om"; 
export const MAP_IFRAME_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.932800537877!2d58.17121237604089!3d23.60584997876879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8dfdd52f6c0139%3A0x7d28717c13a07850!2sJ56C%2B8P%20Seeb%2C%20Oman!5e0!3m2!1sen!2sae!4v1716383023805!5m2!1sen!2sae";
export const MAP_TITLE_EN = "Sulaiman Alrawahi Law Firm Location";
export const MAP_TITLE_AR = "موقع مكتب سليمان الرواحي للمحاماة";


// General Constants & UI Text
export const NAVIGATION_LINKS: NavLinkItem[] = [
  { label: 'Home', labelAr: 'الرئيسية', path: '/' },
  { label: 'About Us', labelAr: 'من نحن', path: '/about' },
  { label: 'Practice Areas', labelAr: 'مجالات العمل', path: '/practice-areas' },
  { label: 'Our Team', labelAr: 'فريقنا', path: '/team' },
  { label: 'Careers', labelAr: 'وظائف', path: '/careers' },
  { label: 'Contact Us', labelAr: 'اتصل بنا', path: '/contact' },
];

export const PRACTICE_AREAS_DATA: PracticeArea[] = [
  { 
    id: 'corporate', 
    nameEn: 'Corporate & Commercial Law', nameAr: 'قانون الشركات والتجارة',
    descriptionEn: 'Expert advice on mergers, acquisitions, and corporate governance.', descriptionAr: 'استشارات متخصصة في عمليات الدمج والاستحواذ وحوكمة الشركات.',
    icon: BriefcaseIcon, 
    longDescriptionEn: 'Our Corporate & Commercial Law team provides comprehensive legal services for businesses of all sizes. We assist with company formation, mergers and acquisitions, joint ventures, corporate restructuring, regulatory compliance, and day-to-day commercial contracts. We aim to provide practical, commercially-focused advice to help your business thrive.',
    longDescriptionAr: 'يقدم فريق قانون الشركات والتجارة لدينا خدمات قانونية شاملة للشركات من جميع الأحجام. نساعد في تأسيس الشركات، وعمليات الدمج والاستحواذ، والمشاريع المشتركة، وإعادة هيكلة الشركات، والامتثال التنظيمي، والعقود التجارية اليومية. هدفنا هو تقديم مشورة عملية تركز على الجانب التجاري لمساعدة عملك على الازدهار.',
    image: '/assets/images/practice-corporate.jpg'
  },
  { 
    id: 'litigation', 
    nameEn: 'Litigation & Dispute Resolution', nameAr: 'التقاضي وحل النزاعات',
    descriptionEn: 'Resolving complex disputes through negotiation and litigation.', descriptionAr: 'حل النزاعات المعقدة من خلال التفاوض والتقاضي.',
    icon: GavelIcon, 
    longDescriptionEn: 'We represent clients in a wide range of civil and commercial disputes before all levels of courts and arbitral tribunals. Our team is skilled in negotiation, mediation, and aggressive litigation strategies, always focused on achieving the best possible outcome for our clients in an efficient and cost-effective manner.',
    longDescriptionAr: 'نحن نمثل العملاء في مجموعة واسعة من النزاعات المدنية والتجارية أمام جميع مستويات المحاكم وهيئات التحكيم. فريقنا ماهر في التفاوض والوساطة واستراتيجيات التقاضي القوية، مع التركيز دائمًا على تحقيق أفضل نتيجة ممكنة لعملائنا بطريقة فعالة من حيث التكلفة.',
    image: '/assets/images/practice-litigation.jpg'
  },
  { 
    id: 'realestate', 
    nameEn: 'Real Estate & Construction', nameAr: 'العقارات والإنشاءات',
    descriptionEn: 'Guidance on property transactions and construction projects.', descriptionAr: 'إرشادات حول المعاملات العقارية ومشاريع البناء.',
    icon: BuildingOfficeIcon, 
    longDescriptionEn: 'Our real estate practice covers all aspects of property law, including sales and acquisitions, leasing, development projects, and construction contracts. We advise developers, investors, landlords, and tenants on navigating the complexities of real estate law and achieving their objectives.',
    longDescriptionAr: 'تغطي ممارستنا العقارية جميع جوانب قانون الملكية، بما في ذلك البيع والشراء، والتأجير، ومشاريع التطوير، وعقود البناء. ننصح المطورين والمستثمرين والملاك والمستأجرين بشأن التعامل مع تعقيدات قانون العقارات وتحقيق أهدافهم.',
    image: '/assets/images/practice-realestate.jpg'
  },
  { 
    id: 'family', 
    nameEn: 'Family Law', nameAr: 'قانون الأسرة',
    descriptionEn: 'Sensitive handling of family-related legal matters.', descriptionAr: 'معالجة حساسة للقضايا القانونية المتعلقة بالأسرة.',
    icon: UsersIcon, 
    longDescriptionEn: 'We offer compassionate and expert legal advice on all family law matters, including divorce, child custody, spousal support, and property division. Our approach is to handle these sensitive issues with discretion and a focus on amicable resolutions where possible, while vigorously protecting our clients\' interests.',
    longDescriptionAr: 'نقدم استشارات قانونية متعاطفة ومتخصصة في جميع مسائل قانون الأسرة، بما في ذلك الطلاق وحضانة الأطفال والنفقة الزوجية وتقسيم الممتلكات. نهجنا هو التعامل مع هذه القضايا الحساسة بسرية والتركيز على الحلول الودية حيثما أمكن، مع حماية مصالح عملائنا بقوة.',
    image: '/assets/images/practice-family.jpg'
  },
  { 
    id: 'ip', 
    nameEn: 'Intellectual Property', nameAr: 'الملكية الفكرية',
    descriptionEn: 'Protecting your innovations and creative works.', descriptionAr: 'حماية ابتكاراتك وأعمالك الإبداعية.',
    icon: ShieldCheckIcon, 
    longDescriptionEn: 'Our intellectual property team helps clients protect and enforce their valuable IP assets, including trademarks, patents, copyrights, and trade secrets. We provide services ranging from registration to licensing and litigation, ensuring your innovations remain secure.',
    longDescriptionAr: 'يساعد فريق الملكية الفكرية لدينا العملاء على حماية وإنفاذ أصولهم الفكرية القيمة، بما في ذلك العلامات التجارية وبراءات الاختراع وحقوق النشر والأسرار التجارية. نقدم خدمات تتراوح من التسجيل إلى الترخيص والتقاضي، مما يضمن بقاء ابتكاراتك آمنة.',
    image: '/assets/images/practice-ip.jpg'
  },
  { 
    id: 'international', 
    nameEn: 'International Trade Law', nameAr: 'قانون التجارة الدولية',
    descriptionEn: 'Navigating the complexities of global commerce.', descriptionAr: 'التنقل في تعقيدات التجارة العالمية.',
    icon: GlobeAltIcon, 
    longDescriptionEn: 'We advise businesses on international trade regulations, customs law, import/export compliance, and trade agreements. Our goal is to help clients expand their global reach while mitigating risks associated with cross-border transactions.',
    longDescriptionAr: 'ننصح الشركات بشأن لوائح التجارة الدولية وقانون الجمارك والامتثال للاستيراد والتصدير والاتفاقيات التجارية. هدفنا هو مساعدة العملاء على توسيع نطاق وصولهم العالمي مع التخفيف من المخاطر المرتبطة بالمعاملات عبر الحدود.',
    image: '/assets/images/practice-international.jpg'
  },
];

export const TEAM_MEMBERS_DATA: TeamMember[] = [
  { 
    id: 'tm1', 
    nameEn: 'Dr. Aisha Al-Fahad', nameAr: 'د. عائشة الفهد',
    titleEn: 'Managing Partner', titleAr: 'الشريك المدير',
    imageUrl: '/assets/images/team-aisha.jpg', 
    bioEn: 'Dr. Aisha Al-Fahad is the founding and managing partner of the firm. With over 20 years of experience, she specializes in corporate law and international arbitration. She is recognized for her strategic thinking and dedication to client success.',
    bioAr: 'الدكتورة عائشة الفهد هي الشريك المؤسس والمدير للمكتب. بخبرة تزيد عن 20 عامًا، تتخصص في قانون الشركات والتحكيم الدولي. وهي معروفة بتفكيرها الاستراتيجي وتفانيها في تحقيق نجاح العملاء.'
  },
  { 
    id: 'tm2', 
    nameEn: 'Mr. Omar Hassan', nameAr: 'السيد عمر حسن',
    titleEn: 'Senior Partner, Head of Litigation', titleAr: 'شريك أول، رئيس قسم التقاضي',
    imageUrl: '/assets/images/team-omar.jpg', 
    bioEn: 'Mr. Omar Hassan leads our litigation department. He has a distinguished track record in complex commercial disputes and is known for his formidable courtroom presence and meticulous preparation.',
    bioAr: 'يقود السيد عمر حسن قسم التقاضي لدينا. لديه سجل حافل في النزاعات التجارية المعقدة ومعروف بحضوره القوي في قاعة المحكمة وإعداده الدقيق.'
  },
  { 
    id: 'tm3', 
    nameEn: 'Ms. Fatima Khan', nameAr: 'السيدة فاطمة خان',
    titleEn: 'Partner, Real Estate Law', titleAr: 'شريك، قانون العقارات',
    imageUrl: '/assets/images/team-fatima.jpg', 
    bioEn: 'Ms. Fatima Khan is an expert in real estate and construction law. She advises on some of the largest property development projects in the region, providing insightful and practical legal solutions.',
    bioAr: 'السيدة فاطمة خان خبيرة في قانون العقارات والإنشاءات. تقدم المشورة بشأن بعض أكبر مشاريع التطوير العقاري في المنطقة، وتقدم حلولاً قانونية ثاقبة وعملية.'
  },
  { 
    id: 'tm4', 
    nameEn: 'Mr. Ali Ibrahim', nameAr: 'السيد علي إبراهيم',
    titleEn: 'Senior Associate, Corporate Law', titleAr: 'محام أول، قانون الشركات',
    imageUrl: '/assets/images/team-ali.jpg', 
    bioEn: 'Mr. Ali Ibrahim is a rising star in our corporate team, focusing on M&A and venture capital. He is praised for his sharp legal acumen and client-focused approach.',
    bioAr: 'السيد علي إبراهيم نجم صاعد في فريق الشركات لدينا، ويركز على عمليات الدمج والاستحواذ ورأس المال الاستثماري. وهو مشهود له ببراعته القانونية الحادة ونهجه الذي يركز على العميل.'
  },
];

export const FIRM_STATS_DATA: StatItem[] = [
  { value: 20, labelEn: "Years of Experience", labelAr: "سنوات من الخبرة", suffix: "+" },
  { value: 500, labelEn: "Satisfied Clients", labelAr: "عملاء راضون", suffix: "+" },
  { value: 95, labelEn: "Case Success Rate", labelAr: "معدل نجاح القضايا", suffix: "%" },
  { value: 10, labelEn: "Expert Lawyers", labelAr: "محامون خبراء", suffix: "+" },
];

export const COMPANY_MOTTO_EN = "Excellence in Law, Commitment to Clients.";
export const COMPANY_MOTTO_AR = "التميز في القانون، الالتزام تجاه العملاء.";
export const ABOUT_US_SHORT_EN = "We are a leading law firm dedicated to providing exceptional legal services across a wide range of practice areas. Our experienced team is committed to understanding your needs and achieving the best possible outcomes.";
export const ABOUT_US_SHORT_AR = "نحن شركة محاماة رائدة مكرسة لتقديم خدمات قانونية استثنائية عبر مجموعة واسعة من مجالات الممارسة. فريقنا المتمرس ملتزم بفهم احتياجاتك وتحقيق أفضل النتائج الممكنة.";

export const HOME_HERO_TITLE_EN = "Your Trusted Partner for <span class=\"text-amber-500\">Complex Legal Matters</span>";
export const HOME_HERO_TITLE_AR = "شريكك الموثوق به في <span class=\"text-amber-500\">القضايا القانونية المعقدة</span>";
export const HOME_HERO_SUBTITLE_EN = "We provide expert legal counsel and representation with a commitment to achieving the best outcomes for our clients.";
export const HOME_HERO_SUBTITLE_AR = "نقدم استشارات وتمثيلًا قانونيًا متخصصًا مع التزامنا بتحقيق أفضل النتائج لعملائنا.";
export const HOME_HERO_BUTTON_EN = "Learn More About Us";
export const HOME_HERO_BUTTON_AR = "اعرف المزيد عنا";

export const ABOUT_SECTION_TITLE_EN = "About Our Firm";
export const ABOUT_SECTION_TITLE_AR = "عن شركتنا";
export const ABOUT_SECTION_READ_MORE_EN = "Read More";
export const ABOUT_SECTION_READ_MORE_AR = "اقرأ المزيد";

export const HOME_LOCATION_TITLE_EN = "Find Us & Get in Touch";
export const HOME_LOCATION_TITLE_AR = "موقعنا و تواصل سريع";
export const HOME_LOCATION_OFFICE_SUBTITLE_EN = "Our Office";
export const HOME_LOCATION_OFFICE_SUBTITLE_AR = "مكتبنا";
export const HOME_LOCATION_DIRECT_CONTACT_SUBTITLE_EN = "Direct Contact";
export const HOME_LOCATION_DIRECT_CONTACT_SUBTITLE_AR = "الاتصال المباشر";
export const HOME_LOCATION_QUICK_CHAT_SUBTITLE_EN = "Quick Chat";
export const HOME_LOCATION_QUICK_CHAT_SUBTITLE_AR = "محادثة سريعة";
export const HOME_WHATSAPP_BUTTON_EN = "Chat on WhatsApp";
export const HOME_WHATSAPP_BUTTON_AR = "تواصل عبر الواتساب";

export const FOOTER_QUICK_LINKS_EN = "Quick Links";
export const FOOTER_QUICK_LINKS_AR = "روابط سريعة";
export const FOOTER_PRACTICE_AREAS_EN = "Practice Areas";
export const FOOTER_PRACTICE_AREAS_AR = "مجالات العمل";
export const FOOTER_CONTACT_US_EN = "Contact Us";
export const FOOTER_CONTACT_US_AR = "اتصل بنا";
export const FOOTER_COPYRIGHT_EN = `Sulaiman Alrawahi Law Firm. All rights reserved.`;
export const FOOTER_COPYRIGHT_AR = `مكتب سليمان الرواحي للمحاماة. جميع الحقوق محفوظة.`;

export const ABOUT_US_LONG_EN = `Established over two decades ago, Sulaiman Alrawahi Law Firm has grown into one of the most respected law firms in the region. Our foundation is built on a deep understanding of the law, a commitment to our clients' success, and a proactive approach to legal challenges. 
<br/><br/>
We pride ourselves on our client-centric philosophy, ensuring that we provide not only expert legal advice but also personalized attention and strategic solutions tailored to each client's unique situation. Our team of highly skilled lawyers brings a wealth of experience from diverse legal backgrounds, enabling us to offer comprehensive services that cover the full spectrum of our clients' needs.
<br/><br/>
Innovation, integrity, and excellence are the cornerstones of our practice. We continuously strive to stay ahead of legal trends and to employ cutting-edge strategies to protect our clients' interests and help them navigate an ever-evolving legal landscape. Whether you are an individual, a small business, or a large corporation, we are equipped to provide the highest caliber of legal representation.`;
export const ABOUT_US_LONG_AR = `تأسس مكتب سليمان الرواحي للمحاماة قبل أكثر من عقدين من الزمن، ونما ليصبح أحد أكثر مكاتب المحاماة احترامًا في المنطقة. يقوم أساسنا على فهم عميق للقانون، والتزام بنجاح عملائنا، ونهج استباقي للتحديات القانونية.
<br/><br/>
نحن نفخر بفلسفتنا التي تركز على العميل، مما يضمن أننا لا نقدم فقط مشورة قانونية متخصصة ولكن أيضًا اهتمامًا شخصيًا وحلولًا استراتيجية مصممة خصيصًا لكل حالة عميل فريدة. يجلب فريقنا من المحامين ذوي المهارات العالية ثروة من الخبرة من خلفيات قانونية متنوعة، مما يمكننا من تقديم خدمات شاملة تغطي النطاق الكامل لاحتياجات عملائنا.
<br/><br/>
الابتكار والنزاهة والتميز هي حجر الزاوية في ممارستنا. نسعى باستمرار للبقاء في طليعة الاتجاهات القانونية واستخدام استراتيجيات متطورة لحماية مصالح عملائنا ومساعدتهم على التنقل في مشهد قانوني دائم التطور. سواء كنت فردًا أو شركة صغيرة أو شركة كبيرة، فنحن مجهزون لتقديم أعلى مستوى من التمثيل القانوني.`;


export const CAREERS_INFO_EN = `
Join a dynamic and growing team dedicated to legal excellence. At Sulaiman Alrawahi Law Firm, we value talent, dedication, and a passion for law. We offer a stimulating work environment where you can grow your career and make a real impact.
<br/><br/>
We are always looking for exceptional individuals to join our firm. If you are a motivated legal professional or a bright graduate looking to start your career, we encourage you to explore opportunities with us.
<br/><br/>
Current Openings:
<br/>
- Senior Corporate Lawyer (5+ years PQE)
- Litigation Associate (2-4 years PQE)
- Legal Secretary / Paralegal
<br/><br/>
To apply, please send your CV and a cover letter to careers@salawfirm.om. We look forward to hearing from you.
`;
export const CAREERS_INFO_AR = `
انضم إلى فريق ديناميكي ومتنامٍ مكرس للتميز القانوني. في مكتب سليمان الرواحي للمحاماة، نقدر الموهبة والتفاني والشغف بالقانون. نحن نقدم بيئة عمل محفزة حيث يمكنك تطوير حياتك المهنية وإحداث تأثير حقيقي.
<br/><br/>
نبحث دائمًا عن أفراد استثنائيين للانضمام إلى مكتبنا. إذا كنت محترفًا قانونيًا متحمسًا أو خريجًا لامعًا تتطلع لبدء حياتك المهنية، فنحن نشجعك على استكشاف الفرص المتاحة لدينا.
<br/><br/>
الوظائف الشاغرة الحالية:
<br/>
- محامٍ أول متخصص في قانون الشركات (خبرة 5+ سنوات)
- محامٍ مساعد في قسم التقاضي (خبرة 2-4 سنوات)
- سكرتير قانوني / مساعد قانوني
<br/><br/>
للتقديم، يرجى إرسال سيرتك الذاتية وخطاب تعريفي إلى careers@salawfirm.om. نتطلع إلى تلقي طلبك.
`;

// WhatsApp Configuration
export const WHATSAPP_NUMBER = "96899222615"; 
export const WHATSAPP_MESSAGE_EN = "Hello! I'm interested in your legal services.";
export const WHATSAPP_MESSAGE_AR = "مرحباً! أنا مهتم بخدماتكم القانونية.";

// ARIA Labels and UI Text Constants
export const ARIA_LANG_SWITCHER_EN = "Switch to Arabic language";
export const ARIA_LANG_SWITCHER_AR = "التحويل إلى اللغة الإنجليزية";

export const ARIA_OPEN_MENU_EN = "Open menu";
export const ARIA_OPEN_MENU_AR = "فتح القائمة";
export const ARIA_CLOSE_MENU_EN = "Close menu";
export const ARIA_CLOSE_MENU_AR = "إغلاق القائمة";

export const CARD_BTN_LEARN_MORE_EN = "Learn More";
export const CARD_BTN_LEARN_MORE_AR = "اعرف المزيد";
export const CARD_BTN_VIEW_PROFILE_EN = "View Profile";
export const CARD_BTN_VIEW_PROFILE_AR = "عرض الملف الشخصي";

export const HOME_PRACTICE_AREAS_SECTION_TITLE_EN = "Our Practice Areas";
export const HOME_PRACTICE_AREAS_SECTION_TITLE_AR = "مجالات عملنا";
export const HOME_VIEW_ALL_PRACTICE_AREAS_BTN_EN = "View All Practice Areas";
export const HOME_VIEW_ALL_PRACTICE_AREAS_BTN_AR = "عرض جميع مجالات العمل";

export const HOME_TEAM_SECTION_TITLE_EN = "Meet Our Experts";
export const HOME_TEAM_SECTION_TITLE_AR = "تعرف على خبرائنا";
export const HOME_VIEW_ALL_TEAM_BTN_EN = "View All Team Members";
export const HOME_VIEW_ALL_TEAM_BTN_AR = "عرض كل أعضاء الفريق";

export const HOME_CTA_TITLE_EN = "Ready to Discuss Your Legal Needs?";
export const HOME_CTA_TITLE_AR = "هل أنت مستعد لمناقشة احتياجاتك القانونية؟";
export const HOME_CTA_SUBTITLE_EN = "Contact us today for a confidential consultation. Our expert team is here to provide the guidance and support you require.";
export const HOME_CTA_SUBTITLE_AR = "اتصل بنا اليوم للحصول على استشارة سرية. فريق الخبراء لدينا هنا لتقديم الإرشاد والدعم الذي تحتاجه.";
export const HOME_CTA_BUTTON_EN = "Get In Touch";
export const HOME_CTA_BUTTON_AR = "اتصل بنا";

// AboutPage (reusing NAV_LINKS where appropriate for title, or specific ones)
export const ABOUT_PAGE_TITLE_EN = "About Us"; // Consistent with NavLink
export const ABOUT_PAGE_TITLE_AR = "من نحن";   // Consistent with NavLink
export const ABOUT_PAGE_CORE_VALUES_TITLE_EN = "Our Core Values";
export const ABOUT_PAGE_CORE_VALUES_TITLE_AR = "قيمنا الأساسية";
export const ABOUT_PAGE_VALUE_INTEGRITY_TITLE_EN = "Integrity";
export const ABOUT_PAGE_VALUE_INTEGRITY_TITLE_AR = "النزاهة";
export const ABOUT_PAGE_VALUE_INTEGRITY_DESC_EN = "Upholding the highest ethical standards in all our dealings.";
export const ABOUT_PAGE_VALUE_INTEGRITY_DESC_AR = "التمسك بأعلى المعايير الأخلاقية في جميع تعاملاتنا.";
export const ABOUT_PAGE_VALUE_EXCELLENCE_TITLE_EN = "Excellence";
export const ABOUT_PAGE_VALUE_EXCELLENCE_TITLE_AR = "التميز";
export const ABOUT_PAGE_VALUE_EXCELLENCE_DESC_EN = "Striving for the best possible outcomes through diligent and expert work.";
export const ABOUT_PAGE_VALUE_EXCELLENCE_DESC_AR = "السعي لتحقيق أفضل النتائج الممكنة من خلال العمل الدؤوب والخبرة.";
export const ABOUT_PAGE_VALUE_CLIENT_CENTRIC_TITLE_EN = "Client-Centric";
export const ABOUT_PAGE_VALUE_CLIENT_CENTRIC_TITLE_AR = "التركيز على العميل";
export const ABOUT_PAGE_VALUE_CLIENT_CENTRIC_DESC_EN = "Placing our clients' needs and objectives at the forefront of our practice.";
export const ABOUT_PAGE_VALUE_CLIENT_CENTRIC_DESC_AR = "وضع احتياجات عملائنا وأهدافهم في مقدمة ممارستنا.";

// PracticeAreasPage
export const PRACTICE_AREAS_PAGE_TITLE_EN = "Our Practice Areas"; // Consistent with Home section
export const PRACTICE_AREAS_PAGE_TITLE_AR = "مجالات عملنا";   // Consistent with Home section

// OurTeamPage
export const TEAM_PAGE_TITLE_EN = "Meet Our Dedicated Team";
export const TEAM_PAGE_TITLE_AR = "تعرف على فريقنا المتخصص";

// CareersPage
export const CAREERS_PAGE_TITLE_EN = "Careers With Us";
export const CAREERS_PAGE_TITLE_AR = "وظائف معنا";

// ContactPage
export const CONTACT_PAGE_TITLE_EN = "Get In Touch"; // Reuse HOME_CTA_BUTTON_EN
export const CONTACT_PAGE_TITLE_AR = "اتصل بنا";   // Reuse HOME_CTA_BUTTON_AR
export const CONTACT_PAGE_INFO_SUBTITLE_EN = "Contact Information";
export const CONTACT_PAGE_INFO_SUBTITLE_AR = "معلومات الاتصال";
// CONTACT_PAGE_CHAT_BTN_EN/AR can reuse HOME_WHATSAPP_BUTTON_EN/AR
export const CONTACT_PAGE_OFFICE_HOURS_TITLE_EN = "Office Hours";
export const CONTACT_PAGE_OFFICE_HOURS_TITLE_AR = "ساعات العمل";
export const CONTACT_PAGE_OFFICE_HOURS_WEEKDAYS_EN = "Monday - Friday: 9:00 AM - 5:00 PM";
export const CONTACT_PAGE_OFFICE_HOURS_WEEKDAYS_AR = "الاثنين - الجمعة: 9:00 صباحًا - 5:00 مساءً";
export const CONTACT_PAGE_OFFICE_HOURS_WEEKEND_EN = "Saturday - Sunday: Closed";
export const CONTACT_PAGE_OFFICE_HOURS_WEEKEND_AR = "السبت - الأحد: مغلق";
export const CONTACT_PAGE_LOCATION_SUBTITLE_EN = "Our Location";
export const CONTACT_PAGE_LOCATION_SUBTITLE_AR = "موقعنا";
export const CONTACT_PAGE_FORM_SUBTITLE_EN = "Send Us a Message";
export const CONTACT_PAGE_FORM_SUBTITLE_AR = "أرسل لنا رسالة";
export const CONTACT_PAGE_FORM_SUCCESS_MSG_EN = "Thank you for your message! We will get back to you shortly.";
export const CONTACT_PAGE_FORM_SUCCESS_MSG_AR = "شكراً لرسالتك! سوف نرد عليك قريبا.";
export const CONTACT_PAGE_FORM_LABEL_NAME_EN = "Full Name";
export const CONTACT_PAGE_FORM_LABEL_NAME_AR = "الاسم الكامل";
export const CONTACT_PAGE_FORM_LABEL_EMAIL_EN = "Email Address";
export const CONTACT_PAGE_FORM_LABEL_EMAIL_AR = "عنوان البريد الإلكتروني";
export const CONTACT_PAGE_FORM_LABEL_SUBJECT_EN = "Subject";
export const CONTACT_PAGE_FORM_LABEL_SUBJECT_AR = "الموضوع";
export const CONTACT_PAGE_FORM_LABEL_MESSAGE_EN = "Message";
export const CONTACT_PAGE_FORM_LABEL_MESSAGE_AR = "الرسالة";
export const CONTACT_PAGE_FORM_BTN_SEND_EN = "Send Message";
export const CONTACT_PAGE_FORM_BTN_SEND_AR = "إرسال الرسالة";

// NotFoundPage
export const NOT_FOUND_PAGE_TITLE_EN = "Page Not Found";
export const NOT_FOUND_PAGE_TITLE_AR = "الصفحة غير موجودة";
export const NOT_FOUND_PAGE_MESSAGE_EN = "Sorry, the page you are looking for does not exist.";
export const NOT_FOUND_PAGE_MESSAGE_AR = "عذراً، الصفحة التي تبحث عنها غير موجودة.";
export const NOT_FOUND_PAGE_BTN_HOME_EN = "Go to Homepage";
export const NOT_FOUND_PAGE_BTN_HOME_AR = "الذهاب إلى الصفحة الرئيسية";

// WhatsApp Floating Button
export const WHATSAPP_FLOAT_BTN_ARIA_LABEL_EN = "Contact us on WhatsApp";
export const WHATSAPP_FLOAT_BTN_ARIA_LABEL_AR = "تواصل معنا عبر الواتساب";
// Title attribute for WhatsApp button can use the same constants as aria-label
    