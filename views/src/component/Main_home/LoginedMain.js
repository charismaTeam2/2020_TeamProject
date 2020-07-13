import React, {Component } from 'react';
import Card from './Card';



class LoginedHeader extends Component{


    render(){
        return(
            <React.Fragment>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
              로그인된 메인
            </React.Fragment>
        );
    }

}

export default LoginedHeader;