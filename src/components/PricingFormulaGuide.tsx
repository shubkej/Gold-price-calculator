import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Calculator, Sparkles } from 'lucide-react';

export const PricingFormulaGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[#E6DFD5] p-5 sm:p-7 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5] text-[#B8860B] flex items-center justify-center group-hover:border-[#C59B27] transition-colors">
            <Calculator className="w-5 h-5 text-[#C59B27]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-[#1C1917] group-hover:text-[#8C6D1F] transition-colors">
              How Is Gold Jewellery Price Calculated in India?
            </h3>
            <p className="text-xs text-[#78716C]">
              Standard 5-step retail pricing formula & statutory rules
            </p>
          </div>
        </div>

        <div className="text-stone-400 group-hover:text-stone-700 transition-colors">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-5 pt-5 border-t border-[#F0EAE1] space-y-5 text-xs text-[#57534E]">
          {/* Formula Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5]">
              <div className="font-bold text-[#1C1917] mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1C1917] text-[#E6CA65] flex items-center justify-center text-[10px] font-mono">1</span>
                <span>Gold Price</span>
              </div>
              <p className="text-[#78716C] leading-relaxed">
                <code>(Gold Weight × Gold Rate) ÷ 10</code>
                <br />
                Since bullion rates are quoted for 10 grams, dividing by 10 yields the exact per-gram rate.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5]">
              <div className="font-bold text-[#1C1917] mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1C1917] text-[#E6CA65] flex items-center justify-center text-[10px] font-mono">2</span>
                <span>Making Charges</span>
              </div>
              <p className="text-[#78716C] leading-relaxed">
                <code>Gold Price × Percentage ÷ 100</code>
                <br />
                Covers artisan craftsmanship, wastage, soldering, and designing (typically 15% to 20%).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5]">
              <div className="font-bold text-[#1C1917] mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1C1917] text-[#E6CA65] flex items-center justify-center text-[10px] font-mono">3</span>
                <span>Subtotal</span>
              </div>
              <p className="text-[#78716C] leading-relaxed">
                <code>Gold Price + Making Charges</code>
                <br />
                Combined pre-tax valuation of pure metal plus artisan fabrication.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5]">
              <div className="font-bold text-[#1C1917] mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1C1917] text-[#E6CA65] flex items-center justify-center text-[10px] font-mono">4</span>
                <span>GST (Fixed 3%)</span>
              </div>
              <p className="text-[#78716C] leading-relaxed">
                <code>Subtotal × 3 ÷ 100</code>
                <br />
                Uniform statutory GST levied on total jewellery invoice (1.5% CGST + 1.5% SGST).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5] sm:col-span-2">
              <div className="font-bold text-[#1C1917] mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1C1917] text-[#E6CA65] flex items-center justify-center text-[10px] font-mono">5</span>
                <span>Final Jewellery Price</span>
              </div>
              <p className="text-[#78716C] leading-relaxed">
                <code>Final Price = Subtotal + GST Amount</code>
                <br />
                Net customer payable bill amount displayed on invoice memo.
              </p>
            </div>
          </div>

          {/* Quick Indian Weight Reference Guide */}
          <div className="p-3.5 rounded-xl bg-[#F5EFE6]/60 border border-[#E6DFD5] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
              <span className="font-semibold text-[#1C1917]">Standard Weight Units:</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap text-stone-700 font-mono-numbers">
              <span><strong>1 Gram</strong> = 1,000 mg</span>
              <span><strong>1 Pavan (Sovereign)</strong> = 8.000 g</span>
              <span><strong>1 Tola</strong> = 11.664 g</span>
              <span><strong>1 Bullion Unit</strong> = 10.000 g</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
