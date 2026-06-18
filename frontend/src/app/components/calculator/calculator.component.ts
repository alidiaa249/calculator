import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  display: string = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitingForSecond: boolean = false;
  expression: string = '';

  onDigit(digit: string): void {
    if (this.waitingForSecond) {
      this.display = digit;
      this.waitingForSecond = false;
    } else {
      this.display = this.display === '0' ? digit : this.display + digit;
    }
  }

  onDecimal(): void {
    if (this.waitingForSecond) {
      this.display = '0.';
      this.waitingForSecond = false;
      return;
    }
    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  onOperator(op: string): void {
    const current = parseFloat(this.display);

    if (this.firstOperand !== null && !this.waitingForSecond) {
      const result = this.computeResult(this.firstOperand, current, this.operator!);
      this.display = this.formatResult(result);
      this.firstOperand = result;
    } else {
      this.firstOperand = current;
    }

    this.operator = op;
    this.waitingForSecond = true;
    this.expression = `${this.firstOperand} ${this.operatorSymbol(op)}`;
  }

  onEquals(): void {
    if (this.firstOperand === null || this.operator === null) return;

    const second = parseFloat(this.display);
    try {
      const result = this.computeResult(this.firstOperand, second, this.operator);
      this.expression = `${this.firstOperand} ${this.operatorSymbol(this.operator)} ${second} =`;
      this.display = this.formatResult(result);
      this.firstOperand = null;
      this.operator = null;
      this.waitingForSecond = false;
    } catch (e: any) {
      this.display = 'Error';
      this.expression = '';
      this.firstOperand = null;
      this.operator = null;
    }
  }

  onPercentage(): void {
    const val = parseFloat(this.display);
    this.display = this.formatResult(val / 100);
  }

  onToggleSign(): void {
    const val = parseFloat(this.display);
    this.display = this.formatResult(-val);
  }

  onClear(): void {
    this.display = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecond = false;
    this.expression = '';
  }

  onBackspace(): void {
    if (this.display.length > 1) {
      this.display = this.display.slice(0, -1);
    } else {
      this.display = '0';
    }
  }

  private computeResult(a: number, b: number, op: string): number {
    switch (op) {
      case 'add':       return a + b;
      case 'subtract':  return a - b;
      case 'multiply':  return a * b;
      case 'divide':
        if (b === 0) throw new Error('Division by zero');
        return a / b;
      default: throw new Error('Unknown operator');
    }
  }

  private formatResult(n: number): string {
    if (!isFinite(n)) return 'Error';
    const str = parseFloat(n.toPrecision(10)).toString();
    return str;
  }

  private operatorSymbol(op: string): string {
    const map: Record<string, string> = {
      add: '+', subtract: '−', multiply: '×', divide: '÷'
    };
    return map[op] || op;
  }

  get operatorDisplay(): string {
    return this.operator ? this.operatorSymbol(this.operator) : '';
  }
}
