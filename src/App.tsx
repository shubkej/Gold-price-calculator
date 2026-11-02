/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { CalculationInputs, CalculationResult, MakingChargeOption, SavedEstimate } from './types/calculator';
import {
  calculateJewelleryPrice,
  DEFAULT_MAKING_CHARGE,
  INITIAL_INPUTS,
  formatINR,
  formatGrams,
} from './utils/calculator';
import { CalculatorInputs } from './components/CalculatorInputs';
import { CalculationResults } from './components/CalculationResults';
import { PrintQuotationModal } from './components/PrintQuotationModal';
import { SavedEstimates } from './components/SavedEstimates';

// Generated luxury jewellery image asset
const JEWELLERY_SHOWCASE_IMG = '/src/assets/images/luxury_gold_jewellery_showcase_1793591992877.jpg';

export default function App() {
  // Calculator state
  const [inputs, setInputs] = useState<CalculationInputs>(INITIAL_INPUTS);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [savedEstimates, setSavedEstimates] = useState<SavedEstimate[]>(() => {
    try {
      const stored = localStorage.getItem('gold_jewellery_estimates');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save estimates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gold_jewellery_estimates', JSON.stringify(savedEstimates));
    } catch (e) {
      console.error('Failed to save estimates to localStorage', e);
    }
  }, [savedEstimates]);

  // Automatic calculation whenever weight, rate, or making charges change
  const result: CalculationResult = useMemo(() => {
    return calculateJewelleryPrice(inputs);
  }, [inputs]);

  // Handle input changes
  const handleInputChange = (field: keyof CalculationInputs, value: string | MakingChargeOption) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * AC Button (All Clear):
   * - Clears all input values
   * - Resets the making charge selection to 15%
   * - Clears all calculated results
   * - Returns the calculator to its initial state
   */
  const handleAllClear = () => {
    setInputs({
      weight: '',
      rate: '',
      makingChargePct: DEFAULT_MAKING_CHARGE,
    });
  };

  /**
   * WC Button (Weight Clear):
   * - Clears only the Gold Weight input field
   * - Keeps the Gold Rate unchanged
   * - Keeps the Making Charges selection unchanged
   * - Keeps GST at 3%
   * - Updates or clears the calculation results accordingly
   */
  const handleWeightClear = () => {
    setInputs((prev) => ({
      ...prev,
      weight: '',
    }));
  };

  // Save current estimate to list
  const handleSaveToQuotation = () => {
    if (!result.isValid || result.finalPrice === 0) return;

    const newEstimate: SavedEstimate = {
      id: `est_${Date.now()}`,
      timestamp: Date.now(),
      itemDescription: `Gold Ornament (${formatGrams(result.weightInGrams)})`,
      inputs: { ...inputs },
      result: { ...result },
    };

    setSavedEstimates((prev) => [newEstimate, ...prev]);
  };

  const handleRemoveEstimate = (id: string) => {
    setSavedEstimates((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllEstimates = () => {
    setSavedEstimates([]);
  };

  const handleLoadEstimate = (est: SavedEstimate) => {
    setInputs({ ...est.inputs });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col selection:bg-[#E6CA65] selection:text-black">

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Calculator Main Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Calculator Inputs */}
          <div className="lg:col-span-6 space-y-6">
            <CalculatorInputs
              inputs={inputs}
              onInputChange={handleInputChange}
              onAllClear={handleAllClear}
              onWeightClear={handleWeightClear}
              validationError={result.validationError}
            />
          </div>

          {/* Right Column: Calculation Results Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <CalculationResults
              result={result}
              onOpenPrintModal={() => setIsPrintModalOpen(true)}
              onSaveToQuotation={result.isValid && result.finalPrice > 0 ? handleSaveToQuotation : undefined}
            />
          </div>
        </section>

        {/* Saved Items List (Multi-item Wedding Set Budgeting) */}
        <SavedEstimates
          estimates={savedEstimates}
          onRemoveEstimate={handleRemoveEstimate}
          onClearAllEstimates={handleClearAllEstimates}
          onLoadEstimate={handleLoadEstimate}
        />
      </main>

      {/* Quotation Printable Memo Modal */}
      <PrintQuotationModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        result={result}
      />
    </div>
  );
}
