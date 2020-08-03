export class Pair<F, S> {
    private readonly first: F;
    private readonly second: S;

    constructor(first: F, second: S) {
        this.first = first;
        this.second = second;
    }

    getFirst = (): F => this.first;
    getSecond = (): S => this.second;
    getPairAsList = (): Array<F | S> => [this.first, this.second];
    getPairAsObject = (): { first: F; second: S } => ({ first: this.first, second: this.second });
}
