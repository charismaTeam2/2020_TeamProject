import React, { Component } from 'react';
import { Container, FormGroup, FormControlLabel, FormControl, Button, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../Main_home/Header';
import Footer from '../Main_home/Footer';
const headers = { withCredentials: true };

class Sign_in extends Component{

    state = {
        id:"",
        password:"",
        password_confirm:"",
        phone:"",
        name:"",
        email:"",
        address:"",
        check:""

       
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    _sign_in = () =>{
        const sign_id = this.state.id;
        const sign_pw = this.state.password;
        const sign_phone = this.state.phone;
        const sign_name = this.state.name;
        const sign_email = this.state.email;
        const sign_address = this.state.address;


        if(sign_id === "" || sign_id === undefined){
            alert("아이디를 입력해 주세요.");
            //this.sign_id.focus();
            return;
        }else if(sign_pw === "" || sign_pw === undefined){
            alert("비밀번호를 입력해 주세요.");
            this.sign_pw.focus();
            return;
        }else if(sign_phone === "" || sign_phone === undefined){
            alert("폰 번호를 입력해 주세요.");
            this.sign_phone.focus();
            return;
        }else if(sign_name === "" || sign_name === undefined){
            alert("이름을 입력해 주세요.");
            this.sign_name.focus();
            return;
        }else if(sign_email === "" || sign_email === undefined){
            alert("이메일을 입력해 주세요.");
            this.sign_email.focus();
            return;
        }else if(sign_address === "" || sign_address === undefined){
            alert("주소를 다시 입력해 주세요.");
            this.sign_address.focus();
            return;
        }

        const send_param = {
            headers:headers,
            id : sign_id,
            password : sign_pw,
            phone : sign_phone,
            name : sign_name,
            email : sign_email,
            address : sign_address
        };
        console.log(send_param);

        fetch('/user/sign',{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(send_param)
        }).then(res => res.json())
        .then(data => {
            if(data.message == true){
                alert("회원가입이 완료되었습니다.");
                window.location.replace('/');
            }else if(data.message == false){
                alert("회원가입이 실패하였습니다.");
                window.location.replace('/');
            }
            console.log(data);
            console.log(send_param.id);
        });
        

    }

    _pw_check = () =>{
        const { password, password_confirm } = this.state;
        return password == password_confirm       
    }

    renderFeedbackMessage() {
        const { password_confirm } = this.state;
      
        if (password_confirm) {
          if (!this._pw_check()) {
            return (
              <div className="invalid-feedback">패스워드 불일치</div>
            );
          }else{
              return(
                <div className="invalid-feedback">패스워드가 일치</div>
              )
          }
        }
      }



    render(){
        return(
            <React.Fragment>
                <Container maxWidth="lg">
                    <Header title="為せば成る" />
                        <main>
                           <Grid 
                            container 
                            spacing={3}
                            style={{ marginTop:20 }}>
                            <Grid item xs={1} />

                            <Grid item xs={6}>

                                <TextField
                                    id="id"
                                    label="아이디를 입력해주세요."
                                    style={{ margin: 8 }}
                                    placeholder="ID"
                                    fullWidth
                                    value={this.state.id}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    ref={ref => (this.sign_id = ref)}
                                    variant="outlined"
                                    />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                        <Grid item xs={1} />
                            <Grid item xs={6}>
                                <TextField
                                    id="password"
                                    label="패스워드를 입력해주세요."
                                    style={{ margin: 8 }}
                                    placeholder="Password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    autoComplete="current-password"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={3}>
                              {this.renderFeedbackMessage() }

                            </Grid>

                    
                        </Grid><Grid container spacing={3}>
                        <Grid item xs={1} />
                            <Grid item xs={6}>
                                <TextField
                                    id="password_confirm"
                                    label="패스워드 중복확인"
                                    style={{ margin: 8 }}
                                    placeholder="Password_confirm"
                                    type="password"
                                    autoComplete="current-password"
                                    value={this.state.password_confirm}
                                    onChange={this.handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                        <Grid item xs={1} />
                            <Grid item xs={6}>
                                <TextField
                                    id="phone"
                                    label="연락처를 입력해주세요."
                                    style={{ margin: 8 }}
                                    placeholder="Phone"
                                    fullWidth
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                        <Grid item xs={1} />
                            <Grid item xs={6}>
                                <TextField
                                    id="name"
                                    label="이름을 입력해주세요."
                                    style={{ margin: 8 }}
                                    placeholder="Name"
                                    fullWidth
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                        <Grid item xs={1} />
                            <Grid item xs={6}>
                                <TextField
                                    id="email"
                                    label="이메일을 입력해주세요."
                                    style={{ margin: 8 }}
                                    placeholder="Email"
                                    type="email"
                                    fullWidth
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                        <Grid item xs={1} />
                            <Grid item xs={6}>
                                <TextField
                                    id="address"
                                    label="주소를 입력해주세요."
                                    style={{ margin: 8 }}
                                    placeholder="Address"
                                    fullWidth
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                        <Grid item xs={4} />
                            <Grid container spacing={3}>
                                <Grid item xs={3} />
                                <Grid item xs={6}>
                                <Button 
                                id="button_1"
                                variant="contained"
                                style={{ margin : 8 }}
                                fullWidth
                                color="primary"
                                onClick={this._sign_in}
                                >회원가입</Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        </main>
                    <Footer description="為せば成る" />
                </Container>



            </React.Fragment>


        );
    }


}

export default Sign_in;