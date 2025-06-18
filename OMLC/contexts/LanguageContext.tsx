import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';

export interface SimpleTranslations {
  en: string;
  ar: string;
}

// For texts that need parameters
export interface ParameterizedTranslations<T extends object> {
  en: (params: T) => string;
  ar: (params: T) => string;
}

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (translations: SimpleTranslations) => string;
  tp: <T extends object>(translations: ParameterizedTranslations<T>, params: T) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (translations: SimpleTranslations): string => {
    return translations[language] || translations['en'];
  };
  
  const tp = <T extends object>(translations: ParameterizedTranslations<T>, params: T): string => {
    return translations[language](params) || translations['en'](params);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t, tp }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};