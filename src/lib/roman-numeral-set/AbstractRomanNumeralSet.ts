import { StrategyInterface } from "./strategyInterface";


// the concrete strategy
export abstract class AbstractRomanNumeralSet implements StrategyInterface {

    abstract numeral: string;

    protected indoArabicNumeral: number;

    protected romanNumeralMap!: Map<number, string>;

    // tuple notation
    protected indoArabicNumeralList: [number, number, number, number, number,
        number, number, number, number, number, number, number, number];

        // protected indoArabicBaseNumberList: [number, number, number, number,
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
        // this.indoArabicBaseNumberList = [5, 10, 50, 100, 500, 1000];

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

        for (let i: number = 1; i < digitsCount; i++) {
            zeros += '0';
        }

        return Number.parseInt(`1${zeros}`);
    }

    // mover este método para uma extensão de Number
    protected getSeparateValueInGroupsOf3(value: number): string[] {

        let valueAsString: string = `${value}`;

        let groups = [];

        for (let i: number = valueAsString.length; i > 0; i -= 3) {
            groups.unshift(valueAsString.substring(i - 3, i));
        }

        return groups;
    }

    protected decorateRomanNumeralOfPlace(indoArabicNumeral: number)
        : string {

        const placeOf: number = this.getPlaceOfFirstDigit(indoArabicNumeral);

        const indoArabicBaseNumber: number = this.getBaseNumberOfPlace(indoArabicNumeral);

        const firstDigit: number = Number.parseInt(`${indoArabicNumeral}`.charAt(0));

        let decoratedRomanNumeral: string = this.romanNumeralMap.get(indoArabicBaseNumber) as string;

        let unityInRomanOfPlace: string = this.romanNumeralMap.get(placeOf) as string;

        let unityValueOfPlaceSum = 0;


        let groups: string[];

        let groupOfThousands: number;


        if (indoArabicNumeral > 999) {
            groups = this.getSeparateValueInGroupsOf3(indoArabicNumeral);
            groupOfThousands = this.getNumberReferring2PlaceOfThousands(groups);
            decoratedRomanNumeral = this.getChunkOfThousandInRoman(groupOfThousands);
        } else {
            if (firstDigit === 4 || firstDigit === 9) {
                decoratedRomanNumeral = `${unityInRomanOfPlace}${decoratedRomanNumeral}`;
            } else {
                while ((indoArabicBaseNumber + unityValueOfPlaceSum) < (firstDigit * placeOf)) {
                    unityValueOfPlaceSum += placeOf;
                    decoratedRomanNumeral += unityInRomanOfPlace;
                }
            }
        }


        return decoratedRomanNumeral;
    }

    protected getChunkOfThousandInRoman(thousandGroupNumber: number): string {

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

    private getNumberReferring2PlaceOfThousands(separateValueInGroupsOf3: string[]): number {

        separateValueInGroupsOf3.pop();

        if (!separateValueInGroupsOf3.length) {
            return 0;
        }

        return Number.parseInt(separateValueInGroupsOf3.join(''));
    }

    private getBaseNumberOfPlace(indoArabicNumber: number): number {

        const firstDigit: number = Number.parseInt(`${indoArabicNumber}`.charAt(0));

        let indoArabicBaseNumber: number = 0;

        let indoArabicBaseNumberListLength: number = this.indoArabicBaseNumberList.length;

        let recordedIndoArabicBaseNumber: number = 0;

        if (firstDigit === 4 || firstDigit === 9) {
            for (let i: number = 0; i < indoArabicBaseNumberListLength; i++) {

                indoArabicBaseNumber = this.indoArabicBaseNumberList[i];

                this.indoArabicBaseNumberList.shift();
                indoArabicBaseNumberListLength -= 1;
                i -= 1;

                if (indoArabicBaseNumber >= indoArabicNumber) {
                    this.indoArabicBaseNumberList.splice(0, i + 2);
                    break;
                }
            }
        } else {
            for (let i: number = 0; i <= indoArabicBaseNumberListLength; i++) {

                if (this.indoArabicBaseNumberList[i - 2]) {
                    recordedIndoArabicBaseNumber = this.indoArabicBaseNumberList[i - 2];
                    this.indoArabicBaseNumberList.shift();
                    indoArabicBaseNumberListLength -= 1;
                    i -= 1;
                }

                if (indoArabicBaseNumber > indoArabicNumber) {
                    indoArabicBaseNumber = recordedIndoArabicBaseNumber;
                    this.indoArabicBaseNumberList.splice(0, i);
                    break;
                }

                indoArabicBaseNumber = this.indoArabicBaseNumberList[i];
            }
        }

        return indoArabicBaseNumber;
    }

}
