import React from "react";
import {StyleSheet, View, Text, ScrollView, Button, TouchableOpacity, Image} from "react-native";

// 옷추천페이지
// 중요도 보통. 개발 필요. 디자인과 기능 구성 필요.
/*
<View style={{ marginRight: 55}}>

            <Image 
              source={{ uri: props.ta_src}}
              style={{ height:100, width:80}}  />
              <Image 
              source={{ uri: props.ba_src}} 
              style={{ height:100, width:80 }} />
            </View>
*/

export default (props) => (
    
    
        <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginTop:15, borderTopWidth:0.5, borderTopColor:'red', borderBottomWidth:0.5, borderBottomColor:'red'}}>
            <View style={{ marginRight: 20}}>

            <Image 
              source={{ uri: props.ta_src}}
              style={{ height:100, width:80}}  />
            </View>
            <View style={{ marginRight: 83}}>
              <Image 
              source={{ uri: props.ba_src}} 
              style={{ height:100, width:80 }} />
            </View>

              <Text style={{ marginRight: 50}}>{props.select}</Text>
        </View>


);
    
