// ngrx calculator store

export interface CalculatorI {
  stack: string[];
  leftNum?: number;
  operator?: string;
  rightNum?: number;
  result?: number;
  display?: string;
  isCalc: boolean;
};
