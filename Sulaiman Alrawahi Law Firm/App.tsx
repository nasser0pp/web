
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useParams, useNavigate } from 'react-router-dom';
import { PracticeArea, TeamMember, NavLinkItem, StatItem } from './types';
import { 
  NAVIGATION_LINKS, 
  PRACTICE_AREAS_DATA, 
  TEAM_MEMBERS_DATA, 
  FIRM_STATS_DATA,
  COMPANY_MOTTO_EN, COMPANY_MOTTO_AR,
  ABOUT_US_SHORT_EN, ABOUT_US_SHORT_AR,
  ABOUT_US_LONG_EN, ABOUT_US_LONG_AR,
  CAREERS_INFO_EN, CAREERS_INFO_AR,
  GavelIcon, BriefcaseIcon, BuildingOfficeIcon, UsersIcon, ShieldCheckIcon, GlobeAltIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, ChevronRightIcon, WhatsAppIcon,
  COMPANY_BRAND_EN, COMPANY_BRAND_AR, COMPANY_TAGLINE_EN, COMPANY_TAGLINE_AR,
  HOME_HERO_TITLE_EN, HOME_HERO_TITLE_AR, HOME_HERO_SUBTITLE_EN, HOME_HERO_SUBTITLE_AR, HOME_HERO_BUTTON_EN, HOME_HERO_BUTTON_AR,
  ABOUT_SECTION_TITLE_EN, ABOUT_SECTION_TITLE_AR, ABOUT_SECTION_READ_MORE_EN, ABOUT_SECTION_READ_MORE_AR,
  HOME_LOCATION_TITLE_EN, HOME_LOCATION_TITLE_AR, 
  HOME_LOCATION_OFFICE_SUBTITLE_EN, HOME_LOCATION_OFFICE_SUBTITLE_AR,
  HOME_LOCATION_DIRECT_CONTACT_SUBTITLE_EN, HOME_LOCATION_DIRECT_CONTACT_SUBTITLE_AR,
  HOME_LOCATION_QUICK_CHAT_SUBTITLE_EN, HOME_LOCATION_QUICK_CHAT_SUBTITLE_AR,
  HOME_WHATSAPP_BUTTON_EN, HOME_WHATSAPP_BUTTON_AR,
  FOOTER_QUICK_LINKS_EN, FOOTER_QUICK_LINKS_AR, FOOTER_PRACTICE_AREAS_EN, FOOTER_PRACTICE_AREAS_AR, FOOTER_CONTACT_US_EN, FOOTER_CONTACT_US_AR, FOOTER_COPYRIGHT_EN, FOOTER_COPYRIGHT_AR,
  WHATSAPP_NUMBER, WHATSAPP_MESSAGE_EN, WHATSAPP_MESSAGE_AR,
  FIRM_ADDRESS_EN, FIRM_ADDRESS_AR, FIRM_PHONE_NUMBER_RAW, FIRM_PHONE_NUMBER_DISPLAY, FIRM_EMAIL, MAP_IFRAME_SRC, MAP_TITLE_EN, MAP_TITLE_AR,

  // New UI Text Constants
  ARIA_LANG_SWITCHER_EN, ARIA_LANG_SWITCHER_AR,
  ARIA_OPEN_MENU_EN, ARIA_OPEN_MENU_AR, ARIA_CLOSE_MENU_EN, ARIA_CLOSE_MENU_AR,
  CARD_BTN_LEARN_MORE_EN, CARD_BTN_LEARN_MORE_AR,
  CARD_BTN_VIEW_PROFILE_EN, CARD_BTN_VIEW_PROFILE_AR,
  HOME_PRACTICE_AREAS_SECTION_TITLE_EN, HOME_PRACTICE_AREAS_SECTION_TITLE_AR,
  HOME_VIEW_ALL_PRACTICE_AREAS_BTN_EN, HOME_VIEW_ALL_PRACTICE_AREAS_BTN_AR,
  HOME_TEAM_SECTION_TITLE_EN, HOME_TEAM_SECTION_TITLE_AR,
  HOME_VIEW_ALL_TEAM_BTN_EN, HOME_VIEW_ALL_TEAM_BTN_AR,
  HOME_CTA_TITLE_EN, HOME_CTA_TITLE_AR, HOME_CTA_SUBTITLE_EN, HOME_CTA_SUBTITLE_AR, HOME_CTA_BUTTON_EN, HOME_CTA_BUTTON_AR,
  ABOUT_PAGE_TITLE_EN, ABOUT_PAGE_TITLE_AR,
  ABOUT_PAGE_CORE_VALUES_TITLE_EN, ABOUT_PAGE_CORE_VALUES_TITLE_AR,
  ABOUT_PAGE_VALUE_INTEGRITY_TITLE_EN, ABOUT_PAGE_VALUE_INTEGRITY_TITLE_AR, ABOUT_PAGE_VALUE_INTEGRITY_DESC_EN, ABOUT_PAGE_VALUE_INTEGRITY_DESC_AR,
  ABOUT_PAGE_VALUE_EXCELLENCE_TITLE_EN, ABOUT_PAGE_VALUE_EXCELLENCE_TITLE_AR, ABOUT_PAGE_VALUE_EXCELLENCE_DESC_EN, ABOUT_PAGE_VALUE_EXCELLENCE_DESC_AR,
  ABOUT_PAGE_VALUE_CLIENT_CENTRIC_TITLE_EN, ABOUT_PAGE_VALUE_CLIENT_CENTRIC_TITLE_AR, ABOUT_PAGE_VALUE_CLIENT_CENTRIC_DESC_EN, ABOUT_PAGE_VALUE_CLIENT_CENTRIC_DESC_AR,
  PRACTICE_AREAS_PAGE_TITLE_EN, PRACTICE_AREAS_PAGE_TITLE_AR,
  TEAM_PAGE_TITLE_EN, TEAM_PAGE_TITLE_AR,
  CAREERS_PAGE_TITLE_EN, CAREERS_PAGE_TITLE_AR,
  CONTACT_PAGE_TITLE_EN, CONTACT_PAGE_TITLE_AR,
  CONTACT_PAGE_INFO_SUBTITLE_EN, CONTACT_PAGE_INFO_SUBTITLE_AR,
  CONTACT_PAGE_OFFICE_HOURS_TITLE_EN, CONTACT_PAGE_OFFICE_HOURS_TITLE_AR, CONTACT_PAGE_OFFICE_HOURS_WEEKDAYS_EN, CONTACT_PAGE_OFFICE_HOURS_WEEKDAYS_AR, CONTACT_PAGE_OFFICE_HOURS_WEEKEND_EN, CONTACT_PAGE_OFFICE_HOURS_WEEKEND_AR,
  CONTACT_PAGE_LOCATION_SUBTITLE_EN, CONTACT_PAGE_LOCATION_SUBTITLE_AR,
  CONTACT_PAGE_FORM_SUBTITLE_EN, CONTACT_PAGE_FORM_SUBTITLE_AR, CONTACT_PAGE_FORM_SUCCESS_MSG_EN, CONTACT_PAGE_FORM_SUCCESS_MSG_AR,
  CONTACT_PAGE_FORM_LABEL_NAME_EN, CONTACT_PAGE_FORM_LABEL_NAME_AR, CONTACT_PAGE_FORM_LABEL_EMAIL_EN, CONTACT_PAGE_FORM_LABEL_EMAIL_AR, CONTACT_PAGE_FORM_LABEL_SUBJECT_EN, CONTACT_PAGE_FORM_LABEL_SUBJECT_AR, CONTACT_PAGE_FORM_LABEL_MESSAGE_EN, CONTACT_PAGE_FORM_LABEL_MESSAGE_AR,
  CONTACT_PAGE_FORM_BTN_SEND_EN, CONTACT_PAGE_FORM_BTN_SEND_AR,
  NOT_FOUND_PAGE_TITLE_EN, NOT_FOUND_PAGE_TITLE_AR, NOT_FOUND_PAGE_MESSAGE_EN, NOT_FOUND_PAGE_MESSAGE_AR, NOT_FOUND_PAGE_BTN_HOME_EN, NOT_FOUND_PAGE_BTN_HOME_AR,
  WHATSAPP_FLOAT_BTN_ARIA_LABEL_EN, WHATSAPP_FLOAT_BTN_ARIA_LABEL_AR

} from './constants';

