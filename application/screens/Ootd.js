import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import BoardComponent from './BoardComponent';


// 게시판
// 중요도 보통. 개발 완료.

export default class Ootd extends Component{

  state = {
    board : []
  }

  componentDidMount(){
      fetch('http://192.168.17.3:5000/board/')
        .then(response => response.json())
        .then(data => this.setState({
          board : data.board
      }));
  }



  render(){

    return(
      <ScrollView>  
        <View style={{marginTop: 10, flexDirection: 'row-reverse'}}>
          <TouchableOpacity
              style={{ 
              backgroundColor: '#01c853',
              height:40,
              width:100,
              justifyContent: 'center',
              alignItems: 'center'}}
              onPress={()=> this.props.navigation.navigate("글쓰기")}>
            <Text>글쓰기</Text>
          </TouchableOpacity>
        </View>

        {
          this.state.board.map(c =>{
            let view = 'http://192.168.17.3:3000/images/' + c.board_thum
              return(
                <BoardComponent key={c.board_number}  number={c.board_number} name={c.board_name} text={c.board_text} reco={c.board_reco} view={view} user={c.user_id}/> 
             
              );
          })
        }

   


   </ScrollView>


    );
  }
}