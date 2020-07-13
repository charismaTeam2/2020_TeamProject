import React, {Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Link from 'react-router-dom/Link';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));



class Boarding_center extends Component{

 
componentDidMount() {



}



  render(){
    let temp_date = this.props.create  + "";
    let date = temp_date.substr(0,10);
    //let temp_date = this.props.create;
    //console.log(date);
    //let date = temp_date.substr(0,9);

    const src = `/userpage/${this.props.user}`

    return(
        <React.Fragment>
          <Grid container>
            <Grid item xs={6}><h2>제목 : {this.props.title} </h2> </Grid>

          </Grid>
          <Link to={src} >
            <Grid container>
                <Grid item xs={6}><label style={{ fontSize:20, fontWeight:"bold" }}>작성자 : {this.props.user} </label></Grid>
            </Grid>
          </Link>
          <Grid container>
            <Grid item xs={6}><label style={{ fontSize:20, fontWeight:"bold" }}>조회수 : {this.props.view}  </label></Grid>

          </Grid>
          <Grid container>
            <Grid item xs={6}><label style={{ fontSize:20, fontWeight:"bold" }}>날짜 : {date}</label></Grid>

          </Grid>
          <Grid container style={{ marginTop:50, height:300, backgroundColor:"#CCCCCC" }}>
            <Grid item xs={12}>{this.props.text}</Grid>

          </Grid>

        </React.Fragment>
        


    );
  }

}


export default Boarding_center;