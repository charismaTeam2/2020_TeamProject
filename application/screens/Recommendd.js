import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import Follow from './follo'


// 게시판
// 중요도 보통. 개발 완료.

export default class Recommendd extends Component{

  state = {
    users : [],
    message : ''
  }

  componentDidMount(){


                fetch('http://192.168.17.3:5000/user/aa_user')
                .then(response => response.json())
                .then(data => this.setState({
                  users : data.rows,
                  message : data.message
              }));
        

  }



  render(){

    return(
      <ScrollView>  
              <View style={{ flex: 1, marginTop:30, marginLeft:20, marginRight:20, borderBottomWidth:0.5, justifyContent: 'flex-start', 
                      alignItems: 'flex-start', flexDirection: 'row', borderColor:'gray' }}>
              <Text style={{ marginRight: 30}}>유저명</Text> 
              <Text style={{ marginRight: 30}}>패션점수</Text>
              <Text style={{ marginRight: 30}}>메시지</Text>
        </View>

        {
          this.state.users.map(c =>{
              return(
                <Follow key={c.following_id} f_id={c.following_id}/> 
             
              );
          })
        }




     </ScrollView>


    );
  }
}