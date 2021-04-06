class RomanNumeralSet {

    private indoArabicNumeral: number;

    private romanNumeral!: string;

    private romanNumeralMap!: Map<number, string>;

    private romanNumeralList: string[];

    constructor(indoArabicNumeral: number) {
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
        return this.romanNumeral;
    }

    private initializeNumeralsMap() {
        let value: number = 1;

        this.romanNumeralMap = new Map();

        this.romanNumeralMap.set(value, 'I');

        for (let i: number = 2; i < this.romanNumeralList.length + 1; i++) {
            if (i % 2 === 0) {
                value = value * 5;
            } else {
                value = value * 2;
            }

            this.romanNumeralMap.set(value, this.romanNumeralList[i - 1]);
        }

    }

    private getFirstDigit(value: number): string {
        return `${value}`.charAt(0);
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

    private setRomanNumeral() {
        const indoArabicNumeralLength: number = `${this.indoArabicNumeral}`.length;

        let firstPlaceValue: number = 0;

        let secondPlaceValue: number = 0;

        let thirstPlaceValue: number = 0;

        // let placeValue: number = 0;

        // let thousandsPlaceValue: number = 0;

        let valueOfUnityPlaceInRoman: string = '';

        let valueOfDecimalPlaceInRoman: string = '';

        let valueOfHoundredPlaceInRoman: string = '';

        let valueOfThousandPlaceInRoman: string = this.getGroupOfThousandsInRoman(this.indoArabicNumeral);

        let startValue: number;

        // for (let i = 3; i > 3; i++) {

        // }

        // fazer ilação para ver se isso será necessário: vai aumentando a quantidade de zeros para multiplicação e saber o ponto de partida, a medida que se itera da direita para a esquerda

        // ver como separar em grupos de 3;

        // a partir de 4 algarismos, da direita para a esquerda, do 4 algarismo em diante, a composição da representação em romanos é simples: serão tantos M quanto for o número da casa dos milhares

        // firstPlaceValue = this.indoArabicNumeral[indoArabicNumeralLength - 1];

        // if (firstPlaceValue > 3) {
        //     if (firstPlaceValue < 9) {
        //         startValue = 5;
        //     } else {
        //         startValue = 10;
        //     }
        // }

        if (indoArabicNumeralLength >= 2) {
            // secondPlaceValue = this.indoArabicNumeral[indoArabicNumeralLength - 2];
            // 999
            // CMXCIX
            // 888
            // DCCCLXXXVIII
            // para saber se serão 1 ou 3 de qualquer letra, basta diminuir de 5, o valor do primeiro algarismo à esquerda, que a letra representa

            // if (secondPlaceValue > 3) {
            //     if (secondPlaceValue < 9) {
            //         startValue = 5;
            //     } else {
            //         startValue = 10;
            //     }
            // }

            // if (indoArabicNumeralLength >= 3) {
            //     thirstPlaceValue = this.indoArabicNumeral[indoArabicNumeralLength - 3];
            // }

            // if (indoArabicNumeralLength === 2) {

            // }

            // if (unityPlaceValue < 4) {
            //     for (let i = 0; i < unityPlaceValue; i++) {
            //         valueOfUnityPlaceInRoman += 'I';
            //     }
            // } else if (unityPlaceValue === 4) {
            //     valueOfUnityPlaceInRoman = `I${valueOfUnityPlaceInRoman}`;
            // } else {
            //     // for (let romanNumeral of this.romanNumeralList) {
            //     //     valueOfUnityPlaceInRoman += 'I';
            //     // }
            // }
        } else if (indoArabicNumeralLength === 2) {

        } else if (indoArabicNumeralLength === 3) {

        } else {

        }

        // for (let romanNumeral of this.romanNumeralList) {

        // }

        this.romanNumeral = `${this.getGroupOfThousandsInRoman}`;
    }

}

const romanNumeral = new RomanNumeralSet(3214);
console.log(romanNumeral.numeral);
