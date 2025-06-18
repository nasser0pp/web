import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lawyer, LawFirm } from '../types';
import { getLawyerById, getLawFirmById } from '../services/lawyerService';
import { WHATSAPP_BASE_URL, DEFAULT_FIRM_LOGO, DEFAULT_PROFILE_IMAGE, DEFAULT_OFFICE_PHOTO, UI_TEXTS } from '../constants';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import PracticeAreaTag from '../components/ui/PracticeAreaTag';
import InquiryForm from '../components/lawyer/InquiryForm';
import LocationPinIcon from '../components/icons/LocationPinIcon';
import PhoneIcon from '../components/icons/PhoneIcon';
import EmailIcon from '../components/icons/EmailIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import WebsiteIcon from '../components/icons/WebsiteIcon';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import AcademicCapIcon from '../components/icons/AcademicCapIcon';
import LanguageIcon from '../components/icons/LanguageIcon';
import StarIcon from '../components/icons/StarIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface LawyerDetailPageProps {
  profileType: 'lawyer' | 'firm';
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value?: string | React.ReactNode; href?: string; langDir?: 'ltr' | 'rtl' }> = ({ icon, label, value, href, langDir = 'ltr' }) => {
  if (!value) return null;
  const content = href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors break-all">
      {value}
    </a>
  ) : (
    <span className="break-all">{value}</span>
  );
  return (
    <div className="flex items-start py-2">
      <div className={`flex-shrink-0 w-6 h-6 ${langDir === 'rtl' ? 'ml-3' : 'mr-3'} text-primary`}>{icon}</div>
      <div dir={langDir}>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-text-primary">{content}</dd>
      </div>
    </div>
  );
};


