import { StrategyInterface } from "../strategyInterface";


// the concrete strategy
export class HumanStrategy implements StrategyInterface{

    private indoArabicNumeral: number;

    private _numeral: string;

    private romanNumeralMap!: Map<number, string>;

    // tuple statement
    private romanNumeralList: [string, string, string, string, string, string, string];

    constructor(indoArabicNumeral: number) {
        this._numeral = '';

        if (indoArabicNumeral <= 0) {
            throw new Error('There is no negative or zero values in Roman numeral.');
        }

        if (!Number.isInteger(indoArabicNumeral)) {
            throw new Error('There is no fractional values in Roman numeral.');
        }

        this.indoArabicNumeral = indoArabicNumeral;

        // 1, 5, 10, 50, 100, 500, 1000
        this.romanNumeralList = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

        this.initializeNumeralsMap();

        this.setRomanNumeral();
    }

    get numeral(): string {
        return this._numeral;
    }

    private initializeNumeralsMap() {
        let value: number = 1;

        this.romanNumeralMap = new Map();

        this.romanNumeralMap.set(value, this.romanNumeralList[0]);

        for (let i: number = 2; i < this.romanNumeralList.length + 1; i++) {
            if (i % 2 === 0) {
                value = value * 5;
            } else {
                value = value * 2;
            }

            this.romanNumeralMap.set(value, this.romanNumeralList[i - 1]);
        }

    }

    private getGroupOfThousandsInRoman(thousandGroupNumber: number): string {

        let composed: string  = '';

        const romanLetter: string = this.romanNumeralMap.get(1000) as string;

        for (let i = 0; i < thousandGroupNumber; i++) {
            composed += romanLetter;
        }

        return composed;
    }

    private getSeparateValueInGroupsOf3(value: number): string[] {

        let valueAsString: string = `${value}`;

        let groups = [];

        for (let i: number = valueAsString.length; i > 0; i -= 3) {
            groups.unshift(valueAsString.substring(i - 3, i));
        }

        return groups;
    }

    private getGroupOfThousands(separateValueInGroupsOf3: string[]): number {

        const length: number = separateValueInGroupsOf3.length;

        let valueAsString: string = '';

        if (length > 1) {
            for (let i: number = 0; i < length - 1; i++) {
                valueAsString += `${separateValueInGroupsOf3[i]}`;
            }

            return Number.parseInt(valueAsString);
        }

        return 0;
    }

    private getImmediateNextValue(currentDigit: number, placeOf: number = 1): number {

        let indoArabicNumber: number = 1;

        let currentValue: number = 1;

        const romanNumeralMapKeys: number[] = Array.from(this.romanNumeralMap.keys());

        for (let i: number = 1; i < this.romanNumeralMap.size; i++) {
            currentValue = romanNumeralMapKeys[i];

            indoArabicNumber = currentValue;

            if (currentValue > currentDigit * placeOf) {
                break;
            }
        }

        return indoArabicNumber;
    }

    private setRomanNumeral() {
        const groups: string[]  = this.getSeparateValueInGroupsOf3(this.indoArabicNumeral);

        // this will always exist
        const firstGroupOfNumbers: number = Number.parseInt(groups[groups.length - 1]);

        const secondGroupOfNumbers: number = this.getGroupOfThousands(groups);

        const firstGroupOfNumbersAsString: string = `${firstGroupOfNumbers}`;

        const firstGroupOfNumbersLength: number = firstGroupOfNumbersAsString.length;

        const valueOfThousandPlaceInRoman: string = this
            .getGroupOfThousandsInRoman(secondGroupOfNumbers);

        let currentDigit: number;

        let placeOf: number = 1;

        let unityValueOfPlaceInRoman: string;

        let unityValueOfPlaceSum: number;

        let indoArabicBaseValue: number;

        let valueOfPlaceInRoman: string;

        for (let i = firstGroupOfNumbersLength - 1; i >= 0; i--) {

            unityValueOfPlaceSum = 0;

            valueOfPlaceInRoman = '';

            currentDigit = Number.parseInt(firstGroupOfNumbersAsString.charAt(i));

            unityValueOfPlaceInRoman = this.romanNumeralMap.get(placeOf) as string;

            if (currentDigit === 4 || currentDigit === 9) {
                indoArabicBaseValue = this.getImmediateNextValue(currentDigit, placeOf);
                valueOfPlaceInRoman = this.romanNumeralMap.get(indoArabicBaseValue) as string;
                valueOfPlaceInRoman = `${unityValueOfPlaceInRoman}${valueOfPlaceInRoman}`;
                this._numeral = `${valueOfPlaceInRoman}${this._numeral}`;
            } else {
                indoArabicBaseValue = placeOf;

                if (currentDigit != 5) {
                    if (currentDigit > 5) {
                        indoArabicBaseValue = placeOf * 5;
                        valueOfPlaceInRoman = this.romanNumeralMap
                            .get(indoArabicBaseValue) as string;
                        indoArabicBaseValue += 1;
                    }

                    while ((indoArabicBaseValue + unityValueOfPlaceSum)
                        <= (currentDigit * placeOf)) {
                        unityValueOfPlaceSum += placeOf;
                        valueOfPlaceInRoman += unityValueOfPlaceInRoman;
                    }
                } else {
                    indoArabicBaseValue = 5 * placeOf;
                    valueOfPlaceInRoman = this.romanNumeralMap.get(indoArabicBaseValue) as string;
                }

                this._numeral = `${valueOfPlaceInRoman}${this._numeral}`;
            }

            placeOf *= 10;
        }

        this._numeral = `${valueOfThousandPlaceInRoman}${this._numeral}`;
    }

}
