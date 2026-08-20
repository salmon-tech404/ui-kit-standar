import React, { useState, useRef, useEffect } from 'react';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  hotkey?: string;
  delayMs?: number;
  variant?: 'custom' | 'library';
  className?: string;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  hotkey,
  delayMs = 150,
  variant = 'custom',
  className = '',
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<any>(null);

  const showTooltip = () => {
    if (disabled || !content) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (disabled || !content) {
    return children;
  }

  // Positioning classes
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  // Arrow orientation classes
  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-900 dark:border-t-slate-800 border-x-transparent border-b-transparent border-4',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-900 dark:border-t-slate-800 border-x-transparent border-t-transparent border-4',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-900 dark:border-l-slate-800 border-y-transparent border-r-transparent border-4',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-900 dark:border-r-slate-800 border-y-transparent border-l-transparent border-4',
  };

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {React.cloneElement(children, {
        'aria-describedby': isVisible ? 'raku-tooltip' : undefined,
      })}

      {isVisible && (
        <div
          id="raku-tooltip"
          role="tooltip"
          style={{
            borderRadius: 'var(--radius-sm, 6px)',
          }}
          className={`absolute z-[9999] pointer-events-none whitespace-nowrap shadow-xl flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium transition-all duration-150 animate-in fade-in zoom-in-95 ${
            positionClasses[position]
          } ${
            variant === 'library'
              ? 'bg-slate-950 text-slate-100 border border-slate-700/80 font-sans'
              : 'bg-slate-900 dark:bg-slate-800 text-white border border-slate-700/50'
          }`}
        >
          <span>{content}</span>
          {hotkey && (
            <kbd className="px-1.5 py-0.2 rounded bg-slate-800 dark:bg-slate-700 text-slate-300 font-mono text-[9px] font-bold border border-slate-700/60">
              {hotkey}
            </kbd>
          )}

          {/* Triangular pointer arrow */}
          <div className={`absolute w-0 h-0 pointer-events-none ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
};
