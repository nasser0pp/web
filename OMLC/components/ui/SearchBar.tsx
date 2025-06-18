
import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import SearchIcon from '../icons/SearchIcon';
import { useLanguage } from '../../contexts/LanguageContext';
import { UI_TEXTS } from '../../constants';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string; // This will be overridden by translated placeholder
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder, initialValue = "" }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const actualPlaceholder = placeholder || t(UI_TEXTS.searchPlaceholder);

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full space-x-2 rtl:space-x-reverse">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={actualPlaceholder}
        aria-label={t(UI_TEXTS.search)}
        className="flex-grow"
        leftIcon={<SearchIcon className="text-gray-400" />}
      />
      <Button type="submit" variant="primary" size="md">
        {t(UI_TEXTS.search)}
      </Button>
    </form>
  );
};

export default SearchBar;