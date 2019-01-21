import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import Actions from '../actions/index.js';
import { connect, Provider } from 'react-redux';

export default class InputWidget extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
        this.onInputChange = this.onInputChange.bind(this);
    }
    componentDidMount(){
        console.log(`--componentDidMount--`)
    }
    onInputChange(e){
        console.log(`--onInputChange--${e.target.value}`)
        let value = e.target.value;
        this.context.store.dispatch(Actions.inputValueAction(value));
        console.log(this.context.store.getState())
    }
    render() {
        return (
            <div className="input-widget">
                <input className="input" placeholder="输入文字" onChange={this.onInputChange} />
            </div>
        );
    }
}

InputWidget.defaultProps = {
    data: ''
};
InputWidget.propTypes = {
    data: PropTypes.string.isRequired
};
InputWidget.contextTypes = {
    store: PropTypes.object.isRequired
};

