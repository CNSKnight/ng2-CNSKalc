
// ** Import our `calculator` store
import { CalculatorI } from './calc.store';

// # redux reducer for `calculator values`

// The `calculator` reducer performs actions on our running `calculator` values
export const calculatorReducer = (state: CalculatorI, {type, payload}) => {

    // Debug stuff
    console.log('---calc.reducer')
    console.log('calculator reducer processing type: ', type);
    console.log('payload: ', payload);
    console.log('state: ', state);
    console.log('---');

    switch (type) {
        case 'INITIALIZE':
        case 'ALL_CLEAR':
        case 'CLEAR_ENTRY':
        case 'ADD_DIGIT':
        case 'SET_OPERATOR':
        case 'CALCULATED':
            return payload;
        default:
            return state || {};
    }
};
