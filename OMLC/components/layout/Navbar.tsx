import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_NAME_LOCALIZED, UI_TEXTS } from '../../constants';
import Button from '../ui/Button';
import SearchIcon from '../icons/SearchIcon';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext'; 

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { currentUser, loadingAuth, logout, authError } = useAuth(); 

  const handleSearchNav = () => {
    navigate('/search');
    setIsMobileMenuOpen(false);
  }

  const handleAuthAction = async () => {
    if (currentUser) {
      await logout();
      navigate('/'); // Navigate to home after logout
    } else {
      navigate('/auth'); // Navigate to AuthPage for login/register
    }
    setIsMobileMenuOpen(false); 
  };
  
  const authButtonText = currentUser 
    ? t(UI_TEXTS.logout) 
    : t(UI_TEXTS.lawyerLoginRegister);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">{t(APP_NAME_LOCALIZED)}</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2 rtl:space-x-reverse">
              <Link
                to="/"
                className="text-text-secondary hover:bg-light-gray hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                {t(UI_TEXTS.home)}
              </Link>
              <Button onClick={handleSearchNav} variant="ghost" size="sm" leftIcon={<SearchIcon className="w-4 h-4" />}>
                {t(UI_TEXTS.findLegalHelp)}
              </Button>
              
              {currentUser && (
                <Link
                  to="/manage-profile"
                  className="text-text-secondary hover:bg-light-gray hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t(UI_TEXTS.manageProfile)}
                </Link>
              )}

              <Button
                variant={currentUser ? "outline" : "primary"}
                size="sm"
                onClick={handleAuthAction}
                isLoading={loadingAuth}
                className="ml-2"
              >
                {currentUser && currentUser.displayName ? `${authButtonText} (${currentUser.displayName.split(' ')[0]})` : authButtonText}
                {!currentUser && !loadingAuth && currentUser === null ? authButtonText : (currentUser && currentUser.email ? `${authButtonText}` : authButtonText)}

              </Button>
              <button
                onClick={toggleLanguage}
                className="px-3 py-2 rounded-md text-sm font-semibold text-primary hover:bg-light-gray transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                aria-label={t({en: "Switch language", ar: "تبديل اللغة"})}
              >
                {language === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
          </div>
          <div className="mr-2 flex md:hidden items-center">
             <button
                onClick={toggleLanguage}
                className="p-2 rounded-md text-sm font-semibold text-primary hover:bg-light-gray transition-colors focus:outline-none focus:ring-2 focus:ring-primary mr-2"
                aria-label={t({en: "Switch language", ar: "تبديل اللغة"})}
              >
                {language === 'en' ? 'AR' : 'EN'}
              </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-primary inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">{t({en: "Open main menu", ar: "فتح القائمة الرئيسية"})}</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-text-secondary hover:bg-light-gray hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              {t(UI_TEXTS.home)}
            </Link>
            <Button 
                onClick={handleSearchNav} 
                variant="ghost" 
                className="w-full justify-start text-text-secondary hover:bg-light-gray hover:text-primary"
                leftIcon={<SearchIcon className="w-4 h-4" />}
            >
                 {t(UI_TEXTS.findLegalHelp)}
            </Button>
            {currentUser && (
                <Link
                  to="/manage-profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-text-secondary hover:bg-light-gray hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                >
                  {t(UI_TEXTS.manageProfile)}
                </Link>
            )}
            <Button
              variant={currentUser ? "outline" : "primary"}
              onClick={handleAuthAction}
              isLoading={loadingAuth}
              className="w-full mt-1"
            >
              {currentUser && currentUser.displayName ? `${authButtonText} (${currentUser.displayName.split(' ')[0]})` : authButtonText}
              {!currentUser && !loadingAuth && currentUser === null ? authButtonText : (currentUser && currentUser.email ? `${authButtonText}` : authButtonText)}
            </Button>
          </div>
        </div>
      )}
      {authError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-center text-xs" role="alert">
          <p>{authError}</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
