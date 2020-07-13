import React, {Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import LoginedMain from '../Main_home/LoginedMain';
import Footer from '../Main_home/Footer';


// 사용자 페이지는 '자신의 페이지'와 '타사용자 페이지'로 구분해서 이동.
// 회원 정보(아이디, 언제 가입했고, 현재 팔로워 수, 패션 점수)
// 메시지(메시지 구분.)
// 자기가 쓴 게시물 확인. 수정,삭제.
// 


class Info_user extends Component{
    state = {
        user : "",
        count : "",
        date : "",
        score : ""
    }



componentDidMount() {

    this.setState({
        user : this.props.user,
        count : this.props.count,
        date : this.props.date,
        score : this.props.score
    });
    
}



  render(){




    return(
        <React.Fragment>
            <Grid item xs={12} xm={12} style={{ marginTop: 20}}>
                <Grid item xs={6} xm={12}>
                    <label style={{ fontSize:25, fontWeight:"bold" }}>아이디 : </label> <label style={{ fontSize:25, fontWeight:"bold" }}>{this.state.user}  </label>
                </Grid>
                <Grid item xs={6} xm={12}>
                    <label style={{ fontSize:25, fontWeight:"bold" }}>게시글 수 : </label> <label style={{ fontSize:25, fontWeight:"bold" }}>{this.state.count} </label>
                </Grid>
                <Grid item xs={6} xm={12}>
                    <label style={{ fontSize:25, fontWeight:"bold" }}>회원가입일 : </label> <label style={{ fontSize:25, fontWeight:"bold" }}>{this.state.date} </label>
                </Grid>
                <Grid item xs={6} xm={12}>
                    <label style={{ fontSize:25, fontWeight:"bold" }}>패션 점수 : </label> <label style={{ fontSize:25, fontWeight:"bold" }}>{this.state.score} 점 </label>
                </Grid>
                  
                  



            </Grid>
        </React.Fragment>
        

    );
  }

}


export default Info_user;