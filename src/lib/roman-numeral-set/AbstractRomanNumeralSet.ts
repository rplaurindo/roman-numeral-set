import { StrategyInterface } from "./strategyInterface";


// the concrete strategy
export abstract class AbstractRomanNumeralSet implements StrategyInterface {

    protected indoArabicNumeral: number;

    protected _numeral: string;

    protected romanNumeralMap!: Map<number, string>;

    // tuple notation
    protected indoArabicNumeralList: [number, number, number, number, number,
        number, number, number, number, number, number, number, number];

    protected indoArabicBaseNumberList: [number, number, number, number, number,
        number, number];

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

        this.indoArabicBaseNumberList = [1, 5, 10, 50, 100, 500, 1000];

        this.indoArabicNumeralList =    [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

        //                        1,    4,   5,    9,  10,   40,  50,    90
        this.romanNumeralList = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC',
            // 100,  400,  500,  900,  1000
                'C', 'CD',  'D', 'CM', 'M'];

        this.initializeNumeralsMap();
    }

    get numeral(): string {
        return this._numeral;
    }

    protected getPlaceOfNumber(value: number): number {

        const digitsCount: number = `${value}`.length;

        let zeros: string = '';

        let placeOf: number = 1;

        for (let i: number = 1; i < digitsCount; i++) {
            zeros += '0';
            placeOf = Number.parseInt(`1${zeros}`);
        }

        return Number.parseInt(`1${zeros}`);
    }

    protected composeRomanNumberOfPlace(indoArabicNumber: number)
        : string {

        const placeOf: number = this.getPlaceOfNumber(indoArabicNumber);

        const indoArabicBaseNumber: number = this.getBaseNumberOfPlace(indoArabicNumber);

        const romanBaseNumber: string = this.romanNumeralMap.get(indoArabicBaseNumber) as string;

        const firstDigit: number = Number.parseInt(`${indoArabicNumber}`.charAt(0));

        let numberInRomanOfPlace: string = romanBaseNumber;

        let unityInRomanOfPlace: string = this.romanNumeralMap.get(placeOf) as string;;

        let unityValueOfPlaceSum = 0;

        if (firstDigit === 4 || firstDigit === 9) {
            numberInRomanOfPlace = `${unityInRomanOfPlace}${romanBaseNumber}`;
        } else {
            while ((indoArabicBaseNumber + unityValueOfPlaceSum) < (firstDigit * placeOf)) {
                unityValueOfPlaceSum += placeOf;
                numberInRomanOfPlace += unityInRomanOfPlace;
            }
        }

        return numberInRomanOfPlace;
    }

    private initializeNumeralsMap() {
        this.romanNumeralMap = new Map();

        this.indoArabicNumeralList.forEach(
            (value: number, i: number) => {
                this.romanNumeralMap.set(value, this.romanNumeralList[i]);
            }
        );

    }

    private getBaseNumberOfPlace(indoArabicNumber: number): number {

        const firstDigit: number = Number.parseInt(`${indoArabicNumber}`.charAt(0));

        let indoArabicBaseNumber: number = 1;

        if (firstDigit === 4 || firstDigit === 9) {
            for (let i: number = 1; i < this.romanNumeralMap.size; i++) {

                indoArabicBaseNumber = this.indoArabicBaseNumberList[i];

                if (indoArabicBaseNumber >= indoArabicNumber) {
                    break;
                }
            }
        } else {
            for (let i: number = 1; i < this.romanNumeralMap.size; i++) {

                if (indoArabicBaseNumber > indoArabicNumber) {
                    indoArabicBaseNumber = this.indoArabicBaseNumberList[i - 2];
                    break;
                }

                indoArabicBaseNumber = this.indoArabicBaseNumberList[i];
            }
        }

        return indoArabicBaseNumber;
    }

}
