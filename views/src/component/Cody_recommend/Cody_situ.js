import React, {Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Cody_situ_table from './Cody_situ_table';
import axios from 'axios';
import { Button } from '@material-ui/core';


class Cody_situ extends Component{

  state = { // 변동되는 상태값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
    user : "",
    select : "",
    rows : []
}




componentDidMount() {
    this.setState({
        user : this.props.user
    });

}
_change = (e) =>{
    this.setState({
        select : e.target.value
    })
}

_change_form = async () =>{
    let select =  this.state.select

    let send_param = {
        user : this.state.user,
        select : select
    }

    const res = await axios.post("/recommend/situ", send_param);
    if(res.data.message == false){
        alert("오류");
    }else{
        this.setState({
            rows : res.data.rows
        });
    }

}

  render(){


    let rows_table = this.state.rows;


    return(
        <React.Fragment>
              <Grid Container>
                <Grid xs={12} xm={12} style={{ textAlign:"right" }}>
                    <Select
                        id="select"
                        value={this.state.value}
                        onChange={this._change}
                        style ={{ marginTop : 10, marginBottom : 30, border : "1px solid blue" }}
                        >
                        <MenuItem value={1}>외출 </MenuItem>
                        <MenuItem value={2}>파티 </MenuItem>
                        <MenuItem value={3}>학교 </MenuItem>
                    </Select>
                    <Button
                        id="temp"
                        onClick={this._change_form}
                        >전환</Button>
                    
                </Grid>
                  <Grid item xs={12} xm={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left">의상</TableCell>
                            <TableCell align="right">미리보기</TableCell>
                            <TableCell align="right">상황</TableCell>
                            <TableCell align="right">상의/하의 명칭</TableCell>
                            </TableRow>
                        </TableHead>
                            {rows_table.map(c => {
                                return(
                                    <Cody_situ_table key={c.my_cody_number} t_name={c.top_name} t_image={c.top_image} b_name={c.bottom_name} b_image={c.bottom_image} c_number={c.comment_number} />
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


export default Cody_situ;