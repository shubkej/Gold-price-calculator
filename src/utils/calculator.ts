import { CalculationInputs, CalculationResult, MakingChargeOption } from '../types/calculator';

export const GST_PERCENTAGE = 3; // Fixed statutory GST rate for gold jewellery in India

/**
 * Format a number into standard Indian Rupee format with ₹ symbol and 2 decimal places.
 * Example: 125000 -> ₹1,25,000.00
 */
export function formatINR(value: number): string {
  if (isNaN(value) || !isFinite(value)) {
    return '₹0.00';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format weight in grams with up to 3 decimal places (traditional precision for jewellery).
 * Example: 2.5 -> 2.500 g
 */
export function formatGrams(weight: number): string {
  if (isNaN(weight) || weight < 0) return '0.000 g';
  return `${weight.toFixed(3)} g`;
}

/**
 * Perform exact gold jewellery price calculation according to statutory and standard jewellery shop formulas.
 * 
 * Step 1: Gold Price = (Gold Weight × Gold Rate) / 10
 * Step 2: Making Charges = Gold Price × Making Charge Percentage / 100
 * Step 3: Subtotal = Gold Price + Making Charges
 * Step 4: GST Amount = Subtotal × 3 / 100
 * Step 5: Final Jewellery Price = Subtotal + GST Amount
 */
export function calculateJewelleryPrice(inputs: CalculationInputs): CalculationResult {
  const { weight, rate, makingChargePct } = inputs;

  const trimmedWeight = weight.trim();
  const trimmedRate = rate.trim();

  // If inputs are empty
  if (trimmedWeight === '' || trimmedRate === '') {
    return {
      weightInGrams: 0,
      ratePer10Grams: 0,
      ratePerGram: 0,
      goldPrice: 0,
      makingChargesPct: makingChargePct,
      makingChargesAmount: 0,
      subtotal: 0,
      gstPct: GST_PERCENTAGE,
      gstAmount: 0,
      finalPrice: 0,
      isValid: false,
      validationError: 'Please enter gold weight and current gold rate',
    };
  }

  const parsedWeight = parseFloat(trimmedWeight);
  const parsedRate = parseFloat(trimmedRate);

  // Validation checks
  if (isNaN(parsedWeight) || isNaN(parsedRate)) {
    return {
      weightInGrams: 0,
      ratePer10Grams: 0,
      ratePerGram: 0,
      goldPrice: 0,
      makingChargesPct: makingChargePct,
      makingChargesAmount: 0,
      subtotal: 0,
      gstPct: GST_PERCENTAGE,
      gstAmount: 0,
      finalPrice: 0,
      isValid: false,
      validationError: 'Please enter valid numeric values',
    };
  }

  if (parsedWeight < 0 || parsedRate < 0) {
    return {
      weightInGrams: Math.max(0, parsedWeight),
      ratePer10Grams: Math.max(0, parsedRate),
      ratePerGram: 0,
      goldPrice: 0,
      makingChargesPct: makingChargePct,
      makingChargesAmount: 0,
      subtotal: 0,
      gstPct: GST_PERCENTAGE,
      gstAmount: 0,
      finalPrice: 0,
      isValid: false,
      validationError: 'Negative values are not permitted',
    };
  }

  if (parsedWeight === 0 || parsedRate === 0) {
    return {
      weightInGrams: parsedWeight,
      ratePer10Grams: parsedRate,
      ratePerGram: parsedRate / 10,
      goldPrice: 0,
      makingChargesPct: makingChargePct,
      makingChargesAmount: 0,
      subtotal: 0,
      gstPct: GST_PERCENTAGE,
      gstAmount: 0,
      finalPrice: 0,
      isValid: true,
      validationError: undefined,
    };
  }

  // Step 1: Calculate Gold Price
  // Note: Gold Rate is provided for 10 grams, so divide by 10 to get the per-gram rate.
  const ratePerGram = parsedRate / 10;
  const goldPrice = (parsedWeight * parsedRate) / 10;

  // Step 2: Calculate Making Charges
  // Making Charges = Gold Price × Making Charge Percentage / 100
  const makingChargesAmount = (goldPrice * makingChargePct) / 100;

  // Step 3: Calculate Subtotal
  // Subtotal = Gold Price + Making Charges
  const subtotal = goldPrice + makingChargesAmount;

  // Step 4: Calculate GST
  // GST Amount = Subtotal × 3 / 100
  const gstAmount = (subtotal * GST_PERCENTAGE) / 100;

  // Step 5: Calculate Final Jewellery Price
  // Final Amount = Subtotal + GST Amount
  const finalPrice = subtotal + gstAmount;

  return {
    weightInGrams: parsedWeight,
    ratePer10Grams: parsedRate,
    ratePerGram,
    goldPrice,
    makingChargesPct: makingChargePct,
    makingChargesAmount,
    subtotal,
    gstPct: GST_PERCENTAGE,
    gstAmount,
    finalPrice,
    isValid: true,
  };
}

export const DEFAULT_MAKING_CHARGE: MakingChargeOption = 15;

export const INITIAL_INPUTS: CalculationInputs = {
  weight: '',
  rate: '',
  makingChargePct: DEFAULT_MAKING_CHARGE,
};
