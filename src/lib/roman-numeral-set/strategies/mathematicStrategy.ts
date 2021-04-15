import { AbstractRomanNumeralSet } from "../AbstractRomanNumeralSet";


export class MathematicStrategy extends AbstractRomanNumeralSet {

    private getImmediateNextValue(currentDigit: number, placeOf: number = 1): number {

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
