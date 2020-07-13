
import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';

// 게시글 피드 화면.
// 중요도 보통. 개발 완료.

 
export default class BoardComponent extends Component{

   

    render(){
      return (
        <Card style={{flex: 1}}>

          <CardItem cardBody>
            <Image 
              source={{ uri: this.props.view }} 
              style={{ height:200, width:null, flex: 1 }} />
          </CardItem>
          <CardItem style={{ height:45 }}>
            <Left>
              <Button transparent>
                <Icon name='ios-heart' style={{ color:'black' }}/>
              </Button>
              <Button transparent>
                <Icon name='ios-chatbubbles' style={{ color:'black' }}/>
              </Button>
              <Button transparent>
                <Icon name='ios-send' style={{ color:'black' }}/>
              </Button>
            </Left>
          </CardItem>
          <CardItem style={{ height: 20 }}>
            <Text style={{ fontWeight:'900'}}>{this.props.user}</Text>
          </CardItem>
          <CardItem style={{ height: 20 }}>
            <Text>{this.props.reco} likes</Text>
          </CardItem>
          <CardItem>
            <Text>
                {this.props.text}
            </Text>
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