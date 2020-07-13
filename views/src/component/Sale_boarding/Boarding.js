import React, {Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { TextField, Button } from '@material-ui/core';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Footer from '../Main_home/Footer';
import B_main from './Boarding_center';
import B_top from './Boarding_top';
import B_bottom from './Boarding_bottom';
import { Grid } from '@material-ui/core';
const headers = { withCredentials: true };



const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));



class Boarding extends Component{

  state ={
    user : "",
    board:[],
    image:[],
    product:[]
  }



  

componentDidMount() {
  let a = this.props.location.pathname;
  let b = a.substr(15,15);
  //let b = this.props.query;

  //console.log(b);
  //console.log(b);

  let url = '/sale/boarding/'+b;
  //console.log(b);
  //console.log(url);

  
  fetch(url)
  .then(response => response.json())
  .then(data => this.setState({ 
    board: data.board[0],
    user: data.session.user,
    image : data.image[0],
    product : data.product[0]
  }));

  //console.log(this.state.board);
  //console.log(this.state.image);
  //console.log(this.state.product);
  


}


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

   


    return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            
           {getForm()}

            <main>

            <Grid container style={{ paddingTop:80 }}>
                <Grid xs={12} sm={6}>
                  <B_top key={this.state.board.s_board_number} image={this.state.board.s_board_thum} /> 
                </Grid>
                <Grid xs={12} sm={6}>
                  <B_main key={this.state.board.s_board_number} seller={this.state.board.user_id} title={this.state.board.s_board_name} create={this.state.board.s_board_create} product={this.state.product} user={this.state.user}/>

                </Grid>

              </Grid>
              <Grid container style={{ paddingTop:80 }}>
                <Grid xs={12} sm={12}>
                  <B_bottom key={this.state.board.s_board_number} image={this.state.image} product={this.state.product} /> 
                </Grid>


              </Grid>


              
            </main>
          </Container>
          <Footer description="為せば成る" />
        </React.Fragment>
        

    );
  }

}


export default Boarding;

 /*
    <Grid container style={{ paddingTop:80 }}>
                <Grid xs={12} sm={6}>
                  <B_top key={this.state.board_board_number} image={this.state.board.board_thum} /> 
                </Grid>
                <Grid xs={12} sm={6}>
                  <B_main key={this.state.board.board_number} user={this.state.board.user_id} text={this.state.board.board_text} title={this.state.board.board_name} view={this.state.board.board_view} create={this.state.board.board_create} />

                </Grid>

              </Grid>
              <Grid container>
                <Grid xs={12} sm={10}>
                    <TextField
                      id="text"
                      label="댓글"
                      placeholder="댓글을 입력하세요."
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
                <Grid xs={12} sm={2}>
                  <Button 
                    id="button_1"
                    variant="contained"
                    fullWidth
                    style={{ height:"80%", marginTop:10 }}
                    color="primary"
                    onClick={this._comment_write}
                  >입력</Button>
                </Grid>


              </Grid>
              <Grid container>
              <Grid xs={12} sm={12}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>유저</TableCell>
                      <TableCell align="right">댓글</TableCell>
                      <TableCell align="right">작성일</TableCell>
                    </TableRow>
                  </TableHead>
                
                  {comment_table.map(c => {
                    return(
                      <Comment key={c.comment_number} text={c.comment_text} user={c.user_id} date={c.comment_date} />
                    );
                  })}
                  </Table>
              </TableContainer>

                </Grid>


              </Grid>


    */