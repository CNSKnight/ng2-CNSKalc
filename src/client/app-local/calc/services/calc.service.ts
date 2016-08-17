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
  calcR: Observable<CalculatorI>;
  private lastState: CalculatorI;

  // Inject the `Store` into the constructor - no type
  constructor(private store: Store<Object>) {

    // Bind a local as an observable to CalculatorReducer
    this.calcR = store.select('calculatorR');
    this.lastState = {stack:[]};
    this.calcR.subscribe(state => {
      this.lastState = state;
    });
  }

  initializeStore() {
    this.store.dispatch({
      type: 'INITIALIZE',
      payload: {
        stack: [],
        leftNum: '',
        operator: '',
        rightNum: '',
        result: '',
        display: '0'
      }
    });

    return this;
  }

  clearAll() {

    this.store.dispatch({
      type: 'ALL_CLEAR',
      payload: {
        stack: [],
        leftNum: '',
        operator: '',
        rightNum: '',
        result: '',
        display: '0'
      }
    });
  }

  clearEntered() {
    let state = this.getState();
    state.stack = [0];
    this.store.dispatch({
      type: 'CLEAR_ENTRY',
      payload: state
    });
  }

  addDigit(digit: string) {
    let state = this.getState();
    let dotAt = this.hasDecimal(state.stack);
    if (dotAt != -1) {
      if (digit === '.' || dotAt == PRECISION) {
        return;
      }
    }

    if (this.willOverrun(state.stack)) {
      return;
    }

    state.stack.push(digit);
    state.display = state.stack.join('');

    this.store.dispatch({
      type: 'ADD_DIGIT',
      payload: state
    });
  }

  hasDecimal(stack: string[]) {
    if (!stack.length) return 0;
    let stackR = stack.reverse();
    return (stackR.indexOf('.'));
  }

  willOverrun(stack: string[]) {
    if (!stack.length || !!! ~stack.indexOf('.')) return false;
    let dotAt = ~stack.reverse().indexOf('.');
    return (dotAt == OVERRUN_LIMIT);
  }

  setOperator(oper: string) {
    let state = this.getState();
    state.operator = oper;
    state.leftNum = +state.stack.join('');
    state.stack = [];
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

    state.result = null;
    if (typeof result !== 'number') {
      state.stack.length = 0;
      state.display = 'NaN';
    } else {
      state.stack = result.toString().split('');
      state.leftNum = result;
      state.rightNum = null;
      state.display = result.toString().slice(0, OVERRUN_LIMIT);
    }

    this.store.dispatch({
      type: 'CALCULATED',
      payload: state
    });
  }


  getState() {
    return Object.assign({}, this.lastState);

    // let state: CalculatorI;

    // this.calcR.take(1).subscribe(s => state = s);

    // return state;
  }
}
