
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResultItem, PracticeArea } from '../types';
import { getFeaturedProfessionals } from '../services/lawyerService';
import { PRACTICE_AREAS_OPTIONS, UI_TEXTS } from '../constants';
import SearchBar from '../components/ui/SearchBar';
import LawyerProfileCard from '../components/lawyer/LawyerProfileCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredItems, setFeaturedItems] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchFeatured = async () => {
      setIsLoading(true);
      try {
        // Pass language or ensure service/card handles display language
        const items = await getFeaturedProfessionals(4);
        setFeaturedItems(items);
      } catch (error) {
        console.error("Failed to fetch featured professionals:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearch = (searchTerm: string) => {
    navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
  };

  const handleBrowseCategory = (category: PracticeArea) => {
    navigate(`/search?practiceArea=${encodeURIComponent(category)}`);
  };

  // For PracticeArea, if you want to translate them, you'd need a mapping in constants/types
  // For now, they display as defined in the enum.
  const getDisplayPracticeArea = (area: PracticeArea) => {
    // Placeholder for potential future translation of enum values
    // e.g. return t(PRACTICE_AREA_TRANSLATIONS[area])
    return area; 
  }

  const popularCategories = PRACTICE_AREAS_OPTIONS.slice(0, 6);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-primary to-secondary rounded-lg shadow-xl">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t({ en: "Find Trusted Legal Experts in Oman", ar: "اعثر على خبراء قانونيين موثوقين في عمان" })}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t({ en: "Your comprehensive directory for lawyers and law firms across all specializations and governorates.", ar: "دليلك الشامل للمحامين ومكاتب المحاماة في جميع التخصصات والمحافظات." })}
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder={t({en: "E.g., 'Commercial Law Muscat' or 'Fatima Al Amri'", ar: "مثال: 'قانون تجاري مسقط' أو 'فاطمة العامري'"})} 
            />
          </div>
        </div>
      </section>

      {/* Featured Professionals Section */}
      {isLoading && <LoadingSpinner message={t({en: "Loading featured professionals...", ar: "جاري تحميل المحترفين المتميزين..."})} />}
      {!isLoading && featuredItems.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold text-text-primary mb-8 text-center">{t({en: "Featured Professionals", ar: "المحترفون المتميزون"})}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featuredItems.map(item => (
              <LawyerProfileCard key={`${item.type}-${item.id}`} item={item} />
            ))}
          </div>
           {featuredItems.length > 0 && (
            <div className="text-center mt-8">
                <Button variant="outline" onClick={() => navigate('/search?featured=true')}>
                    {t({en: "View All Featured", ar: "عرض كل المتميزين"})}
                </Button>
            </div>
            )}
        </section>
      )}

      {/* Browse by Category Section */}
      <section className="py-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-text-primary mb-8 text-center">{t({en: "Browse by Legal Specialization", ar: "تصفح حسب التخصص القانوني"})}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {popularCategories.map(area => (
            <button
              key={area}
              onClick={() => handleBrowseCategory(area)}
              className="group flex flex-col items-center p-6 bg-light-gray rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
            >
              <BriefcaseIcon className="w-10 h-10 text-primary mb-3 group-hover:text-secondary transition-colors" />
              <h3 className="text-lg font-medium text-text-primary group-hover:text-secondary transition-colors">{getDisplayPracticeArea(area)}</h3>
            </button>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="primary" onClick={() => navigate('/search')}>
            {t({en: "Explore All Specializations", ar: "استكشاف جميع التخصصات"})}
          </Button>
        </div>
      </section>

      {/* Call to Action for Lawyers */}
      <section className="py-16 bg-secondary text-white rounded-lg shadow-xl">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t({en: "Are You a Legal Professional in Oman?", ar: "هل أنت محترف قانوني في عمان؟"})}</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            {t({en: "Join our growing network. Showcase your expertise and connect with clients seeking your services.", ar: "انضم إلى شبكتنا المتنامية. اعرض خبرتك وتواصل مع العملاء الذين يبحثون عن خدماتك."})}
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white text-secondary hover:bg-gray-100 border-white hover:border-gray-100"
            onClick={() => alert(t({en: "Lawyer registration/premium listing feature coming soon!", ar: "ميزة تسجيل المحامين/القائمة المميزة قادمة قريبًا!"}))}
          >
            {t({en: "List Your Profile (Freemium & Premium)", ar: "أدرج ملفك الشخصي (مجاني ومميز)"})}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;