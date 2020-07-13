import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import LoginedMain from '../Main_home/LoginedMain';
import Footer from '../Main_home/Footer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

class Board_table extends Component{
    
componentDidMount() {

}
  render(){
    const board = this.props;
    let temp_date = board.date + "";
    let date = temp_date.substr(0,10);

    const src = "/board/boarding/" + board.number;

    return(
        <TableBody>
            <TableRow key={board.number}>
              <TableCell align="left"><Link to={src} color="inherit" style={{color:"inherit"}}>{board.title}</Link></TableCell>
              <TableCell align="right">{board.view}</TableCell>
              <TableCell align="right">{board.reco}</TableCell>
              <TableCell align="right">{date}</TableCell>
            </TableRow>
        </TableBody>
    
    );
  }

}

export default Board_table;