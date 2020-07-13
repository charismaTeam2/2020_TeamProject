import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import LoginedMain from '../Main_home/LoginedMain';
import Footer from '../Main_home/Footer';
import Board_table from './Board_table';



// 사용자 페이지는 '자신의 페이지'와 '타사용자 페이지'로 구분해서 이동.
// 회원 정보(아이디, 언제 가입했고, 현재 팔로워 수, 패션 점수)
// 메시지(메시지 구분.)
// 자기가 쓴 게시물 확인. 수정,삭제.
// 


class Info_board extends Component{
    state = {
        board : []
    };



componentDidMount() {
    fetch('/mypage/board_info')
    .then(response => response.json())
    .then(data => this.setState({ 
      board: data.board
    }));

    //console.log(this.state.board);

}



  render(){
      let board_table = [];
      board_table = this.state.board;




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