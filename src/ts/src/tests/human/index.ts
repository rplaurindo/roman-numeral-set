// import { MathematicalStrategy } from './lib/roman-numeral-set/strategies';
// import { HumanStrategy } from './lib/roman-numeral-set/strategies/humanStrategy';
// import { StrategyContext } from './lib/roman-numeral-set/strategyContext';


// const indoArabicValue: number = 12209;
// console.log(`Indo Arabic value: `, indoArabicValue);

// let romanNumeral: StrategyContext;

// romanNumeral = new StrategyContext(new HumanStrategy(indoArabicValue));

// // romanNumeral = new StrategyContext(new MathematicalStrategy(indoArabicValue));

// console.log(`Value converted to roman: `, romanNumeral.numeral);

const readline = require("readline");

const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const recursiveAsyncReadLine = () => {
    readLine.question("Entre com o numeral indo-arábico: ", (input: string) => {
        if (input === `exit`) {
            return readLine.close();
        } else {
            // ...
            recursiveAsyncReadLine();
        }
    });
}

recursiveAsyncReadLine();
