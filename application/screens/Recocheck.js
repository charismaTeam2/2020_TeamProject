import React from "react";
import {StyleSheet, View, Text, ScrollView, Button} from "react-native";

// 옷추천해준거확인하는페이지.
// 중요도 높음. 개발 완료. 디자인 수정작업 필요.

export default ({navigation}) => (
    <ScrollView>       
         <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>  
        <View style={{ height:500, alignItems: 'flex-start', flexDirection: 'column'}}>
                
        <View style={{ marginTop:30, marginLeft:20, marginRight:20, borderBottomWidth:0.5, justifyContent: 'flex-start', 
                      alignItems: 'flex-start', flexDirection: 'row', borderColor:'gray' }}>
              <Text style={{ marginRight: 60}}>추천ID</Text> 
              <Text style={{ marginRight: 130}}>상의이름</Text>
              <Text style={{ marginRight: 130}}>상의이미지</Text>
              <Text style={{ marginRight: 130}}>하의이름</Text>
              <Text style={{ marginRight: 130}}>하의이미지</Text>
              <Text>저장/삭제</Text>
        </View>

        <View style={{alignItems: 'flex-start', borderTopWidth:0.5, borderTopColor:'gray',  flexDirection: 'row' }}>
              <Text style={{marginTop:20, marginRight: 60}}>junsu929</Text> 
              <Text style={{marginTop:20, marginRight: 130}}>셔츠</Text>
              <Text style={{marginTop:20, marginRight: 130}}>이미지</Text>
              <Text style={{marginTop:20, marginRight: 130}}>반바지</Text>
              <Text style={{marginTop:20, marginRight: 130}}>하의이미지</Text>
              <Button title="저장"/>
              <Button title="삭제"/>            
        </View>
    </View>
    </ScrollView>
  </ScrollView>

      );

    
