class RomanNumeralSet {
    constructor(indoArabicNumeral) {
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
    get numeral() {
        return this.romanNumeral;
    }
    initializeNumeralsMap() {
        let value = 1;
        this.romanNumeralMap = new Map();
        this.romanNumeralMap.set(value, 'I');
        for (let i = 2; i < this.romanNumeralList.length + 1; i++) {
            if (i % 2 === 0) {
                value = value * 5;
            }
            else {
                value = value * 2;
            }
            this.romanNumeralMap.set(value, this.romanNumeralList[i - 1]);
        }
    }
    getFirstDigit(value) {
        return `${value}`.charAt(0);
    }
    getGroupOfThousandsInRoman(thousandGroupNumber) {
        let composed = '';
        for (let i = 0; i < thousandGroupNumber; i++) {
            composed += 'M';
        }
        return composed;
    }
    getSeparateValueInGroupsOf3(value) {
        let valueAsString = `${value}`;
        let groups = [];
        for (let i = valueAsString.length; i > 0; i -= 3) {
            groups.unshift(valueAsString.substring(i - 3, i));
        }
        return groups;
    }
    setRomanNumeral() {
        const indoArabicNumeralLength = `${this.indoArabicNumeral}`.length;
        let firstPlaceValue = 0;
        let secondPlaceValue = 0;
        let thirstPlaceValue = 0;
        // let placeValue: number = 0;
        // let thousandsPlaceValue: number = 0;
        let valueOfUnityPlaceInRoman = '';
        let valueOfDecimalPlaceInRoman = '';
        let valueOfHoundredPlaceInRoman = '';
        let valueOfThousandPlaceInRoman = this.getGroupOfThousandsInRoman(this.indoArabicNumeral);
        let startValue;
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
        }
        else if (indoArabicNumeralLength === 2) {
        }
        else if (indoArabicNumeralLength === 3) {
        }
        else {
        }
        // for (let romanNumeral of this.romanNumeralList) {
        // }
        this.romanNumeral = `${this.getGroupOfThousandsInRoman}`;
    }
}
const romanNumeral = new RomanNumeralSet(3214);
console.log(romanNumeral.numeral);
//# sourceMappingURL=roman-numeral-set.js.map