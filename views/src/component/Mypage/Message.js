import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {TextField} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import LoginedMain from '../Main_home/LoginedMain';
import Footer from '../Main_home/Footer';
const headers = { withCredentials: true };



class Message extends Component{
    
    state ={
        id : "",
        text : ""
    }

        //state 값 변환헨들러.
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    componentDidMount() {

 
      
    }

    //메시지 버튼 클릭시
    _submit = () =>{
        const rece = this.state.id;
        const text = this.state.text;
        const send = this.props.user;

        const send_param = {
            headers:headers,
            rece : rece,
            text : text,
            send : send,
            division : 0   // 일반 메세지
        };
        //console.log(send_param);

        
        fetch('/mypage/message',{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
                        },
            body : JSON.stringify(send_param)
        }).then(res => res.json())
        .then(data => {
            if(data.message == true){
                alert("수신 완료");
                window.location.replace('/');
            }else if(data.message == false){
                alert("수신 실패");
                window.location.replace('/');
            }
            //console.log(data);
            //console.log(send_param.id);
        });
        

    };
    

  render(){

    return(
        <React.Fragment>
            <Grid item xs={12} xm={12} style={{ marginTop: 20}}>
                <TextField
                    id="id"
                    label="받는 유저"
                    style={{ margin: 8 }}
                    placeholder="받는 유저"
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
            <Grid item xs={12} xm={12}>
                <TextField
                    id="text"
                    label="글을 입력하세요."
                    style={{ margin: 8 }}
                    placeholder="글을 입력하세요"
                    fullWidth
                    margin="normal"
                    value={this.state.text}
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} xm={12}>
                <Button 
                    id="button_1"
                    variant="contained"
                    style={{ margin : 8 }}
                    fullWidth
                    color="primary"
                    onClick={this._submit}
                >메시지 보내기</Button>
            </Grid>



        </React.Fragment>
        

    );
  }

}


export default Message;