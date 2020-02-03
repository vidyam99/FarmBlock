import React, { Component } from 'react';
import NavBar from './components/NavBar'
import Screens from './components/Sceens'
import './App.css';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      "selected":1,
      "Home" : "text-light",
      "Features" : "text-secondary",
      "Pricing" : "text-secondary"
    }

  }

  handleOnclick = (e)=>{

    if(e === 1){
        this.setState({
          "selected":1,
            "Home" : "text-light",
            "Features" : "text-secondary",
            "Pricing" : "text-secondary",
            "Login":"text-secondary"
        })
    }else if(e === 2){
        this.setState({
            "selected":2,
            "Home" : "text-secondary",
            "Features" : "text-light",
            "Pricing" : "text-secondary",
            "Login":"text-secondary"
        })
    }else if(e === 3){
        this.setState({
            "selected":3,
            "Home":"text-secondary",
            "Features":"text-secondary",
            "Pricing":"text-light",
            "Login":"text-secondary"
        })
    }else{
      this.setState({
        "selected":3,
        "Home":"text-secondary",
        "Features":"text-secondary",
        "Pricing":"text-secondary",
        "Login":"text-light"
    })
    }
}

  render() {
    return (
      <div class="App">
        <NavBar state={this.state} handleOnclick={this.handleOnclick}/>
        <Screens selected={this.state.selected}/>
      </div>
    );
  }
}

export default App;
