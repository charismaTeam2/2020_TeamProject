import React, {Component, useImperativeHandle } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../Main_home/Header';
import LoginedHeader from '../Main_home/LoginedHeader';
import LoginedMain from '../Main_home/LoginedMain';
import Footer from '../Main_home/Footer';
import Clothes_table from './Clothes_table';
import Clothes_select from './Clothes_select';


// 사용자 페이지는 '자신의 페이지'와 '타사용자 페이지'로 구분해서 이동.
// 회원 정보(아이디, 언제 가입했고, 현재 팔로워 수, 패션 점수)
// 메시지(메시지 구분.)
// 자기가 쓴 게시물 확인. 수정,삭제.
// 


class Info_clothes extends Component{
    state = {
        user : "",
        clothes : []        
    }



componentDidMount() {
    this.setState({
        clothes : this.props.clothes,
        user : this.props.user
    });

    //console.log(this.props.user);
  
    
}



  render(){
    const clothes_table = this.state.clothes;

//onClick={this.test.bind(this, c)}



    return(
        <React.Fragment>
            <Clothes_select key={this.state.user} user={this.state.user} />
            <Grid container spacing={3} style={{ marginTop: 30 }}>
                {clothes_table.map(c => {
                    return(
                    <Grid item xs={12} sm={3}>
                      <Clothes_table key={c.c_number} division={c.c_division} number={c.c_number} name={c.c_name} image={c.c_image} color={c.c_color}  stat={c.c_stat} />
                    </Grid>
                    );
                  })}


            </Grid>
        

        </React.Fragment>
        

    );
  }

}


export default Info_clothes;