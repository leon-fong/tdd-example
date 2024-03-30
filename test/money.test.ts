import { Dollar, Money, Portfolio } from "../src/money.js";
import { test, assert ,expect} from "vitest";

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


// Refactor 5 USD + 10 USD = 15 USD
test('Portfolio', () => {
  let fifteenDollars = new Money(15, 'USD')
  let portfolio = new Portfolio()
  const fiveDollars = new Money(5, 'USD')
  const tenDollars = new Money(10, 'USD')
  portfolio.add(fiveDollars, tenDollars)
  assert.deepStrictEqual(portfolio.evaluate('USD'), fifteenDollars)
})

// 5 USD + 10 EUR = 17 USD
test('USD plus EUR', () => {
  const fiveDollars = new Money(5, 'USD')
  const tenEuros = new Money(10, 'EUR')
  const portfolio = new Portfolio()
  portfolio.add(fiveDollars, tenEuros)
  const expectedValue = new Money(17, 'USD')
  assert.deepStrictEqual(portfolio.evaluate('USD'), expectedValue)
})

// 1 USD + 1100 KRW = 2200 KRW
test('USD plus KRW', () => {
  const oneDollar = new Money(1, 'USD')
  const elevenHundredWon = new Money(1100, 'KRW')
  const portfolio = new Portfolio()
  portfolio.add(oneDollar, elevenHundredWon)
  const expectedValue = new Money(2200, 'KRW')
  assert.deepStrictEqual(portfolio.evaluate('KRW'), expectedValue)
})


// 1 USD + 1100 KRW = 2200 KRW
test('Multiple missing exchange rates', () => {
  const oneDollar = new Money(1, 'USD')
  const oneEuro = new Money(1, 'EUR')
  const onwWon = new Money(1, 'KRW')
  const portfolio = new Portfolio()
  portfolio.add(oneDollar, oneEuro, onwWon)
  const expectedErrorText = 'Missing exchange rate(s): [USD->Kalganid,EUR->Kalganid,KRW->Kalganid]'

  // assert.throws(function(){ portfolio.evaluate('Kalganid')}, new Error(expectedErrorText))
  
  expect(()=>portfolio.evaluate('Kalganid'), expectedErrorText )
})

