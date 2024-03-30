


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
    const rate = exchangeRates.get(key)
    if (rate === undefined) return undefined

    return money.amount * rate
  }

  evaluate(currency: string) {
    const failures: string[] = []
    const total = this.moneys.reduce((sum, money) => {
      const convertedAmount = this.convert(money, currency)
      if (convertedAmount === undefined) {
        failures.push(money.currency + '->' + currency)
        return sum
      }
      return sum + convertedAmount
    }, 0)

    if (!failures.length) {
      return new Money(total, currency)
    }
    throw new Error(`Missing exchange rate(s): [${failures.join()}]`)
  }
}
