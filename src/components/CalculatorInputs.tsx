import React from 'react';
import { CalculationInputs, MakingChargeOption } from '../types/calculator';
import { Lock, Scale, IndianRupee, Percent, Trash2, Eraser, Check } from 'lucide-react';

interface CalculatorInputsProps {
  inputs: CalculationInputs;
  onInputChange: (field: keyof CalculationInputs, value: string | MakingChargeOption) => void;
  onAllClear: () => void;
  onWeightClear: () => void;
  validationError?: string;
}

const MAKING_CHARGE_OPTIONS: MakingChargeOption[] = [15, 18, 20];

const POPULAR_WEIGHT_PRESETS = [
  { label: '1g', value: '1' },
  { label: '2.5g', value: '2.5' },
  { label: '4g', value: '4' },
  { label: '8g (1 Pavan)', value: '8' },
  { label: '10g', value: '10' },
  { label: '15g', value: '15' },
  { label: '20g', value: '20' },
];

export const CalculatorInputs: React.FC<CalculatorInputsProps> = ({
  inputs,
  onInputChange,
  onAllClear,
  onWeightClear,
  validationError,
}) => {
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Disallow negative values directly
    if (val.includes('-')) return;
    onInputChange('weight', val);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Disallow negative values directly
    if (val.includes('-')) return;
    onInputChange('rate', val);
  };

  const handleQuickWeight = (val: string) => {
    onInputChange('weight', val);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6DFD5] p-5 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F0EAE1]">
        <div>
          <h2 className="text-lg font-semibold text-[#1C1917] tracking-tight">
            Jewellery Parameters
          </h2>
        </div>

        {/* Action Buttons: AC (All Clear) and WC (Weight Clear) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onWeightClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF8F5] text-[#57534E] hover:text-[#1C1917] hover:bg-[#F0ECE1] border border-[#E6DFD5] transition-colors cursor-pointer active:scale-95"
            title="Weight Clear: Clears only Gold Weight, keeps Rate & Making Charges"
          >
            <Eraser className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>WC</span>
          </button>

          <button
            type="button"
            onClick={onAllClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] hover:text-white transition-colors cursor-pointer active:scale-95 shadow-xs"
            title="All Clear: Clears all inputs and resets making charges to 15%"
          >
            <Trash2 className="w-3.5 h-3.5 text-[#E6CA65]" />
            <span>AC</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* 1. Gold Weight Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="gold-weight"
              className="text-sm font-semibold text-[#1C1917] flex items-center gap-1.5"
            >
              <Scale className="w-4 h-4 text-[#C59B27]" />
              <span>1. Gold Weight</span>
            </label>
            <span className="text-xs text-[#78716C] font-mono-numbers">
              In Grams (e.g., 2.500 or 10)
            </span>
          </div>

          <div className="relative">
            <input
              id="gold-weight"
              type="number"
              step="any"
              min="0"
              placeholder="e.g. 10.00"
              value={inputs.weight}
              onChange={handleWeightChange}
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D5C9B8] rounded-xl text-lg font-mono-numbers text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all pr-20"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] bg-[#ECE5D8] px-2 py-1 rounded-md">
                Grams
              </span>
            </div>
          </div>

          {/* Quick Weight Selectors */}
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          </div>
        </div>

        {/* 2. Gold Rate (10 Grams) Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="gold-rate"
              className="text-sm font-semibold text-[#1C1917] flex items-center gap-1.5"
            >
              <IndianRupee className="w-4 h-4 text-[#C59B27]" />
              <span>2. Gold Rate (10 Grams)</span>
            </label>
            <span className="text-xs text-[#78716C]">
              Price for 10 grams (₹)
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-[#78716C]">
              ₹
            </div>
            <input
              id="gold-rate"
              type="number"
              step="any"
              min="0"
              placeholder="e.g. 125000"
              value={inputs.rate}
              onChange={handleRateChange}
              className="w-full pl-9 pr-24 py-3 bg-[#FAF8F5] border border-[#D5C9B8] rounded-xl text-lg font-mono-numbers text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-[#78716C] font-medium bg-[#ECE5D8] px-2 py-1 rounded-md">
              / 10g
            </div>
          </div>
        </div>

        {/* 3. Making Charges Percentage (15%, 18%, 20%) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-[#1C1917] flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-[#C59B27]" />
              <span>3. Making Charges</span>
            </label>
            <span className="text-xs text-[#78716C]">
              Select percentage option
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {MAKING_CHARGE_OPTIONS.map((pct) => {
              const isSelected = inputs.makingChargePct === pct;
              return (
                <button
                  key={pct}
                  type="button"
                  onClick={() => onInputChange('makingChargePct', pct)}
                  className={`relative flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all cursor-pointer text-center ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#FDFBF7] shadow-sm ring-1 ring-[#D4AF37]/50'
                      : 'border-[#E6DFD5] bg-[#FAF8F5] hover:border-[#C59B27]/50 hover:bg-[#F5EFE6]'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold font-mono-numbers text-[#1C1917]">
                      {pct}%
                    </span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#B8860B] stroke-[2.5]" />
                    )}
                  </div>
                  <span className="text-[11px] text-[#78716C] mt-0.5">
                    {pct === 15 ? 'Standard (Default)' : pct === 18 ? 'Handcrafted' : 'Intricate Filigree'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. GST Fixed at 3% */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-[#1C1917] flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#78716C]" />
              <span>4. GST (Fixed Rate)</span>
            </label>
            <span className="text-xs text-[#78716C]">
              Statutory Government Rate
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#F5EFE6]/60 border border-[#E6DFD5] rounded-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#EAE2D5] flex items-center justify-center text-[#78716C]">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1C1917]">
                  3% GST (CGST 1.5% + SGST 1.5%)
                </div>
                <div className="text-xs text-[#78716C]">
                  Non-modifiable statutory gold bullion & jewellery tax
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold font-mono-numbers bg-[#1C1917] text-[#E6CA65]">
                3.00%
              </span>
            </div>
          </div>
        </div>

        {/* Validation Error Banner (if any) */}
        {validationError && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>{validationError}</span>
          </div>
        )}
      </div>
    </div>
  );
};
