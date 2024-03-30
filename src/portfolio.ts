import type { Bank } from "./bank.js"
import { Money } from "./money.js"

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

  evaluate(bank: Bank, currency: string) {
    const failures: string[] = []
    const total = this.moneys.reduce((sum, money) => {
      try {
        const convertedMoney = bank.convert(money, currency)
        return sum + convertedMoney.amount
      } catch (error: any) {
        failures.push(error.message)
        return sum
      }
    }, 0)

    if (!failures.length) {
      return new Money(total, currency)
    }
    throw new Error(`Missing exchange rate(s): [${failures.join()}]`)
  }
}
