import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import Recommend_table from './Recommend_table';
import LoginedMain from '../Main_home/LoginedMain';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Footer from '../Main_home/Footer';


class Recommend_cody extends Component{

  state = { // 변동되는 상태값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
    recommend : []
}




componentDidMount() {

    fetch('/cody/recommend')
      .then(response => response.json())
      .then(data => this.setState({ 
        recommend : data.recommend
      }));


}



  render(){

    const recommend_table = this.state.recommend;
    //console.log(recommend_table);
    //console.log(this.state.reco_user);




    return(
        <React.Fragment>
              <Grid Container>
                  <Grid item xs={12} xm={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left">추천id</TableCell>
                            <TableCell align="right">상황</TableCell>
                            <TableCell align="right">상의 이미지</TableCell>
                            <TableCell align="right">하의 이미지</TableCell>
                            <TableCell align="right">상/하의 명칭</TableCell>
                            <TableCell align="right">버튼</TableCell>
                            </TableRow>
                        </TableHead>

                        {recommend_table.map(c => {
                            return(
                            <Recommend_table 
                                key={c.reco_cody_number}
                                select={c.comment_number} 
                                reco_user={c.reco_user_id} 
                                t_number={c.top_number} 
                                t_name={c.top_name}
                                t_image={c.top_image}
                                b_number={c.bottom_number}
                                b_name={c.bottom_name}
                                b_image={c.bottom_image}
                                number={c.reco_cody_number}
                            />
                            );
                        })}

                                
                        
                    </Table>
              </TableContainer>




                  </Grid>
   

              </Grid>


        </React.Fragment>
        

    );
  }

}


export default Recommend_cody;