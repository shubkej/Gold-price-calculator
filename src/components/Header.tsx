import React from 'react';
import { Sparkles, Printer, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onPrintClick: () => void;
  onResetAll: () => void;
  hasCalculatedResult: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onPrintClick,
  onResetAll,
  hasCalculatedResult,
}) => {
  return (
    <header className="border-b border-[#E6DFD5] bg-[#FDFBF7] sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Title Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1C1917] to-[#292524] text-[#D4AF37] flex items-center justify-center shadow-sm border border-[#D4AF37]/30">
            <Sparkles className="w-6 h-6 text-[#E6CA65]" />
          </div>
          <div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917]">
              Gold Jewellery Price Calculator
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] font-medium">
              Calculate your jewellery price instantly
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {hasCalculatedResult && (
            <button
              type="button"
              onClick={onPrintClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#1C1917] bg-[#F5EFE6] hover:bg-[#EBDDC8] border border-[#D4AF37]/40 rounded-lg transition-colors cursor-pointer shadow-xs"
              title="Print or save quotation slip"
            >
              <Printer className="w-4 h-4 text-[#8C6D1F]" />
              <span className="hidden sm:inline">Print Slip</span>
            </button>
          )}

          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-[#78716C] hover:text-[#1C1917] hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Reset calculator to default state"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
