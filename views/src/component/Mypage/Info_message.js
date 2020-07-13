import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import LoginedMain from '../Main_home/LoginedMain';
import Footer from '../Main_home/Footer';
import Message_show from './Message_show';
import Message from './Message';


// 사용자 페이지는 '자신의 페이지'와 '타사용자 페이지'로 구분해서 이동.
// 회원 정보(아이디, 언제 가입했고, 현재 팔로워 수, 패션 점수)
// 메시지(메시지 구분.)
// 자기가 쓴 게시물 확인. 수정,삭제.
// 


class Info_message extends Component{

    state={
        check: "",
        user : ""
    }


componentDidMount() {
    this.setState({
        user : this.props.user
    })


//console.log(this.state.c_count);

}

_submit = () =>{
    this.setState({
        check : 1
    });
}

_show = () =>{
    this.setState({
        check : 0
    });
}




  render(){
    let message_check = this.state.check
    let message_form = () =>{
      if(message_check == 0){
        return(
          <Message_show user={this.state.user} />
        );
      }else if(message_check == 1){
        return(
          <Message user={this.state.user} />
        );
      }
    }





    return(
        <React.Fragment>
            <Grid item xs={12} xm={12} style={{ marginTop: 20}}>
                <Button
                    id="m_check"
                    onClick={this._show}
                    variant="outlined"
                    color="primary"
                >메시지 확인</Button>   
                <Button
                    id="m_submit"
                    onClick={this._submit}
                    variant="outlined"
                    color="secondary"
                >메시지 보내기</Button>  
            </Grid>
            <Grid item xs={12} xm={12}>
                {message_form()}
            </Grid>



        </React.Fragment>
        

    );
  }

}


export default Info_message;