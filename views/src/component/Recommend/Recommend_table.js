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


class Recommend_table extends Component{
    
componentDidMount() {

}
  render(){
    //const board = this.props;
    //let temp_date = board.date + "";
    //let date = temp_date.substr(0,10);

    const recommend = this.props;
    let t_src = '/clothes/' + recommend.t_image;
    let b_src = '/clothes/' + recommend.b_image;


    return(
        <TableBody>
            <TableRow >
              <TableCell align="letf"> {recommend.reco_user} </TableCell>
              <TableCell align="right"> {recommend.t_name}</TableCell>
              <TableCell align="right"> <img src={t_src} style={{ width:100, height:100 }} /> </TableCell>
              <TableCell align="right"> {recommend.b_name}</TableCell>
              <TableCell align="right"> <img src={b_src} style={{ width:100, height:100 }} /> </TableCell>
              <TableCell align="right"> 
                <Button
                    id="b_1"
                    color="primary"
                >저장 </Button>
                <Button
                    id="b_2"
                    color="secondary"
                >삭제 </Button>
              </TableCell>
            </TableRow>
        </TableBody>
    
    );
  }

}

export default Recommend_table;