import React from 'react';
import { SavedEstimate } from '../types/calculator';
import { formatINR, formatGrams } from '../utils/calculator';
import { Trash2, ShoppingBag, PlusCircle } from 'lucide-react';

interface SavedEstimatesProps {
  estimates: SavedEstimate[];
  onRemoveEstimate: (id: string) => void;
  onClearAllEstimates: () => void;
  onLoadEstimate: (est: SavedEstimate) => void;
}

export const SavedEstimates: React.FC<SavedEstimatesProps> = ({
  estimates,
  onRemoveEstimate,
  onClearAllEstimates,
  onLoadEstimate,
}) => {
  if (estimates.length === 0) return null;

  const totalGrams = estimates.reduce((acc, curr) => acc + curr.result.weightInGrams, 0);
  const totalAmount = estimates.reduce((acc, curr) => acc + curr.result.finalPrice, 0);

  return (
    <div className="bg-white rounded-2xl border border-[#E6DFD5] p-5 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F0EAE1]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E6DFD5] text-[#B8860B] flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-[#C59B27]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#1C1917]">
              Saved Jewellery Estimations ({estimates.length})
            </h3>
            <p className="text-xs text-[#78716C]">
              Compare multiple ornaments or calculate total wedding set budget
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClearAllEstimates}
          className="text-xs text-stone-500 hover:text-rose-600 transition-colors cursor-pointer"
        >
          Clear List
        </button>
      </div>

      {/* Grid of Saved Ornaments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {estimates.map((est) => (
          <div
            key={est.id}
            className="p-3.5 rounded-xl border border-[#E6DFD5] bg-[#FAF8F5] hover:bg-[#F5EFE6]/60 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-[#1C1917] truncate max-w-[170px]">
                  {est.itemDescription}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveEstimate(est.id)}
                  className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[11px] text-[#78716C] font-mono-numbers space-y-0.5">
                <div>Weight: <strong>{formatGrams(est.result.weightInGrams)}</strong></div>
                <div>Rate: {formatINR(est.result.ratePer10Grams)}/10g · MC: {est.result.makingChargesPct}%</div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#E6DFD5] flex items-center justify-between">
              <span className="text-xs font-bold font-mono-numbers text-[#1C1917]">
                {formatINR(est.result.finalPrice)}
              </span>
              <button
                type="button"
                onClick={() => onLoadEstimate(est)}
                className="text-[11px] font-medium text-[#8C6D1F] hover:underline cursor-pointer"
              >
                Load
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Grand Total Strip */}
      <div className="mt-4 p-4 rounded-xl bg-[#1C1917] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <span className="text-xs text-[#E6CA65] uppercase tracking-wider font-semibold">
            Combined Jewellery Total
          </span>
          <div className="text-xs text-stone-300 font-mono-numbers mt-0.5">
            Total Gold Net Weight: <strong>{formatGrams(totalGrams)}</strong> across {estimates.length} ornaments
          </div>
        </div>

        <div className="text-xl sm:text-2xl font-bold font-mono-numbers text-white">
          {formatINR(totalAmount)}
        </div>
      </div>
    </div>
  );
};
