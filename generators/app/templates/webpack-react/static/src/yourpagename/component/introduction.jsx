import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
export default class Introduction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        console.log(`--componentDidMount--`)
    }
    render() {
        return (
            <div className="introduction">
                <div className="introduction-text">{this.props.data}</div>
                <div className="introduction-image" ></div>
            </div>
        );
    }
}

Introduction.defaultProps = {
    data: ''
};
Introduction.propTypes = {
    data: PropTypes.string.isRequired
};
