// ```
// calc.service.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// calc.service.js may be freely distributed under the MIT license
// ```

// # Calculator Service

import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CalculatorI } from './calc.store';

import 'rxjs/add/operator/take';

const PRECISION = 4;
const OVERRUN_LIMIT = 12;

@Injectable()
export class CalculatorService {
  // this will be picked up by actors whishing to subscribe
  calcR: Observable<any>;
  private lastState: CalculatorI;

  // must be a fresh Object each request
  getInitState() {
    let initState: CalculatorI = {
      stack: [],
      leftNum: null,
      operator: '',
      rightNum: null,
      result: null,
      display: '',
      isCalc: false
    };

    return initState;
  }

  // Inject the `Store` into the constructor - no type
  constructor(private store: Store<Object>) {
    // Bind a local as an observable to CalculatorReducer
    this.calcR = store.select('calculatorR');
    this.calcR.subscribe(state => {
      this.lastState = state;
    });

    // cannot be a const and clone successfully

    this.lastState = this.getInitState();
    this.initializeStore();
  }

  clearAll() {
    this.store.dispatch({
      type: 'ALL_CLEAR',
      payload: this.getInitState()
    });
  }

  clearEntered() {
    let state = this.getState();
    state.stack = [];
    state.display = '';
    this.store.dispatch({
      type: 'CLEAR_ENTRY',
      payload: state
    });
  }

  addDigit(digit: string) {
    let state = this.getState();
    let dotAt = this.hasDecimal(state.stack);
    if (dotAt !== -1) {
      if (digit === '.' || dotAt === PRECISION) {
        return;
      }
    }

    if (this.willOverrun(state.stack)) {
      return;
    }

    if (digit === '.' && !state.stack.length) {
      state.stack.push('0','.');
    } else {
      state.stack.push(digit);
    }

    state.display = state.stack.join('');

    this.store.dispatch({
      type: 'ADD_DIGIT',
      payload: state
    });
  }
  setOperator(oper: string) {
    let state = this.getState();
    if (oper === '-' && !state.stack.length) {
      state.stack.push(oper);
    } else {
      state.operator = oper;
      state.leftNum = +state.stack.join('');
      state.stack = [];
    }

    this.store.dispatch({
      type: 'SET_OPERATOR',
      payload: state
    });
  }

  calculate() {
    let state = this.getState();
    if (!state.operator || !state.leftNum) {
      return;
    }

    state.rightNum = +state.stack.join('');
    let result = 0;
    //calculations
    switch (state.operator) {
      case '-':
        result = state.leftNum - state.rightNum;
        break;
      case '+':
        result = state.leftNum + state.rightNum;
        break;
      case '/':
        result = state.leftNum / state.rightNum;
        break;
      case '*':
        result = state.leftNum * state.rightNum;
        break;
    }

    if (typeof result !== 'number' || result === Infinity || result === NaN) {
      state.result = null;
      state.stack.length = 0;
      state.display = 'NaN';
      state.isCalc = false;
    } else {
      result = +result.toPrecision(PRECISION + 1);
      state.stack = result.toString().split('');
      state.leftNum = result;
      state.rightNum = null;
      state.display = result.toString();
      state.isCalc = true;
    }

    this.store.dispatch({
      type: 'CALCULATED',
      payload: state
    });
  }


  private initializeStore() {
    let state = this.getInitState();
    state.display = '01134';
    this.store.dispatch({
      type: 'INITIALIZE',
      payload: state
    });
  }

  private hasDecimal(stack: string[]) {
    if (!stack.length) return -1;
    let chkStack = stack.concat([]);
    return (chkStack.reverse().indexOf('.'));
  }

// return true if overall len = OVERRUN_LIMIT
// or if precision alread at PRECISION
  private willOverrun(stack: string[]) {
    if (stack.length+1 > OVERRUN_LIMIT) return true;
    let chkStack = stack.concat([]);
    let dotAt = ~chkStack.reverse().indexOf('.');
    return (dotAt === PRECISION);
  }

  private getState() {
    return Object.assign({}, this.lastState);

    // let state: CalculatorI;

    // this.calcR.take(1).subscribe(s => state = s);

    // return state;
  }
}
