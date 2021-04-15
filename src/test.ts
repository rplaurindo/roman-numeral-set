import { HumanStrategy } from './lib/roman-numeral-set/strategies/humanStrategy';
import { StrategyContext } from './lib/roman-numeral-set/strategyContext';


const indoArabicValue = 12034;
console.log(`Indo Arabic value: `, indoArabicValue);

const romanNumeral = new StrategyContext(new HumanStrategy(indoArabicValue));
console.log(`Value converted to roman: `, romanNumeral.numeral);
