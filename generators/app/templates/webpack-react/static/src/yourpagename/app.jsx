import React from 'react'
import ReactDom from 'react-dom'
import Introduction from './component/introduction.jsx'

export default class Test extends React.Component {

    buildIntroduction(){
        return (<Introduction data={'welcome to use react-scaffold'}/>)
    }

    render() {
        return (
            <div>
                {this.buildIntroduction()}
            </div>
        );
    }
}
