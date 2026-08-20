import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  badge?: string;
  disabled?: boolean;
}

export interface FormSelectProps {
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  options?: SelectOption[];
  children?: React.ReactNode;
  onChange?: (e: any) => void;
  onValueChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  containerClassName?: string;
  name?: string;
  id?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value: controlledValue,
  defaultValue,
  options: explicitOptions,
  children,
  onChange,
  onValueChange,
  placeholder = 'Select an option...',
  disabled = false,
  size = 'sm',
  className = '',
  containerClassName = '',
  name,
  id,
  searchable = false,
  searchPlaceholder = 'Search options...',
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uncontrolledValue, setUncontrolledValue] = useState<string | number>(
    defaultValue !== undefined ? defaultValue : ''
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const parsedOptions: SelectOption[] = React.useMemo(() => {
    if (explicitOptions && explicitOptions.length > 0) {
      return explicitOptions;
    }
    const extracted: SelectOption[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props) {
        extracted.push({
          value: child.props.value !== undefined ? child.props.value : child.props.children,
          label: String(child.props.children || child.props.value || ''),
          disabled: Boolean(child.props.disabled),
        });
      }
    });
    return extracted;
  }, [explicitOptions, children]);

  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return parsedOptions;
    }
    const q = searchQuery.toLowerCase().trim();
    return parsedOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        String(opt.value).toLowerCase().includes(q) ||
        (opt.description && opt.description.toLowerCase().includes(q)) ||
        (opt.badge && opt.badge.toLowerCase().includes(q))
    );
  }, [parsedOptions, searchable, searchQuery]);

  const selectedOption = parsedOptions.find(
    (opt) => String(opt.value) === String(currentValue)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen, searchable]);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled || disabled) return;
    if (!isControlled) {
      setUncontrolledValue(option.value);
    }
    if (onValueChange) {
      onValueChange(option.value);
    }
    if (onChange) {
      const syntheticEvent = {
        target: { name, value: option.value },
        currentTarget: { name, value: option.value },
      };
      onChange(syntheticEvent as any);
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  const sizeClasses = {
    sm: 'py-1.5 px-2.5 text-xs',
    md: 'py-2 px-3 text-xs sm:text-sm',
    lg: 'py-2.5 px-3.5 text-sm',
  };

  return (
    <div ref={containerRef} className={`space-y-1.5 w-full relative ${containerClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 select-none"
        >
          {label}
        </label>
      )}

      {/* Hidden native select for standard HTML form compatibility */}
      <select
        id={selectId}
        name={name}
        value={currentValue}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {parsedOptions.map((opt) => (
          <option key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Custom Dropdown Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-lg border text-left font-medium transition-all outline-none select-none ${
          sizeClasses[size]
        } ${
          isOpen
            ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-white dark:bg-slate-900 shadow-sm'
            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
        } ${
          disabled
            ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800'
            : 'cursor-pointer'
        } ${className}`}
      >
        <div className="flex items-center gap-2 truncate pr-2">
          {selectedOption ? (
            <>
              {selectedOption.icon && (
                <span className="shrink-0 text-slate-500 dark:text-slate-400">
                  {selectedOption.icon}
                </span>
              )}
              <span className="truncate text-slate-900 dark:text-white font-medium">
                {selectedOption.label}
              </span>
              {selectedOption.badge && (
                <span className="ml-1 text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 shrink-0">
                  {selectedOption.badge}
                </span>
              )}
            </>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 truncate">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-indigo-500' : ''
          }`}
        />
      </button>

      {/* Dropdown Options Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl shadow-slate-900/10 dark:shadow-black/40 animate-in fade-in zoom-in-95 duration-100 flex flex-col">
          {searchable && (
            <div className="p-2 border-b border-slate-100 dark:border-slate-800 relative flex items-center bg-slate-50/50 dark:bg-slate-800/40">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-7 pr-7 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md outline-none text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <div className="overflow-y-auto p-1 space-y-0.5 max-h-52">
            {filteredOptions.length === 0 ? (
              <div className="py-3 px-2 text-center text-xs text-slate-400 select-none">
                No matching options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = String(option.value) === String(currentValue);
                return (
                  <div
                    key={String(option.value)}
                    onClick={() => handleSelect(option)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition select-none ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    } ${option.disabled ? 'opacity-40 cursor-not-allowed hover:bg-transparent' : ''}`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      {option.icon && (
                        <span className="shrink-0 text-slate-400">{option.icon}</span>
                      )}
                      <div className="truncate">
                        <div className="truncate">{option.label}</div>
                        {option.description && (
                          <div className="text-[10px] text-slate-400 font-normal truncate">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {option.badge && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {option.badge}
                        </span>
                      )}
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
