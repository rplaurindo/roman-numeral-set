import { Strategy } from "./strategy";


// to use
export class StrategyContext {

    private _strategy: Strategy;

    constructor(strategy: Strategy) {
        this._strategy = strategy;
    }

    get numeral(): string {
        return this._strategy.numeral;
    }

}
