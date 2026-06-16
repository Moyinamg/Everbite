// ZIP code validation utility
// Validates US ZIP codes and provides error messages

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  city?: string;
  state?: string;
  stateFull?: string;
  latitude?: number;
  longitude?: number;
}

// Common US ZIP codes with city/state data
const zipData: Record<string, { city: string; state: string; stateFull: string; lat: number; lon: number }> = {
  '10001': { city: 'New York', state: 'NY', stateFull: 'New York', lat: 40.7489, lon: -73.9680 },
  '90001': { city: 'Los Angeles', state: 'CA', stateFull: 'California', lat: 33.9730, lon: -118.2490 },
  '60601': { city: 'Chicago', state: 'IL', stateFull: 'Illinois', lat: 41.8860, lon: -87.6210 },
  '77001': { city: 'Houston', state: 'TX', stateFull: 'Texas', lat: 29.7500, lon: -95.3670 },
  '85001': { city: 'Phoenix', state: 'AZ', stateFull: 'Arizona', lat: 33.4480, lon: -112.0770 },
  '19101': { city: 'Philadelphia', state: 'PA', stateFull: 'Pennsylvania', lat: 39.9526, lon: -75.1652 },
  '02101': { city: 'Boston', state: 'MA', stateFull: 'Massachusetts', lat: 42.3601, lon: -71.0589 },
  '33101': { city: 'Miami', state: 'FL', stateFull: 'Florida', lat: 25.7617, lon: -80.1918 },
  '75201': { city: 'Dallas', state: 'TX', stateFull: 'Texas', lat: 32.7767, lon: -96.7970 },
  '94101': { city: 'San Francisco', state: 'CA', stateFull: 'California', lat: 37.7749, lon: -122.4194 },
  '20001': { city: 'Washington', state: 'DC', stateFull: 'District of Columbia', lat: 38.9072, lon: -77.0369 },
  '30301': { city: 'Atlanta', state: 'GA', stateFull: 'Georgia', lat: 33.7490, lon: -84.3880 },
  '60619': { city: 'Chicago', state: 'IL', stateFull: 'Illinois', lat: 41.7450, lon: -87.6130 },
  '60637': { city: 'Chicago', state: 'IL', stateFull: 'Illinois', lat: 41.7820, lon: -87.6000 },
  '60644': { city: 'Chicago', state: 'IL', stateFull: 'Illinois', lat: 41.8800, lon: -87.7560 },
  '60623': { city: 'Chicago', state: 'IL', stateFull: 'Illinois', lat: 41.8460, lon: -87.7170 },
  '60649': { city: 'Chicago', state: 'IL', stateFull: 'Illinois', lat: 41.7590, lon: -87.5780 },
  '60629': { city: 'Chicago', state: 'IL', stateFull: 'Illinois', lat: 41.7780, lon: -87.7060 },
  '11201': { city: 'Brooklyn', state: 'NY', stateFull: 'New York', lat: 40.6943, lon: -73.9870 },
  '10025': { city: 'New York', state: 'NY', stateFull: 'New York', lat: 40.7980, lon: -73.9660 },
  '10453': { city: 'Bronx', state: 'NY', stateFull: 'New York', lat: 40.8530, lon: -73.9080 },
  '11212': { city: 'Brooklyn', state: 'NY', stateFull: 'New York', lat: 40.6630, lon: -73.9130 },
  '19133': { city: 'Philadelphia', state: 'PA', stateFull: 'Pennsylvania', lat: 39.9820, lon: -75.1410 },
  '19134': { city: 'Philadelphia', state: 'PA', stateFull: 'Pennsylvania', lat: 39.9820, lon: -75.1150 },
  '19140': { city: 'Philadelphia', state: 'PA', stateFull: 'Pennsylvania', lat: 40.0170, lon: -75.1410 },
  '48201': { city: 'Detroit', state: 'MI', stateFull: 'Michigan', lat: 42.3314, lon: -83.0458 },
  '48204': { city: 'Detroit', state: 'MI', stateFull: 'Michigan', lat: 42.3380, lon: -83.0800 },
  '48206': { city: 'Detroit', state: 'MI', stateFull: 'Michigan', lat: 42.3620, lon: -83.0680 },
  '48234': { city: 'Detroit', state: 'MI', stateFull: 'Michigan', lat: 42.4280, lon: -83.0500 },
  '90011': { city: 'Los Angeles', state: 'CA', stateFull: 'California', lat: 34.0070, lon: -118.2580 },
  '90044': { city: 'Los Angeles', state: 'CA', stateFull: 'California', lat: 33.9530, lon: -118.2880 },
  '90037': { city: 'Los Angeles', state: 'CA', stateFull: 'California', lat: 34.0000, lon: -118.2870 },
  '90003': { city: 'Los Angeles', state: 'CA', stateFull: 'California', lat: 33.9650, lon: -118.2730 },
  '90047': { city: 'Los Angeles', state: 'CA', stateFull: 'California', lat: 33.9560, lon: -118.3070 },
};