type Language = 'en' | 'ar';

// Helper: Scroll to top on route change
const ScrollToTop: React.FC = () => {
  useEffect(() => {
    const handleHashChange = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange, { passive: true });
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null;
};

// --- LANGUAGE SWITCHER COMPONENT ---
interface LanguageSwitcherProps {
  language: Language;
  toggleLanguage: () => void;
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, toggleLanguage, className }) => {
  const ariaLabel = language === 'en' ? ARIA_LANG_SWITCHER_EN : ARIA_LANG_SWITCHER_AR;
  return (
    <button
      onClick={toggleLanguage}
      className={`relative flex items-center w-[70px] h-[34px] bg-slate-700 hover:bg-slate-600 rounded-full p-1 transition-colors duration-200 ${className}`}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <div
        className={`absolute top-[3px] bottom-[3px] w-[calc(50%-5px)] bg-amber-500 rounded-full shadow-md transition-transform duration-300 ease-in-out
          ${language === 'en' ? 'left-[3px]' : 'left-[calc(50%+2px)] transform'}`}
      ></div>
      <span className={`flex-1 text-center text-xs font-semibold z-10 transition-colors duration-300 ${language === 'en' ? 'text-slate-900' : 'text-slate-200 hover:text-white'}`}>
        EN
      </span>
      <span className={`flex-1 text-center text-xs font-semibold z-10 transition-colors duration-300 ${language === 'ar' ? 'text-slate-900' : 'text-slate-200 hover:text-white'}`}>
        AR
      </span>
    </button>
  );
};


