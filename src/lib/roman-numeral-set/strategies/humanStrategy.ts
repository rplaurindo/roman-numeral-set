import { AbstractRomanNumeralSet } from "../AbstractRomanNumeralSet";


// the concrete strategy
export class HumanStrategy extends AbstractRomanNumeralSet {


    constructor(indoArabicNumeral: number) {
        super(indoArabicNumeral);

        this.setRomanNumeral();
    }

    private getSeparateValueInGroupsOf3(value: number): string[] {

        let valueAsString: string = `${value}`;

        let groups = [];

        for (let i: number = valueAsString.length; i > 0; i -= 3) {
            groups.unshift(valueAsString.substring(i - 3, i));
        }

        return groups;
    }

    private getNumberReferring2PlaceOfThousands(separateValueInGroupsOf3: string[]): number {

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

    private setRomanNumeral() {
        const groups: string[]  = this.getSeparateValueInGroupsOf3(this.indoArabicNumeral);

        // this will always exist
        const firstGroupOfNumbers: number = Number.parseInt(groups[groups.length - 1]);

        const secondGroupOfNumbers: number = this.getNumberReferring2PlaceOfThousands(groups);

        const firstGroupOfNumbersAsString: string = `${firstGroupOfNumbers}`;

        const firstGroupOfNumbersLength: number = firstGroupOfNumbersAsString.length;

        const valueOfThousandPlaceInRoman: string = this
            .getGroupOfThousandsInRoman(secondGroupOfNumbers);

        let currentDigit: number;

        let placeOf: number = 1;

        let unityInRomanOfPlace: string;

        let unityValueOfPlaceSum: number;

        let numberInRomanOfPlace: string;

        // deve-se começar da direita para a esquerda porque os números são maiores neste sentido, isto é, o valor a esquerda de outro representa sempre um valor maior que todos os outros à direita deste.
        for (let i = firstGroupOfNumbersLength - 1; i >= 0; i--) {

            unityValueOfPlaceSum = 0;

            numberInRomanOfPlace = '';

            currentDigit = Number.parseInt(firstGroupOfNumbersAsString.charAt(i));

            if (currentDigit) {
                unityInRomanOfPlace = this.romanNumeralMap.get(placeOf) as string;

                numberInRomanOfPlace = this.composeRomanNumberOfPlace(currentDigit * placeOf);

                this._numeral = `${numberInRomanOfPlace}${this._numeral}`;
            }

            placeOf *= 10;
        }

        this._numeral = `${valueOfThousandPlaceInRoman}${this._numeral}`;
    }

}
