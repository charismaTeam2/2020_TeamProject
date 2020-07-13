import React, {Component } from 'react';
import Grid from '@material-ui/core/Grid';


// 사용자 페이지는 '자신의 페이지'와 '타사용자 페이지'로 구분해서 이동.
// 회원 정보(아이디, 언제 가입했고, 현재 팔로워 수, 패션 점수)
// 메시지(메시지 구분.)
// 자기가 쓴 게시물 확인. 수정,삭제.
// 


class Info_user extends Component{
    state = {
        c_count : "",
        date : "",
        score : ""
    }



componentDidMount() {
    fetch('/mypage/user_info')
    .then(response => response.json())
    .then(data => this.setState({ 
      c_count : data.c_count,
      date : data.date,
      score : data.score
    }));


//console.log(this.state.c_count);

}



  render(){




    return(
        <React.Fragment>
            <Grid item xs={12} xm={12} style={{ marginTop: 20}}>
                <Grid item xs={6} xm={12}>
                    <label style={{ fontSize:25, fontWeight:"bold" }}>아이디 : </label> <label style={{ fontSize:25, fontWeight:"bold" }}> {this.props.user} </label>
                </Grid>
                <Grid item xs={6} xm={12}>
                    <label style={{ fontSize:25, fontWeight:"bold" }}>게시글 수 : </label> <label style={{ fontSize:25, fontWeight:"bold" }}>{this.state.c_count}</label>
                </Grid>
                <Grid item xs={6} xm={12}>
                    <label style={{ fontSize:25, fontWeight:"bold" }}>회원가입일 : </label> <label style={{ fontSize:25, fontWeight:"bold" }}>{this.state.date}</label>
                </Grid>
                <Grid item xs={6} xm={12}>
                    <label style={{ fontSize:25, fontWeight:"bold" }}>패션 점수 : </label> <label style={{ fontSize:25, fontWeight:"bold" }}>{this.state.score}</label>
                </Grid>
                  
                  



            </Grid>
        </React.Fragment>
        

    );
  }

}


export default Info_user;