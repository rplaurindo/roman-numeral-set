import { Strategy } from "./strategy";


// the concrete strategy
export abstract class AbstractRomanNumeralSet implements Strategy {

    abstract numeral: string;

    protected indoArabicNumeral: number;

    protected romanNumeralMap!: Map<number, string>;

    // tuple notation
    protected indoArabicNumeralList: [number, number, number, number, number,
        number, number, number, number, number, number, number, number];

    // protected indoArabicBaseNumeralList: [number, number, number, number,
    protected indoArabicBaseNumeralList: [number, number, number, number, number,
        number, number];

    protected romanNumeralList: [string, string, string, string, string,
        string, string, string, string, string, string, string, string];

    private lastIndexOfIndoArabicBaseNumberList: number;

    constructor(indoArabicNumeral: number) {
        if (indoArabicNumeral <= 0) {
            throw new Error('There is no negative or zero values in Roman numeral.');
        }

        if (!Number.isInteger(indoArabicNumeral)) {
            throw new Error('There is no fractional values in Roman numeral.');
        }

        this.indoArabicNumeral = indoArabicNumeral;

        this.indoArabicBaseNumeralList = [1, 5, 10, 50, 100, 500, 1000];

        this.indoArabicNumeralList =    [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

        //                        1,    4,   5,    9,  10,   40,  50,    90
        this.romanNumeralList = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC',
            // 100,  400,  500,  900,  1000
                'C', 'CD',  'D', 'CM', 'M'];

        this.lastIndexOfIndoArabicBaseNumberList = 0;

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

        const firstDigit: number = Number.parseInt(`${indoArabicNumeral}`.charAt(0));

        let placeUnityInRoman: string = this.romanNumeralMap.get(placeOf) as string;

        let indoArabicBaseNumeral: number;

        let romanBaseNumeral: string;

        let romanNumeral: string;

        let composedUnitsOfPlace: string;

        let groups: string[];

        let groupOfThousands: number;

        // console.log(this.getBaseNumberOfPlace(2000))

        // acho que aqui já dá pra usar a lógica de dividir o valor passado como parâmetro por um determinado de this.indoArabicNumeralList, segundo uma determinada lógica para alcançar o valor desta lista para pegar a parte inteira e descobrir times2Repeat um numeral romano no contexto
        if (indoArabicNumeral > 999) {
            groups = this.getSeparateValueInGroupsOf3(indoArabicNumeral);
            groupOfThousands = this.getNumberReferring2PlaceOfThousands(groups);
            romanNumeral = this.composePlaceUnityInRoman(
                this.romanNumeralMap.get(1000) as string
                , groupOfThousands
            );
        } else {
            indoArabicBaseNumeral = this.getBaseNumberOfPlace(indoArabicNumeral);
            romanBaseNumeral = this.romanNumeralMap.get(indoArabicBaseNumeral) as string;

            if (firstDigit === 4 || firstDigit === 9) {
                romanNumeral = `${placeUnityInRoman}${romanBaseNumeral}`;
            } else {
                composedUnitsOfPlace = this.composePlaceUnityInRoman(
                    placeUnityInRoman
                    , (((firstDigit * placeOf) - indoArabicBaseNumeral) / placeOf)
                );

                romanNumeral = `${romanBaseNumeral}${composedUnitsOfPlace}`;
            }
        }

        return romanNumeral;
    }

    private composePlaceUnityInRoman(placeUnityInRoman: string, times2Repeat: number): string {

        let composed: string = '';

        for (let i = 0; i < times2Repeat; i++) {
            composed += placeUnityInRoman;
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

        let indoArabicBaseNumeral: number = 0;

        let indoArabicBaseNumeralListLength: number = this.indoArabicBaseNumeralList.length;

        // let recordedIndoArabicBaseNumber: number = 0;

        if (firstDigit === 4 || firstDigit === 9) {
            for (
                    let i: number = this.lastIndexOfIndoArabicBaseNumberList;
                    i < indoArabicBaseNumeralListLength; i++
                ) {

                indoArabicBaseNumeral = this.indoArabicBaseNumeralList[i];

                // this.indoArabicBaseNumeralList.shift();
                // indoArabicBaseNumeralListLength -= 1;
                // i -= 1;

                if (indoArabicBaseNumeral >= indoArabicNumber) {
                    // this.indoArabicBaseNumeralList.splice(0, i + 2);
                    this.lastIndexOfIndoArabicBaseNumberList = i;
                    break;
                }
            }
        } else {
            // adicionar suporte para retornar o 1000 também
            for (
                    let i: number = this.lastIndexOfIndoArabicBaseNumberList;
                    i <= indoArabicBaseNumeralListLength; i++
                ) {

                // if (this.indoArabicBaseNumeralList[i - 2]) {
                //     recordedIndoArabicBaseNumber = this.indoArabicBaseNumeralList[i - 2];
                //     this.indoArabicBaseNumeralList.shift();
                //     indoArabicBaseNumeralListLength -= 1;
                //     i -= 1;
                // }

                if (indoArabicBaseNumeral > indoArabicNumber) {
                    // indoArabicBaseNumeral = recordedIndoArabicBaseNumber;

                    indoArabicBaseNumeral = this.indoArabicBaseNumeralList[i - 2];
                    this.lastIndexOfIndoArabicBaseNumberList = i;

                    // this.indoArabicBaseNumeralList.splice(0, i);
                    break;
                }

                indoArabicBaseNumeral = this.indoArabicBaseNumeralList[i];
            }
        }

        return indoArabicBaseNumeral;
    }

}
