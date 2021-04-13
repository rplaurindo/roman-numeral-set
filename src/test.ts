import { RomanNumeralSet } from './lib/roman-numeral-set';

// const indoArabicValue = 9;
// const indoArabicValue = 8;
// const indoArabicValue = 5;
// const indoArabicValue = 4;
// const indoArabicValue = 3;
// const indoArabicValue = 10;
// const indoArabicValue = 11;
const indoArabicValue = 10234;
console.log(`Indo Arabic value: `, indoArabicValue);
const romanNumeral = new RomanNumeralSet(indoArabicValue);
console.log(`Value converted to roman: `, romanNumeral.numeral);
