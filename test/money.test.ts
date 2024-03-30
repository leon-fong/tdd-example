import { Dollar, Money,  } from "../src/money.js";
import { test, assert} from "vitest";

// 5 USD * 2 = 10 USD
test('Dollar', () => {
  let fiver = new Dollar(5)
  let tenner = fiver.times(2)
  assert.strictEqual(tenner.amount, 10)
})

// Refactor
test('Money', () => {
  let fiver = new Money(5)
  let tenner = new Money(10)
  assert.deepStrictEqual(fiver.times(2), tenner)
})

// 10 EUR * 2 = 20 EUR
test('Currency', () => {
  let tenEuros = new Money(10, 'EUR')
  let twentyEuros = new Money(20, 'EUR')
  assert.deepStrictEqual(tenEuros.times(2), twentyEuros)
})

// 4002 KRW / 4 = 1000.5 KRW
test('Division', () => {
  let originalMoney = new Money(4002, 'KRW')
  let actualMoneyAfterDivision = originalMoney.divide(4)
  let expectedMoneyAfterDivision = new Money(1000.5, 'KRW')
  assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision)
})
