
import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';
import { PracticeArea, TeamMember, NavLinkItem as OriginalNavLinkItem, StatItem } from './types'; // OriginalNavLinkItem might be slightly different
import {
  NAVIGATION_LINKS_NEW, COMPANY_NAME_EN, COMPANY_NAME_AR, HERO_TAGLINE_EN, HERO_TAGLINE_AR,
  CONTACT_PHONE_1_DISPLAY, CONTACT_PHONE_2_DISPLAY, CONTACT_PHONE_1_RAW, CONTACT_PHONE_2_RAW, CONTACT_EMAIL,
  ADDRESS_EN, ADDRESS_AR, MAP_IFRAME_SRC_NEW, HERO_CTA_EN, HERO_CTA_AR,
  ABOUT_SECTION_TITLE_EN, ABOUT_SECTION_TITLE_AR, ABOUT_WHO_WE_ARE_TITLE_EN, ABOUT_WHO_WE_ARE_TITLE_AR,
  ABOUT_WHO_WE_ARE_TEXT_EN, ABOUT_WHO_WE_ARE_TEXT_AR, FOUNDER_NAME_EN_NEW, FOUNDER_NAME_AR_NEW,
  FOUNDER_TITLE_EN_NEW, FOUNDER_TITLE_AR_NEW, FOUNDER_IMAGE_URL, FOUNDER_BIO_EN_NEW, FOUNDER_BIO_AR_NEW,
  VISION_TITLE_EN_NEW, VISION_TITLE_AR_NEW, VISION_TEXT_EN_NEW, VISION_TEXT_AR_NEW,
  MISSION_TITLE_EN_NEW, MISSION_TITLE_AR_NEW, MISSION_TEXT_EN_NEW, MISSION_TEXT_AR_NEW,
  PRINCIPLES_TITLE_EN_NEW, PRINCIPLES_TITLE_AR_NEW, PRINCIPLES_LIST_NEW,
  OBJECTIVES_TITLE_EN, OBJECTIVES_TITLE_AR, OBJECTIVES_LIST_EN_NEW, OBJECTIVES_LIST_AR_NEW,
  MECHANISM_TITLE_EN, MECHANISM_TITLE_AR, MECHANISM_TEXT_EN_NEW, MECHANISM_TEXT_AR_NEW,
  SERVICES_SECTION_TITLE_EN, SERVICES_SECTION_TITLE_AR, LEGAL_SERVICES_DATA_NEW, SERVICE_CARD_MORE_EN, SERVICE_CARD_MORE_AR,
  FAQ_SECTION_TITLE_EN, FAQ_SECTION_TITLE_AR, FAQ_DATA, FAQItem,
  CLIENTS_SECTION_TITLE_EN, CLIENTS_SECTION_TITLE_AR, CLIENT_LOGOS_DATA_NEW,
  CONTACT_SECTION_TITLE_EN, CONTACT_SECTION_TITLE_AR, CONTACT_FORM_TITLE_EN, CONTACT_FORM_TITLE_AR,
  CONTACT_DETAILS_TITLE_EN, CONTACT_DETAILS_TITLE_AR, OFFICE_HOURS_EN, OFFICE_HOURS_AR, WEEKEND_HOURS_EN, WEEKEND_HOURS_AR,
  FORM_LABEL_NAME_EN, FORM_LABEL_NAME_AR, FORM_LABEL_EMAIL_EN, FORM_LABEL_EMAIL_AR, FORM_LABEL_PHONE_EN, FORM_LABEL_PHONE_AR,
  FORM_LABEL_SUBJECT_EN, FORM_LABEL_SUBJECT_AR, FORM_LABEL_MESSAGE_EN, FORM_LABEL_MESSAGE_AR,
  FORM_SUBMIT_BTN_EN, FORM_SUBMIT_BTN_AR, FORM_SUCCESS_MSG_EN, FORM_SUCCESS_MSG_AR,
  FOOTER_TAGLINE_EN, FOOTER_TAGLINE_AR, FOOTER_COPYRIGHT_EN, FOOTER_COPYRIGHT_AR, FOOTER_QUICKLINKS_EN, FOOTER_QUICKLINKS_AR,
  ARIA_LANG_SWITCH_EN, ARIA_LANG_SWITCH_AR, ARIA_OPEN_MENU, ARIA_CLOSE_MENU,
  WHATSAPP_CTA_EN, WHATSAPP_CTA_AR, WHATSAPP_MESSAGE,
  PAGE_TITLE_HOME_EN, PAGE_TITLE_HOME_AR, PAGE_TITLE_ABOUT_EN, PAGE_TITLE_ABOUT_AR, PAGE_TITLE_SERVICES_EN, PAGE_TITLE_SERVICES_AR,
  PAGE_TITLE_FAQ_EN, PAGE_TITLE_FAQ_AR, PAGE_TITLE_CLIENTS_EN, PAGE_TITLE_CLIENTS_AR, PAGE_TITLE_CONTACT_EN, PAGE_TITLE_CONTACT_AR,
  PAGE_TITLE_NOT_FOUND_EN, PAGE_TITLE_NOT_FOUND_AR, NOT_FOUND_MESSAGE_EN, NOT_FOUND_MESSAGE_AR, NOT_FOUND_GO_HOME_EN, NOT_FOUND_GO_HOME_AR,
  GavelIcon, BriefcaseIcon, BuildingOfficeIcon, UsersIcon, ShieldCheckIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, PlusIcon, ChatBubbleLeftRightIcon, ChevronDownIcon, WhatsAppIcon
} from './constants';
import { NavLinkItem } from './types'; // Ensure NavLinkItem in types.ts matches what NAVIGATION_LINKS_NEW provides