// --- LAYOUT COMPONENTS ---
interface HeaderProps {
  language: Language;
  toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const brandName = language === 'en' ? COMPANY_BRAND_EN : COMPANY_BRAND_AR;
  const tagline = language === 'en' ? COMPANY_TAGLINE_EN : COMPANY_TAGLINE_AR;
  const menuAriaLabel = isMenuOpen 
    ? (language === 'en' ? ARIA_CLOSE_MENU_EN : ARIA_CLOSE_MENU_AR)
    : (language === 'en' ? ARIA_OPEN_MENU_EN : ARIA_OPEN_MENU_AR);


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-3xl font-bold text-amber-500">
            {brandName}
            {tagline && <span className="text-white text-opacity-80 text-2xl ml-2">{tagline}</span>}
          </Link>
          <div className="flex items-center">
            <nav className="hidden md:flex space-x-1 lg:space-x-3 items-center">
              {NAVIGATION_LINKS.map((link) => (
                <NavLink
                  key={link.path} // Use path for key as labels can change
                  to={link.path}
                  className={({ isActive }) =>
                    `px-2 py-2 lg:px-3 rounded-md text-sm font-medium transition-colors ${
                      isActive ? 'bg-amber-500 text-slate-900' : 'text-slate-200 hover:text-amber-400'
                    }`
                  }
                >
                  {language === 'en' ? link.label : link.labelAr || link.label}
                </NavLink>
              ))}
               <LanguageSwitcher language={language} toggleLanguage={toggleLanguage} className="ml-3" />
            </nav>
            <div className="md:hidden flex items-center">
             <LanguageSwitcher language={language} toggleLanguage={toggleLanguage} className="mr-2" />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-200 hover:text-amber-400 focus:outline-none"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={menuAriaLabel}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-md" id="mobile-menu">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAVIGATION_LINKS.map((link) => (
              <NavLink
                key={link.path} // Use path for key
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive ? 'bg-amber-500 text-slate-900' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-700'
                  }`
                }
              >
                {language === 'en' ? link.label : link.labelAr || link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

interface FooterProps {
  language: Language;
}
const Footer: React.FC<FooterProps> = ({ language }) => {
  const brandName = language === 'en' ? COMPANY_BRAND_EN : COMPANY_BRAND_AR;
  const tagline = language === 'en' ? COMPANY_TAGLINE_EN : COMPANY_TAGLINE_AR;
  const address = language === 'en' ? FIRM_ADDRESS_EN : FIRM_ADDRESS_AR;

  return (
    <footer className="bg-slate-950 border-t border-slate-700 text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-amber-500 mb-4">
              {brandName}
              {tagline && <span className="text-white text-opacity-80 text-lg ml-2">{tagline}</span>}
            </h3>
            <p className="text-sm leading-relaxed">{(language === 'en' ? ABOUT_US_SHORT_EN : ABOUT_US_SHORT_AR).substring(0,120)}...</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-200 mb-4">{language === 'en' ? FOOTER_QUICK_LINKS_EN : FOOTER_QUICK_LINKS_AR}</h4>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.slice(0,4).map(link => (
                 <li key={link.path}><Link to={link.path} className="hover:text-amber-400 transition-colors">{language === 'en' ? link.label : link.labelAr || link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-200 mb-4">{language === 'en' ? FOOTER_PRACTICE_AREAS_EN : FOOTER_PRACTICE_AREAS_AR}</h4>
            <ul className="space-y-2">
              {PRACTICE_AREAS_DATA.slice(0,4).map(area => (
                 <li key={area.id}><Link to={`/practice-areas#${area.id}`} className="hover:text-amber-400 transition-colors">{language === 'en' ? area.nameEn : area.nameAr}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-200 mb-4">{language === 'en' ? FOOTER_CONTACT_US_EN : FOOTER_CONTACT_US_AR}</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className={`w-5 h-5 mt-1 text-amber-500 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <span>{address}</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className={`w-5 h-5 text-amber-500 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <a href={`tel:${FIRM_PHONE_NUMBER_RAW}`} className="hover:text-amber-400 transition-colors">{FIRM_PHONE_NUMBER_DISPLAY}</a>
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className={`w-5 h-5 text-amber-500 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <a href={`mailto:${FIRM_EMAIL}`} className="hover:text-amber-400 transition-colors">{FIRM_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-slate-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {language === 'en' ? FOOTER_COPYRIGHT_EN : FOOTER_COPYRIGHT_AR}</p>
        </div>
      </div>
    </footer>
  );
};

const PageContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <main className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28 md:pt-32 ${className}`}> {/* pt-28/32 to account for fixed header */}
      {children}
    </main>
  );
};

