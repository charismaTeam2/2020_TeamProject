import React, {Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import Footer from '../Main_home/Footer';
import Card from './Card';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));



class Blog extends Component{

  state = { // 변동되는 상태값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
    user: "",
    board : []
}

_write = () =>{
  window.location.replace('/board_write');
}


componentDidMount() {

  fetch('/mypage')
  .then(response => response.json())
  .then(data => this.setState({ 
    user: data.session.user 
  }));
  
  fetch('http://192.168.17.3/sale/sale_board/sale_board.php')
    .then(response => response.json())
    .then(data => {
      console.log(data.board);
      this.setState({
        board : data.board
      });
      
    });

}



  render(){
    let user_check = this.state.user
    let getForm = () =>{
      if(user_check){
        return(
          <LoginedHeader title="おすすめ服" user={user_check} />
        );
      }else{
        return(
          <Header title="おすすめ服" />
        )
      }
    };


    const td = this.state.board;
    
    const table = () =>{
      if(td){
        return(
          <Grid container spacing={1}>
            {td.map(c =>{
              let src="/sale/boarding/"+ c.s_board_number;
              return(
                <Grid item xs={12} sm={3}>
                    <Card key={c.s_board_number} src={src} thum={c.s_board_thum} number={c.s_board_number} name={c.s_board_name} text={c.s_board_text} user={c.user_id} />
                </Grid>
              );
            })}
          </Grid>
        );
      }
    }



    return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            
            {getForm()}

            <main>

            {table()}

            

              
            </main>
          </Container>
          <Footer description="為せば成る" />
        </React.Fragment>
        

    );
  }

}


export default Blog;