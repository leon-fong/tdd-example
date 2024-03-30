


export class Dollar {
  public amount
  public constructor(amount: number) {
    this.amount = amount
  }

  times(multiplier: number) {
    return new Dollar(this.amount * multiplier)
  }

}

export class Money {
  public amount;
  public currency;
  public constructor(amount: number, currency?: string) {
    this.amount = amount
    this.currency = currency
  }

  times(multiplier: number) {
    return new Money(this.amount * multiplier, this.currency)
  }

  divide(divisor: number) {
    return new Money(this.amount / divisor, this.currency)
  }

}
