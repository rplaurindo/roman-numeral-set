import { StrategyInterface } from "./strategyInterface";


// the concrete strategy
export abstract class AbstractRomanNumeralSet implements StrategyInterface {

    protected indoArabicNumeral: number;

    protected _numeral: string;

    protected romanNumeralMap!: Map<number, string>;

    protected indoArabicNumeralList: [number, number, number, number, number,
        number, number, number, number, number, number, number, number];

    protected romanNumeralList: [string, string, string, string, string,
        string, string, string, string, string, string, string, string];

    constructor(indoArabicNumeral: number) {
        this._numeral = '';

        if (indoArabicNumeral <= 0) {
            throw new Error('There is no negative or zero values in Roman numeral.');
        }

        if (!Number.isInteger(indoArabicNumeral)) {
            throw new Error('There is no fractional values in Roman numeral.');
        }

        this.indoArabicNumeral = indoArabicNumeral;

        this.indoArabicNumeralList = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

        //                        1,    4,   5,    9,  10,   40,  50,    90
        this.romanNumeralList = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC',
            // 100,  400,  500,  900,  1000
                'C', 'CD',  'D', 'CM', 'M'];

        this.initializeNumeralsMap();
    }

    get numeral(): string {
        return this._numeral;
    }

    private initializeNumeralsMap() {
        this.romanNumeralMap = new Map();

        this.indoArabicNumeralList.forEach(
            (value: number, i: number) => {
                this.romanNumeralMap.set(value, this.romanNumeralList[i]);
            }
        );

    }

}
