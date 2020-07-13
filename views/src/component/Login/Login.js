import React, { Component } from 'react';
import { Container, Button, Grid, Paper, TextField } from '@material-ui/core';
import Header from '../Main_home/Header';
import Footer from '../Main_home/Footer';
const headers = { withCredentials: true };

class Login extends Component{
    state = { // 변동되는 상태값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
        id: "",
        password: "",
        test:""
    }

    componentDidMount(){

      
    }


    /* fetch 참고.
    callApi = async () =>{ // 비동기 식 fetch의 기본 사용법. 익혀둘 것. 
        const response = await fetch('/login');
        const body = await response.json();
        return body;
    }

    componentDidMount(){ // DidMount() 는 랜더링이 끝나고 난 뒤의 생명주기를 의미한다.
        this.callApi()
        .then(res => this.setState({test : res}))
        .catch(err => console.log(err));

    }
    */

    //state 값 변환헨들러.
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    //로그인 버튼 클릭시
    _login = () =>{
        const id = this.state.id;
        const pw = this.state.password;

        const send_param = {
            headers:headers,
            id : id,
            password : pw   
        };
        console.log(send_param);

        fetch('/user/login/',{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
                        },
            body : JSON.stringify(send_param)
        }).then(res => res.json())
        .then(data => {
            if(data.message == true){
                //alert("로그인 완료");
                if(data.division == 0){
                    window.location.replace('/');
                }else if(data.division == 1){
                    window.location.replace('/seller');
                }else if(data.division == 2){
                    alert("관리자 페이지 이동");
                }
            }else if(data.message == false){
                alert("로그인 실패");
                window.location.replace('/');
            }
            //console.log(data);
            //console.log(send_param.id);
        });

    };

    


    // 회원가입 버튼 클릭시
    // 나중에 판매 플랫폼 작업시엔 컴포넌트 흐름 수정.
    // 현재) 회원가입-> 일반회원가입
    // 수정안) 회원가입-> 일반회원/판매회원 선택 -> 일반회원가입,판매회원가입 
    _sign = () =>{
        window.location.replace('/sign_in');
    };


   
    // server에서 날리는 데이터를 받을 때, this.state.(데이터명).(키명)을 입력.
    // Grid => 다시 어떤 태그르 ㄹ사용.
    render(){ // 어차피 Container 내에서 자동으로 맞춰지기 때문에, main내에 자유롭게 사용.
   
        return(
          <React.Fragment>
              <Container maxWidth="lg">
                  <Header title="為せば成る" />
                  <main>

                        <Grid 
                            container 
                            spacing={3}
                            style={{ marginTop:20 }}>

                            <Grid item xs={3} />
                            <Grid item xs={6}>
                                <TextField
                                    id="id"
                                    label="아이디"
                                    style={{ margin: 8 }}
                                    placeholder="ID"
                                    fullWidth
                                    margin="normal"
                                    value={this.state.id}
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    />

                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={3} />
                            <Grid item xs={6}>
                                <TextField
                                    id="password"
                                    label="비밀번호"
                                    style={{ margin: 8 }}
                                    placeholder="Password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={3} />
                            <Grid item xs={6}>
                            <Button 
                            id="button_1"
                            variant="contained"
                            style={{ margin : 8 }}
                            fullWidth
                            color="primary"
                            onClick={this._login}
                            >로그인</Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={3} />
                            <Grid item xs={6}>
                            <Button 
                            id="button_1"
                            variant="contained"
                            style={{ margin : 8 }}
                            fullWidth
                            color="secondary"
                            onClick={this._sign}
                            >회원가입</Button>
                            </Grid>
                        </Grid>
                    </main>
                  <Footer description="為せば成る" />
              </Container>

          </React.Fragment>

        );
    }
}

export default Login;