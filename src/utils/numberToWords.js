// English conversion
export const convertNumberToWords = (num) => {
  if (num === 0) return "zero";
  
  const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const scales = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];
  
  // Handle negative numbers
  if (num < 0) return "negative " + convertNumberToWords(Math.abs(num));
  
  // Handle decimal part
  if (num % 1 !== 0) {
    const parts = num.toString().split('.');
    return convertNumberToWords(parseInt(parts[0])) + " point " + parts[1].split('').map(digit => units[parseInt(digit)]).join(' ');
  }
  
  let words = "";
  let scaleIndex = 0;
  
  // Process each group of 3 digits
  while (num > 0) {
    const groupOfThree = num % 1000;
    if (groupOfThree !== 0) {
      const groupWords = convertGroupOfThree(groupOfThree);
      words = groupWords + (scales[scaleIndex] ? " " + scales[scaleIndex] + " " : "") + words;
    }
    
    num = Math.floor(num / 1000);
    scaleIndex++;
  }
  
  return words.trim();
};

// Helper function to convert a group of three digits
const convertGroupOfThree = (num) => {
  const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  
  let result = "";
  
  // Handle hundreds
  const hundreds = Math.floor(num / 100);
  if (hundreds > 0) {
    result += units[hundreds] + " hundred";
    if (num % 100 !== 0) result += " ";
  }
  
  // Handle tens and units
  const remainder = num % 100;
  if (remainder > 0) {
    if (remainder < 20) {
      result += units[remainder];
    } else {
      const tensDigit = Math.floor(remainder / 10);
      const unitsDigit = remainder % 10;
      result += tens[tensDigit];
      if (unitsDigit > 0) result += "-" + units[unitsDigit];
    }
  }
  
  return result;
};

// Spanish conversion
export const convertNumberToSpanishWords = (num) => {
  if (num === 0) return "cero";
  
  const units = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const tens = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const hundreds = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
  const scales = ["", "mil", "millón", "mil millones", "billón", "mil billones", "trillón"];
  const scalesPlural = ["", "mil", "millones", "mil millones", "billones", "mil billones", "trillones"];
  
  // Handle negative numbers
  if (num < 0) return "menos " + convertNumberToSpanishWords(Math.abs(num));
  
  // Handle decimal part
  if (num % 1 !== 0) {
    const parts = num.toString().split('.');
    return convertNumberToSpanishWords(parseInt(parts[0])) + " coma " + parts[1].split('').map(digit => units[parseInt(digit)]).join(' ');
  }
  
  if (num === 1) return "uno";
  if (num === 100) return "cien";
  
  let words = "";
  let scaleIndex = 0;
  
  // Process each group of 3 digits
  while (num > 0) {
    const groupOfThree = num % 1000;
    if (groupOfThree !== 0) {
      const groupWords = convertSpanishGroupOfThree(groupOfThree);
      
      // Special case for "un millón" instead of "uno millón"
      let prefix = groupWords;
      if (groupOfThree === 1 && scaleIndex >= 2) {
        prefix = "un";
      }
      
      // Choose singular or plural scale word
      const scaleWord = groupOfThree === 1 ? scales[scaleIndex] : scalesPlural[scaleIndex];
      
      words = prefix + (scaleWord ? " " + scaleWord + " " : "") + words;
    }
    
    num = Math.floor(num / 1000);
    scaleIndex++;
  }
  
  return words.trim();
};

// Helper function to convert a group of three digits to Spanish
const convertSpanishGroupOfThree = (num) => {
  const units = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const tens = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const hundreds = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
  
  let result = "";
  
  // Handle hundreds
  const hundredsDigit = Math.floor(num / 100);
  if (hundredsDigit > 0) {
    // Special case for 100
    if (hundredsDigit === 1 && num % 100 === 0) {
      return "cien";
    }
    result += hundreds[hundredsDigit];
    if (num % 100 !== 0) result += " ";
  }
  
  // Handle tens and units
  const remainder = num % 100;
  if (remainder > 0) {
    if (remainder < 20) {
      result += units[remainder];
    } else {
      const tensDigit = Math.floor(remainder / 10);
      const unitsDigit = remainder % 10;
      
      // Special cases for numbers 21-29
      if (tensDigit === 2 && unitsDigit > 0) {
        result += "veinti" + units[unitsDigit].replace("uno", "ún");
      } else {
        result += tens[tensDigit];
        if (unitsDigit > 0) {
          result += " y " + (unitsDigit === 1 && scaleIndex === 0 ? "uno" : units[unitsDigit]);
        }
      }
    }
  }
  
  return result;
};