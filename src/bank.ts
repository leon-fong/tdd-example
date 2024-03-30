import { Money } from "./money.js"

interface MoneyProperties {
  amount: number
  currency?: string
}

export type IBank = {
  exchangeRates: Map<string, number>
  convert: (money: MoneyProperties, currency: string)=> MoneyProperties
  addExchangeRate:(currencyForm: string, currencyTo: string, rate: number)=> void
}

export class Bank implements IBank {
  public exchangeRates: Map<string, number>
  constructor() {
    this.exchangeRates = new Map()
  }

  addExchangeRate(currencyForm: string, currencyTo: string, rate: number) {
    const key = currencyForm + '->' + currencyTo
    this.exchangeRates.set(key, rate)
  }

  convert(money: MoneyProperties, currency: string) {
    if (money.currency === currency) {
      return new Money(money.amount, money.currency)
    }
    const key = money.currency + '->' + currency
    const rate = this.exchangeRates.get(key)
    if (rate === undefined) {
      throw new Error(key);
    }

    return new Money(money.amount * rate, currency)
  }
}
