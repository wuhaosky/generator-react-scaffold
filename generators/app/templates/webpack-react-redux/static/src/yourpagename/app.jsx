import React from 'react'
import Introduction from './component/introduction.jsx'
import InputWidget from './component/inputwidget.jsx'

export default class App extends React.Component {

    buildIntroduction(){
        return (<Introduction data={'welcome to use react-scaffold'}/>)
    }
    buildInputWidget(){
      return (<InputWidget />)
    }
    render() {
        return (
            <div>
                {this.buildIntroduction()}
                {this.buildInputWidget()}
            </div>
        );
    }
}
