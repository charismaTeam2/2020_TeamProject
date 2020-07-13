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


class My_cody_table extends Component{
    
componentDidMount() {

}
  render(){
    //const board = this.props;
    //let temp_date = board.date + "";
    //let date = temp_date.substr(0,10);

    const cody = this.props;
    let t_src = '/clothes/' + cody.t_image;
    let b_src = '/clothes/' + cody.b_image;

    let select = ""
    if(cody.select === 1){
      select = "외출"
    }else if(cody.select === 2){
      select = "파티"
    }else if(cody.select === 3){
      select = "등교"
    }

    return(
        <TableBody>
            <TableRow >
              <TableCell align="letf"> 정상 </TableCell>
              <TableCell align="right"> {select}</TableCell>
              <TableCell align="right"> <img src={t_src} style={{ width:100, height:100 }} /> </TableCell>
              <TableCell align="right"> <img src={b_src} style={{ width:100, height:100 }} /> </TableCell>
              <TableCell align="right"> {cody.t_name} / {cody.b_name}  </TableCell>
            </TableRow>
        </TableBody>
    
    );
  }

}

export default My_cody_table;