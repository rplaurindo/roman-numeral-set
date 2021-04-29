import { AbstractRomanNumeralSet } from "../abstractRomanNumeralSet";


// the concrete strategy
export class HumanStrategy extends AbstractRomanNumeralSet {

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

        const groups: string[]  = this.getSeparateValueInGroupsOf3(this.indoArabicNumeral);

        // this will always exist
        const numberOfHoundreadsPlace: number = Number.parseInt(groups[groups.length - 1]);

        const numberOfHoundreadsPlaceAsString: string = `${numberOfHoundreadsPlace}`;

        const numberOfHoundreadsPlaceLength: number = numberOfHoundreadsPlaceAsString.length;

        let valueOfThousandPlaceInRoman: string = '';

        let currentDigit: number;

        let placeOf: number = 1;

        let numberInRomanOfPlace: string;

        if (this.indoArabicNumeral > 999) {
            valueOfThousandPlaceInRoman = this.decorateRomanNumeralOfPlace(this.indoArabicNumeral);
        }

        // a lógica de se começar da direita para a esquerda se dá, neste caso, porque os números são maiores neste sentido, isto é, um valor a esquerda de outros representa sempre um valor maior que todos esses outros que estão à direita.
        for (let i = numberOfHoundreadsPlaceLength - 1; i >= 0; i--) {
            numberInRomanOfPlace = '';

            currentDigit = Number.parseInt(numberOfHoundreadsPlaceAsString.charAt(i));

            // se o dígito for 0 dará problema porque não existe mapa para 0 por não existir representação do 0 em romano
            if (currentDigit) {
                numberInRomanOfPlace = this.decorateRomanNumeralOfPlace(currentDigit * placeOf);

                this._numeral = `${numberInRomanOfPlace}${this._numeral}`;
            }

            placeOf *= 10;
        }

        this._numeral = `${valueOfThousandPlaceInRoman}${this._numeral}`;
    }

}
