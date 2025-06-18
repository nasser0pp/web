
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResultItem, PracticeArea } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import PracticeAreaTag from '../ui/PracticeAreaTag';
import LocationPinIcon from '../icons/LocationPinIcon';
import BriefcaseIcon from '../icons/BriefcaseIcon';
import StarIcon from '../icons/StarIcon';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { DEFAULT_FIRM_LOGO, DEFAULT_PROFILE_IMAGE, UI_TEXTS, WHATSAPP_BASE_URL } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';


interface LawyerProfileCardProps {
  item: SearchResultItem;
}

const LawyerProfileCard: React.FC<LawyerProfileCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const handleViewProfile = () => {
    navigate(`/${item.type}/${item.id}`);
  };

  const handleWhatsAppClick = () => {
    if (item.contact?.whatsapp) {
      window.open(`${WHATSAPP_BASE_URL}${item.contact.whatsapp.replace(/\D/g, '')}`, '_blank', 'noopener,noreferrer');
    }
  };

  const imageSrc = item.photoUrl || (item.type === 'firm' ? DEFAULT_FIRM_LOGO : DEFAULT_PROFILE_IMAGE);
  const name = language === 'ar' ? item.nameAr : item.nameEn;
  const summary = language === 'ar' ? item.summaryAr : item.summaryEn;

  return (
    <Card className={`w-full ${item.isFeatured ? 'border-2 border-yellow-400 shadow-xl relative' : 'shadow-lg'}`} hoverEffect={true}>
      {item.isFeatured && (
        <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-yellow-400 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center">
          <StarIcon className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" /> {t(UI_TEXTS.featured)}
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <img
            src={imageSrc}
            alt={`${item.nameEn} profile`}
            className="w-24 h-24 rounded-full sm:rounded-md object-cover mr-0 mb-4 sm:mb-0 sm:mr-6 rtl:sm:mr-0 rtl:sm:ml-6 flex-shrink-0"
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = item.type === 'firm' ? DEFAULT_FIRM_LOGO : DEFAULT_PROFILE_IMAGE;
            }}
          />
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-primary mb-1">{name}</h3>
            {language === 'ar' && <p className="text-sm text-gray-500 mb-1">{item.nameEn}</p>}
            {language === 'en' && <p className="text-sm text-gray-500 mb-1">{item.nameAr}</p>}
            
            <div className="flex items-center text-sm text-text-secondary mb-2">
              <LocationPinIcon className="w-4 h-4 mr-1.5 rtl:mr-0 rtl:ml-1.5 text-gray-400" />
              <span>{item.location}</span>
            </div>
            {item.type === 'lawyer' && item.experienceYears !== undefined && (
              <div className="flex items-center text-sm text-text-secondary mb-2">
                <BriefcaseIcon className="w-4 h-4 mr-1.5 rtl:mr-0 rtl:ml-1.5 text-gray-400" />
                <span>
                  {item.experienceYears} {t({ en: "years experience", ar: "سنوات خبرة"})}
                </span>
              </div>
            )}

            <p className="text-sm text-text-secondary my-2 leading-relaxed">{summary}</p>
          </div>
        </div>
        
        {item.specializations && item.specializations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              {t({en: "Specializations", ar: "التخصصات"})}
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.specializations.slice(0, 3).map((area) => (
                <PracticeAreaTag key={area} area={area} size="sm" />
              ))}
              {item.specializations.length > 3 && (
                <span className="text-xs text-gray-500 self-center">+{item.specializations.length - 3} {t({en: "more", ar: "أخرى"})}</span>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 flex justify-end space-x-2 rtl:space-x-reverse">
          {item.contact?.whatsapp && (
            <Button
              onClick={handleWhatsAppClick}
              variant="outline"
              size="sm"
              leftIcon={<WhatsAppIcon className="w-4 h-4" />}
              className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 focus:ring-green-500"
              aria-label={t(UI_TEXTS.chatOnWhatsApp)}
            >
              {t(UI_TEXTS.whatsapp)}
            </Button>
          )}
          <Button onClick={handleViewProfile} variant="primary" size="sm">
            {t(UI_TEXTS.viewProfile)}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LawyerProfileCard;