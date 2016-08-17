/**
 * 
 */

import {
  expect,
  it,
  describe,
  injectAsync,
  TestComponentBuilder,
  beforeEachProvider
} from 'angular2/testing';

import { CalculatorI } from './services/calc.store';
import { CalculatorService as Calc } from './services/calc.service';
import { calculatorReducer as calcR } from './services/calc.reducer';

describe('Calculator Service', () => {
  describe('Calculator Component', () => {
  });

  describe('Calculator Service', () => {
  });

  describe('Calculator Reducer', () => {
    let initialState: CalculatorI = {
      stack: [],
      leftNum: null,
      operator: '',
      rightNum: null,
      result: null,
      display: '0'
    };

    it('returns an initialized object by default', () => {
      let defaultState = calcR(undefined, { type: 'DefaulT', payload: {} });

      expect(defaultState).toEqual(initialState);
    });

    it('`ALL_CLEAR`', () => {
      let payload = initialState,
        stateItems = calcR([], { type: 'ALL_CLEAR', payload: payload });

      expect(stateItems).toEqual(payload);
    });

    it('`CLEAR_ENTRY`', () => {
      let payload = {},
        result = Object.assign(initialState, payload),
        stateItems = calcR(initialState, { type: 'CLEAR_ENTRY', payload: payload });

      expect(stateItems).toEqual(result);
    });

    it('`ADD_DIGIT`', () => {
      let payload = { digit: '6' },
        result = Object.assign(initialState, payload),
        stateItems = calcR(initialState, { type: 'ADD_DIGIT', payload: payload });

      expect(stateItems).toEqual(result);
    });

    it('`SET_OPERATOR`', () => {
      let payload = { oper: '-' },
        result = initialState,
        stateItems = calcR(initialState, { type: 'SET_OPERATOR', payload: payload });

      // DEBUG
      console.log('result: ');
      console.log(result);

      expect(stateItems).toEqual(result);
    });

    it('CALCULATED', () => {
      let payload = {},
        result = Object.assign(initialState, payload),
        stateItems = calcR(initialState, { type: 'CALCULATED', payload: payload });

      expect(stateItems).toEqual(result);
    });
  });
});
