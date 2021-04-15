import { StrategyInterface } from "./strategyInterface";


// to use
export class StrategyContext {

    private strategy: StrategyInterface;

    constructor(strategy: StrategyInterface) {
        this.strategy = strategy;
    }

    get numeral(): string {
        return this.strategy.numeral;
    }

}
