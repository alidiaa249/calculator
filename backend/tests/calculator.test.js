const calculator = require('../src/calculator');

describe('Calculator Unit Tests', () => {

  // ─── Addition ───────────────────────────────────────────
  describe('add()', () => {
    test('adds two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });
    test('adds negative numbers', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });
    test('adds zero', () => {
      expect(calculator.add(5, 0)).toBe(5);
    });
    test('throws on invalid input', () => {
      expect(() => calculator.add('a', 1)).toThrow('Invalid input');
    });
  });

  // ─── Subtraction ────────────────────────────────────────
  describe('subtract()', () => {
    test('subtracts two numbers', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });
    test('subtracts to negative result', () => {
      expect(calculator.subtract(3, 7)).toBe(-4);
    });
    test('throws on invalid input', () => {
      expect(() => calculator.subtract(1, 'b')).toThrow('Invalid input');
    });
  });

  // ─── Multiplication ─────────────────────────────────────
  describe('multiply()', () => {
    test('multiplies two numbers', () => {
      expect(calculator.multiply(3, 4)).toBe(12);
    });
    test('multiplies by zero', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
    });
    test('multiplies negative numbers', () => {
      expect(calculator.multiply(-3, -4)).toBe(12);
    });
    test('throws on invalid input', () => {
      expect(() => calculator.multiply('a', 'b')).toThrow('Invalid input');
    });
  });

  // ─── Division ───────────────────────────────────────────
  describe('divide()', () => {
    test('divides two numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });
    test('divides to decimal', () => {
      expect(calculator.divide(1, 4)).toBe(0.25);
    });
    test('throws on division by zero', () => {
      expect(() => calculator.divide(5, 0)).toThrow('Division by zero');
    });
    test('throws on invalid input', () => {
      expect(() => calculator.divide('a', 2)).toThrow('Invalid input');
    });
  });

  // ─── Percentage ─────────────────────────────────────────
  describe('percentage()', () => {
    test('calculates percentage', () => {
      expect(calculator.percentage(50)).toBe(0.5);
    });
    test('calculates 100 percent', () => {
      expect(calculator.percentage(100)).toBe(1);
    });
    test('throws on invalid input', () => {
      expect(() => calculator.percentage('x')).toThrow('Invalid input');
    });
  });

});
