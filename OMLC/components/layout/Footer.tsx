
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { APP_NAME_LOCALIZED, UI_TEXTS } from '../../constants';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{t(APP_NAME_LOCALIZED)}</h3>
            <p className="text-sm">{t(UI_TEXTS.footerTagline)}</p>
            <p className="text-sm mt-2">&copy; {new Date().getFullYear()} {t(APP_NAME_LOCALIZED)}. {t({ en: "All rights reserved.", ar: " جميع الحقوق محفوظة."})}</p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-4">{t(UI_TEXTS.quickLinks)}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">{t(UI_TEXTS.home)}</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">{t(UI_TEXTS.findLegalHelp)}</Link></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!");}} className="hover:text-white transition-colors">{t(UI_TEXTS.forLawyersJoinUs)}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-4">{t(UI_TEXTS.legal)}</h4>
            <ul className="space-y-2">
               <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!");}} className="hover:text-white transition-colors">{t(UI_TEXTS.termsOfService)}</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!");}} className="hover:text-white transition-colors">{t(UI_TEXTS.privacyPolicy)}</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!");}} className="hover:text-white transition-colors">{t(UI_TEXTS.disclaimer)}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
          <p>{t(UI_TEXTS.footerDisclaimerText)}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;