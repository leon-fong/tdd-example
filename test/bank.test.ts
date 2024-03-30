import { Bank } from "../src/bank.js";
import { Money } from "../src/money.js";
import { test, expect, assert } from "vitest";


//  10 USD = 12 EUR
test('Exchange rate', () => {
  const bank = new Bank()
  bank.addExchangeRate('EUR', 'USD', 1.2)
  const tenEuros = new Money(10, 'EUR')
  assert.deepStrictEqual(bank.convert(tenEuros, 'USD'), new Money(12, 'USD'))
})

//  10 USD = 12 EUR
test('Convert missing exchange rate', () => {
  const bank = new Bank()
  const tenEuros = new Money(10, 'EUR')
  const expectedErrorText = 'EUR->Kalganid'
  expect(() => bank.convert(tenEuros, 'Kalganid')).toThrowError(expectedErrorText)
})
