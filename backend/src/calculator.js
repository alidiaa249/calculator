// Calculator Logic Module
const calculator = {
  add: (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Invalid input');
    return a + b;
  },

  subtract: (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Invalid input');
    return a - b;
  },

  multiply: (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Invalid input');
    return a * b;
  },

  divide: (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Invalid input');
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  },

  percentage: (a) => {
    if (typeof a !== 'number') throw new Error('Invalid input');
    return a / 100;
  }
};

module.exports = calculator;