// --- LANGUAGE CONTEXT ---
type Language = 'en' | 'ar';
interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (enStr: string, arStr: string) => string; // Simple translation helper
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const isRTL = language === 'ar';

  const toggleLanguage = useCallback(() => {
    setLanguageState((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);
  
  const t = useCallback((enStr: string, arStr: string) => {
    return language === 'en' ? enStr : arStr;
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// --- HELPER COMPONENTS ---
const ScrollToTop: React.FC = () => {
  const {pathname} = useLocation(); 
  useEffect(() => {
    window.scrollTo(0, 0);
    const menuCheckbox = document.getElementById('mobile-menu-toggle') as HTMLInputElement;
    if (menuCheckbox) menuCheckbox.checked = false;
  }, [pathname]); 
  return null;
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string; 
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, delay = 0, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current && observer) { 
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`${className || ''} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{transitionDelay: `${delay}ms`}}
    >
      {children}
    </div>
  );
};


// --- LAYOUT COMPONENTS ---
const Header: React.FC = () => {
  const { language, toggleLanguage, isRTL, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const lightBgPages = ['/about', '/services', '/faq', '/contact'];
  const pageNormallyUsesLightStyle = lightBgPages.includes(pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  // useLightHeaderStyleForBar determines if the main header bar should use light background and dark text
  const useLightHeaderStyleForBar = pageNormallyUsesLightStyle && !isScrolled && !isMenuOpen;

  let headerContainerBgClass = '';
  if (isScrolled || isMenuOpen) { // When scrolled or mobile menu is open, header bar is dark
    headerContainerBgClass = 'bg-firm-primary/90 shadow-lg'; 
  } else if (useLightHeaderStyleForBar) { // When at top of light page and menu closed
    headerContainerBgClass = 'bg-firm-base shadow-md'; 
  } else { // Default for dark pages like Home
    headerContainerBgClass = 'bg-transparent'; 
  }

  const hoverTextColorClass = 'hover:text-firm-accent'; 

  const navLinkClassForDesktop = ({ isActive }: { isActive: boolean }) => {
    let classes = `px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ease-in-out ${hoverTextColorClass}`;
    if (useLightHeaderStyleForBar) { 
      classes += isActive
        ? ' text-firm-primary font-bold underline underline-offset-4 decoration-firm-primary/70' 
        : ' text-firm-primary'; 
    } else { 
      classes += isActive
        ? ' text-firm-accent underline underline-offset-4 decoration-firm-accent' 
        : ' text-firm-base'; 
    }
    return classes;
  };
  
  const headerBarControlsTextColorClass = (isScrolled || isMenuOpen || !pageNormallyUsesLightStyle) ? 'text-firm-base' : 'text-firm-primary';


  // Mobile Menu Specific Styling
  const mobileMenuBgClass = pageNormallyUsesLightStyle ? 'bg-firm-base' : 'bg-firm-primary/95';
  const mobileMenuItemClass = ({ isActive }: { isActive: boolean }) => {
    let classes = `block px-3 py-2 rounded-md text-base font-medium transition-colors `;
    if (pageNormallyUsesLightStyle && isMenuOpen) { // Light mobile menu background
      classes += isActive 
        ? `text-firm-accent font-bold underline underline-offset-4 decoration-firm-accent` // Active: Gold text, gold underline
        : `text-firm-primary hover:text-firm-accent`; // Inactive: Blue text, hover gold
    } else { // Dark mobile menu background (default or when header itself is dark)
      classes += isActive 
        ? `bg-firm-accent text-firm-primary` // Active: Blue on Gold BG
        : `text-firm-base hover:bg-firm-accent/20 hover:text-firm-accent`; // Inactive: White text, hover gold
    }
    return classes;
  };


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerContainerBgClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={closeMenu}>
            <img src="/assets/images/logo-haneen.png" alt={t(COMPANY_NAME_EN, COMPANY_NAME_AR)} className="h-12 md:h-14 object-contain" />
          </Link>
          <div className="flex items-center">
            <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
              {NAVIGATION_LINKS_NEW.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={navLinkClassForDesktop}
                >
                  {isRTL ? link.labelAr : link.label}
                </NavLink>
              ))}
            </nav>
            <div className={`mx-2 hidden lg:block border-l h-6 ${useLightHeaderStyleForBar ? 'border-firm-primary/30' : 'border-firm-base/30'} ${isRTL ? 'lg:mr-3' : 'lg:ml-3'}`}></div>
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-md text-sm font-semibold transition-colors duration-200 ease-in-out hover:bg-firm-accent/20 flex items-center ${headerBarControlsTextColorClass} ${hoverTextColorClass}`}
              aria-label={t(ARIA_LANG_SWITCH_EN, ARIA_LANG_SWITCH_AR)}
            >
              <span className={`fi fi-${language === 'en' ? 'gb' : 'om'} mr-2 rtl:ml-2`}></span> {/* Needs flag-icons-css */}
              {language === 'en' ? 'AR' : 'EN'}
            </button>
            <div className="lg:hidden ml-2 rtl:mr-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${headerBarControlsTextColorClass} ${hoverTextColorClass}`}
                aria-label={isMenuOpen ? ARIA_CLOSE_MENU : ARIA_OPEN_MENU}
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`lg:hidden shadow-lg ${mobileMenuBgClass}`}>
          <nav className="px-4 pt-2 pb-4 space-y-1">
            {NAVIGATION_LINKS_NEW.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={mobileMenuItemClass}
              >
                {isRTL ? link.labelAr : link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  const { language, isRTL, t } = useLanguage();
  return (
    <footer className="bg-firm-primary border-t-2 border-firm-accent text-firm-base/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img src="/assets/images/logo-haneen.png" alt={t(COMPANY_NAME_EN, COMPANY_NAME_AR)} className="h-16 mb-4 object-contain" />
            <p className="text-sm mb-2">{t(COMPANY_NAME_EN, COMPANY_NAME_AR)}</p>
            <p className="text-xs">{t(FOOTER_TAGLINE_EN, FOOTER_TAGLINE_AR)}</p>
          </div>
          <div>
            <h5 className="font-semibold text-firm-base mb-3">{t(FOOTER_QUICKLINKS_EN, FOOTER_QUICKLINKS_AR)}</h5>
            <ul className="space-y-2 text-sm">
              {NAVIGATION_LINKS_NEW.map(link => (
                <li key={link.path}><Link to={link.path} className="hover:text-firm-accent transition-colors">{isRTL ? link.labelAr : link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-firm-base mb-3">{t(CONTACT_DETAILS_TITLE_EN, CONTACT_DETAILS_TITLE_AR)}</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPinIcon className={`w-4 h-4 mt-1 flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{t(ADDRESS_EN, ADDRESS_AR)}</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className={`w-4 h-4 flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <a href={`tel:${CONTACT_PHONE_1_RAW}`} className="hover:text-firm-accent">{CONTACT_PHONE_1_DISPLAY}</a>
              </li>
               <li className="flex items-center">
                <PhoneIcon className={`w-4 h-4 flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <a href={`tel:${CONTACT_PHONE_2_RAW}`} className="hover:text-firm-accent">{CONTACT_PHONE_2_DISPLAY}</a>
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className={`w-4 h-4 flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-firm-accent">{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>
           <div>
            <h5 className="font-semibold text-firm-base mb-3">{t("Office Hours", "ساعات العمل")}</h5>
             <p className="text-sm">{t(OFFICE_HOURS_EN, OFFICE_HOURS_AR)}</p>
             <p className="text-sm">{t(WEEKEND_HOURS_EN, WEEKEND_HOURS_AR)}</p>
          </div>
        </div>
        <div className="text-center text-xs border-t border-firm-base/20 pt-8">
          <p>{t(FOOTER_COPYRIGHT_EN, FOOTER_COPYRIGHT_AR)}</p>
        </div>
      </div>
    </footer>
  );
};

const PageWrapper: React.FC<{ titleEn: string; titleAr: string; children: React.ReactNode; className?: string }> = ({ titleEn, titleAr, children, className }) => {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = `${t(titleEn, titleAr)} - ${t(COMPANY_NAME_EN, COMPANY_NAME_AR)}`;
  }, [t, titleEn, titleAr]);
  return <main className={`pt-24 pb-12 ${className}`}>{children}</main>;
};

const SectionTitle: React.FC<{ titleEn: string; titleAr: string; subtitleEn?: string; subtitleAr?: string; isTextOnLight?: boolean }> = ({ titleEn, titleAr, subtitleEn, subtitleAr, isTextOnLight }) => {
  const { t } = useLanguage();
  const titleColorClass = isTextOnLight ? 'text-firm-primary' : 'text-firm-accent';
  const subtitleColorClass = isTextOnLight ? 'text-firm-primary/80' : 'text-firm-base/80';
  return (
    <div className="mb-12 text-center">
      <h2 className={`text-3xl md:text-4xl font-bold ${titleColorClass} ${t('font-english', 'font-arabic')}`}>{t(titleEn, titleAr)}</h2>
      {subtitleEn && subtitleAr && <p className={`mt-2 text-lg ${subtitleColorClass}`}>{t(subtitleEn, subtitleAr)}</p>}
    </div>
  );
};

const WhatsAppFloatButton: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const whatsappUrl = `https://wa.me/${CONTACT_PHONE_1_RAW.replace(/\s+/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-40 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-xl transition-transform hover:scale-110 flex items-center space-x-2 rtl:space-x-reverse`}
      aria-label={t(WHATSAPP_CTA_EN, WHATSAPP_CTA_AR)}
    >
      <WhatsAppIcon className="w-6 h-6" />
    </a>
  );
};

// --- PAGE COMPONENTS ---
const HomePage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const whatsappUrl = `https://wa.me/${CONTACT_PHONE_1_RAW.replace(/\s+/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <PageWrapper titleEn={PAGE_TITLE_HOME_EN} titleAr={PAGE_TITLE_HOME_AR}>
      {/* Hero Section */}
      <section className="relative hero-section-bg text-firm-text-on-dark -mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center items-center text-center pt-20">
          <AnimatedSection delay={0} className="mb-8 md:mb-10">
            <img src="/assets/images/logo-haneen.png" alt={t(COMPANY_NAME_EN, COMPANY_NAME_AR)} className="h-24 md:h-32 object-contain mx-auto" />
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${t('font-english', 'font-arabic')}`}>{t(HERO_TAGLINE_EN, HERO_TAGLINE_AR)}</h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-xl sm:text-2xl mb-4">
              <a href={`tel:${CONTACT_PHONE_1_RAW}`} className="hover:text-firm-accent">{CONTACT_PHONE_1_DISPLAY}</a>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <p className="text-xl sm:text-2xl mb-8">
              <a href={`tel:${CONTACT_PHONE_2_RAW}`} className="hover:text-firm-accent">{CONTACT_PHONE_2_DISPLAY}</a>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:sm:space-x-reverse">
              <Link 
                to="/contact" 
                className="bg-firm-accent text-firm-primary hover:bg-opacity-90 font-semibold py-3 px-10 rounded-md text-lg transition-colors shadow-lg"
              >
                {t(HERO_CTA_EN, HERO_CTA_AR)}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md text-lg transition-colors shadow-lg flex items-center justify-center space-x-2 rtl:space-x-reverse"
                aria-label={t(WHATSAPP_CTA_EN, WHATSAPP_CTA_AR)}
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>{t(WHATSAPP_CTA_EN, WHATSAPP_CTA_AR)}</span>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-16 md:py-24 bg-firm-primary text-firm-text-on-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle titleEn={ABOUT_WHO_WE_ARE_TITLE_EN} titleAr={ABOUT_WHO_WE_ARE_TITLE_AR} />
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className={isRTL ? "md:order-2" : ""}>
              <img src={FOUNDER_IMAGE_URL} alt={t(FOUNDER_NAME_EN_NEW, FOUNDER_NAME_AR_NEW)} className="rounded-full w-64 h-64 mx-auto md:mx-0 object-cover border-4 border-firm-accent shadow-xl"/>
            </div>
            <div className={isRTL ? "md:order-1" : ""}>
              <h3 className={`text-2xl font-semibold text-firm-base mb-2 ${t('font-english', 'font-arabic')}`}>{t(FOUNDER_NAME_EN_NEW, FOUNDER_NAME_AR_NEW)}</h3>
              <p className="text-firm-accent mb-4">{t(FOUNDER_TITLE_EN_NEW, FOUNDER_TITLE_AR_NEW)}</p>
              <p className="text-firm-base/80 leading-relaxed mb-6 whitespace-pre-line text-sm">
                {(isRTL ? ABOUT_WHO_WE_ARE_TEXT_AR : ABOUT_WHO_WE_ARE_TEXT_EN).substring(0,300)}...
              </p>
              <Link to="/about" className="text-firm-accent hover:underline font-semibold">
                {t("Read More About Us", "اقرأ المزيد عنا")} &rarr;
              </Link>
            </div>
          </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Snippet */}
      <section className="py-16 md:py-24 bg-firm-primary text-firm-text-on-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle titleEn={SERVICES_SECTION_TITLE_EN} titleAr={SERVICES_SECTION_TITLE_AR} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {LEGAL_SERVICES_DATA_NEW.slice(0, 6).map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 100} className="content-card flex flex-col">
                {service.icon && <service.icon className="w-10 h-10 mb-4" />}
                <h4 className={`text-xl font-semibold text-firm-base mb-2 ${t('font-english', 'font-arabic')}`}>{t(service.nameEn, service.nameAr)}</h4>
                <p className="text-firm-base/80 text-sm leading-relaxed flex-grow">{t(service.descriptionEn, service.descriptionAr).substring(0,120)}...</p>
                 <Link to={`/services#${service.id}`} className="mt-4 text-firm-accent hover:underline font-semibold self-start">
                  {t(SERVICE_CARD_MORE_EN, SERVICE_CARD_MORE_AR)}
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="bg-firm-accent text-firm-primary hover:bg-opacity-90 font-semibold py-3 px-8 rounded-md text-lg transition-colors">
              {t("View All Services", "عرض جميع الخدمات")}
            </Link>
          </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* FAQ Snippet */}
       <section className="py-16 md:py-24 bg-firm-base text-firm-text-on-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle titleEn={FAQ_SECTION_TITLE_EN} titleAr={FAQ_SECTION_TITLE_AR} isTextOnLight />
           <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_DATA.slice(0,1).map((faq, index) => ( // Show first FAQ as snippet
              <details key={index} className="accordion-item bg-firm-base border border-firm-primary/20 rounded-lg shadow-sm">
                <summary className="text-firm-primary">
                  <span className={t('font-english', 'font-arabic')}>{t(faq.questionEn, faq.questionAr)}</span>
                </summary>
                <div className="accordion-content text-firm-primary/80">
                  <p className="whitespace-pre-line">{t(faq.answerEn, faq.answerAr)}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/faq" className="border-2 border-firm-accent text-firm-accent hover:bg-firm-accent hover:text-firm-base font-semibold py-3 px-8 rounded-md text-lg transition-colors">
              {t("View All FAQs", "عرض جميع الأسئلة")}
            </Link>
          </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Clients Snippet */}
      <section className="py-16 md:py-24 bg-firm-primary text-firm-text-on-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle titleEn={CLIENTS_SECTION_TITLE_EN} titleAr={CLIENTS_SECTION_TITLE_AR} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
            {CLIENT_LOGOS_DATA_NEW.slice(0,5).map((client, index) => ( 
              <div key={index} className="p-4 bg-firm-primary rounded-lg border border-firm-accent flex justify-center items-center h-24 content-card"> {/* Ensured content-card is applied for styling */}
                <img src={client.logoUrl} alt={client.name} title={client.name} className="max-h-16 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            ))}
          </div>
           <div className="text-center mt-12">
            <Link to="/clients" className="bg-firm-accent text-firm-primary hover:bg-opacity-90 font-semibold py-3 px-8 rounded-md text-lg transition-colors">
              {t("View All Clients", "عرض جميع العملاء")}
            </Link>
          </div>
          </AnimatedSection>
        </div>
      </section>
       {/* Location Snippet on Home Page */}
       <section className="py-16 md:py-24 bg-firm-primary text-firm-text-on-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
            <SectionTitle titleEn="Our Location" titleAr="موقعنا" />
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-firm-accent shadow-xl max-w-4xl mx-auto">
                <iframe
                    src={MAP_IFRAME_SRC_NEW}
                    width="100%" height="450" style={{ border: 0 }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title={t("Our Location", "موقعنا")}
                ></iframe>
            </div>
            </AnimatedSection>
        </div>
      </section>
    </PageWrapper>
  );
};

const AboutPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  return (
    <PageWrapper titleEn={PAGE_TITLE_ABOUT_EN} titleAr={PAGE_TITLE_ABOUT_AR} className="bg-firm-base text-firm-text-on-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatedSection>
        <SectionTitle titleEn={ABOUT_SECTION_TITLE_EN} titleAr={ABOUT_SECTION_TITLE_AR} isTextOnLight />
        
        {/* Who We Are */}
        <section className="mb-16">
          <h3 className={`text-2xl font-semibold mb-6 text-firm-primary ${isRTL ? 'text-right' : 'text-left'} ${t('font-english', 'font-arabic')}`}>{t(ABOUT_WHO_WE_ARE_TITLE_EN, ABOUT_WHO_WE_ARE_TITLE_AR)}</h3>
          <p className="leading-relaxed whitespace-pre-line text-firm-primary/80 mb-8">{t(ABOUT_WHO_WE_ARE_TEXT_EN, ABOUT_WHO_WE_ARE_TEXT_AR)}</p>
        </section>

        {/* Founder Profile */}
        <section className="mb-16 grid md:grid-cols-3 gap-8 items-center bg-firm-primary text-firm-text-on-dark p-8 rounded-lg shadow-xl border-t-4 border-firm-accent">
          <div className={`md:col-span-1 flex justify-center ${isRTL ? 'md:order-2' : ''}`}>
            <img src={FOUNDER_IMAGE_URL} alt={t(FOUNDER_NAME_EN_NEW, FOUNDER_NAME_AR_NEW)} className="rounded-full w-52 h-52 object-cover border-4 border-firm-accent shadow-lg"/>
          </div>
          <div className={`md:col-span-2 ${isRTL ? 'md:order-1' : ''}`}>
            <h3 className={`text-2xl font-bold text-firm-accent mb-1 ${t('font-english', 'font-arabic')}`}>{t(FOUNDER_NAME_EN_NEW, FOUNDER_NAME_AR_NEW)}</h3>
            <p className="text-firm-base/80 mb-4">{t(FOUNDER_TITLE_EN_NEW, FOUNDER_TITLE_AR_NEW)}</p>
            <p className="text-firm-base/90 leading-relaxed whitespace-pre-line text-sm">{t(FOUNDER_BIO_EN_NEW, FOUNDER_BIO_AR_NEW)}</p>
          </div>
        </section>

        {/* Vision, Mission, Principles */}
         <section className="mb-16 grid md:grid-cols-3 gap-8">
          <div className="content-card content-card-light"> {/* Use content-card-light for light background */}
            <h4 className={`text-xl font-semibold text-firm-primary mb-3 ${t('font-english', 'font-arabic')}`}>{t(VISION_TITLE_EN_NEW, VISION_TITLE_AR_NEW)}</h4>
            <p className="text-sm leading-relaxed text-firm-primary/80">{t(VISION_TEXT_EN_NEW, VISION_TEXT_AR_NEW)}</p>
          </div>
          <div className="content-card content-card-light">
            <h4 className={`text-xl font-semibold text-firm-primary mb-3 ${t('font-english', 'font-arabic')}`}>{t(MISSION_TITLE_EN_NEW, MISSION_TITLE_AR_NEW)}</h4>
            <p className="text-sm leading-relaxed text-firm-primary/80">{t(MISSION_TEXT_EN_NEW, MISSION_TEXT_AR_NEW)}</p>
          </div>
          <div className="content-card content-card-light">
            <h4 className={`text-xl font-semibold text-firm-primary mb-3 ${t('font-english', 'font-arabic')}`}>{t(PRINCIPLES_TITLE_EN_NEW, PRINCIPLES_TITLE_AR_NEW)}</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-firm-primary/80">
              {PRINCIPLES_LIST_NEW.map(p => <li key={t(p.en,p.ar)}>{t(p.en, p.ar)}</li>)}
            </ul>
          </div>
        </section>

        {/* Objectives & Mechanism */}
        <section className="grid md:grid-cols-2 gap-12">
           <div className="p-6 border border-firm-primary/20 rounded-lg">
                <h3 className={`text-xl font-semibold mb-4 text-firm-primary ${isRTL ? 'text-right' : 'text-left'} ${t('font-english', 'font-arabic')}`}>{t(OBJECTIVES_TITLE_EN, OBJECTIVES_TITLE_AR)}</h3>
                <ul className={`list-disc space-y-2 text-firm-primary/80 ${isRTL ? 'list-outside mr-5 text-right' : 'list-inside ml-0 text-left'}`}>
                    {(isRTL ? OBJECTIVES_LIST_AR_NEW : OBJECTIVES_LIST_EN_NEW).map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
            <div className="p-6 border border-firm-primary/20 rounded-lg">
                <h3 className={`text-xl font-semibold mb-4 text-firm-primary ${isRTL ? 'text-right' : 'text-left'} ${t('font-english', 'font-arabic')}`}>{t(MECHANISM_TITLE_EN, MECHANISM_TITLE_AR)}</h3>
                <div className={`space-y-3 text-firm-primary/80 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {(isRTL ? MECHANISM_TEXT_AR_NEW : MECHANISM_TEXT_EN_NEW).map((item, i) => <p key={i}>{item}</p>)}
                </div>
            </div>
        </section>
        </AnimatedSection>
      </div>
    </PageWrapper>
  );
};

const ServicesPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const headerOffset = 80; 
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location.hash]); 

  return (
    <PageWrapper titleEn={PAGE_TITLE_SERVICES_EN} titleAr={PAGE_TITLE_SERVICES_AR} className="bg-firm-base text-firm-text-on-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle titleEn={SERVICES_SECTION_TITLE_EN} titleAr={SERVICES_SECTION_TITLE_AR} isTextOnLight />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEGAL_SERVICES_DATA_NEW.map((service, index) => (
            <AnimatedSection id={service.id} key={service.id} delay={index * 100} className="content-card content-card-light flex flex-col items-start scroll-mt-24">
              {service.icon && <service.icon className="w-10 h-10 mb-4" />}
              <h3 className={`text-xl font-semibold text-firm-primary mb-2 ${t('font-english', 'font-arabic')}`}>{t(service.nameEn, service.nameAr)}</h3>
              <p className="text-firm-primary/80 text-sm leading-relaxed flex-grow">{t(service.descriptionEn, service.descriptionAr)}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

const FaqPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <PageWrapper titleEn={PAGE_TITLE_FAQ_EN} titleAr={PAGE_TITLE_FAQ_AR} className="bg-firm-base text-firm-text-on-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle titleEn={FAQ_SECTION_TITLE_EN} titleAr={FAQ_SECTION_TITLE_AR} isTextOnLight />
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <details className="accordion-item bg-firm-base border border-firm-primary/20 rounded-lg shadow-sm">
                <summary className="text-firm-primary">
                  <span className={t('font-english', 'font-arabic')}>{t(faq.questionEn, faq.questionAr)}</span>
                </summary>
                <div className="accordion-content text-firm-primary/80">
                  <p className="whitespace-pre-line">{t(faq.answerEn, faq.answerAr)}</p>
                </div>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

const ClientsPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <PageWrapper titleEn={PAGE_TITLE_CLIENTS_EN} titleAr={PAGE_TITLE_CLIENTS_AR} className="bg-firm-primary text-firm-text-on-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle titleEn={CLIENTS_SECTION_TITLE_EN} titleAr={CLIENTS_SECTION_TITLE_AR} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
            {CLIENT_LOGOS_DATA_NEW.map((client, index) => (
              <AnimatedSection key={index} delay={index * 50} className="p-6 bg-firm-primary rounded-lg border border-firm-accent flex justify-center items-center h-28 content-card">
                <img src={client.logoUrl} alt={client.name} title={client.name} className="max-h-full object-contain"  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<span class='text-firm-accent text-sm'>${client.name}</span>`; }}/>
              </AnimatedSection>
            ))}
        </div>
      </div>
    </PageWrapper>
  );
};

const ContactPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const whatsappUrl = `https://wa.me/${CONTACT_PHONE_1_RAW.replace(/\s+/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <PageWrapper titleEn={PAGE_TITLE_CONTACT_EN} titleAr={PAGE_TITLE_CONTACT_AR} className="bg-firm-base text-firm-text-on-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionTitle titleEn={CONTACT_SECTION_TITLE_EN} titleAr={CONTACT_SECTION_TITLE_AR} isTextOnLight />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <AnimatedSection className={`space-y-8 p-8 rounded-lg shadow-xl bg-firm-primary text-firm-text-on-dark content-card ${isRTL ? 'md:order-2' : ''}`}>
            <div>
              <h3 className={`text-xl font-semibold text-firm-accent mb-3 ${t('font-english','font-arabic')}`}>{t(CONTACT_DETAILS_TITLE_EN, CONTACT_DETAILS_TITLE_AR)}</h3>
              <p className="flex items-center mb-2"><MapPinIcon className={`w-5 h-5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} /> {t(ADDRESS_EN, ADDRESS_AR)}</p>
              <p className="flex items-center mb-2"><PhoneIcon className={`w-5 h-5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} /> <a href={`tel:${CONTACT_PHONE_1_RAW}`} className="hover:text-firm-accent">{CONTACT_PHONE_1_DISPLAY}</a></p>
              <p className="flex items-center mb-2"><PhoneIcon className={`w-5 h-5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} /> <a href={`tel:${CONTACT_PHONE_2_RAW}`} className="hover:text-firm-accent">{CONTACT_PHONE_2_DISPLAY}</a></p>
              <p className="flex items-center"><EnvelopeIcon className={`w-5 h-5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} /> <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-firm-accent">{CONTACT_EMAIL}</a></p>
            </div>
            <div>
              <h3 className={`text-xl font-semibold text-firm-accent mb-3 ${t('font-english','font-arabic')}`}>{t("Office Hours", "ساعات العمل")}</h3>
              <p>{t(OFFICE_HOURS_EN, OFFICE_HOURS_AR)}</p>
              <p>{t(WEEKEND_HOURS_EN, WEEKEND_HOURS_AR)}</p>
            </div>
             <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden border-2 border-firm-accent">
                <iframe
                    src={MAP_IFRAME_SRC_NEW}
                    width="100%" height="300" style={{ border: 0 }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title={t("Our Location", "موقعنا")}
                ></iframe>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={200} className={`p-8 rounded-lg shadow-xl bg-firm-primary text-firm-text-on-dark content-card ${isRTL ? 'md:order-1' : ''}`}>
            <h3 className={`text-xl font-semibold text-firm-accent mb-6 ${t('font-english','font-arabic')}`}>{t(CONTACT_FORM_TITLE_EN, CONTACT_FORM_TITLE_AR)}</h3>
            {isSubmitted && (
              <div className="mb-4 p-3 bg-green-500/20 text-green-300 border border-green-500 rounded-md text-sm">
                {t(FORM_SUCCESS_MSG_EN, FORM_SUCCESS_MSG_AR)}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-firm-base/80 mb-1">{t(FORM_LABEL_NAME_EN, FORM_LABEL_NAME_AR)}</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full form-input" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-firm-base/80 mb-1">{t(FORM_LABEL_EMAIL_EN, FORM_LABEL_EMAIL_AR)}</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full form-input" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-firm-base/80 mb-1">{t(FORM_LABEL_PHONE_EN, FORM_LABEL_PHONE_AR)}</label>
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full form-input" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-firm-base/80 mb-1">{t(FORM_LABEL_SUBJECT_EN, FORM_LABEL_SUBJECT_AR)}</label>
                <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="w-full form-input" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-firm-base/80 mb-1">{t(FORM_LABEL_MESSAGE_EN, FORM_LABEL_MESSAGE_AR)}</label>
                <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={4} required className="w-full form-input"></textarea>
              </div>
              <div className="space-y-3">
                <button type="submit" className="w-full bg-firm-accent text-firm-primary hover:bg-opacity-90 font-semibold py-3 px-6 rounded-md transition-colors shadow-md">
                  {t(FORM_SUBMIT_BTN_EN, FORM_SUBMIT_BTN_AR)}
                </button>
                 <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition-colors shadow-md flex items-center justify-center space-x-2 rtl:space-x-reverse"
                    aria-label={t(WHATSAPP_CTA_EN, WHATSAPP_CTA_AR)}
                >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>{t(WHATSAPP_CTA_EN, WHATSAPP_CTA_AR)}</span>
                </a>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </PageWrapper>
  );
};

const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <PageWrapper titleEn={PAGE_TITLE_NOT_FOUND_EN} titleAr={PAGE_TITLE_NOT_FOUND_AR} className="bg-firm-primary text-firm-text-on-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-6xl font-bold text-firm-accent mb-4">404</h1>
        <h2 className={`text-3xl font-semibold mb-6 ${t('font-english', 'font-arabic')}`}>{t(PAGE_TITLE_NOT_FOUND_EN, PAGE_TITLE_NOT_FOUND_AR)}</h2>
        <p className="text-lg text-firm-base/80 mb-8">{t(NOT_FOUND_MESSAGE_EN, NOT_FOUND_MESSAGE_AR)}</p>
        <Link to="/" className="bg-firm-accent text-firm-primary hover:bg-opacity-90 font-semibold py-3 px-8 rounded-md text-lg transition-colors">
          {t(NOT_FOUND_GO_HOME_EN, NOT_FOUND_GO_HOME_AR)}
        </Link>
      </div>
    </PageWrapper>
  );
};


// --- MAIN APP ---
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <WhatsAppFloatButton />
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
