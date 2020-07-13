import React, { Component } from 'react';
import { Container, FormGroup, FormControlLabel, FormControl, Button, Grid, Paper, TextField } from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { DropzoneDialog } from 'material-ui-dropzone'
import axios from 'axios';

//import Header from '../Main_home/Header';
import Footer from '../Main_home/Footer';
import LoginedHeader from '../Main_home/LoginedHeader';
const headers = { withCredentials: true };


class BoardWrite extends Component{
    constructor(props) {
        super(props);
        this.state = {
          file : "",
          preview : "",
          user: "",
        id : "",
        text : "",
        check : ""
        }
      }

  
/*
    state = { // 변동되는 상태값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
        user: "",
        id : "",
        text : "",
        check : ""
    }
    */

    //state 값 변환헨들러.
    
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    check_handel = () => {
        this.setState({
            check : true
        });
    };

    handleFileOnChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file : file,
            preview : reader.result
          })
        }
        reader.readAsDataURL(file);
      }

      handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.id);
        formData.append('text', this.state.text);
        formData.append('user', this.state.user);
        formData.append('file', this.state.file);
        //formData.append('name', event.target.name.value);
        formData.append('check', this.state.check);
        //console.log(formData);
    
        console.log(formData);
        this.register(formData)

      }

      register = (regiInfo) => {
        fetch('/board/write', {
          method:'post',
          body: regiInfo
        })
        .then(res => res.json())
        .then(data => alert(data.message))
      }
      /*
      handleSubmit = () => {
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('title', this.state.id);
        formData.append('text', this.state.text);
        formData.append('user', this.state.user);
        formData.append('check', this.state.check);

        //console.log(formData);
        
        const res = axios.post('/board/write/', formData);
        if(res.data.message == false){
            alert("실패");
        }else{
            alert("성공");
        }

        /*
        fetch('/board/write/',{
            method: "POST",
            body : formData
        }).then(res => res.json())
        .then(data => {
            if(data.message == true){
                alert("게시글 작업 완료");
                window.location.replace('/');
            }else if(data.message == false){
                alert("실패");
                window.location.replace('/');
            }
            //console.log(data);
            //console.log(send_param.id);
        });
        
        //window.location.replace('/');

        /*
        if(res.data.message == false){
            return(
                alert('실패')
            );
        }else if(res.data.message){
            return(
                alert('성공')
            );
        }
        
        
    }
    */
    

    componentDidMount() {
        
         // Simple GET request using fetch
         fetch('/board/write/')
         .then(response => response.json())
         .then(data => this.setState({ 
           user: data.session.user
         }))   
    }



    render(){
        let profile_preview = null;
        if(this.state.file !== ''){
          profile_preview = <img className='profile_preview' src={this.state.preview} style={{ width:100, height:100 }}  ></img>
        }

       

        return(
            <React.Fragment>
              <Container maxWidth="lg">
                  <LoginedHeader title="為せば成る" user={this.state.user} />
                  <main>
                      <form className='write' onSubmit={this.handleSubmit} encType='multipart/form-data' >
                        <Grid 
                            container 
                            spacing={3}
                            style={{ marginTop:20 }}>

                            <Grid item xs={2} />
                            <Grid item xs={8}>
                                <TextField
                                    id="id"
                                    label="글 제목"
                                    style={{ margin: 8 }}
                                    placeholder="글 제목"
                                    fullWidth
                                    margin="normal"
                                    value={this.state.id}
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    />
                                    <Grid item xs={2} />

                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={2} />
                            <Grid item xs={8}>
                                <TextField
                                    id="text"
                                    label="내용"
                                    style={{ margin: 8 }}
                                    placeholder="내용을 입력하세요."
                                    fullWidth
                                    margin="normal"
                                    value={this.state.text}
                                    onChange={this.handleChange}
                                    multiline
                                    rows={10}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    />
                                    <Grid item xs={2} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={2} />
                            <Grid item xs={6}>
                                <label>이미지 저장</label>
                                <Button onClick={this._add_image} > 버튼</Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={2} />
                            <Grid item xs={6}>
                                <input 
                                    type='file' 
                                    name='file'
                                    file={this.state.file}
                                    onChange={this.handleFileOnChange}
                                    accept='image/jpg, image/png, image/jpeg, image/gif'
                                      />

                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={2} />
                            <Grid item xs={6}>
                                {profile_preview}
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={2} />
                            <Grid item xs={6}>
                                <label>팔로워에게만 공개</label>
                                <Checkbox
                                    id="check"
                                    value={this.state.check}
                                    onChange={this.check_handel}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
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
                            type="submit"
                            color="primary"
                            >글쓰기
                            </Button>
                            </Grid>
                        </Grid>

                        </form>
           
                  </main>
                  <Footer description="為せば成る" />
              </Container>

          </React.Fragment>


        );
    }
};

export default BoardWrite;