import  React, { Component }  from 'react'; 
import {StyleSheet,View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';

// 로그인

export default class Home extends  Component{
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
  });
  

  constructor(props){
    super(props);
    this.state = {
      Username: '',
      Password:'',
    }
  }
   static Mycloset = () => { this.props.navigation.navigate("Mycloset") }
  
   // 로그인은 그냥 로그인 버튼만 누르면 바로 다음 화면으로 넘어가게 할 것.
   // 앱 세션까지 구성하는 것은 되지만, 최소한 핵심 기능이 다 완료된 상태에서 할 것. 
   UserLoginFunction = () =>{
   
    const { Username }  = this.state ;
    const { Password }  = this.state ;
    
   fetch('https://192.168.35.60/User_Login.php', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
    
       email: Username,
    
       password: Password
    
     })
    
   }).then((response) => response.json())
         .then((responseJson) => {
    
           // If server response message same as Data Matched
          if(responseJson === 'Data Matched')
           {
    
               //Then open Profile activity and send user email to profile activity.
               this.props.navigation.navigate("Mycloset");
               Alert.alert(responseJson);
    
           }
           else{
    
             Alert.alert(responseJson);
           }
    
         }).catch((error) => {
           console.error(error);
         });
    
     }
   
  render(){
    const Member = () => { this.props.navigation.navigate("Member") }
    const Tabs = () => {this.props.navigation.navigate("MyCloset")}
  return (
    <View style={styles.container}>
    <Image 
    source={require('./logo.png')} 
    style={{width:'100%', height:60}}/>
    <Text style={{marginTop: 20}}>Username</Text>
    <TextInput 
        style={{height:40, borderColor:'gray',borderWidth:1}}  
        onChangeText= {(Username) => this.setState({Username})}>

    </TextInput>
    <Text style={{marginTop: 20}}>Password</Text>
    <TextInput style={{height:40, borderColor:'gray',borderWidth:1}}
     onChangeText= {(Password) => this.setState({Password})}
     secureTextEntry={true}
     ></TextInput>
    <View style={{marginTop: 20}}>
    <TouchableOpacity
      style={styles.btn}
      onPress={Member}>
      <Text>회원가입</Text>
      </TouchableOpacity>
    </View>
    <View style={{marginTop: 10}}>
    <TouchableOpacity
      style={styles.btn}
      onPress={Tabs}>
      <Text>Login</Text>
      </TouchableOpacity>
  </View>
  
  
 
  </View>
  )
  }
}



const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 100            
},
Text : {
    fontSize:30,
    color:'black',
    paddingTop: 20,
    paddingBottom:20,
    textAlign: 'center'
},
btn : {
  alignSelf: 'stretch',
  backgroundColor: '#01c853',
  padding: 20,
  alignItems: 'center',
}
})

function Settings(){
  <Detail/>
}

