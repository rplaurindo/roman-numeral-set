import { StrategyInterface } from "./strategyInterface";


// the concrete strategy
export abstract class AbstractRomanNumeralSet implements StrategyInterface {

    protected indoArabicNumeral: number;

    protected _numeral: string;

    protected romanNumeralMap!: Map<number, string>;

    protected indoArabicNumeralList: [number, number, number, number, number,
        number, number, number, number, number, number, number];

    protected romanNumeralList: [string, string, string, string, string,
        string, string, string, string, string, string, string];

    constructor(indoArabicNumeral: number) {
        this._numeral = '';

        if (indoArabicNumeral <= 0) {
            throw new Error('There is no negative or zero values in Roman numeral.');
        }

        if (!Number.isInteger(indoArabicNumeral)) {
            throw new Error('There is no fractional values in Roman numeral.');
        }

        this.indoArabicNumeral = indoArabicNumeral;

        this.indoArabicNumeralList = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 1000];

        //   1,    4,   5,    9,  10,   40,  50,   90, 100,  400,  500,  1000
        this.romanNumeralList = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD',  'D', 'M'];

        this.initializeNumeralsMap();
    }

    get numeral(): string {
        return this._numeral;
    }

    private initializeNumeralsMap() {
        let value: number = 1;

        this.romanNumeralMap = new Map();

        // this.romanNumeralMap.set(value, this.romanNumeralList[0]);

        // for (let i: number = 2; i < this.romanNumeralList.length + 1; i++) {
        //     if (i % 2 === 0) {
        //         value = value * 5;
        //     } else {
        //         value = value * 2;
        //     }

        //     this.romanNumeralMap.set(value, this.romanNumeralList[i - 1]);
        // }

        this.indoArabicNumeralList.forEach(
            (value: number, i: number) => {
                this.romanNumeralMap.set(value, this.romanNumeralList[i]);
            }
        );

    }

    protected getImmediateNextValue(currentDigit: number, placeOf: number = 1): number {

        let indoArabicNumber: number = 1;

        let currentValue: number = 1;

        for (let i: number = 1; i < this.romanNumeralMap.size; i++) {
            currentValue = this.indoArabicNumeralList[i];

            indoArabicNumber = currentValue;

            if (currentValue > currentDigit * placeOf) {
                break;
            }
        }

        return indoArabicNumber;
    }

}
