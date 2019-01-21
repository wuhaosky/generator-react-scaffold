'use strict';

import assign from 'lodash.assign'
import ActionType from '../actiontype/index.js';

// state 初始值
let initialState = {
};

export default function reducer(state, action) {
	if(typeof state === 'undefined') {
		return initialState
	}
	switch (action.type) {
		case ActionType.INPUT_VALUE:
			return assign({}, state, {
				inputValue: action.inputValue,
			});
		default:
			return state;
	}
}
