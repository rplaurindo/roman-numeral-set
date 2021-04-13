export class RomanNumeralSet {

    private indoArabicNumeral: number;

    private _numeral!: string;

    private romanNumeralMap!: Map<number, string>;

    // tuple statement
    // private groupedRomanNumeralMap!: Map<number, [string, string]>;

    private romanNumeralList: string[];

    constructor(indoArabicNumeral: number) {
        this._numeral = '';

        if (indoArabicNumeral <= 0) {
            throw new Error(`There is no negative or zero values in Roman numeral.`);
        }

        if (!Number.isInteger(indoArabicNumeral)) {
            throw new Error(`There is no fractional values in Roman numeral.`);
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

        // this.groupedRomanNumeralMap = new Map();

        this.romanNumeralMap.set(value, this.romanNumeralList[0]);

        // this.groupedRomanNumeralMap
        // .set(groupOf, [this.romanNumeralList[0], this.romanNumeralList[1]]);

        // let groupOf: number = 1;

        // for (let i: number = 2; i < this.romanNumeralList.length - 1; i+=2) {
        //     groupOf = groupOf * 10;

        //     this.groupedRomanNumeralMap
        //         .set(groupOf, [this.romanNumeralList[i], this.romanNumeralList[i+1]]);
        // }

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

        for (let i = 0; i < thousandGroupNumber; i++) {
            composed += 'M';
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

        let cardinalNumber: number = 1;

        let currentValue: number = 1;

        const romanNumeralMapKeys: number[] = Array.from(this.romanNumeralMap.keys());

        for (let i: number = 1; i < this.romanNumeralMap.size; i++) {
            currentValue = romanNumeralMapKeys[i];

            cardinalNumber = currentValue;

            if (currentValue > currentDigit * placeOf) {
                break;
            }
        }

        return cardinalNumber;
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

        let indoArabicBaseValue: number;

        let valueOfPlaceInRoman: string = '';

        for (let i = firstGroupOfNumbersLength - 1; i >= 0; i--) {
            currentDigit = Number.parseInt(firstGroupOfNumbersAsString.charAt(i));

            unityValueOfPlaceInRoman = this.romanNumeralMap.get(placeOf) as string;

            // console.log(unityValueOfPlaceInRoman)

            // aqui o valor da unidade da casa vai à esquerda
            if (currentDigit === 4 || currentDigit === 9) {
                indoArabicBaseValue = this.getImmediateNextValue(currentDigit, placeOf);
                valueOfPlaceInRoman = this.romanNumeralMap.get(indoArabicBaseValue) as string;
                valueOfPlaceInRoman = `${unityValueOfPlaceInRoman}${valueOfPlaceInRoman}`;
                this._numeral = `${valueOfPlaceInRoman}${this._numeral}`;
            } else {
                // indoArabicBaseValue = placeOf;
                // valueOfPlaceInRoman = this.romanNumeralMap.get(indoArabicBaseValue) as string;

                // não é para ir até currentDigit, é para fazer uma soma, somando de unidade em unidade, até o valor ser igual ao currentDigit. Ou seja, não dá pra usar for neste caso, tem de ser while ou do... while.
                // compor as unidades até o número
                // for (let unityValueOfPlaceI = 0; unityValueOfPlaceI < currentDigit; unityValueOfPlaceI++) {
                //     unityValueOfPlaceInRoman += unityValueOfPlaceInRoman;
                // }

                // // aqui concatena-se os valores da unidade da casa
                // if (currentDigit > 5) {
                //     indoArabicBaseValue = 5 * placeOf;
                //     valueOfPlaceInRoman = `${valueOfPlaceInRoman}${unityValueOfPlaceInRoman}`;
                // }

                // this._numeral = `${valueOfPlaceInRoman}${this._numeral}`;
            }

            placeOf *= 10;
        }

        // this._numeral = `${valueOfThousandPlaceInRoman}${this._numeral}`;
    }

}

// const romanNumeral = new RomanNumeralSet(30214);
const indoArabicValue = 69;
console.log(`Indo Arabic value: `, 69);
const romanNumeral = new RomanNumeralSet(indoArabicValue);
console.log(`Value converted to roman: `, romanNumeral.numeral);
