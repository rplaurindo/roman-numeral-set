import { StrategyInterface } from "./strategyInterface";


// the concrete strategy
export abstract class AbstractRomanNumeralSet implements StrategyInterface {

    abstract numeral: string;

    protected indoArabicNumeral: number;

    protected romanNumeralMap!: Map<number, string>;

    // tuple notation
    protected indoArabicNumeralList: [number, number, number, number, number,
        number, number, number, number, number, number, number, number];

    protected indoArabicBaseNumberList: [number, number, number, number, number,
        number, number];

    protected romanNumeralList: [string, string, string, string, string,
        string, string, string, string, string, string, string, string];

    constructor(indoArabicNumeral: number) {
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

    protected getPlaceOfFirstDigit(value: number): number {

        const digitsCount: number = `${value}`.length;

        let zeros: string = '';

        let placeOf: number = 1;

        for (let i: number = 1; i < digitsCount; i++) {
            zeros += '0';
            placeOf = Number.parseInt(`1${zeros}`);
        }

        return Number.parseInt(`1${zeros}`);
    }

    protected composeRomanNumeralOfPlace(indoArabicNumber: number)
        : string {

        const placeOf: number = this.getPlaceOfFirstDigit(indoArabicNumber);

        const indoArabicBaseNumber: number = this.getBaseNumberOfPlace(indoArabicNumber);

        const firstDigit: number = Number.parseInt(`${indoArabicNumber}`.charAt(0));

        let romanBaseDigit: string = this.romanNumeralMap.get(indoArabicBaseNumber) as string;

        let unityInRomanOfPlace: string = this.romanNumeralMap.get(placeOf) as string;

        let unityValueOfPlaceSum = 0;

        if (firstDigit === 4 || firstDigit === 9) {
            romanBaseDigit = `${unityInRomanOfPlace}${romanBaseDigit}`;
        } else {
            while ((indoArabicBaseNumber + unityValueOfPlaceSum) < (firstDigit * placeOf)) {
                unityValueOfPlaceSum += placeOf;
                romanBaseDigit += unityInRomanOfPlace;
            }
        }

        return romanBaseDigit;
    }

    protected getGroupOfThousandsInRoman(thousandGroupNumber: number): string {

        let composed: string = '';

        const romanLetter: string = this.romanNumeralMap.get(1000) as string;

        for (let i = 0; i < thousandGroupNumber; i++) {
            composed += romanLetter;
        }

        return composed;
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
