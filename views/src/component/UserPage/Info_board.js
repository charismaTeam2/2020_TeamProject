import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Board_table from './Board_table';


class Info_board extends Component{
    state = {
        board : []
    };


componentDidMount() {
    this.setState({
        board : this.props.board
    });




}



  render(){
      //console.log(this.state.board);

      const board_table = this.state.board;


    return(
        <React.Fragment>
            <Grid xs={12} xm={12}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">제목</TableCell>
                      <TableCell align="right">조회수</TableCell>
                      <TableCell align="right">추천수</TableCell>
                      <TableCell align="right">작성일</TableCell>
                    </TableRow>
                  </TableHead>
                  {board_table.map(c => {
                    return(
                      <Board_table key={c.board_number} number={c.board_number} title={c.board_name} view={c.board_view} reco={c.board_reco}  date={c.board_create} />
                    );
                  })}
                
       
                  </Table>
              </TableContainer>
                  
            </Grid>
        </React.Fragment>
        

    );
  }

}


export default Info_board;