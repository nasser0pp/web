
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SearchResultItem, PracticeArea, Governorate, SearchFilters } from '../types';
import { searchProfessionals } from '../services/lawyerService';
import { PRACTICE_AREAS_OPTIONS, GOVERNORATES_OPTIONS, LANGUAGES_SPOKEN_OPTIONS, EXPERIENCE_YEARS_OPTIONS, UI_TEXTS } from '../constants';
import LawyerProfileCard from '../components/lawyer/LawyerProfileCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import SearchIcon from '../components/icons/SearchIcon';
import { useLanguage } from '../contexts/LanguageContext';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'; // For pagination

const RESULTS_PER_PAGE = 10;

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastVisibleDoc, setLastVisibleDoc] = useState<QueryDocumentSnapshot<DocumentData> | null | undefined>(undefined);
  const [hasMoreResults, setHasMoreResults] = useState(true);

  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: searchParams.get('term') || '',
    practiceArea: (searchParams.get('practiceArea') as PracticeArea) || '',
    governorate: (searchParams.get('governorate') as Governorate) || '',
    language: searchParams.get('language') || '',
    minExperience: parseInt(searchParams.get('minExperience') || '0', 10) || undefined,
  });
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  const practiceAreaOptions = [{ value: '', label: t(UI_TEXTS.allPracticeAreas) }, ...PRACTICE_AREAS_OPTIONS.map(pa => ({ value: pa, label: pa }))];
  const governorateOptions = [{ value: '', label: t(UI_TEXTS.allGovernorates) }, ...GOVERNORATES_OPTIONS.map(g => ({ value: g, label: g }))];
  const languageOptions = [{ value: '', label: t(UI_TEXTS.anyLanguage) }, ...LANGUAGES_SPOKEN_OPTIONS.map(l => ({ value: l.name, label: language === 'ar' ? l.code === 'ar'? l.name : l.code.toUpperCase() : l.name  }))];
  const experienceOptions = [{ value: '0', label: t(UI_TEXTS.anyExperience) }, ...EXPERIENCE_YEARS_OPTIONS.map(exp => ({ value: exp.toString(), label: `${exp}+ ${t({en:"years", ar:"سنوات"})}` }))];

  const executeSearch = useCallback(async (currentFilters: SearchFilters, loadMore = false) => {
    if (loadMore) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
      setLastVisibleDoc(undefined); // Reset for new search
      setResults([]); // Clear previous results for a new search
    }

    try {
      const { results: newResults, lastDoc: newLastDoc } = await searchProfessionals(
        currentFilters,
        RESULTS_PER_PAGE,
        loadMore ? lastVisibleDoc : undefined
      );
      
      setResults(prevResults => loadMore ? [...prevResults, ...newResults] : newResults);
      setLastVisibleDoc(newLastDoc);
      setHasMoreResults(newResults.length === RESULTS_PER_PAGE && newLastDoc !== null);

    } catch (error) {
      console.error("Failed to fetch search results:", error);
      // setResults([]); // Already cleared or appended
      setHasMoreResults(false);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [lastVisibleDoc]); // Add lastVisibleDoc dependency

  useEffect(() => {
    const initialFiltersFromUrl: SearchFilters = {
      searchTerm: searchParams.get('term') || '',
      practiceArea: (searchParams.get('practiceArea') as PracticeArea) || '',
      governorate: (searchParams.get('governorate') as Governorate) || '',
      language: searchParams.get('language') || '',
      minExperience: parseInt(searchParams.get('minExperience') || '0', 10) || undefined,
    };
    setFilters(initialFiltersFromUrl);
    executeSearch(initialFiltersFromUrl, false); // Initial search, not loading more
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Re-run search if URL params change (e.g. browser back/forward)

  const handleFilterChange = <K extends keyof SearchFilters,>(key: K, value: SearchFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams();
    if (filters.searchTerm) newParams.set('term', filters.searchTerm);
    if (filters.practiceArea) newParams.set('practiceArea', filters.practiceArea);
    if (filters.governorate) newParams.set('governorate', filters.governorate);
    if (filters.language) newParams.set('language', filters.language);
    if (filters.minExperience && filters.minExperience > 0) newParams.set('minExperience', filters.minExperience.toString());
    
    setSearchParams(newParams); // This will trigger useEffect for a new search
    setShowFiltersPanel(false);
  };

  const clearFiltersHandler = () => {
    const clearedFilters: SearchFilters = {
      searchTerm: '', practiceArea: '', governorate: '', language: '', minExperience: undefined,
    };
    setFilters(clearedFilters);
    setSearchParams(new URLSearchParams()); // This will trigger useEffect for a new search
    setShowFiltersPanel(false);
  };

  const loadMoreResults = () => {
    if (hasMoreResults && !isLoadingMore) {
        executeSearch(filters, true); // Load more with current filters
    }
  };
  
  const FilterPanelContent = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">{t(UI_TEXTS.filterResults)}</h3>
      <Input
        label={t(UI_TEXTS.keywords)}
        placeholder={t({en: "Name, firm, expertise...", ar: "الاسم، المكتب، الخبرة..."})}
        value={filters.searchTerm}
        onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
        leftIcon={<SearchIcon className="text-gray-400"/>}
      />
      <Select
        label={t(UI_TEXTS.practiceArea)}
        options={practiceAreaOptions}
        value={filters.practiceArea}
        onChange={(e) => handleFilterChange('practiceArea', e.target.value as PracticeArea | '')}
      />
      <Select
        label={t(UI_TEXTS.governorate)}
        options={governorateOptions}
        value={filters.governorate}
        onChange={(e) => handleFilterChange('governorate', e.target.value as Governorate | '')}
      />
      <Select
        label={t(UI_TEXTS.language)}
        options={languageOptions}
        value={filters.language}
        onChange={(e) => handleFilterChange('language', e.target.value)}
      />
      <Select
        label={t(UI_TEXTS.minExperience)}
        options={experienceOptions}
        value={filters.minExperience?.toString() || '0'}
        onChange={(e) => handleFilterChange('minExperience', parseInt(e.target.value, 10) || undefined)}
      />
      <div className="flex space-x-2 rtl:space-x-reverse">
        <Button onClick={applyFilters} variant="primary" className="w-full">{t(UI_TEXTS.applyFilters)}</Button>
        <Button onClick={clearFiltersHandler} variant="outline" className="w-full">{t(UI_TEXTS.clearFilters)}</Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:hidden mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowFiltersPanel(!showFiltersPanel)} 
            className="w-full"
          >
            {showFiltersPanel ? t(UI_TEXTS.hideFilters) : t(UI_TEXTS.showFilters)}
          </Button>
        </div>

        {showFiltersPanel && <div className="lg:hidden"><FilterPanelContent /></div>}
        <aside className="hidden lg:block lg:w-1/4 xl:w-1/5">
            <FilterPanelContent />
        </aside>

        <main className="lg:w-3/4 xl:w-4/5">
          <h1 className="text-3xl font-semibold text-text-primary mb-6">
            {t(UI_TEXTS.search)} {t({en:"Results", ar:"النتائج"})} {filters.searchTerm && `${t({en:"for", ar:"لـ"})}"${filters.searchTerm}"`}
          </h1>
          {isLoading && results.length === 0 ? ( // Show main loader only if no results yet
            <LoadingSpinner message={t({en:"Searching for legal professionals...", ar:"جاري البحث عن محترفين قانونيين..."})} />
          ) : results.length > 0 ? (
            <div className="space-y-6">
              <p className="text-text-secondary">{results.length} {t({en:"result(s) shown.", ar:"نتيجة معروضة."})}</p>
              {results.map(item => (
                <LawyerProfileCard key={`${item.type}-${item.id}`} item={item} />
              ))}
              {hasMoreResults && (
                <div className="text-center mt-8">
                  <Button onClick={loadMoreResults} variant="outline" isLoading={isLoadingMore}>
                    {isLoadingMore ? t({en: "Loading...", ar: "جاري التحميل..."}) : t({en: "Load More", ar: "تحميل المزيد"})}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            !isLoading && // Ensure not to show "No results" while initial load is happening
            <div className="text-center py-10 bg-white rounded-lg shadow">
              <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-text-primary mb-2">{t(UI_TEXTS.noResultsFound)}</h2>
              <p className="text-text-secondary mb-4">
                {t(UI_TEXTS.tryAdjustingFilters)}
              </p>
              <Button onClick={() => navigate('/')} variant="primary">{t(UI_TEXTS.backToHome)}</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResultsPage;