// Valid ZIP code patterns
const validZipPattern = /^\d{5}(-\d{4})?$/;
const basicZipPattern = /^\d{5}$/;

/**
 * Validates a US ZIP code and returns validation result
 */
export function validateZipCode(zip: string): ValidationResult {
  // Trim and clean input
  const cleanZip = zip.trim();
  
  // Check if empty
  if (!cleanZip) {
    return {
      isValid: false,
      error: 'Please enter a ZIP code'
    };
  }
  
  // Check if it's a 5-digit number
  if (!/^\d{5}$/.test(cleanZip)) {
    return {
      isValid: false,
      error: 'ZIP code must be exactly 5 digits (numbers only)'
    };
  }
  
  // Check if it's a valid US ZIP code (first digit 0-9, second digit 0-9, etc.)
  const firstDigit = parseInt(cleanZip[0]);
  if (firstDigit === 0 || firstDigit === 9) {
    // 0 = Northeast, 9 = West Coast - these are valid
  }
  
  // Check against known ZIP codes
  const data = zipData[cleanZip];
  if (data) {
    return {
      isValid: true,
      city: data.city,
      state: data.state,
      stateFull: data.stateFull,
      latitude: data.lat,
      longitude: data.lon
    };
  }
  
  // If not in our database, perform basic validation
  // Check for obviously invalid ZIP codes
  const zipNum = parseInt(cleanZip);
  if (zipNum < 501 || zipNum > 99950) {
    return {
      isValid: false,
      error: 'This ZIP code does not exist in the US. Please enter a valid US ZIP code.'
    };
  }
  
  // Generic valid ZIP
  return {
    isValid: true,
    city: 'Unknown City',
    state: 'US',
    stateFull: 'United States',
    latitude: 39.8283,
    longitude: -98.5795
  };
}

/**
 * Validates required form field
 */
export function validateRequiredField(value: string | number | boolean, fieldName: string): ValidationResult {
  if (value === '' || value === null || value === undefined) {
    return {
      isValid: false,
      error: `${fieldName} is required`
    };
  }
  
  if (typeof value === 'number' && value <= 0) {
    return {
      isValid: false,
      error: `${fieldName} must be greater than 0`
    };
  }
  
  return { isValid: true };
}

/**
 * Validates weekly budget based on family size
 */
export function validateBudget(budget: number, familySize: number): ValidationResult {
  if (budget < 10) {
    return {
      isValid: false,
      error: 'Weekly budget must be at least $10'
    };
  }
  
  if (budget > 1000) {
    return {
      isValid: false,
      error: 'Weekly budget cannot exceed $1000'
    };
  }
  
  const perPerson = budget / familySize;
  if (perPerson < 5) {
    return {
      isValid: false,
      error: `Budget per person ($${perPerson.toFixed(2)}) is very low. Consider increasing your budget for adequate nutrition.`
    };
  }
  
  return { isValid: true };
}

/**
 * Validates family size
 */
export function validateFamilySize(size: number): ValidationResult {
  if (size < 1) {
    return {
      isValid: false,
      error: 'Family size must be at least 1'
    };
  }
  
  if (size > 20) {
    return {
      isValid: false,
      error: 'Family size cannot exceed 20 people'
    };
  }
  
  return { isValid: true };
}

/**
 * Comprehensive form validation
 */
export function validateUserSetupForm(form: {
  zipCode: string;
  weeklyBudget: number;
  familySize: number;
  transportation: string;
  kitchenAccess: string;
  dietaryNeeds: string[];
  ingredients: string[];
}): Record<string, ValidationResult> {
  const results: Record<string, ValidationResult> = {};
  
  // Validate ZIP code
  results.zipCode = validateZipCode(form.zipCode);
  
  // Validate family size
  results.familySize = validateFamilySize(form.familySize);
  
  // Validate budget
  results.weeklyBudget = validateBudget(form.weeklyBudget, form.familySize);
  
  // Validate required fields
  results.transportation = validateRequiredField(form.transportation, 'Transportation');
  results.kitchenAccess = validateRequiredField(form.kitchenAccess, 'Kitchen access');
  
  return results;
}

/**
 * Check if form has any validation errors
 */
export function hasFormErrors(validationResults: Record<string, ValidationResult>): boolean {
  return Object.values(validationResults).some(result => !result.isValid);
}

/**
 * Get all error messages from validation results
 */
export function getErrorMessages(validationResults: Record<string, ValidationResult>): string[] {
  return Object.values(validationResults)
    .filter(result => !result.isValid && result.error)
    .map(result => result.error!);
}