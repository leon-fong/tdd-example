import { Money } from "../src/money.js";
import { Portfolio } from "../src/portfolio.js";
import { Bank } from "../src/bank.js";
import { test, expect, assert, describe } from "vitest";

describe('Portfolio', () => {
  // Refactor 5 USD + 10 USD = 15 USD
  test('Basic plus', () => {
    let fifteenDollars = new Money(15, 'USD')
    let portfolio = new Portfolio()
    const fiveDollars = new Money(5, 'USD')
    const tenDollars = new Money(10, 'USD')
    portfolio.add(fiveDollars, tenDollars)
    assert.deepStrictEqual(portfolio.evaluate(new Bank(), 'USD'), fifteenDollars)
  })

  // 5 USD + 10 EUR = 17 USD
  test('USD plus EUR', () => {
    const fiveDollars = new Money(5, 'USD')
    const tenEuros = new Money(10, 'EUR')
    const portfolio = new Portfolio()
    portfolio.add(fiveDollars, tenEuros)
    const expectedValue = new Money(17, 'USD')
    const bank = new Bank()
    bank.addExchangeRate('EUR', 'USD', 1.2)
    assert.deepStrictEqual(portfolio.evaluate(bank, 'USD'), expectedValue)
  })

  // 1 USD + 1100 KRW = 2200 KRW
  test('USD plus KRW', () => {
    const oneDollar = new Money(1, 'USD')
    const elevenHundredWon = new Money(1100, 'KRW')
    const portfolio = new Portfolio()
    portfolio.add(oneDollar, elevenHundredWon)
    const expectedValue = new Money(2200, 'KRW')
    const bank = new Bank()
    bank.addExchangeRate('USD', 'KRW', 1100)
    assert.deepStrictEqual(portfolio.evaluate(bank, 'KRW'), expectedValue)
  })


  // 1 USD + 1100 KRW = 2200 KRW
  test('Multiple missing exchange rates', () => {
    const oneDollar = new Money(1, 'USD')
    const oneEuro = new Money(1, 'EUR')
    const onwWon = new Money(1, 'KRW')
    const portfolio = new Portfolio()
    portfolio.add(oneDollar, oneEuro, onwWon)
    const expectedErrorText = 'Missing exchange rate(s): [USD->Kalganid,EUR->Kalganid,KRW->Kalganid]'

    // WHY ? this way not working 
    // assert.throws(function(){ portfolio.evaluate('Kalganid')}, new Error(expectedErrorText))

    expect(() => portfolio.evaluate(new Bank(), 'Kalganid')).toThrowError(expectedErrorText)
  })

})
