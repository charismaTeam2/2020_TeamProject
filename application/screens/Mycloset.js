import React,{Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import plu from '../assets/plus.png'
import CardCompnent from '../screens/CardComponent'


// 옷장.
// 중요도 높음. 개발 완료. 카메라 모듈을 만든 후 이곳과 연결할 수 있도록 작업요망.
// 15-17 작업자 박준수.

// 컴포넌트에 대한 이해.
// 컴포넌트는 벽돌이라고 이해하면 편하다. 하나의 큰 도화지를 만들고, 그 위에 만들어진 컴포넌트를 이리저리 호출해서 붙이는 형식으로 
// 리액트 웹,앱 구성이 가능하다.
// 여기선 Mycloset > CardCompnent 형식으로 구성된다.
// 즉, Myclost이 하나의 도화지고 CardCompnent는 그 위에 호출되서 붙여진 벽돌이라고 비유할 수 있다.
// 여기서 다른 컴포넌트를 호출해서 Mycloset에 추가하여 꾸밀 수도 있다.

// 왠만하면 이런 형태로 코드를 구성하는게 편하다.
// 리액트는 class 형식 말고도 function 형식 등 다양한 방법으로 구현 가능하지만, 수많은 state 변수를 사용할 거면 class 형식으로 코드를
// 작성하는 것이 매우 편하다.
export default class Mycloset extends Component{

  // state에 대한 이해.
  // state는 현재 컴포넌트 내의 데이터 변수들을 의미한다.
  // 예를 들어서, 이 Mycloset 컴포넌트에서 사용되는 모든 데이터 변수들은 state 혹은 props 로 지정해야 사용이 가능하다.
  
  // 우선 이렇게 state 항목을 만들고, 그 안에서 변수를 만들거나 수정한다. 
  // 참고로, 이건 초기화 하는 항목이기 때문에 "" 이나 []로 처리하는 편이 일반적이다.
  state = { // 변동되는 값을 바꾸려면 먼저 이렇게 state값을 초기화 해두어야 한다.
    clothes : [] // 현재 이건 옷들을 담기 위해서 clothes란 변수를 공백배열 형식으로 선언한 것이다.
  }

  // 생명주기에 대한 이해.
  // 리액트는 다양한 생명주기가 있으며, 보통은 componentDidMount나 componentWillMount 등을 많이 쓴다.
  // componentDidMount는 이제 컴포넌트가 마운트 되는 시점의 생명주기를 의미하며, 네트워크 호출을 사용할 때 많이 쓴다.
  // 물론, 렌더링 할 때 두 번 갱신되기 때문에 성능에 무리를 줄 수도 있다.
componentDidMount(){
  

  // fetch에 대한 이해.
  // ajax 통신 기법 중 하나이며, axios로 대체 가능하다.
  fetch('http://192.168.17.3:5000/clothes/a_main')  // 이렇게 전송할 혹은 전송받을 url을 지정한다. url과 포트를 잘 살펴봐야 한다.
      .then(response => response.json()) // then은 그 다음 처리를 의미한다. 쉽게 말해서, 1->2->3 순으로 실행되는 코드가 있다면, 1.then은 1이 끝난 다음을 의미하고, 2.then은 2가 끝난 다음을 의미한다.
      .then(data => this.setState({ // setState는 state를 지정하는 방식 중 하나이다. http://192.168.17.3:5000/clothes/a_main에서 가져온 값을 state인 clothes에 넣기 위해서 사용한다.
        clothes : data.rows // data는 http://192.168.17.3:5000/clothes/a_main에서 불러온 총체적인 값을 의미한다. json형식이기 때문에 rows란 키값을 이용해 데이터를 가져올 수 있다.
  }));



}

  render(){
    // render() 함수 내에는 새롭게 함수나 이런 것을 지정할 수 있다.
    // 단, return 내에는 주석도 함수도 절대 가능하지 않기에 주의해야 한다.
    // {} 형태로 javascript 문법을 취할 수 있지만, 필요한 경우에만 사용하는 것이 편하다.


    // return 내에는 이 컴포넌트를 꾸미기 위한 요소가 들어있다.
    // 특히, 여러 태그를 넣어서 꾸밀 수 있으며,
    // <ScrollView>,<Div> 등 최상위 태그로 한 번 감싸야 오류가 안난다.

    // map에 대한 이해.
    // return 안에 있는 map은 배열 형식으로 변수가 존재할 때 그걸 차례대로 출력해주는 코드이다.
    // for문으로 배열의 크기만큼 반복해서 출력하는 형식과 비슷하다고 볼 수 있다.
    // 여기서는 state값으로 선언된 clothes 배열을 크기만큼 반복해서 출력하고, 그 값을 CardCompnent란 하위 컴포넌트에 props를 이용해 값을 넘기는 형식이다.
    // <CardCompnent key={c.c_number} view={view} number={c.c_number}... />  이런 형태에서 CardCompnent에 c.c_number란 값을 number란 이름으로 넘긴다 라고 이해하면 편하다.
    // 넘긴 값을 받는 방식은 CardCompnent에 더 자세히 설명했기에 참고 요망.
    return(
      <ScrollView>
              {
                this.state.clothes.map(c =>{
                  let view = 'http://192.168.17.3:3000/clothes/' + c.c_image
                  let show
                      if(c.c_button === 1){
                        show = true;
                      }else if(c.c_button === 2){
                        show = false;
                      }
                  return(

                      <CardCompnent key={c.c_number} view={view} number={c.c_number} name={c.c_name} division={c.c_division} image={view} color={c.c_color} stat={c.c_stat} show={show}/> 
             
                  );
                })
              }

    
          </ScrollView>


    )
  }
};