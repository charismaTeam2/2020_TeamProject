import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,TextInput,TouchableOpacity
} from 'react-native';
import Tabs from '../navigation/Tabs';

// 회원가입
// 중요도 낮음. 개발 필요. 유저 등록 기능과 디자인 수정작업 필요.

export default class Member extends Component{
   static navigationOptions = ({navigation}) => ({
      title: navigation.state.params.name,
    });
    
   constructor(props){
      super(props)
      this.state={
         userName:'',
         userEmail:'', 
         userPassword:''            
      }
   }
   
   userRegister = () =>{
      //alert(userName); // version 0.48
      
      
      
   }
   
  render() {
   const Tabs = () => { this.props.navigation.navigate("Tabs") }
    return (
   <View style={styles.container}>
          
     <TextInput
     placeholder="Enter Name"
     style={{width:250,margin:10, borderColor:"#333", 
     borderWidth:1}}   
     underlineColorAndroid="transparent"
  onChangeText= {userName => this.setState({userName})}
     
     />
     
     <TextInput
     placeholder="Enter Email"
     style={{width:250,margin:10, borderColor:"#333", 
     borderWidth:1}}   
     underlineColorAndroid="transparent"
     onChangeText= {userEmail => this.setState({userEmail})}
     />
     
     <TextInput
     placeholder="Enter Password"
     style={{width:250,margin:10, borderColor:"#333", 
     borderWidth:1}}   
     underlineColorAndroid="transparent"
     onChangeText= {userPassword => this.setState({userPassword})}
     />
     
     <TouchableOpacity
      onPress={this.userRegister}
      style={{width:250,padding:10, backgroundColor: '#01c853',
      alignItems:'center'}}>
     <Text style={{color:'#fff'}}>Signup</Text>
     </TouchableOpacity>
     
     
     </View>
  
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('register', () => Member);