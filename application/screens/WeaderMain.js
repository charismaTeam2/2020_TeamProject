import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import *as Location from 'expo-location'; //터미널에서 expo install expo-location으로 다운해야됨.
import axios from "axios";
import Weather from "./Weather";

// 날씨 api
// 중요도 보통. 개발 완료. 날씨 이미지가 이상하게 나오는 부분 수정 필요.

const API_KEY = "05a91e69f7a78119b14998918b793ae5";

export default class extends React.Component { 
  state = {
    isLoading: true
  };
  getWeather = async(latitude,longitude) => {
    const {
      data:{
        main:{temp},
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric` //url값은 "(쌍따옴표), '(싱글따옴표) 는 안된다. `(백틱)을 써줘야한다. 왜냐하면 변수를 문자열에 포함시켜야하기 때문이다.
    );
   this.setState({
     isLoading:false,
     condition: weather[0].main,
    temp
    });
  };
  getLocation = async() =>{
    try{
      await Location.requestPermissionsAsync(); //허가요청
      const {coords:{latitude,longitude}
    } = await Location.getCurrentPositionAsync();  //사용자위치정보가져오기
    this.getWeather(latitude,longitude)
     
    }catch(error){
      Alert.alert("can't find you","so sad");
    }
  
   
  };
  componentDidMount(){

    this.getLocation();
  }
  render(){ // isLoading이 true이면 로딩화면을 false이면 Weather의 temp값을 출력한다.
    const {isLoading, temp, condition} = this.state;
    return isLoading ? <Loading/> : <Weather temp={Math.round(temp)} condition={condition}/>; //Math.round는 소수점없애줌.
  }
}


