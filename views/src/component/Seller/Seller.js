import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import LoginedMain from '../Main_home/LoginedMain';
import Info_deal from './Info_deal';
import Footer from '../Main_home/Footer';
import SellerHeader from '../Main_home/SellerHeader';


class Seller extends Component{

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
  _seller_button = () =>{
    this.setState({
      check : 0
    });
  }
  _product_button = () =>{
    this.setState({
      check : 1
    });
  }
  _deal_button = () =>{
    this.setState({
      check : 2
    });
  }




  render(){
    let user_check = this.state.user
    let getForm = () =>{
      if(user_check){
        return(
          <SellerHeader title="為せば成る" user={user_check} />
        );
      }else{
        return(
          <Header title="為せば成る" />
        )
      }
    };

    /*
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
    */

   let board_check = this.state.check
   let info_form = () =>{
     if(board_check === 0){

     }else if(board_check === 1){

     }else if(board_check === 2){
       return(
         <Info_deal  />
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
                <label style={{ fontSize:20, fontWeight:"bolder" }}>{this.state.user}님의 판매자 전용 페이지입니다.</label>
                </Grid>
              </Grid>
              <Grid Container>
                <Grid xs={12} xm={12}>
                  <Grid item xs={12} xm={12} >
                    <Button
                      id="user_info"
                      variant="outlined"
                      color="secondary"
                      onClick={this._seller_button}>판매자 정보</Button>
                    <Button
                      id="board_info"
                      variant="outlined"
                      color="secondary"
                      onClick={this._product_button}>상품 정보</Button>
                    <Button
                      id="message_info"
                      variant="outlined"
                      color="secondary"
                      onClick={this._deal_button}>거래 정보</Button>
                  </Grid>
                </Grid>

                  



              </Grid>
              {info_form()}





                 
            </main>
          </Container>
          <Footer description="為せば成る" />
        </React.Fragment>
        

    );
  }

}


export default Seller;