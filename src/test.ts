// import { MathematicalStrategy } from './lib/roman-numeral-set/strategies';
// import { HumanStrategy } from './lib/roman-numeral-set/strategies/humanStrategy';
// import { StrategyContext } from './lib/roman-numeral-set/strategyContext';


// const indoArabicValue: number = 12209;
// console.log(`Indo Arabic value: `, indoArabicValue);

// let romanNumeral: StrategyContext;

// romanNumeral = new StrategyContext(new HumanStrategy(indoArabicValue));

// // romanNumeral = new StrategyContext(new MathematicalStrategy(indoArabicValue));

// console.log(`Value converted to roman: `, romanNumeral.numeral);

let cachedInput: string = '';

const readline = require("readline");
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = readLine.question("", function (input: string) {
    cachedInput = input;
});

// const promise = new Promise(
//     (input: ) => {

//     }
// );

// while (cachedInput != 'exit') {
//     question;
// }

console.log(question);
