import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import LoginedMain from '../Main_home/LoginedMain';
import Footer from '../Main_home/Footer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Message from './Message_table';
const headers = { withCredentials: true };


class Message_show extends Component{

    state={
        select: "",
        message : []
    }


componentDidMount() {
    fetch('/mypage/message_info')
    .then(response => response.json())
    .then(data => this.setState({ 
      message: data.rows 
    }));

    


//console.log(this.state.c_count);

}

//state 값 변환헨들러.
handleChange = (e) => {
    this.setState({
        select : e.target.value
    });
};


_message_show = () => {
    //const m_select = this.state.select;
    const send_param = {
        headers:headers,
        //select : m_select,
        user : this.props.user
    };

    //console.log(send_param);
    
    fetch('/mypage/message_info/',{
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
                    },
        body : JSON.stringify(send_param)
    }).then(res => res.json())
    .then(data => {
        if(data.message == true){
            this.setState={
                message : data.rows
            }
        }else if(data.message == false){
            alert("메시지 불러오기 오류!");
            window.location.replace('/');
        }
        //console.log(data.rows);
        //console.log(send_param.id);
        //console.log(this.state.message)
    });
    
    //console.log(this.state.message);

}



  render(){
    //const message_table = [];
    //if(this.state.message){
    //    message_table = this.state.message;
   // }
   //const message_table = this.state.message;

   /*
   <Grid item xs={12} xm={12}>
                <InputLabel id="select_label">분류</InputLabel>
                    <Select
                        labelId="분류"
                        id="select"
                        value={this.state.select}
                        onChange={this.handleChange}
                    >
                    <MenuItem value={0}>일반</MenuItem>
                    <MenuItem value={1}>팔로워</MenuItem>
                    <MenuItem value={2}>거래</MenuItem>
                    <MenuItem value={3}>공지</MenuItem>
                </Select>
                <Button
                      id="message"
                      onClick={this._message_show}>변화</Button>
            </Grid>*/
   const message_table = this.state.message;
    return(
        <React.Fragment>
            

            <Grid item xs={12} xm={12} style={{ marginTop: 20, marginBottom: 50}}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>보낸 유저</TableCell>
                      <TableCell align="right">내용</TableCell>
                      <TableCell align="right">분류</TableCell>
                      <TableCell align="right">작성일</TableCell>
                    </TableRow>
                  </TableHead>
                
                  {message_table.map(c => {
                    return(
                      <Message key={c.m_number} user={this.props.user} number={c.m_number} text={c.m_text} send={c.send_user} date={c.m_create} division={c.m_division} />
                    );
                  })}
                  </Table>
              </TableContainer>
            </Grid>


        </React.Fragment>
        

    );
  }

}


export default Message_show;