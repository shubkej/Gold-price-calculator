export type MakingChargeOption = 15 | 18 | 20;

export interface CalculationInputs {
  weight: string; // stored as string to allow natural typing like '2.', '2.5', ''
  rate: string;   // rate for 10 grams in INR
  makingChargePct: MakingChargeOption;
}

export interface CalculationResult {
  weightInGrams: number;
  ratePer10Grams: number;
  ratePerGram: number;
  goldPrice: number;
  makingChargesPct: number;
  makingChargesAmount: number;
  subtotal: number;
  gstPct: number;
  gstAmount: number;
  finalPrice: number;
  isValid: boolean;
  validationError?: string;
}

export interface SavedEstimate {
  id: string;
  timestamp: number;
  itemDescription: string;
  inputs: CalculationInputs;
  result: CalculationResult;
}
