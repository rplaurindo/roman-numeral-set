import { AbstractRomanNumeralSet } from "../abstractRomanNumeralSet";


export class MathematicalStrategy extends AbstractRomanNumeralSet {

    protected _numeral: string;

    get numeral(): string {
        return this._numeral;
    }

    constructor(indoArabicNumeral: number) {
        super(indoArabicNumeral);

        this._numeral = '';

        this.setRomanNumeral();
    }

    private setRomanNumeral() {

    }

}
