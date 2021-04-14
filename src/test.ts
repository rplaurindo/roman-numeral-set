import { RomanNumeralSet } from './lib/roman-numeral-set';


const indoArabicValue = 12034;
console.log(`Indo Arabic value: `, indoArabicValue);
const romanNumeral = new RomanNumeralSet(indoArabicValue);
console.log(`Value converted to roman: `, romanNumeral.numeral);
