import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { createOrUpdateUserProfile, getUserProfile } from '../services/profileService';
import { Lawyer, LawyerProfileFormData, PracticeArea, Governorate } from '../types';
import { UI_TEXTS, PRACTICE_AREAS_OPTIONS, GOVERNORATES_OPTIONS, LANGUAGES_SPOKEN_OPTIONS, EXPERIENCE_YEARS_OPTIONS, OMANI_PHONE_REGEX, OMANI_WHATSAPP_REGEX, DEFAULT_PROFILE_IMAGE } from '../constants';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ManageProfilePage: React.FC = () => {
  const { currentUser, loadingAuth } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LawyerProfileFormData>({
    nameEn: '', nameAr: '', titleEn: '', titleAr: '',
    photoUrl: '', experienceYears: 0, educationEn: [], educationAr: [],
    barAdmissionOman: false, bioEn: '', bioAr: '', languagesSpoken: [],
    contact: { phone: '', email: '', whatsapp: '' },
    specializations: [], officeAddress: '', governorate: undefined,
    photoFile: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof LawyerProfileFormData | 'contact.phone' | 'contact.whatsapp', string>>>({});


  const fetchProfile = useCallback(async () => {
    if (currentUser) {
      setIsLoading(true);
      const profile = await getUserProfile(currentUser.uid);
      if (profile) {
        setFormData({
          nameEn: profile.nameEn || '', nameAr: profile.nameAr || '',
          titleEn: profile.titleEn || '', titleAr: profile.titleAr || '',
          photoUrl: profile.photoUrl || '',
          experienceYears: profile.experienceYears || 0,
          educationEn: profile.educationEn || [], educationAr: profile.educationAr || [],
          barAdmissionOman: profile.barAdmissionOman || false,
          bioEn: profile.bioEn || '', bioAr: profile.bioAr || '',
          languagesSpoken: profile.languagesSpoken || [],
          contact: {
            phone: profile.contact?.phone || '',
            email: profile.contact?.email || currentUser.email || '', // Pre-fill with auth email
            whatsapp: profile.contact?.whatsapp || '',
          },
          specializations: profile.specializations || [],
          officeAddress: profile.officeAddress || '',
          governorate: profile.governorate || undefined,
          photoFile: null,
        });
      } else {
        // New profile, pre-fill email from auth
        setFormData(prev => ({ ...prev, contact: { ...prev.contact, email: currentUser.email || '' }}));
      }
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!loadingAuth && !currentUser) {
      navigate('/auth'); // Redirect if not logged in
    } else if (currentUser) {
      fetchProfile();
    }
  }, [currentUser, loadingAuth, navigate, fetchProfile]);

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof LawyerProfileFormData | 'contact.phone' | 'contact.whatsapp', string>> = {};
    if (!formData.nameEn.trim()) errors.nameEn = t(UI_TEXTS.requiredField);
    if (!formData.nameAr.trim()) errors.nameAr = t(UI_TEXTS.requiredField);
    if (!formData.contact.email.trim()) errors['contact.email'] = t(UI_TEXTS.requiredField);
    if (!formData.contact.phone.trim()) errors['contact.phone'] = t(UI_TEXTS.requiredField);
    else if (!OMANI_PHONE_REGEX.test(formData.contact.phone)) errors['contact.phone'] = t(UI_TEXTS.phonePattern);
    
    if (formData.contact.whatsapp && !OMANI_WHATSAPP_REGEX.test(formData.contact.whatsapp)) {
        errors['contact.whatsapp'] = t(UI_TEXTS.whatsappPattern);
    }
    if (formData.specializations.length === 0) errors.specializations = t(UI_TEXTS.requiredField);


    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const contactField = name.split(".")[1] as keyof LawyerProfileFormData['contact'];
      setFormData(prev => ({ ...prev, contact: { ...prev.contact, [contactField]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelectChange = (name: keyof Pick<LawyerProfileFormData, 'specializations' | 'languagesSpoken'>, selectedOptions: string[]) => {
    setFormData(prev => ({ ...prev, [name]: selectedOptions }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  // Handle education fields (one entry per line)
  const handleEducationChange = (e: React.ChangeEvent<HTMLTextAreaElement>, lang: 'En' | 'Ar') => {
    const lines = e.target.value.split('\n').map(line => line.trim()).filter(line => line);
    if (lang === 'En') {
      setFormData(prev => ({ ...prev, educationEn: lines }));
    } else {
      setFormData(prev => ({ ...prev, educationAr: lines }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;

    if (!currentUser) {
      setError(t({en:"You must be logged in to save a profile.", ar:"يجب أن تكون مسجلاً للدخول لحفظ الملف الشخصي."}));
      return;
    }

    setIsSaving(true);
    try {
      // Note: Photo upload to Firebase Storage would happen here if implementing photoFile.
      // For now, photoUrl is assumed to be an external link or handled separately.
      // If photoFile exists, upload it, get the URL, then set formData.photoUrl to that new URL.
      
      const profileToSave: Partial<Omit<Lawyer, 'uid' | 'id'>> = {
        ...formData,
        // photoUrl will be updated if photoFile is handled
      };
      delete (profileToSave as any).photoFile; // Don't save the File object to Firestore

      await createOrUpdateUserProfile(currentUser.uid, profileToSave);
      setSuccessMessage(t(UI_TEXTS.profileSavedSuccess));
      // Optionally refetch profile to ensure UI consistency if local state update is complex
      // await fetchProfile(); 
    } catch (err) {
      console.error("Profile save error:", err);
      setError(t(UI_TEXTS.profileSaveError) + (err instanceof Error ? ` (${err.message})` : ''));
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Basic validation (e.g., size, type) can be done here.
      // For now, just set it to state. Upload logic would be in handleSubmit.
      setFormData(prev => ({ ...prev, photoFile: file, photoUrl: URL.createObjectURL(file) })); // Preview image
    }
  };


  if (isLoading || loadingAuth) return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner message={t({en:"Loading profile editor...", ar:"جاري تحميل محرر الملف الشخصي..."})} /></div>;
  if (!currentUser) return null; // Should be redirected by useEffect

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
        {formData.nameEn || formData.nameAr ? t(UI_TEXTS.editProfileTitle) : t(UI_TEXTS.createProfileTitle)}
      </h1>
      <p className="text-gray-600 mb-6">{t(UI_TEXTS.profileInfoIntro)}</p>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
      {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label={t(UI_TEXTS.nameEn)} name="nameEn" value={formData.nameEn} onChange={handleInputChange} error={formErrors.nameEn} required />
          <Input label={t(UI_TEXTS.nameAr)} name="nameAr" value={formData.nameAr} onChange={handleInputChange} error={formErrors.nameAr} required dir="rtl" />
          <Input label={t(UI_TEXTS.titleEn)} name="titleEn" value={formData.titleEn} onChange={handleInputChange} />
          <Input label={t(UI_TEXTS.titleAr)} name="titleAr" value={formData.titleAr} onChange={handleInputChange} dir="rtl" />
        </div>
        
        {/* Profile Photo */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(UI_TEXTS.profilePhoto)}</label>
            <div className="mt-1 flex items-center space-x-4 rtl:space-x-reverse">
                <img 
                    src={formData.photoUrl || DEFAULT_PROFILE_IMAGE} 
                    alt="Profile Preview" 
                    className="w-24 h-24 rounded-full object-cover border"
                    onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_PROFILE_IMAGE; }}
                />
                <input type="file" id="photoFile" name="photoFile" onChange={handlePhotoUpload} accept="image/jpeg, image/png" className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
            </div>
            <p className="text-xs text-gray-500 mt-1">{t(UI_TEXTS.photoRequirements)}</p>
             {/* Display current photoUrl if it exists and no new file is staged */}
            {!formData.photoFile && formData.photoUrl && !formData.photoUrl.startsWith('blob:') && (
                <p className="text-xs text-gray-500 mt-1">{t({en:"Current photo URL:", ar:"رابط الصورة الحالي:"})} <a href={formData.photoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{formData.photoUrl.substring(0,30)}...</a></p>
            )}
        </div>


        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label={t(UI_TEXTS.email)} name="contact.email" type="email" value={formData.contact.email} onChange={handleInputChange} error={formErrors['contact.email']} required />
            <Input label={t(UI_TEXTS.phone)} name="contact.phone" type="tel" value={formData.contact.phone} onChange={handleInputChange} error={formErrors['contact.phone']} required placeholder="9xxxxxxx" />
            <Input label={`${t(UI_TEXTS.whatsapp)} (${t({en:"Optional", ar:"اختياري"})})`} name="contact.whatsapp" type="tel" value={formData.contact.whatsapp || ''} onChange={handleInputChange} error={formErrors['contact.whatsapp']} placeholder="9xxxxxxx" />
            <Input label={`${t(UI_TEXTS.officeAddress)}`} name="officeAddress" value={formData.officeAddress || ''} onChange={handleInputChange} />
        </div>
        
        <Select
            label={t(UI_TEXTS.selectGovernorate)}
            name="governorate"
            options={[{ value: '', label: t({en:"Select...", ar:"اختر..."}) }, ...GOVERNORATES_OPTIONS.map(g => ({ value: g, label: g }))]}
            value={formData.governorate || ''}
            onChange={(e) => handleInputChange(e)}
        />


        {/* Experience & Qualifications */}
        <div>
          <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">{t(UI_TEXTS.yearsOfExperience)}</label>
          <Select
            id="experienceYears"
            name="experienceYears"
            options={EXPERIENCE_YEARS_OPTIONS.map(y => ({ value: y.toString(), label: y === 0 ? t({en:"Less than 1 year", ar:"أقل من سنة"}) : `${y} ${t({en:"years", ar:"سنوات"})}` }))}
            value={formData.experienceYears.toString()}
            onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: parseInt(e.target.value, 10) }))}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="educationEn" className="block text-sm font-medium text-gray-700">{t(UI_TEXTS.educationEnField)}</label>
            <textarea id="educationEn" name="educationEn" rows={3} className="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2" value={formData.educationEn.join('\n')} onChange={(e) => handleEducationChange(e, 'En')}></textarea>
          </div>
          <div>
            <label htmlFor="educationAr" className="block text-sm font-medium text-gray-700">{t(UI_TEXTS.educationArField)}</label>
            <textarea id="educationAr" name="educationAr" rows={3} className="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2" value={formData.educationAr.join('\n')} onChange={(e) => handleEducationChange(e, 'Ar')} dir="rtl"></textarea>
          </div>
        </div>

        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input id="barAdmissionOman" name="barAdmissionOman" type="checkbox" className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded" checked={formData.barAdmissionOman} onChange={handleCheckboxChange} />
            </div>
            <div className={`${language === 'ar' ? 'mr-3' : 'ml-3'} text-sm`}>
                <label htmlFor="barAdmissionOman" className="font-medium text-gray-700">{t(UI_TEXTS.omaniBarAdmission)}</label>
            </div>
        </div>

        {/* Biography */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="bioEn" className="block text-sm font-medium text-gray-700">{t(UI_TEXTS.bioEnField)}</label>
                <textarea id="bioEn" name="bioEn" rows={5} className="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2" value={formData.bioEn} onChange={handleInputChange}></textarea>
            </div>
            <div>
                <label htmlFor="bioAr" className="block text-sm font-medium text-gray-700">{t(UI_TEXTS.bioArField)}</label>
                <textarea id="bioAr" name="bioAr" rows={5} className="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md p-2" value={formData.bioAr} onChange={handleInputChange} dir="rtl"></textarea>
            </div>
        </div>

        {/* Specializations & Languages */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t(UI_TEXTS.selectSpecializations)}</label>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PRACTICE_AREAS_OPTIONS.map(area => (
              <label key={area} className="flex items-center space-x-2 rtl:space-x-reverse p-2 border rounded-md hover:bg-light-gray cursor-pointer">
                <input
                  type="checkbox"
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                  checked={formData.specializations.includes(area)}
                  onChange={() => {
                    const newSpecs = formData.specializations.includes(area)
                      ? formData.specializations.filter(s => s !== area)
                      : [...formData.specializations, area];
                    handleMultiSelectChange('specializations', newSpecs);
                  }}
                />
                <span className="text-sm text-gray-700">{area}</span>
              </label>
            ))}
          </div>
          {formErrors.specializations && <p className="mt-1 text-xs text-red-600">{formErrors.specializations}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">{t(UI_TEXTS.languagesSpokenField)}</label>
           <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LANGUAGES_SPOKEN_OPTIONS.map(langOpt => (
              <label key={langOpt.code} className="flex items-center space-x-2 rtl:space-x-reverse p-2 border rounded-md hover:bg-light-gray cursor-pointer">
                <input
                  type="checkbox"
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                  checked={formData.languagesSpoken.includes(langOpt.name)}
                  onChange={() => {
                    const newLangs = formData.languagesSpoken.includes(langOpt.name)
                      ? formData.languagesSpoken.filter(s => s !== langOpt.name)
                      : [...formData.languagesSpoken, langOpt.name];
                    handleMultiSelectChange('languagesSpoken', newLangs);
                  }}
                />
                <span className="text-sm text-gray-700">{langOpt.name}</span>
              </label>
            ))}
          </div>
        </div>


        <div className="pt-5">
          <div className="flex justify-end">
            <Button type="button" variant="ghost" onClick={() => navigate('/')} className="mr-2 rtl:mr-0 rtl:ml-2">
              {t({en:"Cancel", ar:"إلغاء"})}
            </Button>
            <Button type="submit" variant="primary" isLoading={isSaving}>
              {isSaving ? t(UI_TEXTS.savingProfile) : t(UI_TEXTS.saveProfile)}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageProfilePage;
