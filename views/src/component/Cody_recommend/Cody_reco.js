import React, {Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { OBJModel, Tick } from 'react-3d-viewer';
import ReactThreeFbxViewer from 'react-three-fbx-viewer';
import { Button } from '@material-ui/core';



class Cody_reco extends Component{

  state = { // 변동되는 상태값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
    rows1 : [],
    rows2 : [],
    rows3 : [],
    rows4 : [],
    score1 : "",
    score2 : "",
    z : 6.3
}


componentDidMount() {

    fetch('/recommend/')
      .then(response => response.json())
      .then(data => this.setState({ 
        rows1 : data.rows1[0],
        rows2 : data.rows2[0],
        rows3 : data.rows3[0],
        rows4 : data.rows4[0],
        score1: data.temp,
        score2 : data.temp2
      }));

      this.timerID = setInterval( () => this.tick(), 1000 );



}
tick() { this.setState({ z: this.state.z+0.5 }); }

componentWillUnmount() { clearInterval(this.timerID); }



onLoad(e) {
  console.log(e);
}

onError(e) {
  console.log(e);
}




  render(){

    const recommend_table = this.state.recommend;
    //console.log(recommend_table);
    //console.log(this.state.reco_user);


    console.log(this.state.rows1.c_image);

    let src = "/clothes/" + this.state.rows1.c_image;
    let src2 = "/clothes/" + this.state.rows2.c_image;

    let src3 = "/clothes/" + this.state.rows3.c_image;
    let src4 = "/clothes/" + this.state.rows4.c_image;

    //let fbxUrl = require('./test/test.fbx');

    let cameraPosition = {
      x:-100,
      y:-10,
      z:130
    }

    /*
<ReactThreeFbxViewer 
                        cameraPosition={cameraPosition} 
                        url={'./test/test.fbx'} 
                        onLoading={this.onLoad} 
                        onError={this.onError}/>

    */

  


    return(
        <React.Fragment>
              <Grid Container>
                  <Grid item xs={12} xm={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left">의상</TableCell>
                            <TableCell align="right">미리보기</TableCell>
                            <TableCell align="right">상의/하의 명칭</TableCell>
                            <TableCell align="right">추천 점수</TableCell>
                            </TableRow>
                        </TableHead>


                                <TableBody>
                    <TableRow >
                      <TableCell align="letf"> 
                          <img src={src} style={{ width: 100, height: 100}} /> <img src={src2} style={{ width: 100, height: 100}}  /> 
                      </TableCell>
                      <TableCell align="left" style={{ width: 100, height: 100}}>  
                 
                        
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
                      <TableCell align="right"> {this.state.rows1.c_name} / {this.state.rows2.c_name}</TableCell>
                      <TableCell align="right"> {this.state.score1} </TableCell>


                    </TableRow>
                    <TableRow >
                    <TableCell align="letf"> 
                        <img src={src3} style={{ width: 100, height: 100}} /> <img src={src4} style={{ width: 100, height: 100}}  /> 
                    </TableCell>
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
                    <TableCell align="right"> {this.state.rows3.c_name} / {this.state.rows4.c_name}</TableCell>
                    <TableCell align="right"> {this.state.score2} </TableCell>


                    </TableRow>
                </TableBody>

                      

                                
                        
                    </Table>
              </TableContainer>




                  </Grid>
   

              </Grid>


        </React.Fragment>
        

    );
  }

}


export default Cody_reco;