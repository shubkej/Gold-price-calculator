import React, { useState } from 'react';
import { CalculationResult } from '../types/calculator';
import { formatINR, formatGrams } from '../utils/calculator';
import { Check, Copy, FileText, ChevronDown, ChevronUp, Sparkles, AlertCircle } from 'lucide-react';

interface CalculationResultsProps {
  result: CalculationResult;
  onOpenPrintModal: () => void;
  onSaveToQuotation?: () => void;
}

export const CalculationResults: React.FC<CalculationResultsProps> = ({
  result,
  onOpenPrintModal,
  onSaveToQuotation,
}) => {
  const [copied, setCopied] = useState(false);
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);

  const handleCopySummary = () => {
    if (!result.isValid || result.finalPrice === 0) return;

    const summaryText = `--- Gold Jewellery Price Estimate ---
Gold Weight: ${formatGrams(result.weightInGrams)}
Gold Rate (10g): ${formatINR(result.ratePer10Grams)} (₹${(result.ratePerGram).toFixed(2)}/g)
Gold Price: ${formatINR(result.goldPrice)}
Making Charges (${result.makingChargesPct}%): ${formatINR(result.makingChargesAmount)}
Subtotal: ${formatINR(result.subtotal)}
GST (3%): ${formatINR(result.gstAmount)}
-------------------------------------
FINAL JEWELLERY PRICE: ${formatINR(result.finalPrice)}
-------------------------------------
Calculated instantly via Gold Jewellery Price Calculator`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // If calculation is not ready or both are 0
  const isReady = result.isValid && result.finalPrice > 0;

  return (
    <div className="bg-white rounded-2xl border border-[#E6DFD5] p-5 sm:p-7 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#F0EAE1]">
          <div>
            <h2 className="text-lg font-semibold text-[#1C1917] tracking-tight">
              Quotation Summary
            </h2>
            <p className="text-xs text-[#78716C] mt-0.5">
              Official Indian Jewellery Shop Billing Breakdown
            </p>
          </div>

          {isReady && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[#FAF8F5] hover:bg-[#F5EFE6] text-[#57534E] hover:text-[#1C1917] border border-[#E6DFD5] transition-colors cursor-pointer"
                title="Copy breakdown to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>


        {/* Empty / Initial State Notice */}
        {!isReady && (
          <div className="py-10 px-4 text-center rounded-xl bg-[#FAF8F5] border border-dashed border-[#D5C9B8]">
            <div className="w-12 h-12 rounded-full bg-[#F0ECE1] flex items-center justify-center mx-auto mb-3 text-[#B8860B]">
              <Sparkles className="w-6 h-6 text-[#C59B27]" />
            </div>
            <h3 className="text-sm font-semibold text-[#1C1917]">
              Awaiting Calculator Inputs
            </h3>
            <p className="text-xs text-[#78716C] max-w-xs mx-auto mt-1 leading-relaxed">
              Enter the gold weight in grams and the current gold rate for 10 grams to view the comprehensive price breakdown.
            </p>
          </div>
        )}

        {/* Breakdown Items List */}
        {isReady && (
          <div className="space-y-3.5">
            {/* 1. Gold Weight */}
            <div className="flex items-center justify-between py-1.5 text-sm border-b border-stone-100">
              <span className="text-[#57534E]">Gold Weight</span>
              <span className="font-mono-numbers font-medium text-[#1C1917]">
                {formatGrams(result.weightInGrams)}
              </span>
            </div>

            {/* 2. Gold Rate (10 Grams) */}
            <div className="flex items-center justify-between py-1.5 text-sm border-b border-stone-100">
              <span className="text-[#57534E]">Gold Rate (10 Grams)</span>
              <div className="text-right">
                <span className="font-mono-numbers font-medium text-[#1C1917] block">
                  {formatINR(result.ratePer10Grams)}
                </span>
                <span className="text-[11px] text-[#A8A29E] font-mono-numbers">
                  (₹{result.ratePerGram.toFixed(2)} / gram)
                </span>
              </div>
            </div>

            {/* 3. Gold Price */}
            <div className="flex items-center justify-between py-1.5 text-sm border-b border-stone-100 bg-[#FAF8F5]/80 px-2.5 rounded-lg">
              <span className="font-medium text-[#1C1917]">Gold Price</span>
              <span className="font-mono-numbers font-semibold text-[#1C1917]">
                {formatINR(result.goldPrice)}
              </span>
            </div>

            {/* 4. Making Charges */}
            <div className="flex items-center justify-between py-1.5 text-sm border-b border-stone-100">
              <div className="flex items-center gap-1.5">
                <span className="text-[#57534E]">Making Charges</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#F5EFE6] text-[#8C6D1F] font-mono-numbers font-semibold">
                  {result.makingChargesPct}%
                </span>
              </div>
              <span className="font-mono-numbers font-medium text-[#1C1917]">
                {formatINR(result.makingChargesAmount)}
              </span>
            </div>

            {/* 5. Subtotal */}
            <div className="flex items-center justify-between py-1.5 text-sm border-b border-stone-100 bg-[#FAF8F5]/80 px-2.5 rounded-lg">
              <span className="font-medium text-[#57534E]">Subtotal (Gold + Making)</span>
              <span className="font-mono-numbers font-semibold text-[#1C1917]">
                {formatINR(result.subtotal)}
              </span>
            </div>

            {/* 6. GST (3%) */}
            <div className="flex items-center justify-between py-1.5 text-sm border-b border-stone-100">
              <div className="flex items-center gap-1.5">
                <span className="text-[#57534E]">GST</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-stone-100 text-[#57534E] font-mono-numbers">
                  {result.gstPct}%
                </span>
              </div>
              <span className="font-mono-numbers font-medium text-[#1C1917]">
                {formatINR(result.gstAmount)}
              </span>
            </div>

            {/* 7. Final Jewellery Price - Visually Prominent */}
            <div className="mt-5 p-5 rounded-xl bg-gradient-to-br from-[#1C1917] via-[#24211E] to-[#141210] text-white border-2 border-[#D4AF37] gold-border-glow shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#E6CA65] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Final Jewellery Price
                </span>
                <span className="text-[10px] text-stone-400 bg-stone-800/80 px-2 py-0.5 rounded-md">
                  All taxes & charges included
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold font-mono-numbers text-white tracking-tight mt-1 flex items-baseline gap-1">
                <span className="text-[#E6CA65]">₹</span>
                <span>{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(result.finalPrice)}</span>
              </div>

              <div className="mt-2 pt-2 border-t border-stone-800/80 text-[11px] text-stone-300 flex items-center justify-between">
                <span>Net Rate: ₹{(result.finalPrice / (result.weightInGrams || 1)).toFixed(2)}/g all-inclusive</span>
                <span>Statutory 3% GST Paid</span>
              </div>
            </div>

            {/* Formula Accordion */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                className="w-full flex items-center justify-between text-xs font-medium text-[#78716C] hover:text-[#1C1917] py-2 transition-colors cursor-pointer"
              >
                <span>View Mathematical Step-by-Step Breakdown</span>
                {showFormulaDetails ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showFormulaDetails && (
                <div className="p-3.5 mt-1 bg-[#FAF8F5] rounded-xl border border-[#E6DFD5] space-y-2 text-xs font-mono-numbers text-[#57534E]">
                  <div>
                    <span className="text-[#A8A29E] font-sans">Step 1 (Gold Price): </span>
                    ({result.weightInGrams}g × ₹{result.ratePer10Grams}) ÷ 10 = <span className="font-bold text-[#1C1917]">{formatINR(result.goldPrice)}</span>
                  </div>
                  <div>
                    <span className="text-[#A8A29E] font-sans">Step 2 (Making Charges): </span>
                    {formatINR(result.goldPrice)} × {result.makingChargesPct}% = <span className="font-bold text-[#1C1917]">{formatINR(result.makingChargesAmount)}</span>
                  </div>
                  <div>
                    <span className="text-[#A8A29E] font-sans">Step 3 (Subtotal): </span>
                    {formatINR(result.goldPrice)} + {formatINR(result.makingChargesAmount)} = <span className="font-bold text-[#1C1917]">{formatINR(result.subtotal)}</span>
                  </div>
                  <div>
                    <span className="text-[#A8A29E] font-sans">Step 4 (3% GST): </span>
                    {formatINR(result.subtotal)} × 3% = <span className="font-bold text-[#1C1917]">{formatINR(result.gstAmount)}</span>
                  </div>
                  <div className="pt-1 border-t border-stone-200">
                    <span className="text-[#A8A29E] font-sans">Step 5 (Final Price): </span>
                    {formatINR(result.subtotal)} + {formatINR(result.gstAmount)} = <span className="font-bold text-[#1C1917]">{formatINR(result.finalPrice)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      {isReady && (
        <div className="mt-6 pt-4 border-t border-[#F0EAE1] flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenPrintModal}
            className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-sm"
          >
            <FileText className="w-4 h-4 text-[#E6CA65]" />
            <span>Print Slip</span>
          </button>

          {onSaveToQuotation && (
            <button
              type="button"
              onClick={onSaveToQuotation}
              className="py-2.5 px-4 rounded-xl font-medium text-xs sm:text-sm bg-[#FAF8F5] text-[#57534E] hover:bg-[#F5EFE6] hover:text-[#1C1917] border border-[#E6DFD5] transition-all cursor-pointer"
              title="Save to comparison list"
            >
              Save Item
            </button>
          )}
        </div>
      )}
    </div>
  );
};
