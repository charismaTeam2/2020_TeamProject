import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import LoginedMain from '../Main_home/LoginedMain';
import Info_user from './Info_user';
import Info_board from './Info_board';
import Info_message from './Info_message';
import Info_deal from './Info_deal';
import Footer from '../Main_home/Footer';


// 사용자 페이지는 '자신의 페이지'와 '타사용자 페이지'로 구분해서 이동.
// 회원 정보(아이디, 언제 가입했고, 현재 팔로워 수, 패션 점수)
// 메시지(메시지 구분.)
// 자기가 쓴 게시물 확인. 수정,삭제.
// 


class Mypage extends Component{

  state = { // 변동되는 상태값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
    user: "",
    check: ""
}




componentDidMount() {

  // Simple GET request using fetch
  fetch('/mypage/')
      .then(response => response.json())
      .then(data => this.setState({ 
        user: data.session.user 
      }));

}
_user_button = () =>{
  this.setState({
    check : 0
  });
}
_board_button = () =>{
  this.setState({
    check : 1
  });
}
_message_button = () =>{
  this.setState({
    check : 2
  });
}
_deal_button = () =>{
  this.setState({
    check : 3
  });
}




  render(){
    let user_check = this.state.user
    let getForm = () =>{
      if(user_check){
        return(
          <LoginedHeader title="為せば成る" user={user_check} />
        );
      }else{
        return(
          <Header title="為せば成る" />
        )
      }
    };

    let board_check = this.state.check
    let info_form = () =>{
      if(board_check === 0){
        return(
          <Info_user user={this.state.user} />
        );
      }else if(board_check === 1){
        return(
          <Info_board />
        );
      }else if(board_check === 2){
        return(
          <Info_message user={this.state.user} />
        );
      }else if(board_check === 3){
        return(
          <Info_deal />
        );
      }
    }

    



    return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            
           {getForm()}

            <main>
            <Grid Container style={{ paddingBottom:20 }}>
                <Grid item xs={12} xm={12}>
                <label style={{ fontSize:20, fontWeight:"bolder" }}>{this.state.user}님의 사용자 페이지입니다.</label>
                </Grid>
              </Grid>
              <Grid Container>
                <Grid xs={12} xm={12}>
                  <Grid item xs={12} xm={12} >
                    <Button
                      id="user_info"
                      variant="outlined"
                      color="secondary"
                      onClick={this._user_button}>회원 정보</Button>
                    <Button
                      id="board_info"
                      variant="outlined"
                      color="secondary"
                      onClick={this._board_button}>게시물 정보</Button>
                    <Button
                      id="message_info"
                      variant="outlined"
                      color="secondary"
                      onClick={this._message_button}>메시지</Button>
                    <Button
                      id="follower_info"
                      variant="outlined"
                      color="primary">팔로워 정보</Button>
                    <Button
                      id="deal_info"
                      variant="outlined"
                      color="primary"
                      onClick={this._deal_button}>거래 정보</Button>
                  </Grid>
                </Grid>
                  {info_form()}
                  



              </Grid>





                 
            </main>
          </Container>
          <Footer description="為せば成る" />
        </React.Fragment>
        

    );
  }

}


export default Mypage;