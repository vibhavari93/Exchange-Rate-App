
 /** @interface
   */
export interface IExchange {
    base: string;
    date: Date;
    rates: IRates[];
}

export interface IRates {
    exchName: string;
    exchRate: number;
}

export class Exchange implements IExchange {
    constructor(public base: string, public date: Date, public rates: IRates[]) {}

}

export class Rates implements IRates {
    constructor(public exchName: string, public exchRate: number) {}
}
