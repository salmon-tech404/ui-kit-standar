import React from 'react';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  prefixElement?: React.ReactNode;
  suffixElement?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  helperText,
  prefixElement,
  suffixElement,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefixElement && (
          <div className="absolute left-2.5 pointer-events-none text-slate-400">
            {prefixElement}
          </div>
        )}
        <input
          className={`w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-xs font-medium text-slate-900 dark:text-white transition focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 ${
            prefixElement ? 'pl-8' : ''
          } ${suffixElement ? 'pr-8' : ''} ${className}`}
          {...props}
        />
        {suffixElement && (
          <div className="absolute right-2.5 pointer-events-none text-slate-400">
            {suffixElement}
          </div>
        )}
      </div>
      {helperText && <p className="text-[11px] text-slate-500 dark:text-slate-400">{helperText}</p>}
    </div>
  );
};