const LawyerDetailPage: React.FC<LawyerDetailPageProps> = ({ profileType }) => {
  const { id } = useParams<{ id: string }>(); // Only 'id' is from params now
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const [profile, setProfile] = useState<Lawyer | LawFirm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!id) { // profileType is now a prop and will always be defined
        setError(t({en:"Profile ID is missing.", ar:"معرف الملف الشخصي مفقود."}));
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        let data;
        if (profileType === 'lawyer') {
          data = await getLawyerById(id);
        } else if (profileType === 'firm') {
          data = await getLawFirmById(id);
        }
        if (data) {
          setProfile(data);
        } else {
          setError(t({en: `No ${profileType} found with this ID.`, ar: `لم يتم العثور على ${profileType === 'lawyer' ? 'محامٍ' : 'مكتب'} بهذا المعرف.`}));
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : t({en: `Failed to load ${profileType} details.`, ar: `فشل تحميل تفاصيل ال${profileType === 'lawyer' ? 'محامي' : 'مكتب'}.`});
        setError(errorMsg);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, [profileType, id, t]);

  const handleInquirySubmit = async (formData: { name: string; email: string; phone?: string; message: string }) => {
    console.log("Inquiry submitted:", formData, "for", profile?.nameEn);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner message={t({en: `Loading ${profileType} details...`, ar: `جاري تحميل تفاصيل ال${profileType === 'lawyer' ? 'محامي' : 'مكتب'}...`})} /></div>;
  if (error) return <div className="text-center py-10 text-red-600 bg-red-50 p-4 rounded-md">{error}</div>;
  if (!profile) return <div className="text-center py-10">{t({en: "Profile not found.", ar: "الملف الشخصي غير موجود."})}</div>;

  const isLawyer = profileType === 'lawyer';
  const lawyerData = isLawyer ? (profile as Lawyer) : undefined;
  const firmData = !isLawyer ? (profile as LawFirm) : undefined;
  
  const mainImage = isLawyer 
    ? lawyerData?.photoUrl || DEFAULT_PROFILE_IMAGE 
    : firmData?.logoUrl || DEFAULT_FIRM_LOGO;
  
  const currentName = language === 'ar' ? profile.nameAr : profile.nameEn;
  const altName = language === 'ar' ? profile.nameEn : profile.nameAr;

  const currentBioOrDesc = language === 'ar' ? (isLawyer ? lawyerData?.bioAr : firmData?.descriptionAr) : (isLawyer ? lawyerData?.bioEn : firmData?.descriptionEn);
  const altBioOrDesc = language === 'ar' ? (isLawyer ? lawyerData?.bioEn : firmData?.descriptionEn) : (isLawyer ? lawyerData?.bioAr : firmData?.descriptionAr);
  const showAltBio = altBioOrDesc && altBioOrDesc.trim() !== '';

  const currentTitle = isLawyer && lawyerData ? (language === 'ar' ? lawyerData.titleAr : lawyerData.titleEn) : undefined;
  const currentEducation = isLawyer && lawyerData ? (language === 'ar' ? lawyerData.educationAr : lawyerData.educationEn) : [];


  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className={`relative p-6 md:p-8 bg-gradient-to-r from-primary to-secondary text-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
         {profile.isFeatured && (
          <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-md`}>
            <StarIcon className={`w-4 h-4 ${language === 'ar' ? 'ml-1.5' : 'mr-1.5'}`} /> {t(UI_TEXTS.featured)} {t({en: "Profile", ar: "ملف شخصي"})}
          </div>
        )}
        <div className={`flex flex-col md:flex-row items-center ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
          <img
            src={mainImage}
            alt={`${profile.nameEn} profile`}
            className={`w-32 h-32 md:w-40 md:h-40 rounded-full md:rounded-lg object-cover border-4 border-white shadow-lg mb-4 md:mb-0 ${language === 'ar' ? 'md:ml-8' : 'md:mr-8'}`}
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = isLawyer ? DEFAULT_PROFILE_IMAGE : DEFAULT_FIRM_LOGO;
            }}
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{currentName}</h1>
            <p className="text-xl md:text-2xl text-blue-200">{altName}</p>
            {isLawyer && currentTitle && <p className="text-lg text-blue-100 mt-1">{currentTitle}</p>}
            {!isLawyer && firmData?.foundedYear && <p className="text-md text-blue-100 mt-1">{t({en: "Established:", ar: "تأسست عام:"})} {firmData.foundedYear}</p>}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-3">
              {isLawyer ? t(UI_TEXTS.professionalBio) : t(UI_TEXTS.firmOverview)}
            </h2>
            <p className="text-text-secondary whitespace-pre-line leading-relaxed" dir={language === 'ar' ? 'rtl' : 'ltr'}>{currentBioOrDesc}</p>
            { showAltBio && 
              <details className="mt-3">
                <summary className="text-sm text-primary cursor-pointer">
                    {language === 'ar' ? t({en:"Read in English", ar:"اقرأ بالإنجليزية"}) : t(UI_TEXTS.readInArabic)}
                </summary>
                <p className="mt-2 text-text-secondary whitespace-pre-line leading-relaxed" dir={language === 'ar' ? 'ltr' : 'rtl'}>{altBioOrDesc}</p>
              </details>
            }
          </section>

          {profile.specializations && profile.specializations.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-text-primary mb-3">{t(UI_TEXTS.legalSpecializations)}</h2>
              <div className="flex flex-wrap gap-2">
                {profile.specializations.map(area => (
                  <PracticeAreaTag key={area} area={area} size="md" onClick={() => navigate(`/search?practiceArea=${encodeURIComponent(area)}`)} />
                ))}
              </div>
            </section>
          )}

          {isLawyer && lawyerData && (
            <>
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-3">{t(UI_TEXTS.qualificationsExperience)}</h2>
                <dl className="space-y-3">
                  <DetailItem icon={<BriefcaseIcon />} label={t(UI_TEXTS.yearsOfExperience)} value={`${lawyerData.experienceYears} ${t({en:"years", ar:"سنوات"})}`} langDir={language === 'ar' ? 'rtl' : 'ltr'} />
                  <DetailItem icon={<AcademicCapIcon />} label={t(UI_TEXTS.education)} value={currentEducation.join(', ')} langDir={language === 'ar' ? 'rtl' : 'ltr'} />
                  {lawyerData.barAdmissionOman && <DetailItem icon={<span className="font-bold text-lg">OM</span>} label={t(UI_TEXTS.omaniBarAdmission)} value={t(UI_TEXTS.yes)} langDir={language === 'ar' ? 'rtl' : 'ltr'} />}
                  <DetailItem icon={<LanguageIcon />} label={t(UI_TEXTS.languagesSpoken)} value={lawyerData.languagesSpoken.join(', ')} langDir={language === 'ar' ? 'rtl' : 'ltr'} />
                </dl>
              </section>
              {lawyerData.firmId && (
                <section>
                    <Button variant="outline" onClick={() => navigate(`/firm/${lawyerData.firmId}`)}>
                        {t({en:"View Associated Firm", ar:"عرض المكتب المرتبط"}) }
                    </Button>
                </section>
              )}
            </>
          )}

          {!isLawyer && firmData && firmData.lawyers && firmData.lawyers.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-text-primary mb-3">{t({en:`Key Lawyers at ${firmData.nameEn}`, ar:`المحامون الرئيسيون في ${firmData.nameAr}`})}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {firmData.lawyers.map(lawyer => (
                  <Link key={lawyer.id} to={`/lawyer/${lawyer.id}`} className="block p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <img src={lawyer.photoUrl || DEFAULT_PROFILE_IMAGE} alt={lawyer.nameEn} className={`w-12 h-12 rounded-full object-cover ${language === 'ar' ? 'ml-3' : 'mr-3'}`}
                        onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_PROFILE_IMAGE;}}/>
                      <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <h4 className="font-medium text-primary">{language === 'ar' ? lawyer.nameAr : lawyer.nameEn}</h4>
                        <p className="text-sm text-gray-600">{language === 'ar' ? lawyer.titleAr : lawyer.titleEn}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
          {!isLawyer && firmData && firmData.officePhotosUrls && firmData.officePhotosUrls.length > 0 && (
            <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-3">{t({en:"Office Gallery", ar:"معرض صور المكتب"})}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {firmData.officePhotosUrls.map((url, index) => (
                        <img 
                            key={index} 
                            src={url} 
                            alt={`${firmData.nameEn} office ${index + 1}`} 
                            className="rounded-lg object-cover h-40 w-full shadow-md"
                            onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_OFFICE_PHOTO; }}
                        />
                    ))}
                </div>
            </section>
          )}

        </div>

        <aside className="lg:col-span-1 space-y-6">
          <div className="p-6 bg-light-gray rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-text-primary mb-4">{t(UI_TEXTS.contactInformation)}</h2>
            <dl className="space-y-1">
              <DetailItem icon={<LocationPinIcon />} label={t(UI_TEXTS.address)} value={isLawyer ? lawyerData?.officeAddress : firmData?.address} langDir={language === 'ar' ? 'rtl' : 'ltr'} />
              { (isLawyer ? lawyerData?.governorate : firmData?.governorate) &&
                <DetailItem icon={<LocationPinIcon />} label={t(UI_TEXTS.governorate)} value={isLawyer ? lawyerData?.governorate : firmData?.governorate} langDir={language === 'ar' ? 'rtl' : 'ltr'} />
              }
              <DetailItem icon={<PhoneIcon />} label={t(UI_TEXTS.phone)} value={profile.contact.phone} href={`tel:${profile.contact.phone}`} langDir={language === 'ar' ? 'rtl' : 'ltr'} />
              <DetailItem icon={<EmailIcon />} label={t(UI_TEXTS.email)} value={profile.contact.email} href={`mailto:${profile.contact.email}`} langDir={language === 'ar' ? 'rtl' : 'ltr'} />
              {profile.contact.whatsapp && (
                <DetailItem 
                  icon={<WhatsAppIcon />} 
                  label="WhatsApp" 
                  value={profile.contact.whatsapp} 
                  href={`${WHATSAPP_BASE_URL}${profile.contact.whatsapp.replace(/\D/g, '')}`} 
                  langDir={language === 'ar' ? 'rtl' : 'ltr'}
                />
              )}
              {!isLawyer && firmData?.websiteUrl && (
                <DetailItem icon={<WebsiteIcon />} label={t(UI_TEXTS.website)} value={firmData.websiteUrl} href={firmData.websiteUrl} langDir={language === 'ar' ? 'rtl' : 'ltr'} />
              )}
            </dl>
            
            <div className="mt-6 space-y-3">
              <Button 
                variant="primary" 
                className="w-full" 
                onClick={() => setShowInquiryForm(true)}
              >
                {t(UI_TEXTS.requestConsultation)}
              </Button>
               {profile.contact.whatsapp && (
                <Button 
                    variant="outline" 
                    leftIcon={<WhatsAppIcon className="text-green-500" />} 
                    className="w-full border-green-500 text-green-600 hover:bg-green-50"
                    onClick={() => window.open(`${WHATSAPP_BASE_URL}${profile.contact.whatsapp!.replace(/\D/g, '')}`, '_blank')}
                >
                    {t(UI_TEXTS.chatOnWhatsApp)}
                </Button>
              )}
            </div>
          </div>

          {showInquiryForm && (
            <div className="mt-6">
              <InquiryForm recipientName={currentName} onSubmit={handleInquirySubmit} />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default LawyerDetailPage;