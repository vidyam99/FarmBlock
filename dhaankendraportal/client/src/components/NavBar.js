import React , { Component } from 'react'

class NavBar extends Component {

    constructor(props){
        super(props);
        this.state = this.props.state
        console.log(this.state)
    }

    render(){
        console.log('in here' +this.props.state)
        return(
            <React.Fragment>
                <nav class=" navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="col-sm-2"/>
                    <a class="nabar-brand col-sm-4" href="#">
                        <h4 class="text-light text-left">DHAANKENDRA</h4>
                    </a>
                    <div class=" col-sm-3" id="navbarNav">
                        <ul class="navbar-nav ">
                            <li class={"float-left nav-item mr-5 " + this.props.state.Home} onClick={(e)=>this.props.handleOnclick(1,e)}>
                                Home
                            </li>
                            <li class={"float-left nav-item mr-5 " + this.props.state.Features} onClick={(e)=>this.props.handleOnclick(2,e)}>
                                Features
                            </li>
                            <li class={"float-left nav-item mr-5 " + this.props.state.Pricing} onClick={(e)=>this.props.handleOnclick(3,e)}>
                                Pricing
                            </li>
                            <li class={"float-left nav-item mr-5 " + this.props.state.Login} onClick={(e)=>this.props.handleOnclick(4,e)}>
                                Login
                            </li>
                        </ul>
                    </div>
                    <div class=" col-sm-3"/>
                </nav>
            </React.Fragment>
        )
    }
}

export default NavBar;