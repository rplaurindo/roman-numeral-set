import { MathematicalStrategy } from './lib/roman-numeral-set/strategies';
import { HumanStrategy } from './lib/roman-numeral-set/strategies/humanStrategy';
import { StrategyContext } from './lib/roman-numeral-set/strategyContext';


const indoArabicValue: number = 12209;
console.log(`Indo Arabic value: `, indoArabicValue);

let romanNumeral: StrategyContext = new StrategyContext(new HumanStrategy(indoArabicValue));
// console.log(`Value converted to roman: `, romanNumeral.numeral);

romanNumeral.strategy = new MathematicalStrategy(indoArabicValue);
// console.log(`Value converted to roman: `, romanNumeral.numeral);
