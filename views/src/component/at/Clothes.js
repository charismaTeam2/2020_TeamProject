import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import Footer from '../Main_home/Footer';
import Clothes_center from './Clothes_center';
import axios from 'axios';
const headers = { withCredentials: true };

class Clothes extends Component{

  state = { // 변동되는 상태값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
    user: "test",
    clothes : [],
    check: "",
    image: []
}


componentDidMount() {
  fetch('/clothes/test')
        .then(response => response.json())
        .then(data => this.setState({ 
          clothes : data.rows 
    }));

  
  }

  onChange = (e) => {
    //console.log(e.target.files);
    this.setState({
      image : e.target.files[0]
    });
  }

  _save_button = () =>{
    this.setState({
      check : 1
    });
  }

  _clothes_save = async () =>{

    const formData = new FormData();
    formData.append('file', this.state.image);
    formData.append('user', this.state.user);
    
    const res = await axios.post("/clothes/savee", formData);
    console.log(res);
    if(res.data.message == true){
      alert("옷 등록이 완료되었습니다.");
    }else{
      alert("옷 등록이 실패하였습니다.");
    }

  }

  // 옷 저장. 
  // 시나리오 :  옷과 세션을 우선적으로 등록. 이후, 옷의 위치와 번호를 가져와서 다시 PythonShell로 분석해서 데이터 저장.
  /*
  _clothes_save = () =>{
    //let user = this.state.user

    alert("테스트");
    /*
    const send_param = {
      headers:headers
  };
  fetch('/clothes/save',{
      method: "POST",
      headers: {
          'Content-Type' : 'application/json'
                  },
      body : JSON.stringify(send_param)
  }).then(res => res.json())
  .then(data => {
      if(data.message == true){
          window.location.reload();
      }else if(data.message == false){
          alert("에러");
          window.location.replace('/');
      }
  });
  }
  */

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

    let temp_check = this.state.check
    let getButton = () =>{
      if(temp_check == 1){
        return(
          <Grid container style={{ paddingBottom:20 }}>
            <Grid item xs={12} xm={12}>
              <input 
                type='file' 
                name="files"
                onChange={this.onChange}
                accept='image/jpg, image/png, image/jpeg, image/gif'
              />
              <Button 
              id="saving"
              variant="outlined"
              color="secondary"
              onClick={this._clothes_save}>의류 저장</Button>
            </Grid>
          </Grid>
        );
      }
    }

    //console.log(this.state.clothes);
    const clothes = this.state.clothes;

    
    const clothes_table = () =>{
        if(clothes){
          return(
            <Grid container spacing={1}>
              {clothes.map(c =>{
                let show
                if(c.c_button === 1){
                  show = true;
                }else if(c.c_button === 2){
                  show = false;
                }
                return(
                  <Grid item xs={12} sm={3}>
                      <Clothes_center key={c.c_number} number={c.c_number} name={c.c_name} division={c.c_division} image={c.c_image} color={c.c_color} stat={c.c_stat} show={show} />
                  </Grid>
                );
              })}
            </Grid>
          );
        }else{
            return(
                <Grid container spacing={1}>
                    저장하신 옷이 없습니다.
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
            <label style={{ fontSize:20, fontWeight:"bolder" }}>{this.state.user}님의 옷장 페이지입니다.</label><br />
            <Button
              id='button'
              variant="outlined"
              color="primary"
              style={{ marginTop:10, marginBottom:10 }}
              onClick={this._save_button}
            >옷 등록 </Button>
            {getButton()}
            {clothes_table()}

              
            </main>
          </Container>
          <Footer description="為せば成る" />
        </React.Fragment>
        

    );
  }

}


export default Clothes;