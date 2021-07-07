const { test, expect } = require('@jest/globals');
const statement = require('./statement');

const plays = {
  "hamlet" : {"name" : "Hamlet", "type": "tragedy"},
  "as-like" : {"name" : "As You Like It", "type": "comedy"},
  "othello" : {"name" : "Othello", "type": "tragedy"}
};

const invoices = 
  {
      "customer": "BigCo",
      "performances": [
          { 
              "playID": "hamlet",
              "audience": 55
          },
          {
              "playID" : "as-like",
              "audience": 35
          },
          {
              "playID": "othello",
              "audience": 40
          }
      ]
  };

test('Teste statement',()=>{
  expect(statement(invoices,plays)).toContain("Statement for BigCo")
  expect(statement(invoices,plays)).toContain(" Hamlet: $650.00 (55 seats)")
  expect(statement(invoices,plays)).toContain(" As You Like It: $490.00 (35 seats)")
  expect(statement(invoices,plays)).toContain(" Othello: $500.00 (40 seats)")
  expect(statement(invoices,plays)).toContain("Amount owed is $1,640.00")
  expect(statement(invoices,plays)).toContain("You earned 47 credits")
})