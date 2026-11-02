import React, { useState } from 'react';
import { CalculationResult } from '../types/calculator';
import { formatINR, formatGrams } from '../utils/calculator';
import { X, Printer, Sparkles, Check } from 'lucide-react';

interface PrintQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CalculationResult;
}

export const PrintQuotationModal: React.FC<PrintQuotationModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  const [storeName, setStoreName] = useState('Brahmdeo JEWELLERS');
  const [itemName, setItemName] = useState('22K Hallmark Gold Ornament');
  const [customerName, setCustomerName] = useState('');
  const [estimateNo] = useState(() => `EST-${Math.floor(100000 + Math.random() * 900000)}`);
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print-overlay">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#E6DFD5] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Controls Header (not printed) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DFD5] bg-[#FDFBF7] no-print">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B8860B]" />
            <h3 className="font-semibold text-sm sm:text-base text-[#1C1917]">
              Invoice
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1C1917] text-white hover:bg-[#292524] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#E6CA65]" />
              <span>Print Slip</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customization Inputs (no-print) */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E6DFD5] text-xs grid grid-cols-2 gap-3 no-print">
          <div>
            <label className="text-[11px] font-medium text-stone-600 block mb-1">
              Jewellery Item Name
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. 22K Gold Bangle / Chain"
              className="w-full px-2.5 py-1.5 bg-white border border-[#D5C9B8] rounded-md text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-stone-600 block mb-1">
              Customer Name (Optional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              className="w-full px-2.5 py-1.5 bg-white border border-[#D5C9B8] rounded-md text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>
        </div>

        {/* Printable Bill Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 font-sans bg-white print:p-0 print:border-none print-only-area">
          <div className="border border-stone-800/40 p-6 rounded-xl relative">
            {/* Store Banner */}
            <div className="text-center pb-4 border-b border-stone-200">
              <h2 className="font-cinzel text-xl font-bold tracking-wider text-stone-900">
                {storeName}
              </h2>
              <p className="text-[11px] tracking-widest uppercase text-stone-500 mt-0.5">
                Certified Gold & Silver Jewellery Invoice Memo
              </p>
              <div className="mt-2 text-xs text-stone-600 flex items-center justify-between px-2">
                <span>Ref: <strong className="font-mono">{estimateNo}</strong></span>
                <span>Date: <strong>{currentDate}</strong></span>
              </div>
            </div>

            {/* Customer & Item Details */}
            <div className="py-3 border-b border-stone-200 text-xs flex justify-between">
              <div>
                <span className="text-stone-500">Item: </span>
                <span className="font-semibold text-stone-900">{itemName}</span>
              </div>
              {customerName && (
                <div>
                  <span className="text-stone-500">Customer: </span>
                  <span className="font-semibold text-stone-900">{customerName}</span>
                </div>
              )}
            </div>

            {/* Table Breakdown */}
            <table className="w-full text-xs mt-4">
              <thead>
                <tr className="border-b-2 border-stone-800 text-stone-700">
                  <th className="text-left py-2 font-semibold">Description</th>
                  <th className="text-center py-2 font-semibold">Specification</th>
                  <th className="text-right py-2 font-semibold">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono-numbers">
                <tr>
                  <td className="py-2 text-stone-800 font-sans">Gross Gold Weight</td>
                  <td className="py-2 text-center text-stone-600">{formatGrams(result.weightInGrams)}</td>
                  <td className="py-2 text-right text-stone-800">-</td>
                </tr>
                <tr>
                  <td className="py-2 text-stone-800 font-sans">Gold Rate (per 10g)</td>
                  <td className="py-2 text-center text-stone-600">{formatINR(result.ratePer10Grams)}</td>
                  <td className="py-2 text-right text-stone-800 font-semibold">{formatINR(result.goldPrice)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-stone-800 font-sans">Making Charges</td>
                  <td className="py-2 text-center text-stone-600 font-sans">{result.makingChargesPct}% on gold value</td>
                  <td className="py-2 text-right text-stone-800">{formatINR(result.makingChargesAmount)}</td>
                </tr>
                <tr className="bg-stone-50">
                  <td className="py-2 font-semibold text-stone-900 font-sans" colSpan={2}>
                    Subtotal (Gold + Making Charges)
                  </td>
                  <td className="py-2 text-right font-semibold text-stone-900">{formatINR(result.subtotal)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-stone-800 font-sans">Goods & Services Tax (GST)</td>
                  <td className="py-2 text-center text-stone-600 font-sans">3.00% Statutory</td>
                  <td className="py-2 text-right text-stone-800">{formatINR(result.gstAmount)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-stone-900">
                  <th className="py-3 text-sm font-bold text-stone-900 text-left font-sans" colSpan={2}>
                    Grand Total Jewellery Value:
                  </th>
                  <th className="py-3 text-base sm:text-lg font-bold text-stone-900 text-right font-mono-numbers">
                    {formatINR(result.finalPrice)}
                  </th>
                </tr>
              </tfoot>
            </table>

            {/* Note and disclaimer */}
            <div className="mt-5 pt-3 border-t border-stone-200 text-[10px] text-stone-500 leading-relaxed space-y-1">
              <p>• This is an instant digital estimation slip calculated as per standard Indian jewellery retail formulas.</p>
              <p>• Formula: <code>Final Price = (Gold Price + Making Charges) + 3% GST</code></p>
              <p>• Bullion rates fluctuate dynamically according to market trading sessions.</p>
            </div>
          </div>
        </div>

        {/* Modal Footer (no-print) */}
        <div className="px-6 py-4 bg-[#FDFBF7] border-t border-[#E6DFD5] flex items-center justify-end gap-3 no-print">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1C1917] rounded-lg hover:bg-[#292524] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-[#E6CA65]" />
            <span>Print Estimation Memo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
