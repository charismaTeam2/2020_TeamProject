import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import Info_user from './Info_user';
import Info_board from './Info_board';
import Info_clothes from './Info_clothes';
import Footer from '../Main_home/Footer';
const headers = { withCredentials: true };



class UserPage extends Component{

  state = { // 변동되는 상태값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
    user: "",
    check: "",
    a_user: "",
    count : "",
    date : "",
    board : [],
    score : "",
    set : "",
    set2 : "",
    clothes : []
}




componentDidMount() {


  // Simple GET request using fetch
  fetch('/mypage')
      .then(response => response.json())
      .then(data => this.setState({ 
        user: data.session.user 
      }));

    const temp = this.props.location.pathname;
    const temp_user = temp.substr(10,13);
    //console.log(a_user);

    this.setState({
      a_user : temp_user
    });




}
_user_button = () =>{

  const send_param = {
        headers:headers,
        user : this.state.a_user
    };

    fetch('/mypage/userpage',{
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
                    },
        body : JSON.stringify(send_param)
    }).then(res => res.json())
    .then(data => {
        if(data.message === true){
            this.setState({
                count : data.count,
                date : data.date,
                score: data.score,
                set : data.f_user,
                set2 : data.fl_user,
                check: 1
            });
        }else if(data.message === false){
            alert("정보 불러오기 실패");
            window.location.replace('/');
        }
        //console.log(data);
        //console.log(send_param.id);
    });

}

_board_button = () =>{
  const send_param = {
    headers:headers,
    user : this.state.a_user
};

fetch('/mypage/boardpage',{
    method: "POST",
    headers: {
        'Content-Type' : 'application/json'
                },
    body : JSON.stringify(send_param)
}).then(res => res.json())
.then(data => {
    if(data.message === true){
        this.setState({
            board : data.board,
            check: 2
        });
    }else if(data.message === false){
        alert("정보 불러오기 실패");
        window.location.replace('/');
    }
    //console.log(data);
    //console.log(send_param.id);
});

}

_follower_button = () =>{
  const user = this.state.user;
  const following = this.state.a_user;

  const send_param = {
    headers:headers,
    send : user,
    rece : following,
    text : "팔로잉 신청입니다.",
    division : 1
  };
  fetch('/mypage/message',{
    method: "POST",
    headers: {
        'Content-Type' : 'application/json'
                },
    body : JSON.stringify(send_param)
}).then(res => res.json())
.then(data => {
    if(data.message === true){
        alert("신청이 완료되었습니다.");
        window.location.reload();
    }else if(data.message === false){
        alert("신청이 거부되었습니다.");
        window.location.replace('/');
    }
});
  

}

_clothes_button = () =>{

  const user = this.state.a_user;

  const send_param = {
    headers:headers,
    user : user
  };
  fetch('/mypage/clothes',{
    method: "POST",
    headers: {
        'Content-Type' : 'application/json'
                },
    body : JSON.stringify(send_param)
}).then(res => res.json())
.then(data => {
    if(data.message === true){
        this.setState({
          clothes : data.clothes,
          check : 3
        });
    }else if(data.message === false){
        alert("에러");
        window.location.replace('/');
    }
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
      if(board_check === 1){
        return(
          <Info_user user={this.state.a_user} date={this.state.date} count={this.state.count} score={this.state.score}/>
        );
      }else if(board_check === 2){
        return(
          <Info_board board={this.state.board} />
        );
      }else if(board_check === 3){
        return(
          <Info_clothes user={this.state.a_user} clothes={this.state.clothes} />
        );
      }
    }

    let set_check = this.state.set

    let button_form = () =>{
      if(set_check == false){
        return(
          <Button
              id="follow"
              onClick={this._follower_button}
              color="secondary">팔로워 신청</Button>
          
        );
      }
    }

    let set2_check = this.state.set2

    let clothes_form = () =>{
      if(set2_check == true){
        return(
          <Button
            id="clothes_button"
            onClick={this._clothes_button}
            color="secondary">옷장</Button>
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
                <label style={{ fontSize:20, fontWeight:"bolder" }}>{this.state.a_user}님의 사용자 페이지입니다.</label>
                </Grid>
              </Grid>
              <Grid Container>
                <Grid xs={12} xm={12}>
                  <Grid item xs={12} xm={12} >
                    <Button
                      id="user_info"
                      variant="outlined"
                      color="primary"
                      onClick={this._user_button}>회원 정보</Button>
                    <Button
                      id="board_info"
                      variant="outlined"
                      color="secondary"
                      onClick={this._board_button}>게시물 정보</Button>
                    {button_form()}
                    {clothes_form()}
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


export default UserPage;