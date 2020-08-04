export class Triple<F, S, T> {
    private readonly first: F;
    private readonly second: S;
    private readonly third: T;

    constructor(first: F, second: S, third: T) {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    getFirst = (): F => this.first;
    getSecond = (): S => this.second;
    getThird = (): T => this.third;
    getTripleAsList = (): Array<F | S | T> => [this.first, this.second, this.third];
    getTripleAsObject = (): Object =>
        this.getTripleAsList().reduce((object: Object, item: F | S | T, index: number) => {
            object[index] = item;
            return object;
        }, {});
}
