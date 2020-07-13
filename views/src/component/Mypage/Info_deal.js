import React, {Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Deal_table from './Deal_table';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Info_deal extends Component{
    state = {
        deal : []
    }



componentDidMount() {
    fetch('/mypage/deal_info')
    .then(response => response.json())
    .then(data => this.setState({ 
      deal : data.deal
    }));



}



  render(){




    return(
        <React.Fragment>
            <Grid container>
            <Grid item xs={12} xm={12} style={{ marginTop: 20}}>

                상세페이지


            </Grid>

            </Grid>
            
            <Grid container>
                <Grid item xs={12} xm={12} style={{ marginTop: 20, marginBottom: 50}}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>거래글</TableCell>
                            <TableCell align="right">이미지</TableCell>
                            <TableCell align="right">거래수량</TableCell>
                            <TableCell align="right">가격</TableCell>
                            <TableCell align="right">거래상황</TableCell>
                            <TableCell align="right">거래일</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    {this.state.deal.map(c => {
                        return(
                        <Deal_table key={c.deal_number} number={c.deal_number} user={c.user_id} p_number={c.product_number} count={c.deal_count} price={c.deal_all_price} stat={c.deal_stat} product={c.product_number} date={c.deal_accept} />
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


export default Info_deal;