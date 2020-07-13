import React, {Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import Footer from '../Main_home/Footer';
import Card from '../Main_home/Card';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


class Board extends Component{

  state = { // 변동되는 상태값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
    user: "",
    board : ""
}

_write = () =>{
  window.location.replace('/board_write');
}


componentDidMount() {

  fetch('/board/')
      .then(response => response.json())
      .then(data => this.setState({ 
        board: data.board,
        user: data.session.user 
      }));

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
    // <img src={require('./1.jpg')} />

    // 1. 메인 컴포넌트는 팔로잉한 유저의 게시글(최신 순별 총 10개이내), 추천 게시글, 인기 게시글을 위주로 뜨게 한다.
    // 2. 오늘의 코디 항목에선 최신글 위주의 모든 글들이 보일 수 있게.
    // 3. 메뉴 명칭은 향후 고려사항.
    // 4. 페이지 명을 카리스마 점원으로 바꿀 것. 
    // 5. 사용자 페이지 설계. -> 팔로잉한 유저가 팔로워 유저의 옷의 코디가 가능.
    // 6. 모든 글은 db의 show 속성에 따라 보여짐. 특히, 팔로잉한 유저에게만 보이는 글들은 전체 글에 보이지 않음.

    return(

        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            
           {getForm()}

            <main>
              일반 게시물 페이지
            <Grid style={{ marginTop : 10,  marginBottom: 10}}>
              <Button color="primary" variant="contained" onClick={this._write} >글쓰기</Button>
            </Grid>
            <Grid container spacing={3}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              

              
            </Grid>

              
            </main>
          </Container>
          <Footer description="為せば成る" />
        </React.Fragment>
        

    );
  }

}


export default Board;