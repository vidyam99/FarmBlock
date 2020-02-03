import React , { Component } from 'react'
import Features from './Features'
import Home from './Home'
import Pricing from './Pricing'
import Login from './Login'

class Screens extends Component {

    constructor(props){
        super(props)
    }

    render(){

        if(this.props.selected === 3){
            return <Pricing/>
        }else if(this.props.selected === 2){
            return <Features/>
        }else if(this.props.selected == 3){
            return <Home/>
        }else{
            return <Login/>
        }
    }
}

export default Screens