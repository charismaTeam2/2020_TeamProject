import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'


// 게시판
// 중요도 보통. 개발 완료.

export default class follo extends Component{

  state = {
    
  }

  componentDidMount(){

  }



  render(){

    return(
      <ScrollView>  
              <View style={{ flex: 1, marginTop:30, marginLeft:20, marginRight:20, borderBottomWidth:0.5, justifyContent: 'flex-start', 
                      alignItems: 'flex-start', flexDirection: 'row', borderColor:'gray' }}>
              <Text style={{ marginRight: 30}}>{this.props.f_id}</Text> 
              <Text style={{ marginRight: 30}}>30</Text>
              <Text style={{ marginRight: 30}}>
                  <Button>
                      메시지
                  </Button>
              </Text>
        </View>




     </ScrollView>


    );
  }
}