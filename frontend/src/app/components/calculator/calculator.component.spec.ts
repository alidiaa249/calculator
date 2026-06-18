/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Initial State ──────────────────────────────────────
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display 0 on init', () => {
    expect(component.display).toBe('0');
  });

  // ── Digit Input ────────────────────────────────────────
  it('should update display when a digit is pressed', () => {
    component.onDigit('5');
    expect(component.display).toBe('5');
  });

  it('should append digits correctly', () => {
    component.onDigit('1');
    component.onDigit('2');
    component.onDigit('3');
    expect(component.display).toBe('123');
  });

  it('should replace 0 with first digit', () => {
    component.onDigit('7');
    expect(component.display).toBe('7');
  });

  // ── Decimal ────────────────────────────────────────────
  it('should add decimal point', () => {
    component.onDigit('3');
    component.onDecimal();
    expect(component.display).toBe('3.');
  });

  it('should not add second decimal point', () => {
    component.onDigit('3');
    component.onDecimal();
    component.onDecimal();
    expect(component.display).toBe('3.');
  });

  // ── Clear ──────────────────────────────────────────────
  it('should clear display on AC', () => {
    component.onDigit('9');
    component.onClear();
    expect(component.display).toBe('0');
    expect(component.firstOperand).toBeNull();
    expect(component.operator).toBeNull();
  });

  // ── Toggle Sign ────────────────────────────────────────
  it('should toggle sign from positive to negative', () => {
    component.onDigit('5');
    component.onToggleSign();
    expect(component.display).toBe('-5');
  });

  it('should toggle sign from negative to positive', () => {
    component.onDigit('5');
    component.onToggleSign();
    component.onToggleSign();
    expect(component.display).toBe('5');
  });

  // ── Percentage ─────────────────────────────────────────
  it('should calculate percentage correctly', () => {
    component.onDigit('5');
    component.onDigit('0');
    component.onPercentage();
    expect(component.display).toBe('0.5');
  });

  // ── Arithmetic Operations ──────────────────────────────
  it('should add two numbers: 5 + 3 = 8', () => {
    component.onDigit('5');
    component.onOperator('add');
    component.onDigit('3');
    component.onEquals();
    expect(component.display).toBe('8');
  });

  it('should subtract: 10 - 4 = 6', () => {
    component.onDigit('1');
    component.onDigit('0');
    component.onOperator('subtract');
    component.onDigit('4');
    component.onEquals();
    expect(component.display).toBe('6');
  });

  it('should multiply: 6 × 7 = 42', () => {
    component.onDigit('6');
    component.onOperator('multiply');
    component.onDigit('7');
    component.onEquals();
    expect(component.display).toBe('42');
  });

  it('should divide: 15 ÷ 3 = 5', () => {
    component.onDigit('1');
    component.onDigit('5');
    component.onOperator('divide');
    component.onDigit('3');
    component.onEquals();
    expect(component.display).toBe('5');
  });

  // ── Edge Cases ─────────────────────────────────────────
  it('should show Error on division by zero', () => {
    component.onDigit('5');
    component.onOperator('divide');
    component.onDigit('0');
    component.onEquals();
    expect(component.display).toBe('Error');
  });

  it('should handle backspace correctly', () => {
    component.onDigit('1');
    component.onDigit('2');
    component.onBackspace();
    expect(component.display).toBe('1');
  });

  it('should set display to 0 when backspace on single digit', () => {
    component.onDigit('5');
    component.onBackspace();
    expect(component.display).toBe('0');
  });
});
