import { StrategyInterface } from "./strategyInterface";


// to use
export class StrategyContext {

    private _strategy: StrategyInterface;

    constructor(strategy: StrategyInterface) {
        this._strategy = strategy;
    }

    get numeral(): string {
        return this._strategy.numeral;
    }

    set strategy(strategy: StrategyInterface) {
        this._strategy = strategy;
    }

}
