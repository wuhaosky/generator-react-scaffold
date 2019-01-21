'use strict';

import ActionType from '../actiontype/index.js';

// input action creator
function inputValueAction(inputValue) {
	return {
		type: ActionType.INPUT_VALUE,
		inputValue: inputValue
	}
}

export default {
    inputValueAction
}