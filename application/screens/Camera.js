import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';


export default class App extends React.Component {
  state = {
    image: null,
    photo : []
  };

  selectPicture = async () => {
        /*
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!cancelled) this.setState({ image: uri });
*/
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 11],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
            image : result.uri,
            photo : result
      })
      //setImage(result.uri);
    }
  };

  takePicture = async () => {
        /*
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [10, 11],
      quality: 1,
    });
    this.setState({ image: uri });
*/

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 11],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
            image : result.uri,
            photo : result
      })
      //setImage(result.uri);
    }
  };

   createFormData = (photo, body) => {
      const data = new FormData();
    
      data.append("photo", {
        name: 'test.jpg',
        type: 'image/jpeg',
        uri:
          Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
      });
    
      Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });

      console.log(data);
    
      return data;
    };

  savePicture = async () =>{
        if(this.state.photo === null){
              alert("사진이 지정되지 않았습니다.");
        }else{
            const id = "test";
            const photo = this.state.photo; 
            fetch("http://192.168.17.3:5000/clothes/a_save", {
            method: "POST",
            body: this.createFormData(this.state.photo, { userId: "123" })
            })
            .then(response => response.json())
            .then(response => {
                  console.log("upload succes", response);
                  alert("등록 완료");
                  this.setState({ photo: null });
            })
            .catch(error => {
                  console.log("upload error", error);
                  alert("등록 실패");
            });

            /*
            const formData = new FormData();
                  formData.append("file", file);
                  axios.post("http://192.168.17.3:5000/clothes/a_save", formData, {
                        header: {
                              "content-type": "multipart/form-data"
                        }
            });
            */     
            /*
            const formData = new FormData();
                  formData.append("file", {
                  name: file.width,
                  type: "image/jpeg",
                  uri: file.uri
            });
            */
            //console.log(file.filename);
            //axios.post("http://192.168.17.3:5000/clothes/a_save", formData, {
            //   header: {
            //     "content-type": "multipart/form-data"
            //   }
            // });
            //axios.post("http://192.168.17.3:5000/clothes/a_save", formData, null);

            /*
            const formData = new FormData();
                  formData.append("file", file);
                  axios.post("http://192.168.17.3:5000/clothes/a_save", formData, {
                  header: {
                  "content-type": "multipart/form-data"
                  }
            });
            */
            /*
            const url = 'http://192.168.17.3:5000/clothes/a_save'; // 어디로 데이터를 전송할 것인지, IP와 포트 등을 잘 살펴볼 것.
            const opt = {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                body : `id=${id}&file=${file}`
            }
    
            fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                if(data.message == true){
                  alert("옷 저장 완료");
                  this.setState({
                        image : null
                  });
    
                }else if(data.message == false){
                    alert("에러");
                }
            });
            */
        }
  }



  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.image }} />
        <View style={styles.row}>
          <Button onPress={this.selectPicture}>Gallery</Button>
          <Button onPress={this.takePicture}>Camera</Button>
          <Button onPress={this.savePicture}>Save</Button>
        </View>
      </View>
    );
  }
}

const Button = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
  },
  row: { flexDirection: 'row' },
  image: { width: 300, height: 300, backgroundColor: 'gray' },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
