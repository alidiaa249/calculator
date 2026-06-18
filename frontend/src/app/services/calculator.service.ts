import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface CalculationRequest {
  a: number;
  b?: number;
  operation: string;
}

export interface CalculationResponse {
  result: number;
  operation: string;
  a: number;
  b?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  calculate(request: CalculationRequest): Observable<CalculationResponse> {
    return this.http.post<CalculationResponse>(`${this.apiUrl}/calculate`, request).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // Local calculation 
  calculateLocal(a: number, b: number, operation: string): number {
    switch (operation) {
      case 'add':       return a + b;
      case 'subtract':  return a - b;
      case 'multiply':  return a * b;
      case 'divide':
        if (b === 0) throw new Error('Division by zero');
        return a / b;
      case 'percentage': return a / 100;
      default: throw new Error(`Unknown operation: ${operation}`);
    }
  }
}
