import React from 'react';
import { ImageEditor, Button, Image, View,TextInput, TouchableOpacity , Text, CheckBox } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// 게시글 쓰기
// 중요도 낮음. 개발 필요. 디자인 + 기능 작업 필요.


export default class Border extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TextInput 
       placeholder="글제목을 입력하세요"
       style={{height:50, width:300, backgroundColor:'#FBFBEF',borderWidth:1}}  
       >
    </TextInput>
       
    <TextInput 
       placeholder="내용을 입력하세요"
       style={{height:100, width:300, backgroundColor:'#FBFBEF',borderWidth:1}}  
       >
    </TextInput>

       <Button
          title="사진가져오기"
          onPress={this._pickImage}
        />
        {image &&
      <Image source={{ uri: image }} style={{ width: 200, height: 200, resizeMode: 'contain' }} />}


    <View style={{ flexDirection: 'row' }}>
      <CheckBox
        value={this.state.checked}
        onValueChange={() => this.setState({ checked: !this.state.checked })}
      />
      <Text style={{marginTop: 5}}>팔로워에게만 공개</Text>
    </View>

      <TouchableOpacity style={{alignItems:'center', justifyContent: 'center', width :100, height : 40, backgroundColor: '#01c853',}}>
        <Text>완료</Text>
      </TouchableOpacity>   

      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    
    if (result.cancelled) {
      console.log('got here');
      return;
    }

    
    // this gives you a rct-image-store URI or a base64 image tag that
    // you can use from ImageStore

    this.setState({ image: result.uri });
  };
}