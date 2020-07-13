import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Switch } from 'react-native';
import { Card, CardItem, CardSwiper } from 'native-base';
const headers = { withCredentials: true }; // 의미없음.

// 게시판 옷 화면.
// 중요도 보통. 개발 완료. 댓글 등 기능 추가필요.
 
export default class CardCompnent extends Component{

    // state.
    state ={
        show : this.props.show
    }

    // 토글 스위치.
    toggleSwitch = () => {
        this.setState({
            show : !this.state.show
        });

        // 데이터를 보낼 때, 이런 식으로 따로 변수를 선언해서 받으면 더 편하고 안정적으로 전송이 가능하다.
        // 여기서 props는 이른바 상위 계층에게서 상속 받은 값을 의미한다. 여기선 이 컴포넌트를 쓰고 있는 Mycloset이 상위 계층이며, 이곳에서 데이터를 받는다.
        // this.props.number 등의 방식으로 상위 계층의 속성을 받을 수 있다.
        // 참고로, props는 절대 변경할 수 없는 값이며, 그저 쓸 수 만 있다.
        // 즉, this.props.number = 1; 이런 식으로는 절대 쓸 수 없고, 따로 변수에 담아야만 변경 가능하다.
        const number = this.props.number;
        const show = this.props.show; 

        const url = 'http://192.168.17.3:5000/clothes/a_show'; // 어디로 데이터를 전송할 것인지, IP와 포트 등을 잘 살펴볼 것.
        const opt = {
            method: "POST",
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body : `number=${number}&show=${show}`
        }

        fetch(url, opt)
        .then(res => res.json())
        .then(data => {
            if(data.message == true){

            }else if(data.message == false){
                alert("에러");
            }
        });


    }

    render(){

        let div_text = "";
        if(this.props.division === 1){
            div_text = "상의";
        }else if(this.props.division === 2){
            div_text = "하의";
        }else if(this.props.division === 3){
            div_text = "점퍼";
        }
    
        let stat_text = "";
        if(this.props.stat === 1){
            stat_text = "입을 수 있음";
        }else if(this.props.stat === 2){
            stat_text = "세탁 필요";
        }else if(this.props.stat === 3){
            stat_text = "입을 수 없음"
        }


      return (
        <Card style={{ flexWrap:'wrap' }}>
          <CardItem cardBody>
            <Image 
              source={{ uri: this.props.view}} 
              style={{ height:200, width:null, flex: 1 }} />
          </CardItem>
          <CardItem>
                <Text>
                    <Text style={{ fontWeight:'900'}}>의상 종류 : {div_text}</Text>
                </Text>
            </CardItem>
            <CardItem>
                <Text>
                    <Text style={{ fontWeight:'900'}}>의상 색상 : {this.props.color}</Text>
                </Text>
            </CardItem>
            <CardItem>
                <Text>
                    <Text style={{ fontWeight:'900'}}>의상 상태 : {stat_text}</Text>
                </Text>
            </CardItem>
            <CardItem>

            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.show ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch}
                value={this.state.show}
            />
            </CardItem>



        </Card>
      );
    }
  }
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});