


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

interface MoneyProperties {
  amount: number
  currency?: string
}
export class Portfolio<T> {
  public moneys: MoneyProperties[]
  constructor() {
    this.moneys = []
  }

  add(...moneys: MoneyProperties[]) {
    this.moneys = this.moneys.concat(moneys)
  }

  convert(money: MoneyProperties, currency: string) {
    const exchangeRates = new Map()
    exchangeRates.set('EUR->USD', 1.2)
    exchangeRates.set('USD->KRW', 1100)
    if (money.currency === currency) {
      return money.amount
    }
    const key = money.currency + '->' + currency
    return money.amount * exchangeRates.get(key)
  }

  evaluate(currency: string) {
    const total = this.moneys.reduce((sum, money) => {
      return sum + this.convert(money, currency)
    }, 0)
    return new Money(total, currency)
  }
}
