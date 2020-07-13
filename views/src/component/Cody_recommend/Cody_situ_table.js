import React, {Component } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { OBJModel } from 'react-3d-viewer'
const headers = { withCredentials: true };


class Cody_situ_table extends Component{
  state={
    z : 6.3
  }
    
componentDidMount() {

  this.timerID = setInterval( () => this.tick(), 1000 );
}

tick() { this.setState({ z: this.state.z+0.5 }); }

componentWillUnmount() { clearInterval(this.timerID); }

  render(){
    //const board = this.props;
    //let temp_date = board.date + "";
    //let date = temp_date.substr(0,10);

    const cody = this.props;
    let t_src = '/clothes/' + cody.t_image;
    let b_src = '/clothes/' + cody.b_image;

    let select = ""
    if(cody.c_number === 1){
      select = "외출"
    }else if(cody.c_number === 2){
      select = "파티"
    }else if(cody.c_number === 3){
      select = "등교"
    }


    return(
        <TableBody>
            <TableRow >
              <TableCell align="letf"> <img src={t_src} style={{ width:100, height:100 }} /> <img src={b_src} style={{ width:100, height:100 }} /> </TableCell>
              <TableCell align="right"> 
                      <OBJModel src="./test/a.obj" 
                                texPath="./test/"
                                mtl="./test/a.mtl"
                                position={{x:0,y:-30,z:0}}
                                rotation={{x:5,y:6.3,z:this.state.z}}
                                widht="250"
                                height="250"
                                enableZoom={false}
                                /> 
                      <OBJModel src="./test/b.obj" 
                                texPath="./test/"
                                mtl="./test/b.mtl"
                                widht="250"
                                height="250"
                                position={{x:0,y:0,z:0}}
                                rotation={{x:5,y:6.3,z:this.state.z}}
                                enableZoom={false}/> 
              </TableCell>
              <TableCell align="right"> {select}</TableCell>
              <TableCell align="right"> {cody.t_name} / {cody.b_name}</TableCell>
            </TableRow>
        </TableBody>
    
    );
  }

}

export default Cody_situ_table;