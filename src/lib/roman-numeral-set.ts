export class RomanNumeralSet {

    private indoArabicNumeral: number;

    private romanNumeral!: string;

    private romanNumeralMap!: Map<number, string>;

    // tuple statement
    // private groupedRomanNumeralMap!: Map<number, [string, string]>;
    private groupedRomanNumeralMap!: Map<number, [string, string]>;

    private romanNumeralList: string[];

    constructor(indoArabicNumeral: number) {
        if (indoArabicNumeral <= 0) {
            throw new Error(`There is no negative or zero values in Roman numeral.`);
        }

        if (!Number.isInteger(indoArabicNumeral)) {
            throw new Error(`There is no fractional values in Roman numeral.`);
        }

        this.indoArabicNumeral = indoArabicNumeral;

        // 1, 5, 10, 50, 100, 500
        // this.romanNumeralList = ['I', 'V', 'X', 'L', 'C', 'D'];
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

        this.groupedRomanNumeralMap = new Map();

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

    // private compose() {

    // }

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

    // 9, 40, 90, 400, 900
    private getImmediateNextValue(currentDigit: number, placeOf: number = 1): number {

        let cardinalNumber: number = 1;

        let currentValue: number = 1;

        const romanNumeralMapKeys: number[] = Array.from(this.romanNumeralMap.keys());

        // 1, 5, 10, 50, 100, 500, 1000
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
        const indoArabicNumeralLength: number = `${this.indoArabicNumeral}`.length;

        const groups: string[]  = this.getSeparateValueInGroupsOf3(this.indoArabicNumeral);

        // this will always exist
        const firstGroupOfNumbers: number = Number.parseInt(groups[groups.length - 1]);

        const secondGroupOfNumbers: number = this.getGroupOfThousands(groups);

        const firstGroupOfNumbersAsString: string = `${firstGroupOfNumbers}`;

        const firstGroupOfNumbersLength: number = firstGroupOfNumbersAsString.length;

        const valueOfThousandPlaceInRoman: string = this
            .getGroupOfThousandsInRoman(secondGroupOfNumbers);

        // this will always exist
        const unityPlaceValue: number = Number
            .parseInt(`${this.indoArabicNumeral}`[indoArabicNumeralLength - 1]);

        // multiplica por 10 para achá-lo (com algorítmo próprio) no array
        let decimalPlaceValue: number = 0;

        // multiplica por 100 para achá-lo (com algorítmo próprio) no array
        let houndredPlaceValue: number = 0;

        // let placeValue: number = 0;

        // let thousandsPlaceValue: number = 0;

        let valueOfUnityPlaceInRoman: string = '';

        let valueOfDecimalPlaceInRoman: string = '';

        let valueOfHoundredPlaceInRoman: string = '';

        // let startValue: number;

        let currentDigit: number;

        let placeOf: number = 1;

        let currentRomanNumber: string = '';

        let cardinalBaseValue: number;

        let baseValueInRoman: string;

        for (let i = firstGroupOfNumbersLength - 1; i >= 0; i--) {
            currentDigit = Number.parseInt(firstGroupOfNumbersAsString.charAt(i));

            // if (unityPlaceValue > 3) {
            //     if (unityPlaceValue < 9) {
            //         // startValue = 5;
            //     } else {
            //         // startValue = 10;
            //     }
            // } else {
            //     // chamar rotina de para adicionar as unidades
            // }

            // this.getImmediateNextValue(currentDigit);

            if (currentDigit === 4 || currentDigit === 9) {
                cardinalBaseValue = this.getImmediateNextValue(currentDigit, placeOf);
                baseValueInRoman = this.romanNumeralMap.get(cardinalBaseValue) as string;
                console.log(baseValueInRoman)
            } else {
                if (currentDigit < 5) {
                    if (currentDigit === 4) {
                        // concatenar o valor das unidades desse grupo
                    } else {
                        // multiplicar 5 por groupOf
                        // colocar o valor da unidade desse grupo a esquerda
                    }
                } else {
                    // já colocar o 5
                    // colocar
                }
            }


            // if (currentDigit === 5) {

            // } else {
            //     if (currentDigit < 5) {

            //     } else {

            //     }
            // }

            placeOf *= 10;
        }

        // for (let i: number = 2; i < this.romanNumeralList.length - 1; i += 2) {
        //     groupOf = groupOf * 10;

        //     this.groupedRomanNumeralMap
        //         .set(groupOf, [this.romanNumeralList[i], this.romanNumeralList[i + 1]]);
        // }

        // não precisa testar se tem esse ou aquele, basta iterar da direita para a esquerda, começando do penúltimo (length - 2) e a cada iteração o coeficiente é o atual multiplicado por 10.

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

        this.romanNumeral = `${valueOfThousandPlaceInRoman}`;
    }

}

// const romanNumeral = new RomanNumeralSet(30214);
const romanNumeral = new RomanNumeralSet(4);
// console.log(romanNumeral.numeral);
