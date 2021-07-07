const { test, expect } = require('@jest/globals');
const statement = require('./statement');
const plays = require('./plays');
const invoices = require('./invoices');

test('Teste statement',()=>{
  expect(statement(invoices,plays)).toContain("Statement for BigCo")
  expect(statement(invoices,plays)).toContain(" Hamlet: $650.00 (55 seats)")
  expect(statement(invoices,plays)).toContain(" As You Like It: $490.00 (35 seats)")
  expect(statement(invoices,plays)).toContain(" Othello: $500.00 (40 seats)")
  expect(statement(invoices,plays)).toContain("Amount owed is $1,640.00")
  expect(statement(invoices,plays)).toContain("You earned 47 credits")
})