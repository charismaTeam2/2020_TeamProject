import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const headers = { withCredentials: true };


// 사용자 페이지는 '자신의 페이지'와 '타사용자 페이지'로 구분해서 이동.
// 회원 정보(아이디, 언제 가입했고, 현재 팔로워 수, 패션 점수)
// 메시지(메시지 구분.)
// 자기가 쓴 게시물 확인. 수정,삭제.
// 


class Clothes_select extends Component{
    state = {
        user : "",
        top : "",
        bottom : "",
        all : "",
        select : ""
    }


componentDidMount() {
    this.setState({
        user : this.props.user
    });
    //console.log(this.state.user);


  
    
}

handleChange = (e) => {
    this.setState({
        [e.target.id] : e.target.value
    });
};
_change = (e) =>{
    this.setState({
        select : e.target.value
    })
}


 _submit = () =>{
    const top = this.state.top;
    const bottom = this.state.bottom;
    const select = this.state.select;
    //let all = this.state.all;

    if(top == ""){
        alert("상의는 무조건 존재해야 합니다.");
        window.location.reload();
    }else if(bottom == ""){
        alert("하의는 무조건 존재해야 합니다.");
        window.location.reload();
    }

    const send_param = {
        headers:headers,
        top : top,
        bottom : bottom,
        select : select,
        id : this.state.user
    };
    console.log(send_param);


    fetch('/cody/submit/',{
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
                    },
        body : JSON.stringify(send_param)
    }).then(res => res.json())
    .then(data => {
        if(data.message == true){
            alert("완료");
            window.location.reload();
        }else if(data.message == false){
            alert("실패");
            window.location.replace('/');
        }
        //console.log(data);
       // console.log(send_param.id);
    });


};




  render(){

   
    return(
        <Grid container>
            <Grid xs={12} xm={12}>
                <TextField
                    id="top"
                    label="상의"
                    placeholder="의상 번호"
                    fullWidth
                    margin="normal"
                    value={this.state.top}
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                </Grid>
            <Grid xs={12} xm={12}>
                <TextField
                    id="bottom"
                    label="하의"
                    placeholder="의상 번호"
                    fullWidth
                    margin="normal"
                    value={this.state.bottom}
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </Grid>
            <Grid xs={12} xm={12}>
            <Select
                id="select"
                value={this.state.value}
                onChange={this._change}
                fullWidth
                style ={{ marginTop : 10, marginBottom : 30, border : "1px solid red" }}
                >
                <MenuItem value={1}>외출 </MenuItem>
                <MenuItem value={2}>파티 </MenuItem>
                <MenuItem value={3}>학교 </MenuItem>
            </Select>
                
            </Grid>
            <Grid xs={12} xm={12}>
                <Button
                    id="button_1"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={this._submit}
                >제출</Button>
            </Grid>
            




        </Grid>
    
    );
  }

}


export default Clothes_select;