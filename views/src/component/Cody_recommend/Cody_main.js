import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import Footer from '../Main_home/Footer';
import Cody_reco from './Cody_reco';
import Cody_situ from './Cody_situ';



class Cody_main extends Component{

  state = { // 변동되는 상태값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
    user: "",
    check: ""
}




componentDidMount() {

  // Simple GET request using fetch
  fetch('/recommend/')
      .then(response => response.json())
      .then(data => this.setState({ 
        user: data.session.user 
      }));

}
_reco_button = () =>{
  this.setState({
      check : 1
  });
};

_cody_button = () =>{
  this.setState({
      check : 2
  });
};

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
      if(board_check == 1){
        return(
          <Cody_reco user={this.state.user} />
        );
      }else if(board_check == 2){
        return(
          <Cody_situ user={this.state.user} />
        );
      }
    }


    return(
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        
       {getForm()}

        <main>
          <Grid Container>
            <Grid item xs={12} xm={12} style={{ paddingBottom:20 }} >
              <label style={{ fontSize:20, fontWeight:"bolder" }}>{this.state.user}님의 코디 추천 페이지입니다.</label>
            </Grid>
          </Grid>
          <Grid Container>
            <Grid xs={12} xm={12}>
              <Grid item xs={12} xm={12} >
                <Button
                  id="reco"
                  variant="outlined"
                  color="primary"
                  onClick={this._reco_button}>맞춤 코디 추천</Button>
                <Button
                  id="cody"
                  variant="outlined"
                  color="secondary"
                  onClick={this._cody_button}>상황 코디 추천</Button>
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


export default Cody_main;