// --- WHATSAPP BUTTON ---
const WhatsAppButton: React.FC<{ language: Language }> = ({ language }) => {
  const phoneNumber = WHATSAPP_NUMBER; 
  const message = language === 'en' ? WHATSAPP_MESSAGE_EN : WHATSAPP_MESSAGE_AR;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const ariaLabel = language === 'en' ? WHATSAPP_FLOAT_BTN_ARIA_LABEL_EN : WHATSAPP_FLOAT_BTN_ARIA_LABEL_AR;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 flex items-center justify-center`}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
};

// --- UI COMPONENTS ---

const PracticeAreaCard: React.FC<{ area: PracticeArea, isDetailed?: boolean, language?: Language }> = ({ area, isDetailed = false, language = 'en' }) => {
  const IconComponent = area.icon || BriefcaseIcon;
  return (
    <div className={`bg-slate-800 p-6 rounded-lg shadow-xl hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col ${isDetailed ? '' : 'items-center text-center'}`}>
      <IconComponent className={`w-12 h-12 mb-4 text-amber-500 ${isDetailed ? (language === 'ar' ? 'self-end' : 'self-start') : 'mx-auto'}`} />
      <h3 className={`text-xl font-semibold text-white mb-2 ${isDetailed ? 'text-2xl' : ''}`}>{language === 'en' ? area.nameEn : area.nameAr}</h3>
      <p className="text-slate-400 text-sm mb-4 flex-grow">{isDetailed ? (language === 'en' ? area.longDescriptionEn : area.longDescriptionAr) : (language === 'en' ? area.descriptionEn : area.descriptionAr)}</p>
      {!isDetailed && (
         <Link to={`/practice-areas#${area.id}`} className="mt-auto text-amber-500 hover:text-amber-400 font-medium inline-flex items-center group">
          {language === 'en' ? CARD_BTN_LEARN_MORE_EN : CARD_BTN_LEARN_MORE_AR} <ChevronRightIcon language={language} className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'mr-1' : 'ml-1'}`} />
        </Link>
      )}
      {isDetailed && area.image && <img src={area.image} alt={language === 'en' ? area.nameEn : area.nameAr} className="mt-4 rounded-md aspect-video object-cover"/>}
    </div>
  );
};

const TeamMemberCard: React.FC<{ member: TeamMember, isDetailed?: boolean, language?: Language }> = ({ member, isDetailed = false, language = 'en' }) => {
  return (
    <div className={`bg-slate-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ${isDetailed ? 'p-6 md:flex md:space-x-6' : 'text-center'}`}>
      <img 
        src={member.imageUrl} 
        alt={language === 'en' ? member.nameEn : member.nameAr}
        className={`object-cover ${isDetailed ? 'md:w-1/3 rounded-lg aspect-square' : 'w-full h-64 sm:h-72 md:h-80'}`} 
      />
      <div className={`${isDetailed ? `md:w-2/3 mt-4 md:mt-0 ${language === 'ar' ? 'md:mr-6' : 'md:ml-0'}` : 'p-6'}`}>
        <h3 className={`font-semibold text-white ${isDetailed ? 'text-2xl mb-1' : 'text-xl mb-1'}`}>{language === 'en' ? member.nameEn : member.nameAr}</h3>
        <p className="text-amber-500 text-sm mb-3">{language === 'en' ? member.titleEn : member.titleAr}</p>
        {isDetailed && (member.bioEn || member.bioAr) && <p className="text-slate-400 text-sm leading-relaxed">{language === 'en' ? member.bioEn : member.bioAr}</p>}
        {!isDetailed && (
          <Link to={`/team#${member.id}`} className="mt-2 text-amber-500 hover:text-amber-400 font-medium inline-flex items-center group text-sm">
            {language === 'en' ? CARD_BTN_VIEW_PROFILE_EN : CARD_BTN_VIEW_PROFILE_AR} <ChevronRightIcon language={language} className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'mr-1' : 'ml-1'}`} />
          </Link>
        )}
      </div>
    </div>
  );
};

// Animated Stat Item for Count-Up Effect
const AnimatedStatItem: React.FC<{ stat: StatItem; startAnimation: boolean; language: Language }> = ({ stat, startAnimation, language }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const duration = 1500; // Animation duration in ms

  useEffect(() => {
    if (startAnimation) {
      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        setCurrentValue(Math.floor(progress * stat.value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrentValue(stat.value); // Ensure it ends on the exact target
        }
      };
      requestAnimationFrame(animate);
    }
  }, [startAnimation, stat.value]);

  return (
    <div className="p-4">
      <p className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">
        {currentValue}
        {stat.suffix}
      </p>
      <p className="text-slate-400">{language === 'en' ? stat.labelEn : stat.labelAr}</p>
    </div>
  );
};


// --- PAGE COMPONENTS ---

interface PageProps {
  language: Language;
}

const HomePage: React.FC<PageProps> = ({ language }) => {
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const [startStatsAnimation, setStartStatsAnimation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartStatsAnimation(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.1 } 
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => {
      if (observer && statsSectionRef.current) { // Ensure current is not null before disconnecting
        observer.disconnect();
      }
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section 
        className="h-screen min-h-[600px] flex items-center justify-center relative -mt-20 md:-mt-[80px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url('/assets/images/hero-background.jpg')` }}
      >
        <PageContainer className="text-center !pt-20 md:!pt-[80px]">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6"
            dangerouslySetInnerHTML={{ __html: language === 'en' ? HOME_HERO_TITLE_EN : HOME_HERO_TITLE_AR}}
          />
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            {language === 'en' ? COMPANY_MOTTO_EN : COMPANY_MOTTO_AR} {language === 'en' ? HOME_HERO_SUBTITLE_EN : HOME_HERO_SUBTITLE_AR}
          </p>
          <Link
            to="/about"
            className="bg-amber-500 text-slate-900 hover:bg-amber-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {language === 'en' ? HOME_HERO_BUTTON_EN : HOME_HERO_BUTTON_AR}
          </Link>
        </PageContainer>
      </section>

      {/* About Us Snippet */}
      <section className="py-16 md:py-24 bg-slate-800">
        <PageContainer>
          <div className={`grid md:grid-cols-2 gap-12 items-center ${language === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
            <div className={language === 'ar' ? 'md:order-2' : ''}>
              <img src="/assets/images/home-about-snippet.jpg" alt={language === 'en' ? "About our firm" : "عن شركتنا"} className="rounded-lg shadow-xl"/>
            </div>
            <div className={language === 'ar' ? 'md:order-1' : ''}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{language === 'en' ? ABOUT_SECTION_TITLE_EN : ABOUT_SECTION_TITLE_AR}</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">{language === 'en' ? ABOUT_US_SHORT_EN : ABOUT_US_SHORT_AR}</p>
              <Link
                to="/about"
                className="text-amber-500 hover:text-amber-400 font-semibold inline-flex items-center group"
              >
                {language === 'en' ? ABOUT_SECTION_READ_MORE_EN : ABOUT_SECTION_READ_MORE_AR} 
                <ChevronRightIcon language={language} className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
      
      {/* Firm Stats */}
       <section ref={statsSectionRef} className="py-16 md:py-24 bg-slate-900">
        <PageContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {FIRM_STATS_DATA.map((stat) => (
              <AnimatedStatItem key={language === 'en' ? stat.labelEn : stat.labelAr} stat={stat} startAnimation={startStatsAnimation} language={language} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Practice Areas Snippet */}
      <section className="py-16 md:py-24 bg-slate-800">
        <PageContainer>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{language === 'en' ? HOME_PRACTICE_AREAS_SECTION_TITLE_EN : HOME_PRACTICE_AREAS_SECTION_TITLE_AR}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {PRACTICE_AREAS_DATA.slice(0, 6).map((area) => (
              <PracticeAreaCard key={area.id} area={area} language={language} />
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/practice-areas"
              className="bg-amber-500 text-slate-900 hover:bg-amber-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {language === 'en' ? HOME_VIEW_ALL_PRACTICE_AREAS_BTN_EN : HOME_VIEW_ALL_PRACTICE_AREAS_BTN_AR}
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* Our Team Snippet */}
      <section className="py-16 md:py-24 bg-slate-900">
        <PageContainer>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{language === 'en' ? HOME_TEAM_SECTION_TITLE_EN : HOME_TEAM_SECTION_TITLE_AR}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {TEAM_MEMBERS_DATA.slice(0, 4).map((member) => (
              <TeamMemberCard key={member.id} member={member} language={language} />
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/team"
              className="border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              {language === 'en' ? HOME_VIEW_ALL_TEAM_BTN_EN : HOME_VIEW_ALL_TEAM_BTN_AR}
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* Location & Quick Contact Section */}
      <section className="py-16 md:py-24 bg-slate-800">
        <PageContainer>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {language === 'en' ? HOME_LOCATION_TITLE_EN : HOME_LOCATION_TITLE_AR}
          </h2>
          <div className={`grid md:grid-cols-2 gap-12 items-start`}>
            {/* Map Column */}
            <div className={`rounded-lg overflow-hidden shadow-xl ${language === 'ar' ? 'md:order-2' : 'md:order-1'}`}>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={MAP_IFRAME_SRC}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={language === 'en' ? MAP_TITLE_EN : MAP_TITLE_AR}
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Contact Info Column */}
            <div className={`space-y-8 ${language === 'ar' ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'}`}>
              <div>
                <h3 className={`text-2xl font-semibold text-amber-500 mb-3 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'en' ? HOME_LOCATION_OFFICE_SUBTITLE_EN : HOME_LOCATION_OFFICE_SUBTITLE_AR}
                </h3>
                <p className="text-slate-300 flex items-start">
                  <MapPinIcon className={`w-6 h-6 mt-1 text-amber-500 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <span>{language === 'en' ? FIRM_ADDRESS_EN : FIRM_ADDRESS_AR}</span>
                </p>
              </div>
              
              <div>
                <h3 className={`text-2xl font-semibold text-amber-500 mb-3 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'en' ? HOME_LOCATION_DIRECT_CONTACT_SUBTITLE_EN : HOME_LOCATION_DIRECT_CONTACT_SUBTITLE_AR}
                </h3>
                <p className="text-slate-300 flex items-center mb-2">
                  <PhoneIcon className={`w-6 h-6 text-amber-500 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <a href={`tel:${FIRM_PHONE_NUMBER_RAW}`} className="hover:text-amber-400 transition-colors">
                    {FIRM_PHONE_NUMBER_DISPLAY}
                  </a>
                </p>
                <p className="text-slate-300 flex items-center">
                  <EnvelopeIcon className={`w-6 h-6 text-amber-500 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <a href={`mailto:${FIRM_EMAIL}`} className="hover:text-amber-400 transition-colors">
                    {FIRM_EMAIL}
                  </a>
                </p>
              </div>

              <div>
                <h3 className={`text-2xl font-semibold text-amber-500 mb-3 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'en' ? HOME_LOCATION_QUICK_CHAT_SUBTITLE_EN : HOME_LOCATION_QUICK_CHAT_SUBTITLE_AR}
                </h3>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(language === 'en' ? WHATSAPP_MESSAGE_EN : WHATSAPP_MESSAGE_AR)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-400 transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                  
                >
                  <WhatsAppIcon className={`w-6 h-6 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  <span>{language === 'en' ? HOME_WHATSAPP_BUTTON_EN : HOME_WHATSAPP_BUTTON_AR}</span>
                </a>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-amber-500 text-slate-900">
        <PageContainer className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{language === 'en' ? HOME_CTA_TITLE_EN : HOME_CTA_TITLE_AR}</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {language === 'en' ? HOME_CTA_SUBTITLE_EN : HOME_CTA_SUBTITLE_AR}
          </p>
          <Link
            to="/contact"
            className="bg-slate-900 text-white hover:bg-slate-800 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {language === 'en' ? HOME_CTA_BUTTON_EN : HOME_CTA_BUTTON_AR}
          </Link>
        </PageContainer>
      </section>
    </>
  );
};

const AboutPage: React.FC<PageProps> = ({ language }) => {
  return (
    <PageContainer className="bg-slate-800/50 p-6 md:p-10 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-amber-500 mb-8 text-center">{language === 'en' ? ABOUT_PAGE_TITLE_EN : ABOUT_PAGE_TITLE_AR}</h1>
      <div className="max-w-4xl mx-auto">
        <img src="/assets/images/about-banner.jpg" alt={language === 'en' ? "Our Firm" : "شركتنا"} className="rounded-lg shadow-lg mb-8 w-full object-cover h-64 md:h-96"/>
        <div className={`prose prose-lg prose-invert text-slate-300 max-w-none leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`} dangerouslySetInnerHTML={{ __html: language === 'en' ? ABOUT_US_LONG_EN : ABOUT_US_LONG_AR }}>
        </div>

        <div className="mt-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">{language === 'en' ? ABOUT_PAGE_CORE_VALUES_TITLE_EN : ABOUT_PAGE_CORE_VALUES_TITLE_AR}</h2>
            <div className={`grid md:grid-cols-3 gap-8 text-slate-300 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="bg-slate-700 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-amber-500 mb-2">{language === 'en' ? ABOUT_PAGE_VALUE_INTEGRITY_TITLE_EN : ABOUT_PAGE_VALUE_INTEGRITY_TITLE_AR}</h3>
                    <p>{language === 'en' ? ABOUT_PAGE_VALUE_INTEGRITY_DESC_EN : ABOUT_PAGE_VALUE_INTEGRITY_DESC_AR}</p>
                </div>
                <div className="bg-slate-700 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-amber-500 mb-2">{language === 'en' ? ABOUT_PAGE_VALUE_EXCELLENCE_TITLE_EN : ABOUT_PAGE_VALUE_EXCELLENCE_TITLE_AR}</h3>
                    <p>{language === 'en' ? ABOUT_PAGE_VALUE_EXCELLENCE_DESC_EN : ABOUT_PAGE_VALUE_EXCELLENCE_DESC_AR}</p>
                </div>
                <div className="bg-slate-700 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-amber-500 mb-2">{language === 'en' ? ABOUT_PAGE_VALUE_CLIENT_CENTRIC_TITLE_EN : ABOUT_PAGE_VALUE_CLIENT_CENTRIC_TITLE_AR}</h3>
                    <p>{language === 'en' ? ABOUT_PAGE_VALUE_CLIENT_CENTRIC_DESC_EN : ABOUT_PAGE_VALUE_CLIENT_CENTRIC_DESC_AR}</p>
                </div>
            </div>
        </div>
      </div>
    </PageContainer>
  );
};

const PracticeAreasPage: React.FC<PageProps> = ({ language }) => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <PageContainer>
      <h1 className="text-4xl font-bold text-amber-500 mb-12 text-center">{language === 'en' ? PRACTICE_AREAS_PAGE_TITLE_EN : PRACTICE_AREAS_PAGE_TITLE_AR}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRACTICE_AREAS_DATA.map((area) => (
          <div id={area.id} key={area.id} className="scroll-mt-28">
             <PracticeAreaCard area={area} isDetailed={true} language={language} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

const OurTeamPage: React.FC<PageProps> = ({ language }) => {
   useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <PageContainer>
      <h1 className="text-4xl font-bold text-amber-500 mb-12 text-center">{language === 'en' ? TEAM_PAGE_TITLE_EN : TEAM_PAGE_TITLE_AR}</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
        {TEAM_MEMBERS_DATA.map((member) => (
          <div id={member.id} key={member.id} className="scroll-mt-28">
            <TeamMemberCard member={member} isDetailed={true} language={language} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

const CareersPage: React.FC<PageProps> = ({ language }) => {
  return (
    <PageContainer className="bg-slate-800/50 p-6 md:p-10 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-amber-500 mb-8 text-center">{language === 'en' ? CAREERS_PAGE_TITLE_EN : CAREERS_PAGE_TITLE_AR}</h1>
      <div className="max-w-3xl mx-auto">
        <img src="/assets/images/careers-banner.jpg" alt={language === 'en' ? "Join our team" : "انضم إلى فريقنا"} className="rounded-lg shadow-lg mb-8 w-full object-cover h-64 md:h-80"/>
        <div className={`prose prose-lg prose-invert text-slate-300 max-w-none ${language === 'ar' ? 'text-right' : 'text-left'}`} dangerouslySetInnerHTML={{ __html: language === 'en' ? CAREERS_INFO_EN : CAREERS_INFO_AR }}>
        </div>
      </div>
    </PageContainer>
  );
};

const ContactPage: React.FC<PageProps> = ({ language }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
     setTimeout(() => setIsSubmitted(false), 5000); 
  };
  
  const address = language === 'en' ? FIRM_ADDRESS_EN : FIRM_ADDRESS_AR;
  const whatsappMessage = language === 'en' ? WHATSAPP_MESSAGE_EN : WHATSAPP_MESSAGE_AR;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <PageContainer>
      <h1 className="text-4xl font-bold text-amber-500 mb-12 text-center">{language === 'en' ? CONTACT_PAGE_TITLE_EN : CONTACT_PAGE_TITLE_AR}</h1>
      <div className={`grid md:grid-cols-2 gap-12 items-start ${language === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
        <div className={`bg-slate-800 p-8 rounded-lg shadow-xl ${language === 'ar' ? 'md:order-2' : 'md:order-1'}`}>
          <h2 className="text-2xl font-semibold text-white mb-6">{language === 'en' ? CONTACT_PAGE_INFO_SUBTITLE_EN : CONTACT_PAGE_INFO_SUBTITLE_AR}</h2>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start">
              <MapPinIcon className={`w-6 h-6 mt-1 text-amber-500 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
              <span>{address}</span>
            </li>
            <li className="flex items-center">
              <PhoneIcon className={`w-6 h-6 text-amber-500 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
              <a href={`tel:${FIRM_PHONE_NUMBER_RAW}`} className="hover:text-amber-400 transition-colors">{FIRM_PHONE_NUMBER_DISPLAY}</a>
            </li>
            <li className="flex items-center">
              <EnvelopeIcon className={`w-6 h-6 text-amber-500 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
              <a href={`mailto:${FIRM_EMAIL}`} className="hover:text-amber-400 transition-colors">{FIRM_EMAIL}</a>
            </li>
          </ul>
          <div className="mt-6">
             <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-400 transition-colors w-full sm:w-auto ${language === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              <WhatsAppIcon className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              <span>{language === 'en' ? HOME_WHATSAPP_BUTTON_EN : HOME_WHATSAPP_BUTTON_AR}</span>
            </a>
          </div>

          <div className="mt-8">
             <h3 className="text-xl font-semibold text-white mb-3">{language === 'en' ? CONTACT_PAGE_OFFICE_HOURS_TITLE_EN : CONTACT_PAGE_OFFICE_HOURS_TITLE_AR}</h3>
             <p>{language === 'en' ? CONTACT_PAGE_OFFICE_HOURS_WEEKDAYS_EN : CONTACT_PAGE_OFFICE_HOURS_WEEKDAYS_AR}</p>
             <p>{language === 'en' ? CONTACT_PAGE_OFFICE_HOURS_WEEKEND_EN : CONTACT_PAGE_OFFICE_HOURS_WEEKEND_AR}</p>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">{language === 'en' ? CONTACT_PAGE_LOCATION_SUBTITLE_EN : CONTACT_PAGE_LOCATION_SUBTITLE_AR}</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
              <iframe
                src={MAP_IFRAME_SRC}
                width="100%"
                height="300" 
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={language === 'en' ? MAP_TITLE_EN : MAP_TITLE_AR}
              ></iframe>
            </div>
          </div>
        </div>

        <div className={`bg-slate-800 p-8 rounded-lg shadow-xl ${language === 'ar' ? 'md:order-1' : 'md:order-2'}`}>
          <h2 className="text-2xl font-semibold text-white mb-6">{language === 'en' ? CONTACT_PAGE_FORM_SUBTITLE_EN : CONTACT_PAGE_FORM_SUBTITLE_AR}</h2>
          {isSubmitted && (
            <div className="mb-4 p-3 bg-green-500/20 text-green-300 border border-green-500 rounded-md">
              {language === 'en' ? CONTACT_PAGE_FORM_SUCCESS_MSG_EN : CONTACT_PAGE_FORM_SUCCESS_MSG_AR}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium text-slate-300 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{language === 'en' ? CONTACT_PAGE_FORM_LABEL_NAME_EN : CONTACT_PAGE_FORM_LABEL_NAME_AR}</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={`w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-amber-500 focus:border-amber-500 transition-colors ${language === 'ar' ? 'text-right' : 'text-left'}`} />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium text-slate-300 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{language === 'en' ? CONTACT_PAGE_FORM_LABEL_EMAIL_EN : CONTACT_PAGE_FORM_LABEL_EMAIL_AR}</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className={`w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-amber-500 focus:border-amber-500 transition-colors ${language === 'ar' ? 'text-right' : 'text-left'}`} />
            </div>
            <div>
              <label htmlFor="subject" className={`block text-sm font-medium text-slate-300 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{language === 'en' ? CONTACT_PAGE_FORM_LABEL_SUBJECT_EN : CONTACT_PAGE_FORM_LABEL_SUBJECT_AR}</label>
              <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className={`w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-amber-500 focus:border-amber-500 transition-colors ${language === 'ar' ? 'text-right' : 'text-left'}`} />
            </div>
            <div>
              <label htmlFor="message" className={`block text-sm font-medium text-slate-300 mb-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{language === 'en' ? CONTACT_PAGE_FORM_LABEL_MESSAGE_EN : CONTACT_PAGE_FORM_LABEL_MESSAGE_AR}</label>
              <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={4} required className={`w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-amber-500 focus:border-amber-500 transition-colors ${language === 'ar' ? 'text-right' : 'text-left'}`}></textarea>
            </div>
            <div>
              <button type="submit" className="w-full bg-amber-500 text-slate-900 hover:bg-amber-600 font-semibold py-3 px-6 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg">
                {language === 'en' ? CONTACT_PAGE_FORM_BTN_SEND_EN : CONTACT_PAGE_FORM_BTN_SEND_AR}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

const NotFoundPage: React.FC<PageProps> = ({ language }) => {
  return (
    <PageContainer className="text-center">
      <h1 className="text-6xl font-bold text-amber-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-white mb-6">{language === 'en' ? NOT_FOUND_PAGE_TITLE_EN : NOT_FOUND_PAGE_TITLE_AR}</h2>
      <p className="text-slate-400 mb-8">{language === 'en' ? NOT_FOUND_PAGE_MESSAGE_EN : NOT_FOUND_PAGE_MESSAGE_AR}</p>
      <Link
        to="/"
        className="bg-amber-500 text-slate-900 hover:bg-amber-600 font-semibold py-3 px-6 rounded-md transition-colors duration-300"
      >
        {language === 'en' ? NOT_FOUND_PAGE_BTN_HOME_EN : NOT_FOUND_PAGE_BTN_HOME_AR}
      </Link>
    </PageContainer>
  );
};


// --- MAIN APP ---
const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <HashRouter>
      <ScrollToTop />
      <Header language={language} toggleLanguage={toggleLanguage} />
      <Routes>
        <Route path="/" element={<HomePage language={language} />} />
        <Route path="/about" element={<AboutPage language={language} />} />
        <Route path="/practice-areas" element={<PracticeAreasPage language={language} />} />
        <Route path="/team" element={<OurTeamPage language={language} />} />
        <Route path="/careers" element={<CareersPage language={language} />} />
        <Route path="/contact" element={<ContactPage language={language} />} />
        <Route path="*" element={<NotFoundPage language={language} />} /> 
      </Routes>
      <Footer language={language} />
      <WhatsAppButton language={language} />
    </HashRouter>
  );
};

export default App;
