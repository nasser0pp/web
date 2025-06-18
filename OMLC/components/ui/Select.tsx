
import React from 'react';
import ChevronDownIcon from '../icons/ChevronDownIcon';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholderOption?: string; // e.g., "Select an option"
}

const Select: React.FC<SelectProps> = ({ label, id, options, error, placeholderOption, className, ...props }) => {
  const hasError = !!error;
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        <select
          id={id}
          className={`
            form-select block w-full pl-3 pr-10 py-2 text-base border
            rounded-md appearance-none 
            focus:outline-none focus:ring-primary focus:border-primary sm:text-sm
            ${hasError ? 'border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        >
          {placeholderOption && <option value="">{placeholderOption}</option>}
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
